/* eslint-env node */
const path = require("path");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const generalConfiguration = require("./docs-2024/src/eleventy/general-configuration.js");
const collectionMenuTree = require("./docs-2024/src/plugins/nav-tree/index.js");
const eleventySass = require("eleventy-sass");
const themeSassDir = path.resolve(__dirname, "./docs-2024/src/scss");

module.exports = function(eleventyConfig) {

  generalConfiguration(eleventyConfig);
  // Sass setup to add resolve paths and watcher
  eleventyConfig.addWatchTarget(themeSassDir);
  eleventyConfig.addPlugin(eleventySass, {
    compileOptions: {
      // Needed for watching to work on older computer
      cache: false,
    },
    sass: {
      loadPaths: [
        themeSassDir,
        path.resolve(__dirname),
      ],
    }
  }); 
  

  // Overwrite asset after like hugo (no needed for anything in specific but added)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin); 
  eleventyConfig.addPlugin(collectionMenuTree); 

  eleventyConfig.addFilter("autoMenu", collectionMenuTree.filter);
  
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
