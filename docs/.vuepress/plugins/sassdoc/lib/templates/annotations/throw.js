const { list } = require("../../template-helpers.js");
module.exports = ({ item }) => {
  if (item.data.throw) {
    return `
#### Throw

${ list(item.data.throw) }
    `;
  }
}