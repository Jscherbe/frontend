export default function(
  ...modifiers
) {
  let mainClass = "overlay-section"
  modifiers.forEach((modifier) => {
    mainClass += ` overlay-section--${ modifier }`
  })
  return `
<div class="${ mainClass }">
  <div class="overlay-section__content crop-margins wysiwyg">
    <h2 class="h2">
      Featured Insight
    </h2>
    <p class="type-large">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur ullamcorper lobortis. Donec sollicitudin ligula lacus, sed tempor sapien rhoncus at. Ut sodales urna ex, quis efficitur risus porttitor nec. Mauris pulvinar eu sapien a euismod. Aliquam mattis dui augue, at venenatis elit porta ac.
    </p>
    <p>
      <a class="button" href="#" rel="nofollow">Read More</a>
    </p>
  </div>
  <div class="overlay-section__background">
    <img src="/assets/placeholder/image-1.jpg" alt="Paris Street"></img>
  </div>
</div>
  `;
}