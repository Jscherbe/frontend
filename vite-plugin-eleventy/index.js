import path from "path";
import fs from "fs";
import mime from "mime-types";
import Eleventy from "@11ty/eleventy";
import chokidar from "chokidar";
import { getCacheDir } from "./utils.js";
import eleventyPluginLogic from "./eleventy.js";

/**
 * Vite Plugin for Eleventy
 * @param {Object} options
 * @param {String} options.configPath - Path to eleventy config (relative to root)
 * @param {String} options.outDir - Output directory for Eleventy (default: cache dir in dev, 'dist' in prod)
 * @param {String} options.cacheDir - Directory for dev server output (defaults to node_modules/.@ulu-cache-vite-plugin-eleventy)
 * @param {String} options.publicPath - Optional override for the public path prefix for assets (defaults to Vite's `base`). Set to "/" to force root-relative paths if you are using Eleventy's HtmlBasePlugin.
 * @param {Boolean} options.debug - Enable debug logging
 */
export default function eleventyPlugin(options = {}) {
  let elev;
  let watcher;
  let viteConfig;

  const configPath = options.configPath || "eleventy.config.js";
  const debug = options.debug || false;

  function log(...args) {
    if (debug) console.log("[@ulu/vite-plugin-eleventy]", ...args);
  }

  // Helper to create the Eleventy instance with injected config
  function createEleventy(outputDir, runMode) {
    // In Dev (watch), we force pathPrefix to "/" so generated asset links (e.g. /site/src/main.js)
    // are resolvable by Vite from the root.
    // In Prod (build), we use the provided pathPrefix (e.g. /frontend/) for deployment.
    // We default to viteConfig.base if options.pathPrefix is not set.
    const resolvedPathPrefix =
      options.pathPrefix || (viteConfig && viteConfig.base) || "/";

    const pathPrefix = runMode === "watch" ? "/" : resolvedPathPrefix;

    // In Dev, we also force publicPath to "/" so viteEntry outputs root-relative paths
    const publicPath =
      runMode === "watch"
        ? "/"
        : options.publicPath || (viteConfig && viteConfig.base) || "/";

    return new Eleventy(undefined, outputDir, {
      configPath: configPath,
      runMode: runMode,
      pathPrefix: pathPrefix,
      config: eleventyConfig => {
        try {
          // Automatically inject our plugin logic
          eleventyPluginLogic(eleventyConfig, {
            viteOutDir:
              options.outDir ||
              (viteConfig && viteConfig.build && viteConfig.build.outDir),

            publicPath: publicPath,
          });
        } catch (e) {
          console.error(
            "[@ulu/vite-plugin-eleventy] Error injecting plugin config:",
            e
          );
        }
      },
    });
  }

  return {
    name: "@ulu/vite-plugin-eleventy",
    configResolved(config) {
      viteConfig = config;
    },

    // --- BUILD: Run Eleventy AFTER Vite build ---
    async closeBundle() {
      if (viteConfig.command !== "build") return;

      log("Vite build complete. Starting Eleventy build...");

      // Set the custom mode for our Eleventy plugin to detect
      process.env.ULU_VITE_MODE = "build";

      // Determine output dir for production build
      const eleventyOutDir = options.outDir || viteConfig.build.outDir;

      log(`Eleventy Output Dir: ${eleventyOutDir}`);

      // Run Eleventy Build
      const elevInstance = createEleventy(eleventyOutDir, "build");
      await elevInstance.write();
      log("Eleventy build complete.");
    },

    // --- SERVE: Run Eleventy in Watch Mode ---
    async configureServer(server) {
      const cwd = process.cwd();

      const devOutDir = options.cacheDir ? 
        path.resolve(cwd, options.cacheDir) : 
        getCacheDir(cwd);

      // Set the custom mode for our Eleventy plugin to detect
      process.env.ULU_VITE_MODE = "serve";

      // Ensure cache dir exists
      if (!fs.existsSync(devOutDir)) {
        fs.mkdirSync(devOutDir, { recursive: true });
      }

      log(`Starting Eleventy in watch mode. Output: ${devOutDir}`);

      elev = createEleventy(devOutDir, "watch");
      await elev.init(); // Initialize to ensure config and benchmarks are ready

      elev.watch().then(() => log("Eleventy watching..."));

      // Setup separate watcher for the output files
      watcher = chokidar.watch(devOutDir, {
        ignoreInitial: true,
        persistent: true,
      });

      // Debounce reload
      let reloadTimer;

      const triggerReload = () => {
        clearTimeout(reloadTimer);
        reloadTimer = setTimeout(() => {
          log("Triggering full reload");
          server.ws.send({ type: "full-reload", path: "*" });
        }, 200);
      };

      watcher.on("add", file => {
        if (file.endsWith(".html")) triggerReload();
      });

      watcher.on("change", file => {
        if (file.endsWith(".html")) triggerReload();
      });

      // Middleware to serve HTML from cache
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.method !== "GET") return next();

          let url = req.url.split("?")[0];

          // Use viteConfig.base as default pathPrefix if not explicitly provided
          const pathPrefix = options.pathPrefix || (viteConfig && viteConfig.base) || "/";

          // Strip pathPrefix if present
          if (pathPrefix !== "/" && url.startsWith(pathPrefix)) {
            url = url.slice(pathPrefix.length - 1); // Keep the leading slash
          }

          let tryPath = path.join(devOutDir, url);

          // Directory index handling
          if (url.endsWith("/")) {
            tryPath = path.join(devOutDir, url, "index.html");
          } else if (!path.extname(url)) {
            // clean url handling (e.g. /about -> /about.html or /about/index.html)
            if (fs.existsSync(tryPath + ".html")) {
              tryPath += ".html";
            } else if (fs.existsSync(path.join(tryPath, "index.html"))) {
              tryPath = path.join(tryPath, "index.html");
            }
          }

          if (fs.existsSync(tryPath) && fs.statSync(tryPath).isFile()) {
            const type = mime.lookup(tryPath) || "text/html";

            res.setHeader("Content-Type", type);

            if (type === "text/html") {
              let html = fs.readFileSync(tryPath, "utf-8");

              // Inject Vite Client
              html = html.replace(
                "</head>",
                `<script type="module" src="/@vite/client"></script>\n</head>`
              );

              res.end(html);
            } else {
              const stream = fs.createReadStream(tryPath);
              stream.pipe(res);
            }
          } else {
            next();
          }
        });
      };
    },
  };
}
