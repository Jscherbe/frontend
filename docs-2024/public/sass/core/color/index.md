---
title: Color
sassdocGroupName: color
---


# Color





## Variables




###  $palette {#variable-palette} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: map</small>

  

The color palette map, can be extended or modified with set() and accessed with get()
Note do not use names that start with "--" as those are reserved for custom-properties (pass through) also "inherit" is reserved.
    
    

``` scss
$palette: (
  "black":        black,
  "white":        white,
  "type":         black,
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
  

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** variable
- **Lines (comments):** 11-13
- **Lines (code):** 15-34
    
    


###  $contexts {#variable-contexts} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: map</small>

  

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
  

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** variable
- **Lines (comments):** 36-40
- **Lines (code):** 42-53
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$contexts.name.background-color|Number|String|Color value or name of color in $palette|
|$contexts.name.color|Number|String|Color value or name of color in $palette|
|$contexts.name.base-class|Boolean|Print this value in the base module as a class (if base prints)|

    


###  $color-classes {#variable-color-classes} 

<small>Variable&ensp;|&ensp;Access: Public</small>

  

Palette entries that are output as classes when using all-color-class-styles
    
    

``` scss
$color-classes: (
  "black" : true,
  "white" : true,
  "type": true
);
```
  

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** variable
- **Lines (comments):** 55-55
- **Lines (code):** 56-60
    
    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Used to override or extend the color palette
    
    

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 62-68
- **Lines (code):** 70-72
    
    

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
  


###  set-color-classes() {#mixin-set-color-classes} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Set ouput classes for all-color-class-styles
    
    

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 94-95
- **Lines (code):** 97-99
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes (you can disable defaults this way)|

    

#### Require

- [$color-classes](/sass/core/color/#variable-color-classes)
  


###  set-contexts() {#mixin-set-contexts} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Set color contexts
    
    

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 106-116
- **Lines (code):** 118-120
    
    

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
  


###  context-styles() {#mixin-context-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Prints contexts styles
    
    

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 145-146
- **Lines (code):** 148-154
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of context|

    

#### Require

- [get-context()](/sass/core/color/#function-get-context)
- [get-context-value()](/sass/core/color/#function-get-context-value)
- [get()](/sass/core/breakpoint/#function-get)
  


###  all-context-styles() {#mixin-all-context-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Prints all context styles 
    
    

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 178-185
- **Lines (code):** 187-196
    
    

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
  


###  all-color-class-styles() {#mixin-all-color-class-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Outputs all color classes
    
    

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 198-202
- **Lines (code):** 204-213
    
    

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




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a color from the palette by name
    
    

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 74-76
- **Lines (code):** 78-92
    
    

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
  


###  get-context() {#function-get-context} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a context by name
    
    

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 122-124
- **Lines (code):** 126-128
    
    

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
  


###  get-context-value() {#function-get-context-value} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a context's value'
    
    

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 130-133
- **Lines (code):** 135-143
    
    

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
  


###  tint() {#function-tint} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Lighten a color using the default white by a percentage
    
    

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 156-161
- **Lines (code):** 163-165
- **Author:** 
    
    

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
  


###  shade() {#function-shade} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Darken a color with the default black by a percentage
    
    

#### Details

- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 167-172
- **Lines (code):** 174-176
- **Author:** Kitty Giraudel
    
    

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
  
  
  