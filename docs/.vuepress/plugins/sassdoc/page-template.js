module.exports = ({ group }) => {
  const printSection = type => {  
    if (group[type].length) {
      return `
## ${ type.charAt(0).toUpperCase() + type.slice(1) }

<SassdocSection 
  :items="$options.sassdocGroup.${ type }" 
  item-type="${ type }"
/>
  
      `;
    } else {
      return "";
    }
  }

  // - Print out all sections by type (here so that vuepress will pick up headlines)
  // - Add the script tag to the markdown file to inline the data for the group
  //   * This way we can use Vue to create the templates for the actual sassdoc items
  //   * This way if this ever needs to be ported to another app (ie. no longer 
  //      using vuepress, etc), the script can be easily refactored and 
  //      used in other vue app
  //   * The data has been made JSON safe, all references have been deleted 
  //     - So we can output it as non-reactive $options property as a Javascript object
  //   * The following data will be used by the provided SassdocItems component(s)
  return `
${ printSection("variables") }
${ printSection("mixins") }
${ printSection("functions") }
${ printSection("placeholders") }

<script>
export default {
  sassdocGroup: ${ JSON.stringify(group) },
}
</script>
  `;
}