export default function(...sides) {
  const classes = sides.map(side => `captioned-figure--${ side }`).join(" ");
  return `
<figure class="captioned-figure ${ classes }">
  <img 
    src="/assets/placeholder/image-1.jpg" 
    class="captioned-figure__media" 
    alt="Colorful cobblestone City Street"
  >
  <figcaption class="captioned-figure__caption crop-margins">
    Colorful cobblestone City Street
  </figcaption>
</figure>
  `;
}