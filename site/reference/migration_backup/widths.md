---
title: Widths
layout: unformatted
intro: Helper classes for enforcing standardized widths and max-widths across layouts.
---

<p>The <code>.width-*</code> and <code>.max-width-*</code> utility classes allow you to quickly constrain element dimensions using predefined layout configurations. By default, these utilities are available in <code>small</code>, <code>medium</code>, and <code>large</code> sizes.</p>

<h2 class="h2">Fixed Width Utilities</h2>
<p>These classes enforce a strict <code>width</code> property on an element. Use them carefully, as fixed widths can cause overflow issues on smaller screens if not properly managed.</p>

{% CodePreview %}

<div class="demo-grid-container margin-bottom">
  <div class="demo-grid__content width-icon">
    <img alt="" src="/assets/placeholder/graphic-icon-small-bulb.svg">
  </div>
</div>

<div class="demo-grid-container margin-bottom">
  <div class="demo-grid__content width-icon">
    <span class="fas fa-circle-info" aria-hidden="true"></span>
  </div>
</div>

<div class="demo-grid-container margin-bottom">
  <div class="demo-grid__content width-small-x">
    <p class="text-center no-margin">small-x</p>
  </div>
</div>

<div class="demo-grid-container margin-bottom">
  <div class="demo-grid__content width-small">
    <p class="text-center no-margin">small</p>
  </div>
</div>

<div class="demo-grid-container margin-bottom">
  <div class="demo-grid__content width-medium">
    <p class="text-center no-margin">medium</p>
  </div>
</div>

<div class="demo-grid-container margin-bottom">
  <div class="demo-grid__content width-large">
    <p class="text-center no-margin">large</p>
  </div>
</div>
{% endCodePreview %}

<h2 class="h2">Max-Width Utilities</h2>
<p>These classes enforce a <code>max-width</code> property. They are much safer for responsive design because the element will still shrink fluidly to fit smaller viewports. They are often used in combination with <code>margin-auto</code> to create centered layout blocks.</p>

{% CodePreview %}
<div class="demo-grid-container margin-bottom">
  <div class="demo-grid__content max-width-small margin-auto">
    <p class="text-center no-margin">width-small (centered)</p>
  </div>
</div>

<div class="demo-grid-container margin-bottom">
  <div class="demo-grid__content max-width-medium margin-auto">
    <p class="text-center no-margin">width-medium (centered)</p>
  </div>
</div>

<div class="demo-grid-container margin-bottom">
  <div class="demo-grid__content max-width-large margin-auto">
    <p class="text-center no-margin">width-large (centered)</p>
  </div>
</div>
{% endCodePreview %}

<h2 class="h2">Full Width</h2>
<p>To force an element to span the entire width of its container, use the pre-existing <code>.full-width</code> utility class.</p>

{% CodePreview %}
<div class="demo-grid-container margin-bottom">
  <div class="demo-grid__content full-width">
    <p class="text-center no-margin">.full-width</p>
  </div>
</div>
{% endCodePreview %}