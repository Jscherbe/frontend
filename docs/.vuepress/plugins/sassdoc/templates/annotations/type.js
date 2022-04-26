module.exports = ({ item }) => {
  const { type } = item.data;
  if (type) {
    return `
**type:** \`${ type }\`
    `;
  }
}

