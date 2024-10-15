---
title: Button
sassdocGroupName: button
---


# Button





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
  "padding":                 (0.75em 1.5em),
  "font-family":             inherit,
  "white-space":             nowrap,
  "font-weight":             bold,
  "line-height":             1.1,
  "letter-spacing":          0.02em,
  "text-transform":          none,
  "text-shadow":             none,
  "font-size":               "base",
  "box-shadow":              true,
  "border-radius":           2rem,
  "border-width":            1px,
  "color":                   "control",
  "color-hover":             "control-hover",
  "color-active":            "control-active",
  "border-color":            "control-border",
  "border-color-hover":      "control-border-hover",
  "border-color-active":     "control-border-active",
  "background-color":        "control-background",
  "background-color-hover":  "control-background-hover",
  "background-color-active": "control-background-active",
  "margin":                  (0.45em 0.5em 0.45em 0),
  "min-width":               9rem,
  "icon-size":               2.5rem,
  "icon-font-size":          1.38rem,
  "icon-border-radius":      50%,
  "text-decoration":         none,
  "transition-enabled":      true,
  "transition-duration":     200ms,
  "transition-properties":   (border-color, background-color, color, box-shadow),
  "active-selector":         "&.is-active"
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 21-22
- **Lines (code):** 24-56
    </details>
    


<div class="sassdoc-item-header">

###  $sizes {#variable-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Button sizes
    
    

``` scss
$sizes: (
  "small" : (
    "padding":        (0.35em 1.5em),
    "min-width":      0,
    "icon-size":      2rem,
    "icon-font-size": 1rem
  ),
  "large" : (
    "padding":   (1em 2em),
    "min-width": 11rem,
    "icon-size": 3.5rem
  )
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 58-59
- **Lines (code):** 61-73
    </details>
    


<div class="sassdoc-item-header">

###  $styles {#variable-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Button styles
    
    

``` scss
$styles: (
  "transparent" : (
    "background-color" : transparent,
    "color" : "type",
    "border-color" : transparent,
    "box-shadow" : none,
    "hover" : (
      "background-color" : "white",
      "color" : inherit,
      "border-color" : transparent,
    )
  ),
  "outline" : (
    "background-color" : transparent,
    "color" : "type",
    "border-color" : "rule-light",
    "box-shadow" : none,
    "hover" : (
      "background-color" : "white",
    )
  ),
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 75-76
- **Lines (code):** 78-99
    </details>
    
  

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
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 101-104
- **Lines (code):** 106-108
    </details>
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.set(( "property" : value ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  set-styles() {#mixin-set-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set button styles 
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 120-122
- **Lines (code):** 124-126
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- map-merge()
- [$styles](/sass/core/button/#variable-styles)
  


<div class="sassdoc-item-header">

###  set-sizes() {#mixin-set-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set Button Sizes
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 128-130
- **Lines (code):** 132-134
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- map-merge()
- [$sizes](/sass/core/breakpoint/#variable-sizes)
  


<div class="sassdoc-item-header">

###  reset() {#mixin-reset}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print styles to reset browser button style
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 136-136
- **Lines (code):** 138-149
    </details>
    


<div class="sassdoc-item-header">

###  default() {#mixin-default}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print default button styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 151-152
- **Lines (code):** 154-211
    </details>
    

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$with-reset|`Boolean`|false|Include button.reset()|

    

#### Require

- [reset()](/sass/core/button/#mixin-reset)
- [when-active()](/sass/core/button/#mixin-when-active)
- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  when-active() {#mixin-when-active}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Mixin to wrap in active selectors
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 213-213
- **Lines (code):** 214-218
    </details>
    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  size() {#mixin-size}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print button size styles for a specific size
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 220-223
- **Lines (code):** 225-235
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of size from $sizes|

    

#### See

- [$sizes](/sass/core/breakpoint/#variable-sizes)
- [set-sizes()](/sass/core/breakpoint/#mixin-set-sizes)
  

#### Require

- require-map-get()
- [get()](/sass/core/breakpoint/#function-get)
- [$sizes](/sass/core/breakpoint/#variable-sizes)
  


<div class="sassdoc-item-header">

###  style-styles() {#mixin-style-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print a button style's base styles (not hover)
- In most cases you want the style() mixin
- This is used mainly for trying to match a buttons base styles without including the other state (hover, etc) styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 267-272
- **Lines (code):** 274-285
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of style from $styles|

    

#### See

- [$styles](/sass/core/button/#variable-styles)
- [set-styles()](/sass/core/button/#mixin-set-styles)
  

#### Require

- [get-style-value()](/sass/core/button/#function-get-style-value)
  


<div class="sassdoc-item-header">

###  style-styles-hover() {#mixin-style-styles-hover}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print a button style's base styles (hover styles only)
- In most cases you want the style() mixin
- This is used mainly for trying to match a buttons hover styles without including the base styling
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 287-292
- **Lines (code):** 294-300
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of style from $styles|

    

#### See

- [$styles](/sass/core/button/#variable-styles)
- [set-styles()](/sass/core/button/#mixin-set-styles)
  

#### Require

- [get-style-value()](/sass/core/button/#function-get-style-value)
  


<div class="sassdoc-item-header">

###  style() {#mixin-style}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print a button style
- Includes base/visited styling, and hover/focus state styles
- To print only one of those states, use style-styles or style-styles-hover
- By default this mixin prints the buttons base styles along with :visited state. 
  This is to avoid link visited states effecting the button styles (if used in editor areas 
  or other areas that apply automatic links styling for example. (param below to override behavior)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 310-319
- **Lines (code):** 321-337
    </details>
    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|Name of style from $styles||
|$no-visited|`String`|Do not include :visited selector for button base styles|false|

    

#### See

- [$styles](/sass/core/button/#variable-styles)
- [set-styles()](/sass/core/button/#mixin-set-styles)
  

#### Require

- [style-styles()](/sass/core/button/#mixin-style-styles)
- [style-styles-hover()](/sass/core/button/#mixin-style-styles-hover)
- [when-active()](/sass/core/button/#mixin-when-active)
  
  

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
- **File:** _button.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 110-113
- **Lines (code):** 115-118
    </details>
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- require-map-get()
- function-fallback()
- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  get-style-value() {#function-get-style-value}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a value from a button style
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 237-241
- **Lines (code):** 243-265
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of style from $styles|

    

#### Returns


|Type|Description|
|:--|:--|
|*|The property you were trying to get|

    

#### See

- [$styles](/sass/core/button/#variable-styles)
- [set-styles()](/sass/core/button/#mixin-set-styles)
  

#### Require

- require-map-get()
- [get()](/sass/core/breakpoint/#function-get)
- [$styles](/sass/core/button/#variable-styles)
  
  
  