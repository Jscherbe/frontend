---
title: Accordion
layout: default
intro: Accordions are...

---
## Examples

<p>Accordions are stylings given to the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details" target="_blank">&lt;details> element</a> or headless UI's <a href="https://headlessui.com/v1/vue/disclosure">Disclosure Vue Component</a>.</p>

<div class="css-icon css-icon--angle-right"></div>

```html
<details class="accordion">
  <summary class="accordion__summary">
    The summary is what is seen before opening the details
   <!-- The span is the icon on the side that -->
    <span class="accordion__icon" aria-hidden="true"></span>
  </summary>
  <div class="accordion__content">
    The content is the information that is seen after you open the details
  </div>
</details>
```

<details class="accordion">
  <summary class="accordion__summary">
    This is an example Title without open/close icons
    <!-- <span class="accordion__icon" aria-hidden="true"></span> -->
  </summary>
  <div class="accordion__content">
    This is an example of simple content. It appears as a paragraph block. The rest of this is unimportant filler. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere sem ac neque rhoncus lacinia. Suspendisse ornare enim in ultrices egestas. Curabitur metus diam, cursus et pulvinar eu, condimentum quis dolor. Duis commodo metus eros, sed porttitor risus imperdiet sed. Sed vitae leo feugiat sapien imperdiet pretium. Sed finibus consectetur porta. Praesent nec sem ornare justo vehicula faucibus et vitae nulla. Donec aliquet sed massa interdum feugiat.
  </div>
</details>
<details class="accordion">
  <summary class="accordion__summary">
    This is an example title with long content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere sem ac neque rhoncus lacinia. Suspendisse ornare enim in ultrices egestas. Curabitur metus diam, cursus et pulvinar eu, condimentum quis dolor. Duis commodo metus eros, sed porttitor risus imperdiet sed. Sed vitae leo feugiat sapien imperdiet pretium. Sed finibus consectetur porta. Praesent nec sem ornare justo vehicula faucibus et vitae nulla. Donec aliquet sed massa interdum feugiat. Sed non scelerisque magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque non rutrum libero. Maecenas volutpat, lectus a finibus molestie, leo tellus accumsan quam, in mattis diam metus sed felis. Mauris nisi sem, molestie id elit in, hendrerit tincidunt tortor. Donec quis mauris ac dolor hendrerit placerat. Integer placerat scelerisque feugiat.
    <span class="accordion__icon" aria-hidden="true"></span>
  </summary>
  <div class="accordion__content">
    This is the content
  </div>
</details>
<details class="accordion">
  <summary class="accordion__summary">
    This is an example Title
    <span class="accordion__icon" aria-hidden="true"></span>
  </summary>
  <div class="accordion__content">
      <p>You can put multiple paragraphs in these as well. Break up the content with &lt;div> or &lt;p> elements.</p>
      <p>Duis commodo metus eros, sed porttitor risus imperdiet sed. Sed vitae leo feugiat sapien imperdiet pretium. Sed finibus consectetur porta. Praesent nec sem ornare justo vehicula faucibus et vitae nulla. Donec aliquet sed massa interdum feugiat. Sed non scelerisque magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque non rutrum libero. Maecenas volutpat, lectus a finibus molestie, leo tellus accumsan quam, in mattis diam metus sed felis. Mauris nisi sem, molestie id elit in, hendrerit tincidunt tortor. Donec quis mauris ac dolor hendrerit placerat. Integer placerat scelerisque feugiat.</p>
      <p>Duis commodo metus eros, sed porttitor risus imperdiet sed. Sed vitae leo feugiat sapien imperdiet pretium. Sed finibus consectetur porta. Praesent nec sem ornare justo vehicula faucibus et vitae nulla. Donec aliquet sed massa interdum feugiat. Sed non scelerisque magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque non rutrum libero. Maecenas volutpat, lectus a finibus molestie, leo tellus accumsan quam, in mattis diam metus sed felis. Mauris nisi sem, molestie id elit in, hendrerit tincidunt tortor. Donec quis mauris ac dolor hendrerit placerat. Integer placerat scelerisque feugiat.</p>
  </div>
</details>

### 