import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";

const __dirname = dirname(fileURLToPath(import.meta.url));

const isUmd = process.env.BUILD_FORMAT === 'umd';

export default defineConfig({
  build: {
    outDir: "dist",
    // We are emptying the directory ourselves since this build runs twice:
    // - Once for es build (different entry)
    // - Once for umd (testing/cdn/includes styles) 
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, isUmd ? "lib/index.js" : "lib/js/index.js"),
      name: "ULU",
      formats: [isUmd ? "umd" : "es"],
      fileName: (format) => `ulu-frontend.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into library
      external: [
        "@floating-ui/dom", 
        "@ulu/utils", 
        "ally.js", 
        "aria-tablist", 
        "swipe-listener"
      ],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          "@floating-ui/dom": "FloatingUIDOM",
          "@ulu/utils": "ULUUtils",
          "ally.js": "ally",
          "aria-tablist": "AriaTablist",
          "swipe-listener": "SwipeListener"
        },
        // Conditionally rename the CSS file for the UMD build
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css' && isUmd) {
            return 'ulu-frontend.min.css';
          }
          return assetInfo.name;
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ],
    },
    preprocessorOptions: {
      scss: {
        loadPaths: [
          resolve(__dirname, "./lib/scss")
        ],
        quietDeps: true,
        api: "modern-compiler"
      }
    },
  },
});