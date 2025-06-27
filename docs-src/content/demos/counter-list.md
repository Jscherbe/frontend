---
title: Counter List
---
<h2 class="h2">Default Counter List</h2>

<ol class="counter-list">
  <li>{{ placeholder.paragraphSmall }}</li>
  <li>{{ placeholder.paragraph }}</li>
  <li>{{ placeholder.paragraphSmall }}</li>
  <li>{{ placeholder.paragraphSmall }}</li>
</ol>

<h2 class="h2">Counter List using counter-list-auto</h2>

<div class="counter-list-auto">
  <ol>
    <li>{{ placeholder.paragraphSmall }}</li>
    <li>{{ placeholder.paragraph }}</li>
    <li>{{ placeholder.paragraphSmall }}</li>
    <li>{{ placeholder.paragraphSmall }}</li>
  </ol>
</div>

<h2 class="h2">Alphabetical Counter List</h2>

<ol class="counter-list counter-list--alphabetical">
  <li>{{ placeholder.paragraphSmall }}</li>
  <li>{{ placeholder.paragraphSmall }}</li>
  <li>{{ placeholder.paragraph }}</li>
  <li>{{ placeholder.paragraphSmall }}</li>
</ol>

<h2 class="h2">Default Counter List built as divs</h2>

<div class="counter-list">
  <div class="counter-list__item">{{ placeholder.paragraphSmall }}</div>
  <div class="counter-list__item">{{ placeholder.paragraph }}</div>
  <div class="counter-list__item">{{ placeholder.paragraphSmall }}</div>
  <div class="counter-list__item">{{ placeholder.paragraphSmall }}</div>
</div>

<h2 class="h2">Testing no counter reset</h2>

Not recommending this but there are edge scenarios where this could be useful

<div class="counter-list">
  <div class="counter-list__item">{{ placeholder.paragraphSmall }}</div>
  <div class="counter-list__item">{{ placeholder.paragraphSmall }}</div>
</div>

{{ placeholder.paragraphSmall }}

<div class="counter-list counter-list--no-reset" style="counter-reset: none;">
  <div class="counter-list__item">{{ placeholder.paragraphSmall }}</div>
  <div class="counter-list__item">{{ placeholder.paragraphSmall }}</div>
</div>



