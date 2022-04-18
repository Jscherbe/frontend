const { joinMarkup, titleCase } = require("./utils.js");

function when(condition, value) {
  return condition ? value : "";
}
function list(array, callback = i => i) {
  return array.map(item => `- ${ callback(item) }`).join("\n");
}
function prefixedItemName(type, name) {
  const types = {
    "variable" : "$",
    "placeholder" : "%",
    "mixin" : "@mixin ",
    "function" : "@function "
  };
  return (types[type] || "") + name;
}
function propertyTableKeys(array) {
  const keys = Object.keys(array[0]);
  const toFront = text => {
    const index = keys.findIndex(i => i === text);
    if (index !== -1) {
      keys.splice(index, 1);
      keys.unshift(text);
    } 
  }
  toFront("type");
  toFront("name");
  return keys;
}
function propertyTable(array, options) {
  if (!array || !array.length) return;
  const opts = Object.assign({}, {
    keys: null,
    formatHeader: titleCase,
    formatCell: (key, data) => key === "type" ? `\`${ data }\`` : data
  }, options);
  const joinRow = cols => "|" + cols.join("|");
  
  const keys = opts.keys || propertyTableKeys(array);
  const $header = [ joinRow(keys.map(opts.formatHeader)) ];
  const $divider = [ joinRow(keys.map(() => ":--")) ];
  const $rows = array.map(obj => 
    joinRow(keys.map(key => opts.formatCell(key, obj[key])))
  );
  return joinMarkup($header, $divider, $rows);
}

function codeBlock(markup, type) {
  return `
\`\`\` ${ type }
${ markup }
\`\`\`
  `;
}
function vuepressCodeBlock(markup, type, title) {
  return `
<code-block title="${ title }">
${ codeBlock(markup, type, title) }
</code-block>
  `;
}
function vuepressBadge(text, type = "tip", vertical = "top") {
  return `<badge text="${ text }" type="${ type }" vertical="${ vertical }" />`;
}
function vuepressCodeGroup(markup) {
  return `
<code-group>
${ markup }
</code-group>
  `;
}

module.exports = { 
  when,
  list,
  codeBlock, 
  vuepressCodeBlock, 
  vuepressCodeGroup,
  prefixedItemName,
  propertyTable,
  vuepressBadge
};