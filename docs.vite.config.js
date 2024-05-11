import path from "path";
import { createConfig } from "@ulu/vite-config-cms-theme";

export default createConfig({
  publicDir: "docs-src/src/static/",
  port: 5173, 
  localOptionsFile: false,
  input: "docs-src/src/main.js",
  outDir: "docs/assets/",
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
      includePaths: [
        path.resolve(__dirname, "./docs-src/src/scss/"),
        path.resolve(__dirname)
      ],
    }
  },
});