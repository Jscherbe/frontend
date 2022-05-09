const { list } = require("../../template-helpers.js");
module.exports = ({ item }) => {
  const { todo } = item.data;
  if (todo) {
    return `
#### Todos

${ list(todo) }
    `;
  }
}