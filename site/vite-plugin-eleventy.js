import path from "path";
import fs from "fs";
import mime from "mime-types";
import Eleventy from "@11ty/eleventy";

/**
 * Vite Plugin to run Eleventy 3.0 in watch mode and serve its output.
 *
 * @param {Object} options
 * @param {String} options.configPath - Path to eleventy.js
 * @param {String} options.outDir - Path to where Eleventy builds (e.g., 'site/dist')
 */
export default function eleventyPlugin(options = {}) {
  let elev;
  const configPath = options.configPath || "eleventy.config.js";
  const outDir = options.outDir || "_site";
  const pathPrefix = options.pathPrefix || "/";

  return {
    name: "vite-plugin-eleventy",

    // Start Eleventy when Vite starts
    async buildStart() {
      if (elev) return; // Already started

      console.log("[vite-eleventy] Starting Eleventy...");
      elev = new Eleventy(undefined, outDir, {
        configPath: configPath,
        source: "serve", // Signal that we are serving, though we use API to watch
      });

      await elev.init();

      // Hook into Eleventy events if available in 3.0 or just rely on watch
      // Eleventy 3.0 Programmatic API:
      // https://www.11ty.dev/docs/programmatic/

      // We start the watch.
      // Note: elev.watch() usually doesn't resolve until watch is stopped?
      // Actually checking docs, it returns a promise.

      // We want to capture the 'write' event to trigger reload
      // Using the configuration object inside eleventy to add an event listener might be cleaner,
      // but sticking to the API:

      elev.watch().then(() => {
        console.log("[vite-eleventy] Eleventy watch started.");
      });
    },

    configureServer(server) {
      // We need to trigger a reload when Eleventy writes files.
      server.watcher.add(path.resolve(outDir, "**/*.html"));
      server.watcher.on("change", file => {
        if (file.startsWith(path.resolve(outDir)) && file.endsWith(".html")) {
          server.ws.send({ type: "full-reload", path: "*" });
        }
      });

      // Middleware to serve static files from Eleventy's output
      // Registering this BEFORE internal middlewares (by not wrapping in a return function)
      // ensures we catch these requests before Vite's SPA fallback kicks in.
      server.middlewares.use((req, res, next) => {
        if (req.method !== "GET") return next();

        // Normalize URL
        let url = req.url.split("?")[0];

        // Strip pathPrefix if present
        if (pathPrefix !== "/" && url.startsWith(pathPrefix)) {
          url = url.slice(pathPrefix.length - 1); // Keep the leading slash
        }

        // Possible paths to check in order
        const possiblePaths = [];

        if (url.endsWith("/")) {
          possiblePaths.push(url + "index.html");
        } else if (!path.extname(url)) {
          possiblePaths.push(url + ".html");
          possiblePaths.push(url + "/index.html");
        } else {
          possiblePaths.push(url);
        }

        let filePath;
        for (const p of possiblePaths) {
          const tryPath = path.join(path.resolve(outDir), p.replace(/^\//, ""));
          if (fs.existsSync(tryPath) && fs.statSync(tryPath).isFile()) {
            filePath = tryPath;
            break;
          }
        }

        if (filePath) {
          const type = mime.lookup(filePath) || "application/octet-stream";
          res.setHeader("Content-Type", type);

          // We need to inject the Vite client if it's an HTML file
          // so HMR works for the assets Vite IS serving.
          if (filePath.endsWith(".html")) {
            let html = fs.readFileSync(filePath, "utf-8");
            // Inject Vite Client
            html = html.replace(
              "</head>",
              `<script type="module" src="/@vite/client"></script>\n</head>`
            );
            res.end(html);
          } else {
            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
          }
        } else {
          next();
        }
      });
    },
  };
}
