// Used for creating the dist versions
const { resolve } = require("path");
const { mixin, merge } = require("@ulu/webpack-mixin");

module.exports = (env, argv) => {
  return merge(mixin(env, argv), {
    entry: {
      "ulu-frontend.min" : resolve(__dirname, "index.js"),
    }
  });
};