const { propertyTable } = require("../../helper-templates.js");
module.exports = ({ item }) => {
  if (item.return) {
    return `
#### Returns

${ propertyTable([ item.return ]) }

    `
  }
}