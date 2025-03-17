export default function(content, title) {
  const markup = content ? content.trim() : null;
  return `
<div class="fullscreen-demo-header container padding-top padding-bottom">
  <h2 class="h2 no-margin">${ title }</h2>
  ${ markup ? 
    `<div class="wysiwyg margin-top">${ markup }</div>` 
  : "" }
</div>
  `;
}