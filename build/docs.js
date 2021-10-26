const { resolve } = require("path");
const sassdoc = require('sassdoc');
const logger = require("@ulu/node-logger")({ title: "\nDocs Plugin" });
const createJsDocs = require("./create-js-docs.js");
const baseDir = process.cwd();
const outputDir = resolve(baseDir, "docs/");

exports.webpackPlugin = {
  apply(compiler) {
    logger.log("Creating sass and js docs...");

    // Ensure webpack always recompiles each time anything changes (rebuilding docs)
    // - Could make it so that this happens if webpack doesn't compile but this should work with it for now
    // compiler.hooks.afterCompilation.tap("docsPlugin-watch-list", ({ contextDependencies }) => {
    //   contextDependencies.add(resolve(baseDir, "scss/"));
    //   contextDependencies.add(resolve(baseDir, "js/"));
    // });
    // Rebuild docs each time a 
    compiler.hooks.afterCompile.tapPromise("docsPlugin", ({contextDependencies}) => {
      // contextDependencies.add(resolve(baseDir, "scss/"));
      // contextDependencies.add(resolve(baseDir, "js/"));
      return Promise.all([
        sassdoc("./scss", {
          dest: resolve(outputDir, "scss")
        }),
        createJsDocs({
          sources: resolve(baseDir, "js/"),
          outputPathHtml: resolve(outputDir, "js/"),
          outputPathMarkdown: resolve(outputDir, "js-markdown/index.md"),
          title: "Javascript Documentation",
          descriptions: "JSDocs for @ulu/frontend library"
        })
      ]);
    });
  }
};


// function outputData(data) {
//   const to = path.resolve(__dirname, "../_trash/sassdoc.json");
//   console.log('to:\n', to);
//   const json = JSON.stringify(data, null, 2);
//   fs.writeFileSync(to, json);
// }