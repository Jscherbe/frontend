/* eslint-env node */
const path = require("path");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const generalConfiguration = require("./docs-2024/src/eleventy/general-configuration.js");
const eleventySass = require("eleventy-sass");
const themeSassDir = path.resolve(__dirname, "./docs-2024/src/scss");

module.exports = function(eleventyConfig) {

  generalConfiguration(eleventyConfig);
  // Sass setup to add resolve paths and watcher
  eleventyConfig.addWatchTarget(themeSassDir);
  eleventyConfig.addPlugin(eleventySass, {
    sass: {
      loadPaths: [
        themeSassDir,
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