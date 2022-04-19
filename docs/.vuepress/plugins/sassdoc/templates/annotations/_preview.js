const { joinMarkup } = require("../../utils.js");

module.exports = ({ item, options }) => {
  const { _uid } = item;

  const previews = item?.example
    ?.map((example, index) => ({ example, index }))
    .filter(i => options.previewTypes.includes(i.example.type));

  if (previews && previews.length) {
    return joinMarkup(
      previews.map(({ index }) => {
        return  `<SassdocPreview uid="${ _uid }" :exampleIndex="${ index }" />`;
      })
    );
  }
}