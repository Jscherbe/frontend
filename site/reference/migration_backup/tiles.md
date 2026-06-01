---
title: Tiles
intro: Tile and tile grid tests
layout: unformatted
---

<h2 class="h2">Default</h2> 

<p>
  The default is reflowable grid that attempts to match the width specified filling the available space
</p>
<!-- {% tileGridItem argument1 argument2 %} -->
<ul class="tile-grid">
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
</ul>

<h2 class="h2">Alternate Sizes</h2>

<ul class="tile-grid tile-grid--large">
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
</ul>

<h2 class="h2">Adaptive Static Columns</h2>


<ul class="tile-grid tile-grid--static">
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
  {% tileGridItem %}
</ul>