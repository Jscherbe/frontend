const { propertyTable } = require("../helper-templates.js");
module.exports = ({ item }) => {
  if (item.property) {
    return `
#### Map Properties

${ propertyTable(item.property) }

    `;
  }
}