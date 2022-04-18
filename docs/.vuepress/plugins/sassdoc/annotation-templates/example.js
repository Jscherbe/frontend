const { joinMarkup } = require("../utils.js");
const { codeBlock } = require("../helper-templates.js");

module.exports = ({ item, options }) => {
  if (item.example) {
    const $examples = item.example.map(({ type, description, code }, index) => {
      
      const $markup = [ description ];
      if (options.previewEnabled && type === "html") {
        $markup.push(previewTemplate(item._uid, index) );
      }
      $markup.push(codeBlock(code, type));
      return joinMarkup($markup);
    });
    return joinMarkup("#### Examples", $examples);
  }
} 

function previewTemplate(uid, exampleIndex) {
  return `

<SassdocPreview uid="${ uid }" :exampleIndex="${ exampleIndex }"  />

  `;
}