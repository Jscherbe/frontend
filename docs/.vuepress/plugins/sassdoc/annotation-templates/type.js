module.exports = ({ item }) => {
  if (item.type) {
    return `
- **type:** \`${ item.type }\`
    `;
  }
}

