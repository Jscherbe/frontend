module.exports = ({ group }) => {
  const section = type => {  
    if (items.length) {
      return `
  ## ${ type.charAt(0).toUpperCase() + type.slice(0) }

  <SassdocItems by-type="${ type }"/>
  
      `;
    } else {
      return "";
    }
  }
  return `
${ section("Variables", "variables") }
${ section("Mixins", "mixins") }
${ section("Functions", "functions") }
${ section("Placeholders", "placeholders") }

<script>
  export default {
    sassdocGroup: "test"
  }
</script>
  `;
}

