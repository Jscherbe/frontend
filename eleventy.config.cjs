const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const eleventySass = require("eleventy-sass");
/* eslint-env node */

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(eleventySass); 
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