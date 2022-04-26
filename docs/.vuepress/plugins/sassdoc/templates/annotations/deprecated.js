module.exports = ({ item }) => {
  if (item.data.deprecated) {
    return `
::: warning Deprecated
${ item.deprecated }
:::
    `;
  }
}