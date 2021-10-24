const fs = require("fs");
const path = require("path");
const sassdoc = require('sassdoc');
const logger = require("@ulu/node-logger")({ title: "\nDocs Plugin" });

exports.webpackPlugin = {
  apply(compiler) {
    compiler.hooks.done.tapPromise("docsPlugin", createSite);
  }
}

async function createSite() {
  logger.log("Creating sassdocs site...");
  return sassdoc.parse("./scss", { verbose: false })
    .then(data => {
      logger.log("Successfully parsed SASS...");
      outputData(data);
    }).catch(err => logger.error(err));
  
}


function outputData(data) {
  const to = path.resolve(__dirname, "../_trash/sassdoc.json");
  console.log('to:\n', to);
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(to, json);
}