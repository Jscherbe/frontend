---
title: Card
layout: default
intro: Cards are...

---

## Card Defaults

<span class="site-card__label">Card Label</span>
<span class="site-card__title">Title</span>
<article class="card card--covered" data-proxy-click>
  <div class="card__body">
    <div class="site-card__header">
      <a class="site-card__link card__title" href="#" data-proxy-click-source="">Card with background image</a>
    </div>
    <div class="site-card__body-content">
      This is a card with an upper image using a containing div with the "card__image" class. 
    </div>
  </div>
  <div class="card__image site-card__image">
    <img src="/assets/placeholder/image-1.jpg" />
  </div>
  <div class="card__footer">
    My first Card Footer
  </div>
</article>

{% for card in cardTypes %}

{{ card }}

{% endfor %}

  
    {{ options.aboveTitle }}
  <!-- title can be above card or in card -->
  <!-- there can be a label -->