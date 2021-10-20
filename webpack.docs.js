const sassdoc = require('sassdoc');
const logger = require("@ulu/node-logger")({
  title: "\nDocs Plugin"
});

exports.docsPlugin = {
  apply(compiler) {
    compiler.hooks.done.tap("docsPlugin", (compilation, callback) => {
      logger.log("Creating sassdocs site…")
      sassdoc("./scss", {
        dest: "./docs/scss",
        verbose: true
      }).then(() => {
        logger.log("Finished building docs");
      }).catch(err => {
        logger.error(err);
      });
    });
  }
}