const { list } = require("../../template-helpers.js");

module.exports = ({ item }) => {
  const { since } = item.data;
  if (since) {
    return `
#### Since

${ list(since, s => `\`${ s.version }\` - ${ s.description }`) }

    `;
  }
}