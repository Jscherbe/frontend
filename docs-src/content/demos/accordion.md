---
title: Accordion
layout: default
intro: An accordion disclosure element is a user interface component that allows users to expand and collapse sections of content. 
---

## Basic Setup

Without an icon in the summary will fallback to browser default 

<details class="accordion">
  <summary class="accordion__summary">
    This is an example Title
  </summary>
  <div class="accordion__content">
    {{ placeholder.paragraph }}
    {{ placeholder.paragraph }}
  </div>
</details>


## Examples with plus icon

```html
<details class="accordion">
  <summary class="accordion__summary">
    The summary is what is seen before opening the details
    <!-- The span is the icon on the side that -->
    <span class="accordion__icon" aria-hidden="true">
      <span class="css-icon css-icon--plus-to-minus"></span>
    </span>
  </summary>
  <div class="accordion__content">
    The content is the information that is seen after you open the details
  </div>
</details>
```

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

## Transparent Modifier


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

## Examples with Rotating Angle Right/Down

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

## Examples with Rotating Angle Down/Up


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

## Examples with No borders


<details class="accordion accordion--no-borders">
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
<details class="accordion accordion--no-borders">
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

