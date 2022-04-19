const { titleCase } = require("../utils.js");

module.exports = ({ sectionName }, markup) => {
  return `
## ${ titleCase(sectionName) }

${ markup }
  `;
}
