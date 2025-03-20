---
title: Card Grid
intro: Card Grids are...

---

<h2 class="h2">Card Grid Defaults</h2>

{% demoCardGrid 3  %}

```html
<ul class="card-grid">
  <li class="card-grid__item">
    <article class="card" data-ulu-proxy-click="">
      <div class="card__body">
        <h5 class="card__title">
          <a class="card__title-link" href="https://www.google.com" data-ulu-proxy-click-source="">Card 1</a>
        </h5>
        <div>
          This is a card with an upper image using a containing div with the "card__image" class.
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

## Card Grid Compact

{% demoCardGrid 3 'card-grid--compact' %}

{% demoCardGrid 3 '' 'card--w-image card--image-fit card--horizontal' %}

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
          <svg class="inline-icon" viewBox="0 0 19 19">
            <rect fill="currentColor" x="0" y="0" width="8" height="8" rx="1.24" ry="1.24"/>
            <rect fill="currentColor" x="11" y="0" width="8" height="8" rx="1.24" ry="1.24"/>
            <rect fill="currentColor" x="0" y="11" width="8" height="8" rx="1.24" ry="1.24"/>
            <rect fill="currentColor" x="11" y="11" width="8" height="8" rx="1.24" ry="1.24"/>
          </svg>
        </span>
      </button>
    </div>
  </header>
  {% demoCardGrid 3 'list-grid__rows' 'card--w-image card--image-fit card--horizontal list-grid__card' %}
</section>
