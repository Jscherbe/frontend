const utils = require("./utils.js");

module.exports = function(eleventyConfig, userDefaults) {
  
  function navTree(collection, options) {
    const opts = Object.assign({}, userDefaults, options);
    return utils.createTree(collection, opts, this.ctx);
  }
  function navTreeToHtml(tree, ...args) {
    return utils.toHtml(tree, ...args);
  }
  eleventyConfig.addFilter("navTree", navTree);
  eleventyConfig.addFilter("navTreeToHtml", navTreeToHtml);
};