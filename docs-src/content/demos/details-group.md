---
title: Details Group
layout: default
intro: Test the javascript plugin for managing groups of details (such as accordions)
---

## One Open at a Time

<div data-ulu-details-group='{ "onlyOneOpen" : true }'>
  <details class="accordion">
    <summary class="accordion__summary">
      This is an example Title
    </summary>
    <div class="accordion__content">
      {{ placeholder.paragraph }}
      {{ placeholder.paragraph }}
    </div>
  </details>

  <details class="accordion">
    <summary class="accordion__summary">
      This is an example Title
    </summary>
    <div class="accordion__content">
      {{ placeholder.paragraph }}
      {{ placeholder.paragraph }}
    </div>
  </details>

  <details class="accordion">
    <summary class="accordion__summary">
      This is an example Title
    </summary>
    <div class="accordion__content">
      {{ placeholder.paragraph }}
      {{ placeholder.paragraph }}
    </div>
  </details>
</div>