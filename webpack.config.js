const { resolve } = require("path");
const { mixin, merge } = require("@ulu/webpack-mixin");
const { webpackPlugin: docsPlugin } = require("./build/docs.js");

module.exports = (env, argv) => {
  const plugins = [];
  if (env.docs) {
    plugins.push(docsPlugin);
  }
  return merge(mixin(env, argv), {
    entry: {
      "ulu-frontend.min" : resolve(__dirname, "index.js"),
    },
    plugins
  });
};