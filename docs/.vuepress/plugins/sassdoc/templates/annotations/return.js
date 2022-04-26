const { propertyTable } = require("../../helper-templates.js");
module.exports = ({ item }) => {
  if (item.data.return) {
    return `
#### Returns

${ propertyTable([ item.data.return ]) }

    `;
  }
}