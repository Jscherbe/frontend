import { defineConfig } from 'vitepress';
import { resolve } from "path";
import { createTree, toDefaultTheme } from "@ulu/vitepress-auto-menus";
import "../../jsdoc";

const pages = createTree({ source: resolve(__dirname, "../") });

export default defineConfig({
  title: "ULU",
  description: "Modules sass theming library",
  base: "/frontend/scss/",
  outDir: "../docs/scss",
  themeConfig: {
    ...toDefaultTheme(pages),
  }
});