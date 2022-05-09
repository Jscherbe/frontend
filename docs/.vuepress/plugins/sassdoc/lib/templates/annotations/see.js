const { list, link } = require("../../template-helpers");

module.exports = ({ item }) => {
  const { see } = item.data;
  if (!see || !see.length) return;
  const links = see.map(item => link(item.$item));
  return `
#### See

${ list(links) }
  `;
}