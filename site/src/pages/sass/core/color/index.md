---
title: Color
sassdocGroupName: color
---


# Color

<div class="type-large">



</div>



## Variables




<div class="sassdoc-item-header">

###  $palette {#variable-palette}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: map</span>
  </div>

</div>

  

The color palette map, can be extended or modified with set() and accessed with get()
- Note do not use names that start with "var(" which are reserved for custom properties. Also do not use "inherit" or "transparent" as those are reserved.
- The default palette color names are used throughout the system
    
    

``` scss
$palette: (
  "black":                      black,
  "white":                      white,
  "type":                       black,
  "type-secondary":             rgb(82, 82, 82),
  "type-tertiary":              rgb(125, 125, 125),
  "type-disabled":              rgb(160, 160, 160),
  "headline":                   inherit,
  "background":                 white,
  "focus":                      blue,
  "accent":                     orange,
  "info":                       #00bde3,
  "success":                    #00a91c,
  "warning":                    #ffbe2e,
  "danger":                     #d54309,
  "info-background":            #e7f6f8,
  "success-background":         #ecf3ec,
  "warning-background":         #faf3d1,
  "danger-background":          #f4e3db,
  // Used for background of elements that are placeholder or that have no value (think charts)
  "placeholder-background":     #e2e2e2,
  "placeholder-background-alt": #bababa,
  "selected":                   green,
  "box-shadow":                 rgba(0, 0, 0, 0.349),
  "box-shadow-hover":           rgba(0, 0, 0, 0.5),
  "rule":                       gray,
  "rule-light":                 lightgray,
  "link":                       blue,
  "link-hover":                 darkblue,
  "link-active":                darkblue,
  "link-visited":               purple,
  "bullet":                     inherit,
  "control":                    white,
  "control-hover":              white,
  "control-active":             white,
  "control-border":             purple,
  "control-border-hover":       blue,
  "control-border-active":      orange,
  "control-background":         purple,
  "control-background-hover":   blue,
  "control-background-active":  orange,
  // Like accent indicator like things in ui (progress, etc)
  "indicator" :                 #5050ab, 
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _color.scss
- **Group:** color
- **Type:** variable
- **Lines (comments):** 13-16
- **Lines (code):** 18-61

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
- **Lines (comments):** 63-67
- **Lines (code):** 69-80

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
- Use set-color-classes mixin to alter this map
    
    

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
- **Lines (comments):** 82-83
- **Lines (code):** 84-88

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
- **Lines (comments):** 90-96
- **Lines (code):** 98-100

</details>

    

#### Examples

Setting the error and type color      


``` scss
@include ulu.color-set((
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

  

Set output classes for all-color-class-styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 125-126
- **Lines (code):** 128-130

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
- **Lines (comments):** 139-149
- **Lines (code):** 151-153

</details>

    

#### Examples

Overwriting contexts      


``` scss
@include ulu.color-set-contexts((
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
- **Lines (comments):** 178-179
- **Lines (code):** 181-187

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
- **Lines (comments):** 233-240
- **Lines (code):** 242-251

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
  


##### Preview

<div>
 <div class="color-context-dark" style="padding: 1rem">
  Some text in dark context
</div>
</div>

    

      

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
- **Lines (comments):** 253-257
- **Lines (code):** 259-268

</details>

    

#### Examples

      


``` scss
@include ulu.all-color-class-styles();
```
  



      

Example of a color-context      


``` html
<span class="color-name">Some text</span>
```
  


##### Preview

<div>
<span class="color-name">Some text</span>
</div>

    

      

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
- **Lines (comments):** 102-104
- **Lines (code):** 106-123

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of color to get|

    

#### Returns


|Type|Description|
|:--|:--|
|Color|Note if non-string value is passed it is sent back through, along with custom properties ("var(..." and keywords inherit and transparent. This is by design so that you can always pass a user's colors through this (without having to check if it's a color value or a string [color palette])|

    

#### Require

- require-map-get()
- [$palette](/sass/core/color/#variable-palette)
  


<div class="sassdoc-item-header">

###  exists() {#function-exists}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Check if a color is set in the palette
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 132-132
- **Lines (code):** 134-137

</details>

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- when()
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
- **Lines (comments):** 155-157
- **Lines (code):** 159-161

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
- **Lines (comments):** 163-166
- **Lines (code):** 168-176

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

  

Tint (add white) a color using the default white by a percentage
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 189-194
- **Lines (code):** 196-198
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

###  css-tint() {#function-css-tint}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Tint (add white) a color using the default white by a percentage (Using color-mix)
- This only works in modern browsers (as of June 2025)
- These match ulu.color-tint() and are designed to accept the same arguments with the same results
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 200-205
- **Lines (code):** 207-209

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$color|`Color, String`|Color or custom property to apply mix to|
|$percentage|`Number`|Percentage|

    

#### Returns


|Type|
|:--|
|Color|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  shade() {#function-shade}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Shade (add black) a color with the default black by a percentage
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 211-216
- **Lines (code):** 218-220
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
  


<div class="sassdoc-item-header">

###  css-shade() {#function-css-shade}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Shade (add black) a color using the default white by a percentage (Using color-mix)
- This only works in modern browsers (as of June 2025)
- These match ulu.color-shade() and are designed to accept the same arguments with the same results
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 222-227
- **Lines (code):** 229-231

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$color|`Color, String`|Color or custom property to apply mix to|
|$percentage|`Number`|Percentage|

    

#### Returns


|Type|
|:--|
|Color|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  
  
  