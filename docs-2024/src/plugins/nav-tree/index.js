import createTree from "./create-tree.js";
import toHtml from "./to-html.js";
import activeTrailOnly from "./active-trail-only.js";

export default function(eleventyConfig, userDefaults) {
  function navTree(collection, options) {
    const opts = Object.assign({}, userDefaults, options);
    return createTree(collection, opts, this.ctx);
  }
  function navTreeToHtml(tree, options) {
    return toHtml(tree, options);
  }
  function navTreeActiveTrailOnly(tree) {
    return activeTrailOnly(tree);
  }
  eleventyConfig.addFilter("navTree", navTree);
  eleventyConfig.addFilter("navTreeActiveTrailOnly", navTreeActiveTrailOnly);
  eleventyConfig.addFilter("navTreeToHtml", navTreeToHtml);
}