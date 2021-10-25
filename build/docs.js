const { resolve } = require("path");
const sassdoc = require('sassdoc');
const logger = require("@ulu/node-logger")({ title: "\nDocs Plugin" });
const createJsDocs = require("./create-js-docs.js");
const baseDir = process.cwd();
const outputDir = resolve(baseDir, "docs/");

exports.webpackPlugin = {
  apply(compiler) {
    logger.log("Creating sass and js docs...");
    compiler.hooks.done.tapPromise("docsPlugin", () => Promise.all([
      // sassdoc("./scss", {
      //   dest: resolve(outputDir, "scss")
      // }),
      createJsDocs({
        sources: resolve(baseDir, "js/"),
        outputPathHtml: resolve(outputDir, "js/"),
        outputPathMarkdown: resolve(outputDir, "js-markdown/index.md"),
        title: "Javascript Documentation",
        descriptions: "JSDocs for @ulu/frontend library"
      })
    ]));
  }
};


// function outputData(data) {
//   const to = path.resolve(__dirname, "../_trash/sassdoc.json");
//   console.log('to:\n', to);
//   const json = JSON.stringify(data, null, 2);
//   fs.writeFileSync(to, json);
// }