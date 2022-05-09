const { propertyTable } = require("../../template-helpers.js");
module.exports = ({ item }) => {
  const { property } = item.data
  if (property) {
    return `
#### Map Properties

${ propertyTable(property) }

    `;
  }
}