module.exports = (_, data) => {
  return `
<script>
console.log(${ JSON.stringify(data) });
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