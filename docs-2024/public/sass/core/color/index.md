---
title: Color
sassdocGroupName: color
---


# Color





## Variables




<div class="sassdoc-item-header">

###  $palette {#variable-palette}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: map</span>
  </div>

</div>

  

The color palette map, can be extended or modified with set() and accessed with get()
Note do not use names that start with "--" as those are reserved for custom-properties (pass through) also "inherit" is reserved.
    
    

``` scss
$palette: (
  "black":        black,
  "white":        white,
  "type":         black,
  "headline" :    rgb(13, 104, 102),
  "background":   white,
  "focus":        blue,
  "error":        red,
  "warning":      orange,
  "accent":       orange,
  "selected" :    green,
  "box-shadow":   rgba(0, 0, 0, 0.349),
  "box-shadow:hover" : rgba(0, 0, 0, 0.5),
  "rule":         gray,
  "rule-light":   lightgray,
  "link":         blue,
  "link:hover":   darkblue,
  "link:active":  darkblue,
  "link:visited": purple,
  "bullet":       inherit
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** variable
- **Lines (comments):** 11-13
- **Lines (code):** 15-35
    </details>
    


<div class="sassdoc-item-header">

###  $contexts {#variable-contexts}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: map</span>
  </div>

</div>

  

Pairs of background-color and color definitions
    
    

``` scss
$contexts: (
  "dark" : (
    "background-color" : "black",
    "color" : "white",
    "base-class" : true
  ),
  "light" : (
    "background-color" : "white",
    "color" : "black",
    "base-class" : true
  ),
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** variable
- **Lines (comments):** 37-41
- **Lines (code):** 43-54
    </details>
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$contexts.name.background-color|Number|String|Color value or name of color in $palette|
|$contexts.name.color|Number|String|Color value or name of color in $palette|
|$contexts.name.base-class|Boolean|Print this value in the base module as a class (if base prints)|

    


<div class="sassdoc-item-header">

###  $color-classes {#variable-color-classes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

Palette entries that are output as classes when using all-color-class-styles
    
    

``` scss
$color-classes: (
  "black" : true,
  "white" : true,
  "type": true
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** variable
- **Lines (comments):** 56-56
- **Lines (code):** 57-61
    </details>
    
  

## Mixins




<div class="sassdoc-item-header">

###  set() {#mixin-set}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Used to override or extend the color palette
    
    

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 63-69
- **Lines (code):** 71-73
    </details>
    

#### Examples

Setting the error and type color      


``` scss
@include color.set((
  "type" : #444,
  "error" : orange,
));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|A map to merge into the color palette|

    

#### Require

- [$palette](/sass/core/color/#variable-palette)
  


<div class="sassdoc-item-header">

###  set-color-classes() {#mixin-set-color-classes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set ouput classes for all-color-class-styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 95-96
- **Lines (code):** 98-100
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes (you can disable defaults this way)|

    

#### Require

- [$color-classes](/sass/core/color/#variable-color-classes)
  


<div class="sassdoc-item-header">

###  set-contexts() {#mixin-set-contexts}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set color contexts
    
    

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 107-117
- **Lines (code):** 119-121
    </details>
    

#### Examples

Overwriting contexts      


``` scss
@include color.set-contexts((
  "dark" : (
    "background-color" : red,
    "color" : white,
  )
), false, true);
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|A map to merge|
|$deep|`Map`|Use deep merge|
|$overwrite|`Map`|Overwrite the completly (cannot be used with deep)|

    

#### Require

- map-merge()
- [$contexts](/sass/core/color/#variable-contexts)
  


<div class="sassdoc-item-header">

###  context-styles() {#mixin-context-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints contexts styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 146-147
- **Lines (code):** 149-155
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of context|

    

#### Require

- [get-context()](/sass/core/color/#function-get-context)
- [get-context-value()](/sass/core/color/#function-get-context-value)
- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  all-context-styles() {#mixin-all-context-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints all context styles 
    
    

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 179-186
- **Lines (code):** 188-197
    </details>
    

#### Examples

      


``` scss
@include ulu.all-context-styles();
```
  

      

Example of a color-context      


``` html
 <div class="color-context-dark" style="padding: 1rem">
  Some text in dark context
</div>
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$with-prop|`String`|Checks the specific context for a certain prop (has to be truthy)(used for output in helper/base color modules)|

    

#### Require

- [context-styles()](/sass/core/color/#mixin-context-styles)
- class()
- [get()](/sass/core/breakpoint/#function-get)
- [$contexts](/sass/core/color/#variable-contexts)
  


<div class="sassdoc-item-header">

###  all-color-class-styles() {#mixin-all-color-class-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Outputs all color classes
    
    

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 199-203
- **Lines (code):** 205-214
    </details>
    

#### Examples

      


``` scss
@include ulu.all-color-class-styles();
```
  

      

Example of a color-context      


``` html
<span class="color-name">Some text</span>
```
  

      

#### Require

- class()
- [get()](/sass/core/breakpoint/#function-get)
- [$color-classes](/sass/core/color/#variable-color-classes)
  
  

## Functions




<div class="sassdoc-item-header">

###  get() {#function-get}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a color from the palette by name
    
    

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 75-77
- **Lines (code):** 79-93
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of color to get|

    

#### Returns


|Type|Description|
|:--|:--|
|Color|Note if non-string value is passed it is sent back through, along with custom properties and keyword inherit|

    

#### Require

- require-map-get()
- [$palette](/sass/core/color/#variable-palette)
  


<div class="sassdoc-item-header">

###  get-context() {#function-get-context}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a context by name
    
    

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 123-125
- **Lines (code):** 127-129
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of context|

    

#### Returns


|Type|
|:--|
|Map|

    

#### Require

- require-map-get()
- [$contexts](/sass/core/color/#variable-contexts)
  


<div class="sassdoc-item-header">

###  get-context-value() {#function-get-context-value}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a context's value'
    
    

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 131-134
- **Lines (code):** 136-144
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of context|
|$prop|`String`|The property to get|

    

#### Returns


|Type|
|:--|
|Color|

    

#### Require

- [get-context()](/sass/core/color/#function-get-context)
- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  tint() {#function-tint}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Lighten a color using the default white by a percentage
    
    

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 157-162
- **Lines (code):** 164-166
- **Author:** 
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$color|`Color, String`|Color/palette color name to apply to tint|
|$percentage|`Number`|Percentage|

    

#### Returns


|Type|
|:--|
|Color|

    

#### Related Links

- [Modified from source (CSS Tricks, Kitty Giraudel)](https://css-tricks.com/snippets/sass/tint-shade-functions/)

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  shade() {#function-shade}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Darken a color with the default black by a percentage
    
    

    <details>
      <summary>File Information</summary>
- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 168-173
- **Lines (code):** 175-177
- **Author:** Kitty Giraudel
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$color|`Color, String`|Color/palette color name to shade|
|$percentage|`Number`|Percentage to shade|

    

#### Returns


|Type|
|:--|
|Color|

    

#### Related Links

- [Modified from source (CSS Tricks, Kitty Giraudel)](https://css-tricks.com/snippets/sass/tint-shade-functions/)

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  
  
  