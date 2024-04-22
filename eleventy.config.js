/* eslint-env node */
import path from "path";
import { fileURLToPath } from "url";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
// import generalConfiguration from "./docs-2024/src/eleventy/general-configuration.js";
import navTreePlugin from "./docs-2024/src/plugins/nav-tree/index.js";
// import eleventySass from "eleventy-sass";
import sassPlugin from "./docs-2024/src/plugins/sass/index.js";
import sassdocPlugin from "./docs-2024/src/plugins/sassdoc/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const paths = {
  sassTheme: path.resolve(__dirname, "./docs-2024/src/stylesheet"),
  sassUlu: path.resolve(__dirname, "./scss"),
};

export default async function(eleventyConfig) {
  // const eleventySass = await import("eleventy-sass");
  // console.log("eleventySass:\n", eleventySass);

  // generalConfiguration(eleventyConfig);
  eleventyConfig.addPlugin(sassPlugin, {
    addCwd: true,
    sass: {
      loadPaths: [ 
        paths.sassTheme 
      ],
    }
  }); 
  // eleventyConfig.addWatchTarget(paths.sassUlu);
  eleventyConfig.addWatchTarget(paths.sassTheme);

  eleventyConfig.addPlugin(sassdocPlugin);
  

  // Overwrite asset after like hugo (no needed for anything in specific but added)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin); 
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
