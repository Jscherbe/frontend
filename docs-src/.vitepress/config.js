import { defineConfig } from 'vitepress';
import { resolve } from "path";
import { createTree, toDefaultTheme } from "@ulu/vitepress-auto-menus";

const pages = createTree({ source: resolve(__dirname, "../") });

export default defineConfig({
  title: "ULU",
  description: "Modular Sass Theming Library",
  base: "/frontend/",
  outDir: "../docs",
  themeConfig: {
    ...toDefaultTheme(pages),
  },
  vite: {
    publicDir: '../dist/' 
  }
});