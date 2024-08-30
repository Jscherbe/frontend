export default function(
  title = "test title", 
  description = "This is the description"
) {
  return `
<li class="tile-grid__item">
  <a 
    class="tile-button button" 
    href="#"
  >
    <span class="tile-button__row">
      <strong>${ title }</strong>
    </span>
    <span class="tile-button__row tile-button__row--description">
      ${ description }
    </span>
  </a> 
</li> 
  `;
}