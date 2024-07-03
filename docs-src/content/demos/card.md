---
title: Card
intro: Cards are...

---

## Card Defaults

<!-- setup for loop to give a card-grid of identical cards -->

{% for card in cardTypesArray %}
<h4>{{ card.title }}<h4>

{{ card.content }}

<h5>{{ card.title }} setup using card-grid<h5>

<ul class="card-grid">
  <li>
    {{ card.content }}
  </li>
  <li>
    {{ card.content }}
  </li>
</ul>
{% endfor %}
  
  <!-- title can be above card or in card -->
  <!-- there can be a label -->