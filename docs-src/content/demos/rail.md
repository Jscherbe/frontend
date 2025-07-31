---
title: Rail
layout: unformatted
intro: A generic layout component for horizontal rail (icon headers, toolbars, etc)
---

<h2 class="h2">Default Rail (Items aligned start, vertically centered)</h2>
<div class="rail">
  <div class="rail__item">
    <h3 class="h3 no-margin">
      <span class="color-accent fas fa-book" aria-hidden="true"></span>
      Title of Item
    </h3>
  </div>
  <div class="rail__item rail__item--pull-end">
    <button class="button button--transparent button--icon" aria-label="Open Menu">
      <span class="button__icon fas fa-ellipsis" aria-hidden="true"></span>
    </button>
  </div>
</div>
<div class="rule no-margin-top"></div>
{{ placeholder.paragraph }}

<h2 class="h2">Another Example</h2>
<div class="rail rail--justify">
  <div class="rail__item form-theme">
    <label for="test-input" class="type-bold">Label</label>
    <input type="text" id="test-input">
  </div>
  <div class="rail__item">
    <div class="button-group">
      <button class="button button--small">
        <span class="button__icon fas fa-plus" aria-hidden="true"></span>
        <span>Add</span>
      </button>
      <button class="button button--small">
        <span class="button__icon fas fa-plus" aria-hidden="true"></span>
        <span>Add</span>
      </button>
      <button class="button button--small">
        <span class="button__icon fas fa-plus" aria-hidden="true"></span>
        <span>Add</span>
      </button>
    </div>
    <!-- <div class="horizontal-rule"></div>
    <div class="button-group">
      <button class="button button--small">
        <span class="button__icon fas fa-plus" aria-hidden="true"></span>
        <span>Add
      </button>
    </div> -->
  </div>
</div>
<div class="rule"></div>
{{ placeholder.paragraph }}

<h2 class="h2">Test No Gap</h2>
<div class="rail">
  <div class="rail__item">One</div>
  <div class="rail__item rail__item--gap-none">No Gap</div>
  <div class="rail__item">Three</div>
</div>

<h2 class="h2">Test Gap Modifiers (larger than default)</h2>
<div class="rail">
  <div class="rail__item">One</div>
  <div class="rail__item rail__item--gap-large">Large Gap</div>
  <div class="rail__item">Three</div>
</div>

<h2 class="h2">Test Gap Modifiers (smaller than default)</h2>
<div class="rail">
  <div class="rail__item">One</div>
  <div class="rail__item rail__item--gap-small">Small Gap</div>
  <div class="rail__item">Three</div>
</div>

<h2 class="h2">Test Separator</h2>
<div class="rail">
  <div class="rail__item">One</div>
  <div class="rail__item rail__item--separator">Small Gap</div>
  <div class="rail__item">Three</div>
</div>

<h2 class="h2">Test Separator (with modifier for gap larger than default)</h2>
<div class="rail">
  <div class="rail__item">One</div>
  <div class="rail__item rail__item--gap-large rail__item--separator">Small Gap</div>
  <div class="rail__item">Three</div>
</div>

<h2 class="h2">Test Separator (with modifier for gap smaller than default)</h2>
<div class="rail">
  <div class="rail__item">One</div>
  <div class="rail__item rail__item--gap-small rail__item--separator">Small Gap</div>
  <div class="rail__item">Three</div>
</div>

<h2 class="h2">Align Items: Baseline (Vertical Alignment)</h2>
<div class="rail rail--align-baseline">
  <div class="rail__item type-large">Tall Item</div>
  <div class="rail__item">Normal Item</div>
  <div class="rail__item type-small">Short Item</div>
  <div class="rail__item type-large-x">Taller Item</div>
</div>

<h2 class="h2">No Wrap</h2>
<div class="rail rail--nowrap">
  <div class="rail__item">Item</div>
  <div class="rail__item">Item</div>
  <div class="rail__item">Item</div>
  <div class="rail__item">Item</div>
  <div class="rail__item">Item</div>
  <div class="rail__item">Item</div>
  <div class="rail__item">Item</div>
  <div class="rail__item">Item</div>
  <div class="rail__item">Item</div>
</div>