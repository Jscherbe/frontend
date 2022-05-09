const { titleCase } = require("../../utils.js");

module.exports = ({ sectionName }, markup) => {
  return `
${ sectionName !== "body" ? `## ${ titleCase(sectionName) }` : "" }

${ markup }
  `;
}
