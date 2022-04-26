const { list, link } = require("../../helper-templates");

module.exports = ({ item }) => {
  const { require: requires } = item.data;
  if (!requires || !requires.length) return;
  const added = [];
  const links = requires.map(req => {
    const markup = link(req.item.$item);
    if (added.includes(markup)) {
      return;
    } else {
      added.push(markup);
      return markup;
    }
  }).filter(l => l);
  return `
#### Require

${ list(links) }
  `;
}