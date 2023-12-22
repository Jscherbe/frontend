import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    // target: "es2015",
    // manifest: true,
    minify: true,
    cssMinify: true,
    cssCodeSplit: false,
    outDir: "dist",
    rollupOptions: {
      input: "dist-src/main.js",
      output: {
        entryFileNames: `ulu-frontend.min.js`,
        assetFileNames: `ulu-frontend.min.[ext]`,
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
        includePaths: [resolve(__dirname, `./scss`)],
      },
    },
  },
});