export default function(title, element = "h2") {
  return `
<${ element } class="${ element }">${ title }</${ element }>
  `;
}