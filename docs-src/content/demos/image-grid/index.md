---
title: Image Grid
---

Note: The grid adjusts to reflow based on min-width

{% capture gridItem %}
  <li class="image-grid__item">
    <img src="https://picsum.photos/400/300" alt=""> 
  </li>
{% endcapture %}

<h2 class="h2">Example 6 Images</h2>

<ul class="image-grid">
  {% for i in (1..6) -%}
    {{ gridItem }}
  {%- endfor %}
</ul>

<h2 class="h2">Example 5 Images</h2>

<ul class="image-grid">
  {% for i in (1..5) -%}
    {{ gridItem }}
  {%- endfor %}
</ul>

<h2 class="h2">Example 4 Images</h2>

<ul class="image-grid">
  {% for i in (1..4) -%}
    {{ gridItem }}
  {%- endfor %}
</ul>

<h2 class="h2">Example 3 Images</h2>

<ul class="image-grid">
  {% for i in (1..3) -%}
    {{ gridItem }}
  {%- endfor %}
</ul>

<h2 class="h2">Example 2 Images</h2>

<ul class="image-grid">
  {% for i in (1..2) -%}
    {{ gridItem }}
  {%- endfor %}
</ul>

<h2 class="h2">Example 1 Images</h2>

<ul class="image-grid">
  {% for i in (1..1) -%}
    {{ gridItem }}
  {%- endfor %}
</ul>