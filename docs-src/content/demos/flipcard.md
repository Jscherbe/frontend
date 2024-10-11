---
title: Flip Card
intro: Flip Card Intro
---
{% flipcard %}
{% flipcard '2' true %}
{% flipcard '3' false true %}
{% flipcard '4' true true %}
<div class="flipcard-grid">
  {% for i in (1..4) -%}
  <div class="flipcard-grid__item">
    {% flipcard i %}
  </div>
  {%- endfor %}
</div>