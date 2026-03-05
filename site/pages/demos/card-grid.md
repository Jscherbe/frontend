---
title: Card Grid
intro: Card Grids are...
layout: fullpage
---

<div class="container">

  <h2 class="h2">Card Grid Defaults</h2>

  {% CodePreview %}

  {% demoCardGrid 5 %}

  {% endCodePreview %}

  <h2 class="h2">Card Grid Compact</h2>

  {% CodePreview %}

  {% demoCardGrid 5 'card-grid--compact' %}

  {% endCodePreview %}

  <h2 class="h2">Horizontal Card Grid</h2>

  <h3 class="h3 margin-top">Horizontal One Column</h3>
  
  {% CodePreview %}

  {% demoCardGrid 5 'card-grid--one-column' 'card--w-image card--image-fit card--horizontal' %}

  {% endCodePreview %}

  <section class="list-grid" data-list-grid="grid">
    <header class="list-grid__header">
      <h3 class="h3">List Grid with Switcher</h3>
      <div class="list-grid__toolbar site-toolbar">
        <button 
          class="icon-switch" 
          type="button" 
          data-list-grid-toggle
          aria-label="Toggle List/Grid Mode"
        >
          <span class="icon-switch__icon fa-solid fa-list" data-list-grid-toggle-list></span>
          <span class="icon-switch__icon is-active" data-list-grid-toggle-grid>
            <!-- need svg icon -->
            {% svgBoxes %}
          </span>
        </button>
      </div>
    </header>

    {% CodePreview %}

    {% demoCardGrid 5 'list-grid__rows' 'card--w-image card--image-fit card--horizontal list-grid__card' %}

    {% endCodePreview %}
  </section>

</div>