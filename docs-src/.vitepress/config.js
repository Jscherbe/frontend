import { defineConfig } from 'vitepress';
import { resolve } from "path";
import { createTree, toDefaultTheme } from "@ulu/vitepress-auto-menus";

const pages = createTree({ source: resolve(__dirname, "../") });

export default defineConfig({
  title: "ULU",
  description: "Modules sass theming library",
  base: "/frontend/",
  outDir: "../docs",
  themeConfig: {
    ...toDefaultTheme(pages),
  }
});