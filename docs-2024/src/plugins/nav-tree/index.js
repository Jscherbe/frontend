import { createTree, toHtml } from "./utils.js";

export default function(eleventyConfig, userDefaults) {
  
  function navTree(collection, options) {
    const opts = Object.assign({}, userDefaults, options);
    return createTree(collection, opts, this.ctx);
  }
  function navTreeToHtml(tree, ...args) {
    return toHtml(tree, ...args);
  }
  eleventyConfig.addFilter("navTree", navTree);
  eleventyConfig.addFilter("navTreeToHtml", navTreeToHtml);
}