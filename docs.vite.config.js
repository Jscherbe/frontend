import path from "path";
import { defineConfig } from "vite";
import { createConfig } from "@ulu/vite-config-cms-theme";

const { IS_PRODUCTION } = process.env;

console.log("IS_PRODUCTION:\n", IS_PRODUCTION);

export default defineConfig((ctx) => {
  // const isServe = ctx.command === "serve";
  const config = createConfig({
    publicDir: "docs-src/src/static/",
    port: 5173, 
    localOptionsFile: false,
    input: "docs-src/src/main.js",
    outDir: IS_PRODUCTION ? "docs/assets" : "docs-dev/assets",
    origin: "http://localhost:8080", 
    themePath: "/frontend",
    globalJquery: false,
    withLegacy: false,
    withVue: false,
    // watchReloadOptions: [
    //   // "docs-src/src/static/**/*",
    //   // path.resolve(__dirname, "docs-src/src/static/**/*")
    // ],
    alias: {
      "@": path.resolve(__dirname, "docs-src/src/"),
    },
    preprocessorOptions: {
      scss: {
        // Note dart sass uses loadPaths vs includePaths
        loadPaths: [
          path.resolve(__dirname, "./docs-src/src/scss/"),
          path.resolve(__dirname)
        ],
        quietDeps: true,
        api: "modern-compiler"
      }
    },
  })(ctx);

  // Make paths relative for github pages
  config.base = "./";

  return config;
});