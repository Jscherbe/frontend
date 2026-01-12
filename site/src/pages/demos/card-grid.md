---
title: Card Grid
intro: Card Grids are...
layout: fullpage
---

<div class="container">

  <h2 class="h2">Card Grid Defaults</h2>

  {% demoCardGrid 3  %}

  ```html
  <ul class="card-grid">
    <li class="card-grid__item">
      <article class="card" data-ulu-proxy-click="">
        <div class="card__body">
          <div class="card__main">
            <h5 class="card__title">
              <a class="card__title-link" href="https://www.google.com" data-ulu-proxy-click-source="">Card 1</a>
            </h5>
            <div>
              This is a card with an upper image using a containing div with the "card__image" class.
            </div>
          </div>
        </div>
        <div class="card__image">
          <img src="/frontend/assets/placeholder/image-1.jpg">
        </div>
        <div class="card__footer">
          My Card Footer
        </div>
      </article>
    </li>
    ... 
  </ul>
  ```
  ```html
  <ul class="card-grid">
    <li class="card-grid__item">
      // First Card Content
    </li>
    <li class="card-grid__item">
      // Second Card Content
    </li>
  </ul>
  ```
  <h2 class="h2">Card Grid Compact</h2>

  {% demoCardGrid 3 'card-grid--compact' %}

  <h2 class="h2">Horizontal Card Grid</h2>


  <h3 class="h3 margin-top">Horizontal Card Default</h3>
  {% demoCardGrid 3 '' 'card--w-image card--image-fit card--horizontal' %}
  <h3 class="h3 margin-top">Horizontal One Column</h3>
  {% demoCardGrid 3 'card-grid--one-column' 'card--w-image card--image-fit card--horizontal' %}


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
    {% demoCardGrid 3 'list-grid__rows' 'card--w-image card--image-fit card--horizontal list-grid__card' %}
  </section>

</div>