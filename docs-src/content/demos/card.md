---
title: Card
intro: Cards are...

---

<!-- card short code parameter order is -->
<!-- {% demoCard number modifier body title content image footer isIcon %} -->

<h2 class="h2">Card Default Styling</h2>

<h3 class="h3">All Fields</h3>
{% demoCard %}
<h3 class="h3">No Body (no proxy click link)</h3>
{% demoCard 1 '' false %}
<h3 class="h3">No Title (no proxy click link)</h3>
{% demoCard 1 '' true false %}
<h3 class="h3">No Content</h3>
{% demoCard 1 '' true true false %}
<h3 class="h3">No Image</h3>
{% demoCard 1 '' true true true false %}
<h3 class="h3">No Footer</h3>
{% demoCard 1 '' true true true true false %}

<h2 class="h2">Card Image-fit Styling</h2>

<h3 class="h3">All Fields</h3>
{% demoCard 1 'card--image-fit' %}
<h3 class="h3">No Body (no proxy click link)</h3>
{% demoCard 1 'card--image-fit' false %}
<h3 class="h3">No Title (no proxy click link)</h3>
{% demoCard 1 'card--image-fit' true false %}
<h3 class="h3">No Content</h3>
{% demoCard 1 'card--image-fit' true true false %}
<h3 class="h3">No Image</h3>
{% demoCard 1 'card--image-fit' true true true false %}
<h3 class="h3">No Footer</h3>
{% demoCard 1 'card--image-fit' true true true true false %}
<h2 class="h2">Card Icon Styling</h2>

<h3 class="h3">All Fields</h3>
{% demoCard 1 '' true true true true true true %}
<h3 class="h3">No Body (no proxy click link)</h3>
{% demoCard 1 '' false true true true true true %}
<h3 class="h3">No Title (no proxy click link)</h3>
{% demoCard 1 '' true false true true true true %}
<h3 class="h3">No Content</h3>
{% demoCard 1 '' true true false true true true %}
<h3 class="h3">No Image</h3>
{% demoCard 1 '' true true true false true true %}
<h3 class="h3">No Footer</h3>
{% demoCard 1 '' true true true true false true %}

<h2 class="h2">Card Overlay Styling</h2>

<h3 class="h3">All Fields</h3>
{% demoCard 1 'card--overlay' %}
<h3 class="h3">No Body (no proxy click link)</h3>
{% demoCard 1 'card--overlay' false true true true true %}
<h3 class="h3">No Title (no proxy click link)</h3>
{% demoCard 1 'card--overlay' true false true true true %}
<h3 class="h3">No Content</h3>
{% demoCard 1 'card--overlay' true true false true true %}
<h3 class="h3">No Footer</h3>
{% demoCard 1 'card--overlay' true true true true false %}

<h2 class="h2">Card Horizontal Styling</h2>

<h3 class="h3">All Fields</h3>
{% demoCard 1 'card--horizontal' %}
<h3 class="h3">No Body (no proxy click link)</h3>
{% demoCard 1 'card--horizontal' false true true true true %}
<h3 class="h3">No Title (no proxy click link)</h3>
{% demoCard 1 'card--horizontal' true false true true true %}
<h3 class="h3">No Content</h3>
{% demoCard 1 'card--horizontal' true true false true true %}
<h3 class="h3">No Image</h3>
{% demoCard 1 'card--w-image' true true true false true %}
<h3 class="h3">No Footer</h3>
{% demoCard 1 'card--horizontal' true true true true false %}

<h2 class="h2">Card Horizontal and Image-fit Styling</h2>

<h3 class="h3">All Fields</h3>
{% demoCard 1 'card--image-fit card--horizontal' %}
<h3 class="h3">No Body (no proxy click link)</h3>
{% demoCard 1 'card--image-fit card--horizontal' false true true true true %}
<h3 class="h3">No Title (no proxy click link)</h3>
{% demoCard 1 'card--image-fit card--horizontal' true false true true true %}
<h3 class="h3">No Content</h3>
{% demoCard 1 'card--image-fit card--horizontal' true true false true true %}
<h3 class="h3">No Image</h3>
{% demoCard 1 'card--w-image' true true true false true %}
<h3 class="h3">No Footer</h3>
{% demoCard 1 'card--image-fit card--horizontal' true true true true false %}
