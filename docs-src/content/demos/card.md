---
title: Card
layout: default
intro: Cards are...

---

## Card Defaults

<div class="card card__covered">
  <div class="card__content">
    <div class="card__title">Card with Image</div>
    <div class="card__body">This is a card with an upper image using a containing div with the "card__image" class. </div>
    <div class="card__footer">My first Card Footer</div>
  </div>
  <img class="card__background" src="/assets/placeholder/image-1.jpg" />
</div>

{% for card in cardTypes %}

{{card}}

{% endfor %}