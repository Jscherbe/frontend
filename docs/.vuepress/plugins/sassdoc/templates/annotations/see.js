const { itemLink } = require("../../helper-templates.js");

// UNFINISHED 
module.exports = ({ item }) => {
  const { see } = item.data;
  if (see) {
    return `
#### See

${ see.map(s => `- ${ itemLink(s) }`) }
    `;
  }
};