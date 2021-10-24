// This is just the test of the mixin
const path = require("path");
const { mixin, merge } = require("@ulu/webpack-mixin");
const { webpackPlugin: docsPlugin } = require("./build/docs.js");

module.exports = (env, argv) => {
  const base = mixin(env, argv, { relativeEntryDir: "build/" });
  const config = merge(base, {
    entry: {
      "ulu-frontend.min" : path.resolve(__dirname, "build/dist.js"),
    },
    plugins: [ docsPlugin ]
  });
  return config;
};