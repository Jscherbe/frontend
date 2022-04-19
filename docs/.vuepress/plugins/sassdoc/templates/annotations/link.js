module.exports = ({ item }) => {
  const { link } = item;
  if (!link) return;
  return `
#### Related Links

${ link.map(l => `- [${ l.caption || l.url }](${ l.url })`).join("\n") }

  `
}