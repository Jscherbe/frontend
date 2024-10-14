---
title: Css-icon
sassdocGroupName: css-icon
---


# Css-icon

Simple icons that only require CSS selectors, used for defaults (JS, etc). Not meant to be replacement for complete icon library



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
  "size" : 1.15em,
  "text-size" : 1em,
  "stroke-width" : 3px,
  "text-offset" : 0.05em,
  "vertical-align" : -0.2em,
  "stroke-border-radius" : null,
  "color" : currentColor,
  "active-selector" : "details[open] > summary &, &.is-active",
  "transition-duration" : 200ms, 
  "transition-timing-function" : ease-in,
  "font-family" : ('Courier New', monospace),
  "margin" : (0 0.15em),
  "stroke-sizes" : (
    "large" : (
      "stroke-width" : 5px,
      "stroke-border-radius" : 2px
    )
  )
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** variable
- **Lines (comments):** 31-39
- **Lines (code):** 41-54
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|size|Dimension|1.1em|The width, height and font size of the css-icon.|
|stroke-width|Dimension|0.15em|The stroke width of the css-icon.|
|stroke-border-radius|Dimension|1px|The rounding of the strokes for css-icon.|
|color|Color|currentColor|The color of the css-icon.|
|active-selector|String|details[open|> summary &, &.is-active] The active selector for css-icon.|
|transition-duration|Time|200ms|The duration length for the transition.|
|transition-timing-function|CssValue|ease-in|The timing function for the transition.|

    
  

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
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** mixin
- **Lines (comments):** 56-58
- **Lines (code):** 60-62
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints adaptive spacing component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** mixin
- **Lines (comments):** 78-80
- **Lines (code):** 82-395
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
```
  

      

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
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** function
- **Lines (comments):** 64-66
- **Lines (code):** 68-70
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  