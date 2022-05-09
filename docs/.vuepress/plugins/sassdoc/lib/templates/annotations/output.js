module.exports = ({ item }) => {
  const { output } = item.data;
  if (output) {
    return `
#### Mixin Output

${ output }

    `
  }
}