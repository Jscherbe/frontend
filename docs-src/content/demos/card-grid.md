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
