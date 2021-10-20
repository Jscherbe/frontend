// This is just the test of the mixin
const path = require("path");
const { mixin, merge } = require("@ulu/webpack-mixin");
const { docsPlugin } = require("./webpack.docs.js");

module.exports = (env, argv) => {
  const base = mixin(env, argv, {
    relativeEntryDir: ""
  });
  const overrides = {
    entry: path.resolve(__dirname, "docs.js"),
    plugins: [
      docsPlugin
    ]
  };
  return merge(base, overrides);
};