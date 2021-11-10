const { resolve } = require("path");
const SiteGenerator = require("./generator/index.js");
const dirs = {
  pages: resolve(__dirname, "pages/"),
  templates: resolve(__dirname, "templates/")
};

exports.build = async function build() {
  const site = new SiteGenerator({
    context: resolve(__dirname),
  });
  // site.addTemplates("")
  await site.create();
  // await site.create();
};

exports.webpackPlugin = {
  apply({ hooks }) {
    hooks.afterCompile.tapPromise("docsPlugin", build);
  }
};

