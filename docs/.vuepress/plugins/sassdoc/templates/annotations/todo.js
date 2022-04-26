const { list } = require("../../helper-templates.js");
module.exports = ({ item }) => {
  const { todo } = item.data;
  if (todo) {
    return `
#### Todos

${ list(todo) }
    `;
  }
}