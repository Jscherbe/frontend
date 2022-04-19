const { joinMarkup } = require("../../utils.js");
const { codeBlock, when } = require("../../helper-templates.js");

module.exports = ({ item }) => {
  if (item.example) {
    const $examples = item.example.map(({ type, description, code }) => {
      return `
${ when(description, description) }      

${ codeBlock(code, type) }
      `
      ;
    });
    return joinMarkup("#### Examples", $examples);
  }
} 