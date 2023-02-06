// Used for creating the dist versions
const path = require("path");
const { mixin, merge } = require("@ulu/webpack-mixin");

module.exports = (env, argv) => {
  const config = mixin(env, argv, {
    relativeOutputDir: "../dist/"
  });
  return merge(config, {
    entry: {
      "ulu-frontend.min" : path.resolve(__dirname, "../index.js"),
    }
  });
};