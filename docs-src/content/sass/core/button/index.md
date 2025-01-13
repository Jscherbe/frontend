---
title: Button
sassdocGroupName: button
---


# Button

<div class="type-large">



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
- **Lines (code):** 55-87

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|active-selector|String|"&.is-active"|The selector that determines if a button is active|
|box-shadow|CssValue|true|Specify box shadow for default button. Default true will fallback to element "box-shadow"|
|line-height|Number|1.1|Line height for button|
|letter-spacing|Dimension|0.02em||
|margin|Dimension|(0.45em 0.5em 0.45em 0)|Margin for buttons, usually left margin is omitted so buttons can flow inline and make space between them and the next element inline|
|min-width|Dimension|9rem|The smallest width for all buttons|
|padding|Dimension|(0.75em 1.5em)|Button inner padding value, pass space separated list|
|white-space|CssValue|nowrap|Adjust button line wrapping, by default line's are not wrapped|
|border-color|String|"control-border"|The border color for the button, usually if there is no border we set this to match the background color so if a button with no borders is adjacent a style that has borders the heights will match.|
|border-color-hover|String|"control-border-hover"|Color of border when button is hovered|
|border-color-active|String|"control-border-active"|Color of border when a button has active class|
|border-radius|Dimension|2rem|Border Radius for button|
|border-width|Dimension|1px|Width of button border|
|background-color|String|"control-background"|Background color of button|
|background-color-hover|String|"control-background-hover"|Background color of button when hovered|
|background-color-active|String|"control-background-active"|Background color of button when active|
|color|String|"control"|Text color of button|
|color-hover|String|"control-hover"|Text color of button when hovered|
|color-active|String|"control-active"|Text color of button when active|
|font-family|CssValue|inherit|Font family for button|
|font-weight|CssValue|bold|Font weight for button|
|font-size|String|"base"|Font size for button, can be omitted if it should inherit, sizes can also work with utility type size classes|
|icon-size|Dimension|2.5rem|The size of a button when used with an icon|
|icon-font-size|Dimension|1.38rem|The font size for the icon when a button is an icon button|
|icon-border-radius|Dimension|50%|The border radius of a icon button (defaults to 50% circle)|
|text-shadow|CssValue|none|Text shadow for button|
|text-transform|CssValue|none|Text transform for button|
|text-decoration|CssValue|none|Text decoration of button|
|transition-enabled|Boolean|true|Whether or not to enable transitions on button properties like background-color, color, border color as they change state|
|transition-duration|Time|200ms|The duration of the button's transition if enabled|
|transition-properties|List|(border-color, background-color, color, box-shadow)|The properties to transition if `transition-enabled`|

    


<div class="sassdoc-item-header">

###  $sizes {#variable-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Button sizes
- A map that holds to the sizes for buttons in the theme
- Use set-sizes() to adjust the sizes for the theme
- Don't edit sizes variable directly
    
    

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
- **Lines (comments):** 89-93
- **Lines (code):** 94-107

</details>

    


<div class="sassdoc-item-header">

###  $styles {#variable-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Button styles
- A map of styles for each button in the theme. Us set-styles() to overwrite or merge into these styles
- Don't edit styles variable directly
    
    

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
- **Lines (comments):** 109-112
- **Lines (code):** 114-135

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
- **Lines (comments):** 137-140
- **Lines (code):** 142-144

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
- See $styles for example of structure of map
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 156-159
- **Lines (code):** 161-163

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
- See $sizes for example of structure of map
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 165-168
- **Lines (code):** 170-172

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

  

Reset CSS for button (to change browser defaults for button styling)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 174-174
- **Lines (code):** 176-187

</details>

    


<div class="sassdoc-item-header">

###  default() {#mixin-default}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output the default button styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 189-190
- **Lines (code):** 192-249

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
- Use to match the button's active selector
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 251-259
- **Lines (code):** 261-265

</details>

    

#### Examples

      


``` scss
// Site specific styling for active button
.button {
  @include when-active() {
    background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c);
  }
}
```
  

      

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
- **Lines (comments):** 267-270
- **Lines (code):** 272-282

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
- **Lines (comments):** 314-319
- **Lines (code):** 321-332

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
- **Lines (comments):** 334-339
- **Lines (code):** 341-347

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
- **Lines (comments):** 357-366
- **Lines (code):** 368-384

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
- **Lines (comments):** 146-149
- **Lines (code):** 151-154

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
- **Lines (comments):** 284-288
- **Lines (code):** 290-312

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
  
  
  