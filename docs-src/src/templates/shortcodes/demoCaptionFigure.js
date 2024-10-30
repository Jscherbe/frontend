export default function(...sides) {
  const classes = sides.map(side => `captioned-figure--${ side }`).join(" ");
  return `
<figure class="captioned-figure ${ classes }">
  <img 
    src="/assets/placeholder/image-1.jpg" 
    alt="Colorful cobblestone City Street"
  >
  <figcaption class="captioned-figure__caption">
    Colorful cobblestone City Street, caption with a lot of text to see what happens when lines wrap
  </figcaption>
</figure>
  `;
}