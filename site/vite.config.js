import path from "path";
import { defineConfig } from "vite";
import { getUrlDirname } from "@ulu/utils/node/path.js";
import { createConfig } from "@ulu/vite-config-cms-theme";
import eleventyPlugin from "../vite-plugin-eleventy/index.js";

const { IS_PRODUCTION } = process.env;
console.log("IS_PRODUCTION:\n", IS_PRODUCTION);

const __dirname = getUrlDirname(import.meta.url);
const libDir = path.resolve(__dirname, "../lib/");

export default defineConfig((ctx) => {
  // const isServe = ctx.command === "serve";
  const config = createConfig({
    publicDir: "site/src/static",
    port: 5173, 
    localOptionsFile: false,
    input: "site/src/main.js",
    outDir: IS_PRODUCTION ? "docs/assets" : "site/dist/assets",
    origin: "http://localhost:8080", 
    themePath: "/frontend",
    globalJquery: false,
    withLegacy: false,
    withVue: false,
    // watchReloadOptions: [
    //   // "site/static/**/*",
    //   // path.resolve(__dirname, "site/static/**/*")
    // ],
    alias: {
      // For JS, to test the public API from the entry point
      // "@ulu/frontend" : path.resolve(__dirname, "../lib/js/index.js"),

      // For SCSS, to access the source files
      // "@ulu/scss" : path.resolve(__dirname, "../lib/scss/"),

      // Optional: A general alias for the docs source itself
      "@": __dirname,
      "@Lib": libDir
    },
    preprocessorOptions: {
      scss: {
        // Note dart sass uses loadPaths vs includePaths
        loadPaths: [
          path.resolve(__dirname, "src/scss/"),
          libDir
        ],
        quietDeps: true,
        api: "modern-compiler"
      }
    },
  })(ctx);

  const isServe = ctx.command === "serve";

  // Make paths relative for github pages
  // config.base = "./";

  // Disable tree shaking for docs site build
  // - Since the package does tree shaking for everything it removes all code 
  //   in docs build 
  config.build.rollupOptions.treeshake = false;

  if (isServe) {
    config.plugins = config.plugins || [];
    config.plugins.push(eleventyPlugin({
      configPath: path.resolve(__dirname, "eleventy.js"),
      pathPrefix: "/frontend/",
      publicPath: "/"
    }));
  }

  return config;
});