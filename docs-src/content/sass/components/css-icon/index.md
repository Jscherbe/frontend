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
  "size" : 1.1em,
  "stroke-width" : 0.15em,
  "stroke-border-radius" : 1px,
  "color" : currentColor,
  "active-selector" : "details[open] > summary &, &.is-active",
  "transition-duration" : 200ms, 
  "transition-timing-function" : ease-in
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** variable
- **Lines (comments):** 13-21
- **Lines (code):** 23-31
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
- **Lines (comments):** 33-35
- **Lines (code):** 37-39
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
- **Lines (comments):** 55-57
- **Lines (code):** 59-355
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
- **Lines (comments):** 41-43
- **Lines (code):** 45-47
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  