import { createConfig } from "@ulu/vite-config-cms-theme";
import common from "./docs.common.config.js";

export default createConfig({
  // cwd: common.paths.docs,
  port: common.viteServerPort, 
  localOptionsFile: false,
  // stylesOnly: false,
  input: "docs-2024/src/main.js",
  origin: common.eleventyOrigin, 
  publicDir: "docs-2024/src/static/",
  outDir: "docs-2024/dist/assets/",
  themePath: "",
  // globalJquery: false,
  // withLegacy: false,
  // withVue: false,
  // withWatchReload: true,
  // withImageOptimizer: false,
  // watchReloadOptions: false,
  // alias: {
  //   "@": common.paths.src,
  // },
  preprocessorOptions: {
    scss: {
      includePaths: [
        common.paths.sassThemeDir,
        common.paths.projectDir
      ],
    }
  },
});