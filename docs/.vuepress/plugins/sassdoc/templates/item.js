const { when } = require("../helper-templates.js");

module.exports = ({ item, options }, markup) => {
  const { context, file, author } = item;
  const { line } = context;
  const filePath = options.displayItemPath(file.path);
  return `

${ markup }

::: details More Info

- **File:** ${ filePath }
${ when(line,   `- **Lines:** ${ line.start }-${ line.end }`) }
${ when(author, `- **Author:** ${ author }`) }

:::

  `;
}