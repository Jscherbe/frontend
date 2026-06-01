---
title: Tagged
layout: default
---

## Basic Examples on Different Button Sizes

<button class="button button--small button--icon tagged">
  <span class="button__icon fas fa-bell" aria-hidden="true"></span>
  <span class="hidden-visually">Notifications</span>
  <span class="tagged__tag tag tag--danger tag--small tag--counter">3</span>
</button>

<button class="button button--icon tagged">
  <span class="button__icon fas fa-bell" aria-hidden="true"></span>
  <span class="hidden-visually">Notifications</span>
  <span class="tagged__tag tag tag--danger tag--small tag--counter">3</span>
</button>

<button class="button button--icon button--large tagged">
  <span class="button__icon fas fa-bell" aria-hidden="true"></span>
  <span class="hidden-visually">Notifications</span>
  <span class="tagged__tag tag tag--danger tag--counter">3</span>
</button>

## Testing on other types of buttons

<button class="button tagged">
  <span>Notifications</span>
  <span class="tagged__tag tag tag--danger tag--counter">30</span>
</button>


## Testing with extremes

<p>
  <button class="button button--icon tagged">
    <span class="button__icon fas fa-bell" aria-hidden="true"></span>
    <span class="hidden-visually">Notifications</span>
    <span class="tagged__tag tag tag--danger tag--small tag--counter">3,000</span>
  </button>
</p>
<p>
  <button class="button tagged">
    <span>Notifications</span>
    <span class="tagged__tag tag tag--danger tag--counter">30,000</span>
  </button>
</p>