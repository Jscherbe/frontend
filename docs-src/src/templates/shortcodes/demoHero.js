export default function(title, lightImage, ...modifiers) {
  const classes = modifiers.map(m => `hero--${ m }`).join(" ");
  return `
<section class="hero ${ classes }">
  <div class="hero__content">
    <div class="hero__content-container container-large">
      <div class="hero__content-inner">
        <h2 class="h1">${ title }</h2>
        <p class="type-large type-light">
          This is an example lead-in sentence. Lorem ipsum et depsi anu. Vestibulum vitae quam in velit scelerisque tincidunt et vitae mauris.
        </p>
      </div>
    </div>
  </div>
  <div class="hero__graphic">
    <img 
      class="hero__graphic-media" 
      src="/assets/placeholder/image-1${ lightImage ? "-lightened" : "" }.jpg" 
      alt="colorful street"
    >
  </div>
</section>
  `;
}