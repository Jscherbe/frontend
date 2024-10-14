---
title: Flip Card
intro: Flip Card Intro
---
<h2 class="h2">Flipcard Grid with Images (default)</h2>
<div class="flipcard-grid">
  {% for i in (1..4) -%}
  <div class="flipcard-grid__item">
    {% flipcard i true %}
  </div>
  {%- endfor %}
</div>
<h2 class="h2">Flipcard Grid with Images (bottom-title)</h2>
<div class="flipcard-grid">
  {% for i in (1..4) -%}
  <div class="flipcard-grid__item">
    {% flipcard i true false 'flipcard--bottom-title' %}
  </div>
  {%- endfor %}
</div>
<h2 class="h2">Flipcard Grid with Images (center-title)</h2>
<div class="flipcard-grid">
  {% for i in (1..4) -%}
  <div class="flipcard-grid__item">
    {% flipcard i true false 'flipcard--center-title' %}
  </div>
  {%- endfor %}
</div>

<h2 class="h2">Flipcard Grid Text Only with back-front__content (default)</h2>
<div class="flipcard-grid">
  {% for i in (1..4) -%}
  <div class="flipcard-grid__item">
    {% flipcard i false true %}
  </div>
  {%- endfor %}
</div>
<h2 class="h2">Flipcard Grid Text Only with back-front__content (bottom-title)</h2>
<div class="flipcard-grid">
  {% for i in (1..4) -%}
  <div class="flipcard-grid__item">
    {% flipcard i false true 'flipcard--bottom-title' %}
  </div>
  {%- endfor %}
</div>
<h2 class="h2">Flipcard Grid Text Only with back-front__content (center-title)</h2>
<div class="flipcard-grid">
  {% for i in (1..4) -%}
  <div class="flipcard-grid__item">
    {% flipcard i false true 'flipcard--center-title' %}
  </div>
  {%- endfor %}
</div>
<h2 class="h2">Full width Flipcards (no grid)</h2>
{% flipcard %}
{% flipcard '2' true %}
{% flipcard '3' false true %}
{% flipcard '4' true true %}