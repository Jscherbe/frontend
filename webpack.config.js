// Used for creating the dist versions
const { resolve } = require("path");
const { mixin, merge } = require("@ulu/webpack-mixin");
const { webpackPlugin: docs } = require("./docs-generator/index.js");

module.exports = (env, argv) => {
  return merge(mixin(env, argv), {
    entry: {
      "ulu-frontend.min" : resolve(__dirname, "index.js"),
    },
    devServer: {
      static: {
        directory: resolve(__dirname, 'docs/')
      },
    },
    plugins: [
      docs
    ]
  });
};