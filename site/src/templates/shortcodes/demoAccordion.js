export default function(content, title) {
  const markup = content ? content.trim() : null;
  return `
<details class="accordion">
  <summary class="accordion__summary">
    ${ title }
    <!-- The span is the icon on the side that -->
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--plus-to-minus"></span>
    </span>
  </summary>
  <div class="accordion__content">
    ${markup}
  </div>
</details>
  `;
}