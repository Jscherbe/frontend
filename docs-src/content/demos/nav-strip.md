---
title: Nav Strip
layout: unformatted
intro: A horizontal navigation strip or rail that displays a list of links to different pages or sections of a website. The active link, indicating the current page or section, is visually emphasized with an underline.

---

{% capture listWithSelectors %}
  {% for i in (1..4) -%}
    <li class="nav-strip__item">
      <a href="#" class="nav-strip__link {% if i == 2  %}is-active{% endif -%}">
        Link Number {{ i }}
      </a>
    </li>
  {%- endfor %}
{% endcapture %}

{% capture listWithoutSelectors %}
  {% for i in (1..4) -%}
      <li>
        <a href="#" class="{% if i == 2  %}is-active{% endif -%}">
          Link Number {{ i }}
        </a>
      </li>
    {%- endfor %}
{% endcapture %}

<h2 class="h2">Default Example</h2>

<div class="nav-strip">
  <ul class="nav-strip__list">
    {{ listWithSelectors }}
  </ul>
</div>

<h2 class="h2">Using Automatic Modifier</h2>

<div class="nav-strip nav-strip--auto">
  <ul>
    {{ listWithoutSelectors }}
  </ul>
</div>

<h2 class="h2">Center Modifier</h2>

<div class="nav-strip nav-strip--center">
  <ul class="nav-strip__list">
    {{ listWithSelectors }}
  </ul>
</div>

<h2 class="h2">Right Modifier</h2>

<div class="nav-strip nav-strip--right">
  <ul class="nav-strip__list">
    {{ listWithSelectors }}
  </ul>
</div>

<h2 class="h2">Rule Modifier</h2>

<div class="nav-strip nav-strip--rule">
  <ul class="nav-strip__list">
    {{ listWithSelectors }}
  </ul>
</div>