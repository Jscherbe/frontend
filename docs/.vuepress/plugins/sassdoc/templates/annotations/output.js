module.exports = ({ item }) => {
  if (item.output) {
    return `
#### Mixin Output

${ item.output }

    `
  }
}