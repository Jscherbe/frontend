---
title: Css-icon
sassdocGroupName: css-icon
---


# Css-icon

<div class="type-large">

Simple icons that only require CSS selectors, used for defaults (JS, etc). Not meant to be replacement for complete icon library. Note the selectors currently can't be modified.

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
  "active-selector" : "details[open] > summary &, &.is-active",
  "color" : currentColor,
  "font-family" : ('Courier New', monospace),
  "margin" : (0 0.15em),
  "size" : 1.15em,
  "stroke-border-radius" : null,
  "stroke-width" : 3px,
  "drag-gap-multiplier" : 0.75,
  "text-offset" : 0.05em,
  "text-size" : 1em,
  "vertical-align" : -0.25em,
  "transition-duration" : 200ms, 
  "transition-timing-function" : ease-in,
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
- **Lines (comments):** 24-39
- **Lines (code):** 41-61

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|active-selector|String|details[open|> summary &, &.is-active] The active selector for css-icon.|
|color|Color|currentColor|The color of the css-icon.|
|font-family|CssValue|('Courier New', monospace)||
|margin|CssValue|(0 0.15em)|The icon's margin|
|size|Dimension|1.1em|The width, height and font size of the css-icon.|
|stroke-border-radius|Dimension|1px|The rounding of the strokes for css-icon.|
|stroke-width|Dimension|0.15em|The stroke width of the css-icon.|
|drag-gap-multiplier|Dimension|0.75|Multiplier used to adjust the space between drag-x/drag-y icons (used for all stroke sizes)|
|text-offset|Dimension|0.05em|When using an icon with text, adds a margin to match the text height.|
|text-size|Dimension|1em|font-size of the icon when using text.|
|vertical-align|Dimension|-0.2em|Vertical-align for css-icon|
|transition-duration|Time|200ms|The duration length for the transition.|
|transition-timing-function|CssValue|ease-in|The timing function for the transition.|
|stroke-sizes|Map|Map|Modifiers to adjust stroke sizes for the icons.|

    
  

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
- **Lines (comments):** 63-66
- **Lines (code):** 68-70

</details>

    

#### Examples

      


``` scss
@include ulu.component-css-icon-set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  when-active() {#mixin-when-active}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Used to style active icons
- Probably only useful for extending this component and matching active selector
- Used internally in module
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** mixin
- **Lines (comments):** 81-83
- **Lines (code):** 85-89

</details>

    

#### Require

- [get()](/sass/components/accordion/#function-get)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output CSS icon component stylesheet
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _css-icon.scss
- **Group:** css-icon
- **Type:** mixin
- **Lines (comments):** 101-103
- **Lines (code):** 105-438

</details>

    

#### Examples

      


``` scss
@include ulu.component-css-icon-styles();
```
  



      

#### Require

- [when-active()](/sass/components/css-icon/#mixin-when-active)
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
- **Lines (comments):** 72-75
- **Lines (code):** 77-79

</details>

    

#### Examples

      


``` scss
@include ulu.component-css-icon-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  