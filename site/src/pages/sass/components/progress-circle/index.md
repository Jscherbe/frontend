---
title: Progress-circle
sassdocGroupName: progress-circle
---


# Progress-circle

<div class="type-large">

A circular progress indicator.

</div>



## Variables




<div class="sassdoc-item-header">

###  $config {#variable-config}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Module Settings
    
    

``` scss
$config: (
  "size": 100px,
  "viewbox-size": 32,
  "stroke-width": 10,
  "color-track": "placeholder-background-alt",
  "color-progress": "indicator",
  "color-mask": white,
  "color-mask-pie": rgba(255, 255, 255, 0.4),
  "value-color": "type",
  "value-color-outside": "type-tertiary",
  "value-margin-outside" : (0.1em 0.35em),
  "transition-duration" : 300ms,
  "animation-duration" : 1s,
  "animation-delay" : 2s,
  "animation-timing" : ease-in,
  "status-colors": (
    "low": "danger",
    "incomplete": "warning",
    "complete": "success",
  ),
  "sizes": (
    "small" : (
      "size": 40px,
      "stroke-width": 13,
    )
  )
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _progress-circle.scss
- **Group:** progress-circle
- **Type:** variable
- **Lines (comments):** 12-29
- **Lines (code):** 31-57

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|size|Dimension|100px|The width and height of the chart.|
|viewbox-size|Number|32|The size of the SVG viewbox. Used to calculate mask radius.|
|stroke-width|Number|10|The width of the progress circle's stroke.|
|color-track|Color|"placeholder-background-alt"|The color of the inactive track. Can be a theme color name or a CSS variable.|
|color-progress|Color|"indicator"|The color of the progress stroke in a neutral state. Can be a theme color name or a CSS variable.|
|color-mask|Color|white|The color of the center mask that creates the donut hole. Can be a theme color name or a CSS variable.|
|color-mask-pie|Color|rgba(255, 255, 255, 0.5)|The mask color when using the pie style modifier.|
|value-color|Color|"type"|The theme color name for the percentage text inside the circle.|
|value-color-outside|Color|"type-tertiary"|The theme color name for the percentage text when displayed outside the circle.|
|value-margin-outside|Dimension | List|(0.1em 0.35em)|The margin for the outside value text.|
|transition-duration|Time|300ms|The duration for the stroke transition animation (when the component is updating already in the page)|
|animation-duration|Time|1s|The duration for the stroke animation (relies on template having a custom build animation per pie based on dash array). This is used for initial animations|
|animation-delay|Time|2s|The delay for the animation|
|animation-timing|Time|ease-in|Timing function for animation|
|status-colors|Map||A map of status names to their corresponding colors (e.g., "low": "warning").|
|sizes|Map||A map of size variations. Each key is a modifier name (e.g., "small") and the value is a map with `size` and `stroke-width` properties.|

    
  

## Mixins




<div class="sassdoc-item-header">

###  set() {#mixin-set}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Change modules $config
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _progress-circle.scss
- **Group:** progress-circle
- **Type:** mixin
- **Lines (comments):** 59-60
- **Lines (code):** 61-63

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _progress-circle.scss
- **Group:** progress-circle
- **Type:** mixin
- **Lines (comments):** 71-72
- **Lines (code):** 73-175

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/progress-circle">View</a>

</div>



#### Require

- [get()](/sass/components/accordion/#function-get)
  
  

## Functions




<div class="sassdoc-item-header">

###  get() {#function-get}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a config option
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _progress-circle.scss
- **Group:** progress-circle
- **Type:** function
- **Lines (comments):** 65-66
- **Lines (code):** 67-69

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  