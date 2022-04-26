const { propertyTable } = require("../../helper-templates.js");
module.exports = ({ item }) => {
  const { property } = item.data
  if (property) {
    return `
#### Map Properties

${ propertyTable(property) }

    `;
  }
}