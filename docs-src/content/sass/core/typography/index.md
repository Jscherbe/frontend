---
title: Typography
sassdocGroupName: typography
---


# Typography





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
  "font-size" : 16px, 
  "font-family" : (ui-sans-serif, "Open Sans", Helvetica, Arial, sans-serif),
  "font-family-sans" : (ui-sans-serif, "Open Sans", Helvetica, Arial, sans-serif),
  "font-family-serif" : (Cambria, Georgia, serif),
  "font-family-monospace" : (Menlo, Consolas, Monaco, monospace),
  "font-weight" : inherit,
  "font-weight-light" : 300,
  "font-weight-normal" : normal,
  "font-weight-semibold" : 600,
  "font-weight-bold" : bold,
  "line-height" : 1.5,
  "line-height-dense": 1.3,
  "line-height-densest": 1.1,
  "line-height-spaced": 1.75,
  "size-ratio": 1.8,
  "size-line-height-ratio": 0.97,
  "scale-steps": 5,
  "responsive-change": 0.05vw, 
  "margin-top":  null,
  "margin-bottom":  1em,
  "letter-spacing-uppercase" : 0.04em,
  "max-width-large" : 75em,
  "max-width" : 60em,
  "max-width-small" : 45em,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** variable
- **Lines (comments):** 17-29
- **Lines (code):** 31-56
    </details>
    

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
|$config.margin-top|Number|Default margin for typography (like paragraphs)|
|$config.margin-bottom|Number|Default margin for typography (like paragraphs)|
|$config.headline-color|Number|Default color for headlines if using preset sizes|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    


<div class="sassdoc-item-header">

###  $sizes {#variable-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Default size presets
    
    

``` scss
$sizes: get-default-sizes();
```
  

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** variable
- **Lines (comments):** 169-178
- **Lines (code):** 180-180
    </details>
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$size.name|Number|Name of size|
|$size.name.font-size|Number|Font size in rems or pixels|
|$size.name.line-height|Number|Line height (unitless)|
|$size.name.responsive|Number|Apply responsive sizes|
|$size.name.base-class|Boolean|This style should be included in the base (top can be overridden)|
|$size.name.helper-class|Boolean|This style should be included in the helpers (overrides)|

    

#### Todos

- Add adaptive and use a map of breakpoints and whether it's up or down
- Add headlines
    
  

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
- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 58-60
- **Lines (code):** 62-64
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include typography.set-options(( "font-size" : 14px ));|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  word-break() {#mixin-word-break}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Break word stradegy
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 117-118
- **Lines (code):** 120-124
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$force|`Boolean`|Force words to break (will have unusual breaks)|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    


<div class="sassdoc-item-header">

###  set-sizes() {#mixin-set-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Update the typography presets map
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 182-189
- **Lines (code):** 191-193
    </details>
    

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
|$overwrite|`Map`|Overwrite the presets completely (cannot be used with deep)|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- map-merge()
- [$sizes](/sass/core/breakpoint/#variable-sizes)
  


<div class="sassdoc-item-header">

###  font-size-responsive() {#mixin-font-size-responsive}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print's the responsive type formula
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 277-279
- **Lines (code):** 281-283
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$font-size|`String`|Name to retrieve from sizes map or a unique size map that follows the API|
|$changes|`Map`|Modifications to be merged into size before using|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    


<div class="sassdoc-item-header">

###  size() {#mixin-size}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print a typography size (font-size, line-height)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 285-288
- **Lines (code):** 290-330
    </details>
    

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
- [get-size-value()](/sass/core/breakpoint/#function-get-size-value)
  
  

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
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 66-68
- **Lines (code):** 70-72
    </details>
    

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
  


<div class="sassdoc-item-header">

###  scale() {#function-scale}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get scale of the base font-size
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 74-76
- **Lines (code):** 78-80
    </details>
    

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
  


<div class="sassdoc-item-header">

###  scale-line-height() {#function-scale-line-height}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get scale of the line-height
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 82-85
- **Lines (code):** 87-89
    </details>
    

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
  


<div class="sassdoc-item-header">

###  rem() {#function-rem}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Convert pixel value to rem value based on typography $font-size
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 91-93
- **Lines (code):** 95-101
    </details>
    

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
  


<div class="sassdoc-item-header">

###  em() {#function-em}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Changes pixels to em
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 103-106
- **Lines (code):** 108-115
    </details>
    

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
  


<div class="sassdoc-item-header">

###  new-size() {#function-new-size}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Creates a size map 
- This is just an accelerator for creating a size map
- You can pass your own size maps using set-sizes()
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 126-131
- **Lines (code):** 133-147
    </details>
    

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
  


<div class="sassdoc-item-header">

###  get-default-sizes() {#function-get-default-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Function that returns default sizes
- Used to set the sizes initially and you can use this if you've reconfigured type and want to just update the default sizes (by passing result to set-sizes())
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 149-150
- **Lines (code):** 151-167
    </details>
    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [new-size()](/sass/core/typography/#function-new-size)
- [scale()](/sass/core/typography/#function-scale)
- [scale-line-height()](/sass/core/typography/#function-scale-line-height)
  


<div class="sassdoc-item-header">

###  get-size() {#function-get-size}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a size's map
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 195-197
- **Lines (code):** 199-201
    </details>
    

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
  


<div class="sassdoc-item-header">

###  has-size() {#function-has-size}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Check if a typography size exists
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 203-205
- **Lines (code):** 207-209
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of size|

    

#### Returns


|Type|
|:--|
|Boolean|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- map-has()
- [$sizes](/sass/core/breakpoint/#variable-sizes)
  


<div class="sassdoc-item-header">

###  unitless-line-height() {#function-unitless-line-height}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Forces conversion to unitless line-height
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 211-213
- **Lines (code):** 215-229
    </details>
    

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
  


<div class="sassdoc-item-header">

###  get-size-converted-value() {#function-get-size-converted-value}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Print a value from the size and convert it (to appropriate unit for framework)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 230-232
- **Lines (code):** 234-260
    </details>
    

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
  


<div class="sassdoc-item-header">

###  get-size-value() {#function-get-size-value}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a sizes property value that doesn't need conversion 
- Reason: Will map to default if user set's size prop to true
    
    

    <details>
      <summary>File Information</summary>
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 263-266
- **Lines (code):** 268-275
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`Map`|Size's map|
|$props|`String`|The property to get|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  
  
  