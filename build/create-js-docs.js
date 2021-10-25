const logger = require("@ulu/node-logger")({ title: "\nJS Docs Parser" });
const documentation = require('documentation');
const toc = require('markdown-toc');
const streamArray = require('stream-array');
const vfs = require('vinyl-fs');
const fs = require('fs');
const parseOptions = { shallow: false };

/**
 * Creates JS docs
 * @param {Object} options 
 * @param {String} options.sources Passed to documentation (npm module) sources (may accept other values)
 * @param {String} options.outputDirHtml 
 * @param {String} options.outputDirMarkdown
 * @param {String} options.title 
 * @param {String} options.description 
 */
module.exports = async function createJsDocs(options) {
  if (options.outputPathMarkdown) {
    await documentation.build(options.sources, parseOptions)
      .then(documentation.formats.md)
      .then(docs => {
        fs.writeFileSync(
          options.outputPathMarkdown, 
          templateMarkdown(options.title, options.description, toc(docs).content, docs)
        );
        logger.log('Built Markdown for ' + options.title);
      });
  }

  // If it had a value the user is choosing to place documents 
  // somewhere other than the global documentation area. If thats
  // not the case we are going to make the path to the global folder
  if (options.outputPathHtml) {
    await documentation.build(options.sources, parseOptions)
      .then(resp => {
        return documentation.formats.html(resp, { 
          theme: "node_modules/documentation-theme-light"
        });
      })
      .then(docs => {
        if (!fs.existsSync(options.outputPathHtml)) {
          fs.mkdirSync(options.outputPathHtml);
        }
        streamArray(docs).pipe(vfs.dest(options.outputPathHtml));
        logger.log('Built HTML for ' + options.title);
        logger.log('Creating global docs index');
      });
  }
};

/**
 *   Markdown File String Template
 *   @param  {string} title
 *   @param  {string} description
 *   @param  {string} toc
 *   @param  {string} docs        The documentation (body)
 *   @return {string}             Markdown File
 */
function templateMarkdown(title, description, toc, docs) {
  const isset = v => v ? v : "";

  return `
# ${ isset(title) }

${ isset(description) }

## Table of Contents

${ isset(toc) }

---

${ isset(docs) }`;
}