module.exports = ({ data, debug }) => {
  return `

<script>
console.log(${ JSON.stringify(debug) });
const sassdocGroup = ${ JSON.stringify(data) };
export default {
  sassdocGroup,
  provide: {
    getSassdocItem(uid) {
      return sassdocGroup.find(item => item._uid === uid);
    },
    getSassdocGroup() {
      return sassdocGroup;
    }
  }
}
</script> 
  `;
}