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
  "active-selector":         "&.is-active",
  "box-shadow":              true,
  "line-height":             1.1,
  "letter-spacing":          0.02em,
  "margin":                  (0.45em 0.5em 0.45em 0),
  "min-width":               9rem,
  "padding":                 (0.75em 1.5em),
  "white-space":             nowrap,

  "border-color":            "control-border",
  "border-color-active":     "control-border-active",
  "border-color-hover":      "control-border-hover",
  "border-radius":           2rem,
  "border-width":            1px,
  "background-color":        "control-background",
  "background-color-hover":  "control-background-hover",
  "background-color-active": "control-background-active",
  "color":                   "control",
  "color-hover":             "control-hover",
  "color-active":            "control-active",
  "font-family":             inherit,
  "font-weight":             bold,
  "font-size":               "base",
  "icon-size":               2.5rem,
  "icon-font-size":          1.38rem,
  "icon-border-radius":      50%,
  "text-shadow":             none,
  "text-transform":          none,
  "text-decoration":         none,
  "transition-enabled":      true,
  "transition-duration":     200ms,
  "transition-properties":   (border-color, background-color, color, box-shadow),
  );
```
  

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 21-53
- **Lines (code):** 55-88
    </details>
    

Hello World
  

#### Map Properties


|Name|Type|Default|
|:--|:--|:--|
|active-selector|String|"&.is-active"|
|box-shadow|CssValue|true|
|line-height|Number|1.1|
|letter-spacing|Dimension|0.02em|
|margin|Dimension|(0.45em 0.5em 0.45em 0)|
|min-width|Dimension|9rem|
|padding|Dimension|(0.75em 1.5em)|
|white-space|CssValue|nowrap|
|border-color|String|"control-border"|
|border-color-active|String|"control-border-active"|
|border-color-hover|String|"control-border-hover"|
|border-radius|Dimension|2rem|
|border-width|Dimension|1px|
|background-color|String|"control-background"|
|background-color-hover|String|"control-background-hover"|
|background-color-active|String|"control-background-active"|
|color|String|"control"|
|color-hover|String|"control-hover"|
|color-active|String|"control-active"|
|font-family|CssValue|inherit|
|font-weight|CssValue|bold|
|font-size|String|"base"|
|icon-size|Dimension|2.5rem|
|icon-font-size|Dimension|1.38rem|
|icon-border-radius|Dimension|50%|
|text-shadow|CssValue|none|
|text-transform|CssValue|none|
|text-decoration|CssValue|none|
|transition-enabled|Boolean|true|
|transition-duration|Time|200ms|
|transition-properties|List|(border-color, background-color, color, box-shadow)|

    


<div class="sassdoc-item-header">

###  $sizes {#variable-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

Button sizes
  @type Map
    
    

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
- **Lines (comments):** 90-91
- **Lines (code):** 92-105
    </details>
    

Hello World
  


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
- **Lines (comments):** 107-108
- **Lines (code):** 110-131
    </details>
    

Hello World
  
  

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
- **Lines (comments):** 133-136
- **Lines (code):** 138-140
    </details>
    

Hello World
  

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
- **Lines (comments):** 152-154
- **Lines (code):** 156-158
    </details>
    

Hello World
  

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
- **Lines (comments):** 160-162
- **Lines (code):** 164-166
    </details>
    

Hello World
  

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
- **Lines (comments):** 168-168
- **Lines (code):** 170-181
    </details>
    

Hello World
  


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
- **Lines (comments):** 183-184
- **Lines (code):** 186-243
    </details>
    

Hello World
  

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
- **Lines (comments):** 245-245
- **Lines (code):** 246-250
    </details>
    

Hello World
  

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
- **Lines (comments):** 252-255
- **Lines (code):** 257-267
    </details>
    

Hello World
  

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
- **Lines (comments):** 299-304
- **Lines (code):** 306-317
    </details>
    

Hello World
  

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
- **Lines (comments):** 319-324
- **Lines (code):** 326-332
    </details>
    

Hello World
  

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
- **Lines (comments):** 342-351
- **Lines (code):** 353-369
    </details>
    

Hello World
  

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
- **Lines (comments):** 142-145
- **Lines (code):** 147-150
    </details>
    

Hello World
  

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
- **Lines (comments):** 269-273
- **Lines (code):** 275-297
    </details>
    

Hello World
  

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
  
  
  