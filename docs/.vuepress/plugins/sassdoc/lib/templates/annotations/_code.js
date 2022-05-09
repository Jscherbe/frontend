const { codeBlock } = require("../../template-helpers.js");
const stripIndent = require("strip-indent");

module.exports = ({ item, options }) => {
  const { type, code, value } = item.data.context;
  let raw = code || value;

  if (options.showSourceCode?.includes(type) && raw) {
    let sourceCode = `{
  ${ stripIndent(raw.trim()) }
}`;
    return codeBlock(sourceCode, "scss");
  }
};