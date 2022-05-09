const { propertyTable } = require("../../template-helpers.js");
module.exports = ({ item }) => {
  if (item.data.return) {
    return `
#### Returns

${ propertyTable([ item.data.return ]) }

    `;
  }
}