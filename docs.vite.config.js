import path from "path";
import { createConfig } from "@ulu/vite-config-cms-theme";

console.log(path.resolve(__dirname, "docs-2024/src/static/**/*"));

export default createConfig({
  publicDir: "docs-2024/src/static/",
  port: 5173, 
  localOptionsFile: false,
  input: "docs-2024/src/main.js",
  outDir: "docs-2024/dist/assets/",
  origin: "http://localhost:8080", 
  themePath: "",
  globalJquery: false,
  withLegacy: false,
  withVue: false,
  // watchReloadOptions: [
  //   // "docs-2024/src/static/**/*",
  //   // path.resolve(__dirname, "docs-2024/src/static/**/*")
  // ],
  alias: {
    "@": path.resolve(__dirname, "docs-2024/src/"),
  },
  preprocessorOptions: {
    scss: {
      includePaths: [
        path.resolve(__dirname, "./docs-2024/src/scss/"),
        path.resolve(__dirname)
      ],
    }
  },
});