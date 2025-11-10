import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "lib/index.js"),
      formats: ["es"],
      fileName: "frontend-vue",
    },
    rollupOptions: {
      external: [
        "vue", 
        "vue-router",
        "@headlessui/vue",
        "@floating-ui/vue",
        "@fortawesome/vue-fontawesome",
        "gsap",
        "fuse.js",
        "vue3-dropzone",
        "@portabletext/vue",
        "@formkit/auto-animate",
        // Since using deep imports
        /^@ulu\/frontend\/.*/,
        /^@ulu\/utils\/.*/
      ],
    },
  },
});