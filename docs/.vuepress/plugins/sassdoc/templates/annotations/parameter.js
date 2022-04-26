
const { propertyTable } = require("../../helper-templates.js");
const config = {
  formatCell: (header, data) => {
    return header === "type" ? `\`${ data }\`` :
           header === "name" && data !== "@content" ? `$${ data }` : 
           data;
  }
}
module.exports = ({ item }) => {
  const { parameter, content } = item.data;
  if (parameter) {
    const rows = [ ...parameter ];
    if (content) {
      rows.push({
        name: "@content",
        type: "content block",
        description: content
      });
    }
    return `
#### Parameters

${ propertyTable(rows, config) }

    `;
  }
}
