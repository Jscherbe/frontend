const { joinMarkup } = require("../utils.js");

module.exports = ({ item }) => {
  if (item.deprecated) {
    return `
::: warning Deprecated
${ item.deprecated }
:::
    `;
  }
}