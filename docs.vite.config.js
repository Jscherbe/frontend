import path from "path";
import { createConfig } from "@ulu/vite-config-cms-theme";

export default createConfig({
  publicDir: "docs-src/src/static/",
  port: 5173, 
  localOptionsFile: false,
  input: "docs-src/src/main.js",
  outDir: "docs-dist-temp/assets/",
  origin: "http://localhost:8080", 
  themePath: "",
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
});