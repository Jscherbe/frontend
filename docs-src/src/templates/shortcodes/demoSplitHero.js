export default function(title, ...modifiers) {
  const classes = modifiers.map(m => `split-hero--${ m }`).join(" ");
  return `
<section class="split-hero ${ classes }">
  <div class="split-hero__content">
    <div class="split-hero__content-inner container-small crop-margins">
      <h2 class="h1">${ title }</h2>
      <p class="type-large type-light">
        This is an example lead-in sentence. Lorem ipsum et depsi anu. Vestibulum vitae quam in velit scelerisque tincidunt et vitae mauris.
      </p>
    </div>
  </div>
  <div class="split-hero__graphic">
    <img 
      class="split-hero__graphic-media" 
      src="/assets/placeholder/image-1.jpg" 
      alt="colorful street"
    >
  </div>
</section>
  `;
}