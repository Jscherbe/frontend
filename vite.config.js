import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, 'js/index.js'),
      name: 'ULU',
      formats: ['es', 'umd'],
      fileName: (format) => `ulu-frontend.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['@floating-ui/dom', '@ulu/utils', 'ally.js', 'aria-tablist', 'swipe-listener'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@floating-ui/dom': 'FloatingUIDOM',
          '@ulu/utils': 'ULUUtils',
          'ally.js': 'ally',
          'aria-tablist': 'AriaTablist',
          'swipe-listener': 'SwipeListener'
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
        // Note dart sass uses loadPaths vs includePaths
        loadPaths: [
          resolve(__dirname, "./scss")
        ],
        quietDeps: true,
        api: "modern-compiler"
      }
    },
  },
});