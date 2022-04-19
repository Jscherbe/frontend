const { list } = require("../../helper-templates.js");
module.exports = ({ item }) => {
  if (item.todo) {
    return `
#### Todos

${ list(item.todo) }
    `;
  }
}