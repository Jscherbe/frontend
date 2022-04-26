const { joinMarkup } = require("../../utils.js");

module.exports = ({ item, options }) => {
  const { uid } = item;

  const previews = item.data?.example
    ?.map((example, index) => ({ example, index }))
    .filter(i => options.previewTypes.includes(i.example.type));

  if (previews && previews.length) {
    return joinMarkup(
      previews.map(({ index }) => {
        return  `<SassdocPreview uid="${ uid }" :exampleIndex="${ index }" />`;
      })
    );
  }
}