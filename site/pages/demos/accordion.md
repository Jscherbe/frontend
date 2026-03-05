---
title: Accordion
layout: default
intro: An accordion disclosure element is a user interface component that allows users to expand and collapse sections of content. 
---


## Basic Example

{% CodePreview %}

<details class="accordion">
  <summary class="accordion__summary">
    This is an example Title without open/close icons
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--plus-to-minus"></span>
    </span>
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>
<details class="accordion">
  <summary class="accordion__summary">
    This is an example title with long content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere sem ac neque rhoncus lacinia. Suspendisse ornare enim in ultrices egestas.
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--plus-to-minus"></span>
    </span>
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>
<details class="accordion">
  <summary class="accordion__summary">
    This is an example Title
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--plus-to-minus"></span>
    </span>
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>

{% endCodePreview %}

## Transparent Modifier

{% CodePreview %}

<details class="accordion accordion--transparent">
  <summary class="accordion__summary">
    This is an example Title without open/close icons
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--plus-to-minus"></span>
    </span>
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>
<details class="accordion accordion--transparent">
  <summary class="accordion__summary">
    This is an example title with long content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere sem ac neque rhoncus lacinia. Suspendisse ornare enim in ultrices egestas.
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--plus-to-minus"></span>
    </span>
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>
<details class="accordion accordion--transparent">
  <summary class="accordion__summary">
    This is an example Title
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--plus-to-minus"></span>
    </span>
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>

{% endCodePreview %}

## Examples with Rotating Angle Right/Down

{% CodePreview %}

<details class="accordion">
  <summary class="accordion__summary">
    This is an example title with long content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere sem ac neque rhoncus lacinia. Suspendisse ornare enim in ultrices egestas.
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--angle-right-to-down"></span>
    </span>
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>
<details class="accordion">
  <summary class="accordion__summary">
    This is an example Title
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--angle-right-to-down"></span>
    </span>
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>

{% endCodePreview %}

## Examples with Rotating Angle Down/Up

{% CodePreview %}

<details class="accordion">
  <summary class="accordion__summary">
    This is an example title with long content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere sem ac neque rhoncus lacinia. Suspendisse ornare enim in ultrices egestas.
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--angle-down-to-up"></span>
    </span>
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>
<details class="accordion">
  <summary class="accordion__summary">
    This is an example Title
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--angle-down-to-up"></span>
    </span>
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>

{% endCodePreview %}

## Examples with No borders

{% CodePreview %}

<details class="accordion accordion--borderless">
  <summary class="accordion__summary">
    This is an example title with long content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur posuere sem ac neque rhoncus lacinia. Suspendisse ornare enim in ultrices egestas.
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--angle-down-to-up"></span>
    </span>
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>
<details class="accordion accordion--borderless">
  <summary class="accordion__summary">
    This is an example Title
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--angle-down-to-up"></span>
    </span>
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>

{% endCodePreview %}