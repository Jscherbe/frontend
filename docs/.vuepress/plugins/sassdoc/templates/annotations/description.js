module.exports = ({ item }) => {
  if (item.description) {
    return `
${ item.description }    
    `;
  }
}