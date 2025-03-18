---
title: Card
intro: Cards are...

---

<!-- card short code parameter order is -->
<!-- {% demoCard number modifier body title content image footer isIcon %} -->

{% demoAccordion "Card Default Styling" %}
  <div class="h4">All Fields</div>
  {% demoCard %}
  <div class="h4">No Body (no proxy click link)</div>
  {% demoCard 1 '' false %}
  <div class="h4">No Title (no proxy click link)</div>
  {% demoCard 1 '' true false %}
  <div class="h4">No Content</div>
  {% demoCard 1 '' true true false %}
  <div class="h4">No Image</div>
  {% demoCard 1 '' true true true false %}
  <div class="h4">No Footer</div>
  {% demoCard 1 '' true true true true false %}
{% enddemoAccordion %}

{% demoAccordion "Card Image-fit Styling" %}
  <div class="h4">All Fields</div>
  {% demoCard 1 'card--image-fit' %}
  <div class="h4">No Body (no proxy click link)</div>
  {% demoCard 1 'card--image-fit' false %}
  <div class="h4">No Title (no proxy click link)</div>
  {% demoCard 1 'card--image-fit' true false %}
  <div class="h4">No Content</div>
  {% demoCard 1 'card--image-fit' true true false %}
  <div class="h4">No Image</div>
  {% demoCard 1 'card--image-fit' true true true false %}
  <div class="h4">No Footer</div>
  {% demoCard 1 'card--image-fit' true true true true false %}
{% enddemoAccordion %}

{% demoAccordion "Card Icon Styling" %}
  <div class="h4">All Fields</div>
  {% demoCard 1 '' true true true true true true %}
  <div class="h4">No Body (no proxy click link)</div>
  {% demoCard 1 '' false true true true true true %}
  <div class="h4">No Title (no proxy click link)</div>
  {% demoCard 1 '' true false true true true true %}
  <div class="h4">No Content</div>
  {% demoCard 1 '' true true false true true true %}
  <div class="h4">No Image</div>
  {% demoCard 1 '' true true true false true true %}
  <div class="h4">No Footer</div>
  {% demoCard 1 '' true true true true false true %}
{% enddemoAccordion %}

{% demoAccordion "Card Overlay Styling" %}
  <div class="h4">All Fields</div>
  {% demoCard 1 'card--overlay' %}
  <div class="h4">No Body (no proxy click link)</div>
  {% demoCard 1 'card--overlay' false true true true true %}
  <div class="h4">No Title (no proxy click link)</div>
  {% demoCard 1 'card--overlay' true false true true true %}
  <div class="h4">No Content</div>
  {% demoCard 1 'card--overlay' true true false true true %}
  <div class="h4">No Footer</div>
  {% demoCard 1 'card--overlay' true true true true false %}
{% enddemoAccordion %}

{% demoAccordion "Card Horizontal Styling" %}
  <div class="h4">All Fields</div>
  {% demoCard 1 'card--horizontal' %}
  <div class="h4">No Body (no proxy click link)</div>
  {% demoCard 1 'card--horizontal' false true true true true %}
  <div class="h4">No Title (no proxy click link)</div>
  {% demoCard 1 'card--horizontal' true false true true true %}
  <div class="h4">No Content</div>
  {% demoCard 1 'card--horizontal' true true false true true %}
  <div class="h4">No Image</div>
  {% demoCard 1 'card--w-image' true true true false true %}
  <div class="h4">No Footer</div>
  {% demoCard 1 'card--horizontal' true true true true false %}
{% enddemoAccordion %}

{% demoAccordion "Card Horizontal and Image-fit Styling" %}
  <div class="h4">All Fields</div>
  {% demoCard 1 'card--image-fit card--horizontal' %}
  <div class="h4">No Body (no proxy click link)</div>
  {% demoCard 1 'card--image-fit card--horizontal' false true true true true %}
  <div class="h4">No Title (no proxy click link)</div>
  {% demoCard 1 'card--image-fit card--horizontal' true false true true true %}
  <div class="h4">No Content</div>
  {% demoCard 1 'card--image-fit card--horizontal' true true false true true %}
  <div class="h4">No Image</div>
  {% demoCard 1 'card--w-image' true true true false true %}
  <div class="h4">No Footer</div>
  {% demoCard 1 'card--image-fit card--horizontal' true true true true false %}
{% enddemoAccordion %}
