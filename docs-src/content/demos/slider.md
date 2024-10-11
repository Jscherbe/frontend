---
title: Slider
intro: Slider Intro
layout: fullpage
---
<div class="container-fill">  
  {% slider 'Slider with Images' %}
</div>
{% capture textContent %}
  {% for i in (1..4) -%}
    <li class="slider__slide" data-ulu-slider-slide>
      <figure class="pull-quote">
        <blockquote class="pull-quote__body display-inline-all">
          Important Quote #{{ i }}
        </blockquote>
        <figcaption class="pull-quote__author">
        <strong class="pull-quote__author-name">
          Author #{{ i }}
        </strong>
          <span class="pull-quote__author-title">
            <span class="hidden">, </span>
            Professor, Emeritus
          </span>
      </figcaption>
      </figure>
    </li>
  {%- endfor %}
{% endcapture %}
<div class="container-fill">  
  {% slider 'Slider with Text' textContent %}
</div>
