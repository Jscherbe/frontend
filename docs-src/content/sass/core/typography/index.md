---
title: Typography
sassdocGroupName: typography
---


# Typography

<div class="type-large">

Manages typography settings, sizes and provides typography related utilities

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
  "letter-spacing-uppercase": 0.04em,
  "margin-bottom":            1em,
  "margin-top":               null,
  "responsive-change":        0.05vw,
  "scale-steps":              5,
  "size-ratio":               1.8,
  "size-line-height-ratio":   0.97,
  "font-family":              (ui-sans-serif, "Open Sans", Helvetica, Arial, sans-serif),
  "font-family-monospace":    (Menlo, Consolas, Monaco, monospace),
  "font-family-sans":         (ui-sans-serif, "Open Sans", Helvetica, Arial, sans-serif),
  "font-family-serif":        (Cambria, Georgia, serif),
  "font-size":                16px,
  "font-weight":              inherit,
  "font-weight-bold":         bold,
  "font-weight-light":        300,
  "font-weight-normal":       normal,
  "font-weight-semibold":     600,
  "line-height":              1.5,
  "line-height-dense":        1.3,
  "line-height-densest":      1.1,
  "line-height-spaced":       1.75,
  "max-width":                60em,
  "max-width-large":          75em,
  "max-width-small":          45em,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _typography.scss
- **Group:** typography
- **Type:** variable
- **Lines (comments):** 16-38
- **Lines (code):** 40-65

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|letter-spacing-uppercase|Dimension|0.04em||
|margin-bottom|Number|1em|Default margin for typography (like paragraphs)|
|margin-top|Number|null|Default margin for typography (like paragraphs)|
|responsive-change|Number|0.05vw|Amount to scale typography by browser's width (use viewport units)|
|scale-steps|Number|5||
|size-ratio|Number|1.8|Font size scale when using preset sizes, ratio mixin)|
|size-line-height-ratio|Number|0.97|Default line height scaling (when using preset sizes, ratio mixin). Can shrink line-height as size increase if desirable|
|font-family|Number|(ui-sans-serif, "Open Sans", Helvetica, Arial, sans-serif)|Default font family|
|font-family-monospace|Number|(Menlo, Consolas, Monaco, monospace)|Base font-family for monospace|
|font-family-sans|CssValue|(ui-sans-serif, "Open Sans", Helvetica, Arial, sans-serif)||
|font-family-serif|CssValue|(Cambria, Georgia, serif||
|font-size|Number|16px|Default font size (use pixels, converted, is used for rem base)|
|font-weight|CssValue|inherit||
|font-weight-bold|CssValue|bold||
|font-weight-light|CssValue|300||
|font-weight-normal|CssValue|normal||
|font-weight-semibold|CssValue|600||
|line-height|Number|1.5|Default line height|
|line-height-dense|Number|1.3|Default dense line height|
|line-height-densest|Number|1.1||
|line-height-spaced|Number|1.75||

    


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
- **Lines (comments):** 182-191
- **Lines (code):** 193-193

</details>

    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$size.name|Number|Name of size|
|$size.name.font-size|Number|Font size in rems or pixels|
|$size.name.line-height|Number|Line height (unitless)|
|$size.name.responsive|Number|Apply responsive sizes|
|$size.name.breakpoints|Number|Map of breakpoints where each key is breakpoint with map of changes (ie. font-size, etc)|
|$size.name.breakpoints.breakpoint.direction|Number|Direction the breakpoint should be applied to (ie. min/max)|
|$size.name.base-class|Boolean|This style should be included in the base (top can be overridden)|
|$size.name.helper-class|Boolean|This style should be included in the helpers (overrides)|

    
  

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
- **Lines (comments):** 67-69
- **Lines (code):** 71-73

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include typography.set(( "font-size" : 14px ));|

    

#### Require

- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  word-break() {#mixin-word-break}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output CSS Break word strategy
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 126-127
- **Lines (code):** 129-133

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$force|`Boolean`|Force words to break (will have unusual breaks)|

    


<div class="sassdoc-item-header">

###  set-sizes() {#mixin-set-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Configure the typography sizes
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 195-212
- **Lines (code):** 214-216

</details>

    

#### Examples

Adjusting the h1 and h2 sizes while keeping pre-existing sizes by using deep merge      


``` scss
@include typography.set-sizes((
  "h1" : (
    "color" : "accent",
    "font-size": 50px,
    "margin-top" : null,
    "margin-bottom" : 0.5em
  ),
  "h2" : (
    "font-size": 38px,
    "color" : blue,
    "margin-top" : 2.5em,
    "margin-bottom" : 1em,
  ),
), "deep");
```
  



      

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$changes|`Map`|A map to merge into the color palette||
|$merge-mode|`Map`|Merge strategy see, utils.map-merge options|null|

    

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
- **Lines (comments):** 300-302
- **Lines (code):** 304-306

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$font-size|`String`|Name to retrieve from sizes map or a unique size map that follows the API|
|$changes|`Map`|Modifications to be merged into size before using|

    


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
- **Lines (comments):** 308-311
- **Lines (code):** 313-354

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$nameOrMap|`String`|Name to retrieve from sizes map or a unique size map that follows the API|
|$changes|`Map`|Modifications to be merged into size before output|
|$only-font-size|`Boolean`|Only output the font size|

    

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
- **Lines (comments):** 75-77
- **Lines (code):** 79-81

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include typography.get(( "font-size" : 14px ));|

    

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
- **Lines (comments):** 83-85
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
- **Lines (comments):** 91-94
- **Lines (code):** 96-98

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
- **Lines (comments):** 100-102
- **Lines (code):** 104-110

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$pixels|`Number`|Pixel value to convert from|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Rem value|

    

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
- **Lines (comments):** 112-115
- **Lines (code):** 117-124

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
- This is opinionated about how sizes are setup, headlines get (margins, bold, headline color) and are base classes while non-headlines are added as helper classes and do not get (margins, bold, color)
- You can pass your own size maps using set-sizes()
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 135-141
- **Lines (code):** 143-157

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$font-size|`Number`|Font size|
|$line-height|`Number`|Line height|
|$is-headline|`Boolean`|Is a headline|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  get-default-sizes() {#function-get-default-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Function that returns default sizes
- Used to set the sizes initially and 
- You can use this if you've reconfigured typography settings and want to update the default sizes with the new settings
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 159-162
- **Lines (code):** 164-180

</details>

    

#### Returns


|Type|Description|
|:--|:--|
|Map|The default typography sizes|

    

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

  

Get a specific size's settings map
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 218-220
- **Lines (code):** 222-224

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of size|

    

#### Returns


|Type|
|:--|
|Map|

    

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
- **Lines (comments):** 226-228
- **Lines (code):** 230-232

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of size|

    

#### Returns


|Type|
|:--|
|Boolean|

    

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
- **Lines (comments):** 234-236
- **Lines (code):** 238-252

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$line-height|`Number`|Line height size in px, em, or rem|
|$font-size|`Number`|Font size in px, em, or rem|

    

#### Throw

- ULU: Unable to convert to unitless line-height for: #\{ $line-height }
    

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
- **Lines (comments):** 254-256
- **Lines (code):** 258-284

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`Map`|Size's map|
|$props|`String`|The property to get|

    

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
- **Lines (comments):** 286-289
- **Lines (code):** 291-298

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`Map`|Size's map|
|$props|`String`|The property to get|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  
  
  