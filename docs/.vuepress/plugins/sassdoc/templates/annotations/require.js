// const { joinMarkup } = require("../../utils.js");
const { list } = require("../../helper-templates");

module.exports = ({ item }) => {
  const { require: requires } = item.data;
  if (!requires || !requires.length) return;
  const added = [];
  const links = requires.map(req => {
    const { path, title } = req.item.$item;
    const link = `[${ title }](${ path })`;
    if (added.includes(link)) {
      return;
    } else {
      added.push(link);
      return  link;
    }
  }).filter(l => l);
  return `
#### Require

${ list(links) }
  `;
}