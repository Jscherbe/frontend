/* eslint-env node */
const path = require("path");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const eleventySass = require("eleventy-sass");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(eleventySass, {
    sass: {
      loadPaths: [
        path.resolve(__dirname, "./docs-2024/src/scss"),
        path.resolve(__dirname),
      ],
    }
  }); 
  // Overwrite asset after like hugo (no needed for anything in specific but added)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin); 
  return {
    dir: {
      input: "docs-2024/public",
      includes: "../src/includes",
      layouts: "../src/layouts",
      data: "../src/data",
      output: "docs-2024/dist",
    }
  };
};