const { joinMarkup } = require("../../utils.js");
const { codeBlock, when } = require("../../helper-templates.js");

module.exports = ({ item }) => {
  const { example } = item.data;
  if (example) {
    const $examples = example.map(({ type, description, code }) => {
      return `
${ when(description, description) }      

${ codeBlock(code, type) }
      `
      ;
    });
    return joinMarkup("#### Examples", $examples);
  }
} 