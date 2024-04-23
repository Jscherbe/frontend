---
title: Typography
sassdocGroupName: typography
---


# Typography





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "font-size" : 16px, 
  "font-family" : (ui-sans-serif, "Open Sans", Helvetica, Arial, sans-serif),
  "font-family-sans" : (ui-sans-serif, "Open Sans", Helvetica, Arial, sans-serif),
  "font-family-serif" : (Cambria, Georgia, serif),
  "font-family-monospace" : (Menlo, Consolas, Monaco, monospace),
  "font-weight" : inherit,
  "font-weight-headline" : bold,
  "font-weight-light" : 300,
  "font-weight-normal" : normal,
  "font-weight-semibold" : 600,
  "font-weight-bold" : bold,
  "line-height" : 1.5,
  "line-height-dense": 1.3,
  "line-height-spaced": 1.75,
  "size-ratio": 2,
  "size-line-height-ratio": 0.97,
  "scale-steps": 5,
  "responsive-change": 0.05vw, 
  "margin-bottom":  1em,
  "margin-top":  false,
  "letter-spacing-uppercase" : 0.04em,
  "max-width" : 60rem,
  "max-width-small" : 50rem
);
```
  

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** variable
- **Lines (comments):** 17-27
- **Lines (code):** 29-53
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.font-size|Number|Default font size (use pixels, converted, is used for rem base)|
|$config.font-family|Number|Default font family|
|$config.font-family-monospace|Number|Base font-family for monospace|
|$config.line-height|Number|Default line height|
|$config.line-height-dense|Number|Default dense line height|
|$config.size-ratio|Number|Font size scale when using preset sizes, ratio mixin)|
|$config.size-line-height-ratio|Number|Default line height scaling (when using preset sizes, ratio mixin). Can shrink line-height as size increase if desrireable|
|$config.responsive-change|Number|Amount to scale typography by browser's width (use viewport units)|
|$config.margin|Number|Default margin for typography (like paragraphs)|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    


###  $sizes {#variable-sizes} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Default size presets
    
    

``` scss
$sizes: (
  "small-x" :       new-size(scale(-2)),
  "small" :         new-size(scale(-1)),
  "base" :          new-size(scale(0)),
  "large" :         new-size(scale(1),   scale-line-height(1)),
  "large-x" :       new-size(scale(2),   scale-line-height(2)),
  "large-xx" :      new-size(scale(3),   scale-line-height(3)),
  "large-xxx" :     new-size(scale(4),   scale-line-height(4)),
  "h1" :            new-size(scale(6),   scale-line-height(6),   true),
  "h2" :            new-size(scale(5),   scale-line-height(5),   true),
  "h3" :            new-size(scale(4),   scale-line-height(4),   true),
  "h4" :            new-size(scale(3),   scale-line-height(3),   true),
  "h5" :            new-size(scale(2),   scale-line-height(2),   true),
  "h6" :            new-size(scale(1),   scale-line-height(1),   true)
);
```
  

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** variable
- **Lines (comments):** 143-152
- **Lines (code):** 154-168
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$size.name|Number|Name of size|
|$size.name.font-size|Number|Font size in rems or pixels|
|$size.name.line-height|Number|Line height (unitless)|
|$size.name.responsive|Number|Apply responsive sizes|
|$size.name.base-class|Boolean|This style should be included in the base (top can be overriden)|
|$size.name.helper-class|Boolean|This style should be included in the helpers (overrides)|

    

#### Todos

- Add adaptive and use a map of breakpoints and whether it's up or down
- Add headlines
    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 55-57
- **Lines (code):** 59-61
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include typography.set-options(( "font-size" : 14px ));|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [$config](/sass/core/breakpoint/#variable-config)
  


###  word-break() {#mixin-word-break} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Break word stradegy
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 114-115
- **Lines (code):** 117-121
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$force|`Boolean`|Force words to break (will have unusual breaks)|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    


###  set-sizes() {#mixin-set-sizes} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Update the typography presets map
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 170-177
- **Lines (code):** 179-181
    
    

#### Examples

Setting the error and type color      


``` scss
@include typography.set((
  "small" : 0.8rem
));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|A map to merge into the color palette|
|$deep|`Map`|Use deep merge|
|$overwrite|`Map`|Overwrite the presets completly (cannot be used with deep)|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- map-merge()
- [$sizes](/sass/core/breakpoint/#variable-sizes)
  


###  font-size-responsive() {#mixin-font-size-responsive} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print's the responsive type formula
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 267-269
- **Lines (code):** 271-273
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$font-size|`String`|Name to retrieve from sizes map or a unique size map that follows the API|
|$changes|`Map`|Modifications to be merged into size before using|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    


###  size() {#mixin-size} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print a typography size (font-size, line-height)
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 275-278
- **Lines (code):** 280-320
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$nameOrMap|`String`|Name to retrieve from sizes map or a unique size map that follows the API|
|$changes|`Map`|Modifications to be merged into size before using|
|$only-font-size|`Boolean`|Only print the font size|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [font-size-responsive()](/sass/core/typography/#mixin-font-size-responsive)
- [get-size()](/sass/core/breakpoint/#function-get-size)
- [get-size-converted-value()](/sass/core/typography/#function-get-size-converted-value)
- [get()](/sass/core/breakpoint/#function-get)
- [get-size-value()](/sass/core/typography/#function-get-size-value)
  
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 63-65
- **Lines (code):** 67-69
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include typography.set-options(( "font-size" : 14px ));|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- require-map-get()
- [$config](/sass/core/breakpoint/#variable-config)
  


###  scale() {#function-scale} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get scale of the base font-size
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 71-73
- **Lines (code):** 75-77
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$step|`Number`|Current size in the scale you want to calculate|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Scaled value|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [ratio-scale-size()](/sass/core/calculate/#function-ratio-scale-size)
- [get()](/sass/core/breakpoint/#function-get)
  


###  scale-line-height() {#function-scale-line-height} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get scale of the line-height
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 79-82
- **Lines (code):** 84-86
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$step|`Number`|Current size in the scale you want to calculate|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Scaled value|

    

#### Todos

- Setup breakpoints
    

#### Require

- [ratio-scale-size()](/sass/core/calculate/#function-ratio-scale-size)
- [get()](/sass/core/breakpoint/#function-get)
  


###  rem() {#function-rem} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Convert pixel value to rem value based on typography $font-size
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 88-90
- **Lines (code):** 92-98
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$pixels|`Number`|Pixel value to convert from|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Rem value|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


###  em() {#function-em} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Changes pixels to em
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 100-103
- **Lines (code):** 105-112
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`Number`|Pixel value to convert from|
|$base|`Number`|Conversion base (defaults to font-size)|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Rem value|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


###  new-size() {#function-new-size} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Creates a size map 
- This is just an accelerator for creating a size map
- You can pass your own size maps using set-sizes()
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 123-128
- **Lines (code):** 130-141
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$font-size|`Number`|Font size|
|$line-height|`Number`|Line height|
|$is-headline|`Boolean`|Is a headline|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


###  get-size() {#function-get-size} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a size's map
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 183-185
- **Lines (code):** 187-189
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of size|

    

#### Returns


|Type|
|:--|
|Map|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- require-map-get()
- [$sizes](/sass/core/breakpoint/#variable-sizes)
  


###  font-size() {#function-font-size} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Print a font-size for a given size
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 191-193
- **Lines (code):** 195-199
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`String`|Size name|

    

#### Todos

- Remove doesn't work for breakpoints or responsive
    

#### Require

- [get-size()](/sass/core/breakpoint/#function-get-size)
- [get()](/sass/core/breakpoint/#function-get)
- [rem()](/sass/core/typography/#function-rem)
  


###  unitless-line-height() {#function-unitless-line-height} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Forces conversion to unitless line-height
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 201-203
- **Lines (code):** 205-219
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$line-height|`Number`|Line height size in px, em, or rem|
|$font-size|`Number`|Font size in px, em, or rem|

    

#### Throw

- ULU: Unable to convert to unitless line-height for: #\{ $line-height }
    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- strip-unit()
- [rem()](/sass/core/typography/#function-rem)
  


###  get-size-converted-value() {#function-get-size-converted-value} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Print a value from the size and convert it (to appropriate unit for framework)
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 220-222
- **Lines (code):** 224-250
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`Map`|Size's map|
|$props|`String`|The property to get|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- [unitless-line-height()](/sass/core/typography/#function-unitless-line-height)
- [rem()](/sass/core/typography/#function-rem)
  


###  get-size-value() {#function-get-size-value} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a sizes property value that doesn't need conversion 
- Reason: Will map to default if user set's size prop to true
    
    

#### Details

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 253-256
- **Lines (code):** 258-265
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`Map`|Size's map|
|$props|`String`|The property to get|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  
  
  