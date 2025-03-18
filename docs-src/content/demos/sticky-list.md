---
title: Sticky List
intro: Basic CSS only sticky list
---

{% capture markup %}
  <div class="sticky-list">
    <h3 class="sticky-list__title">
      Title for list
    </h3>
    <ul>
      <li>Vivamus placerat est sit amet est mollis</li>
      <li>Aliquam eros lorem, tristique quis nulla nec, scelerisque varius velit</li>
      <li>Phasellus placerat viverra condimentum
      </li>
    </ul>
  </div>
{% endcapture %}

<h2 class="h2">Default Example</h2>

<div class="background-light theme-light">
  {{ markup }}
</div>

<h2 class="h2">Dark Background Example</h2>

<div class="background-dark theme-dark">
  {{ markup }}
</div>