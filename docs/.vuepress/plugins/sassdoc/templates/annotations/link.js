module.exports = ({ item }) => {
  const { link } = item.data;
  if (link) {
    return `
#### Related Links

${ link.map(l => `- [${ l.caption || l.url }](${ l.url })`).join("\n") }

    `;
  }
}