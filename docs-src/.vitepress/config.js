import { defineConfig } from 'vitepress';
import createMenus from "./create-menus.js";

export default defineConfig({
  title: "ULU",
  description: "Modular Sass Theming Library",
  base: "/frontend/",
  outDir: "../docs",
  themeConfig: {
    ...createMenus()
  },
  vite: {
    publicDir: '../dist/' 
  }
});

