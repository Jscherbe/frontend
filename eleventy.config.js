/* eslint-env node */
import path from "path";
import { fileURLToPath } from "url";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import navTreePlugin from "./docs-2024/src/plugins/nav-tree/index.js";
import sassPlugin from "./docs-2024/src/plugins/sass/index.js";
import sassdocPlugin from "./docs-2024/src/plugins/sassdoc/index.js";
import markdownItAttrs from "markdown-it-attrs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const paths = {
  sassTheme: path.resolve(__dirname, "./docs-2024/src/stylesheet"),
  sassUlu: path.resolve(__dirname, "./scss"),
};

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.amendLibrary("md", md => md.use(markdownItAttrs));
  eleventyConfig.addPlugin(sassPlugin, {
    addCwd: true,
    sass: {
      loadPaths: [ paths.sassTheme ],
    }
  }); 
  eleventyConfig.addWatchTarget(paths.sassTheme);
  eleventyConfig.addPlugin(sassdocPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);  // Overwrite asset paths like hugo
  eleventyConfig.addPlugin(navTreePlugin); 
  
  return {
    dir: {
      input: "docs-2024/public",
      output: "docs-2024/dist",
      includes: "../src/templates",
      layouts: "../src/templates/layouts",
      data: "../src/data",
    }
  };
};
