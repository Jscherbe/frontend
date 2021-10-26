const { resolve } = require("path");
const { mixin, merge } = require("@ulu/webpack-mixin");
const { webpackPlugin: docsPlugin } = require("./build/docs.js");

module.exports = (env, argv) => {
  const plugins = [];
  if (env.docs) {
    plugins.push(docsPlugin);
  }
  const config = merge(mixin(env, argv), {
    entry: {
      "ulu-frontend.min" : resolve(__dirname, "index.js"),
    },
    plugins
  });

  // Not proxying just serving the docs folder
  delete config.devServer.proxy;
  const serverConfig = {
    devServer: {
      watchFiles: [
        // "scss/**/*.scss",
        // "**/*.js",
      ],
      static: {
        directory: resolve(__dirname, "docs/"),
        watch: false
      }
    }
  };
  const finalConfig = merge(config, serverConfig);
  // console.log(finalConfig);
  return finalConfig;
};