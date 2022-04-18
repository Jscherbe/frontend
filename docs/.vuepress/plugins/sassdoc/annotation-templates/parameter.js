
const { propertyTable } = require("../helper-templates.js");
const config = {
  formatCell: (header, data) => {
    return header === "type" ? `\`${ data }\`` :
           header === "name" && data !== "@content" ? `$${ data }` : 
           data;
  }
}
module.exports = ({ item, options }) => {
  const { parameter, content } = item;
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

    `
  }
}


// if (type === "variable") {

  // }
  // $codeBlocks = [
  //   vuepressCodeBlock(`${ options.displayItemPath(item.file.path) }` , "txt", "File Location"),
  // ];
  // const { code, value, line } = item.context;

//   const addLines = markup => `
// // ${ line.start }
// ${ markup }
// // ${ line.end }
//   `;
  // if (code) {
  //   $codeBlocks.push(vuepressCodeBlock(addLines(`{ ${ code } }`), "scss", "Code From File"));
  // }
  // if (value) {
  //   $codeBlocks.push(vuepressCodeBlock(addLines(value), "scss", "SCSS"));
  // }
