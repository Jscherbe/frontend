const { list } = require("../../helper-templates.js");
module.exports = ({ item }) => {
  if (item.since) {
    return `
#### Since

${ list(item.since, s => `\`${ s.version }\` - ${ s.description }`) }

    `;
  }
}