const { when } = require("../../helper-templates.js");

module.exports = ({ item, options, data }) => {
  const { context, file, author, commentRange } = item.data;
  const { line, type } = context;
  const filePath = options.displayFilePath(file.path);
  return `
<SassdocDetails summary="Meta Information">

- **File:** ${ filePath }
- **Group:** ${ item.groupName }
- **Type:** ${ type }
${ when(commentRange, `- **Lines (comment range):** ${ commentRange.start }-${ commentRange.end }`) }
${ when(line, `- **Lines (code):** ${ line.start }-${ line.end }`) }
${ when(author, `- **Author:** ${ author }`) }

</SassdocDetails>
  `;
}