import createTree from "./create-tree.js";
import toHtml from "./to-html.js";
import activeTrailOnly from "./active-trail-only.js";

const defaults = {
  createTree: {},
  toHtml: {}
};

export default function(eleventyConfig, userDefaults) {
  const pluginOptions = Object.assign({}, defaults, userDefaults);
  function navTree(collection, options) {
    const opts = Object.assign({}, pluginOptions.createTree, options);
    return createTree(collection, opts, this.ctx);
  }
  function navTreeToHtml(tree, options) {
    const opts = Object.assign({}, pluginOptions.toHtml, options);
    return toHtml(tree, opts);
  }
  function navTreeActiveTrailOnly(tree) {
    return activeTrailOnly(tree);
  }
  eleventyConfig.addFilter("navTree", navTree);
  eleventyConfig.addFilter("navTreeActiveTrailOnly", navTreeActiveTrailOnly);
  eleventyConfig.addFilter("navTreeToHtml", navTreeToHtml);
}