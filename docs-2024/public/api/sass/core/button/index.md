---
title: Button
sassdocGroupName: button
---


# Button





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "padding":                 (0.75em 1.5em),
  "background-color":        color.tint(black, 30%),
  "background-color-hover": black,
  "font-family":             inherit,
  "white-space" :            nowrap,
  "font-weight":             bold,
  "line-height":             1.1,
  "letter-spacing":          0.02em,
  "text-transform":          none,
  "text-shadow":             none,
  "font-size":               "base",
  "color":                   white,
  "color-hover":            white,
  "color-active":            white,
  "box-shadow":              true,
  "border-radius":           2rem,
  "border-width":            0,
  "border-color":            transparent,
  "border-color-hover":     transparent,
  "margin":                  (0.45em 0.5em 0.45em 0),
  "min-width":               9rem,
  "icon-size":               2.5rem,
  "icon-font-size":          1.38rem,
  "icon-border-radius":      50%,
  "text-decoration" :        none
);
```
  

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 22-23
- **Lines (code):** 25-51
    
    


###  $sizes {#variable-sizes} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

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
  

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 53-54
- **Lines (code):** 56-68
    
    


###  $styles {#variable-styles} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

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
    "border-color" : "rule",
    "box-shadow" : none,
    "hover" : (
      "background-color" : "white",
    )
  ),
);
```
  

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 70-71
- **Lines (code):** 73-94
    
    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 96-99
- **Lines (code):** 101-103
    
    

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

- [$config](/api/sass/core/breakpoint/#variable-config)
  


###  set-styles() {#mixin-set-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Set button styles 
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 115-117
- **Lines (code):** 119-121
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- map-merge()
- [$styles](/api/sass/core/button/#variable-styles)
  


###  set-sizes() {#mixin-set-sizes} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Set Button Sizes
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 123-125
- **Lines (code):** 127-129
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- map-merge()
- [$sizes](/api/sass/core/breakpoint/#variable-sizes)
  


###  reset() {#mixin-reset} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print styles to reset browser button style
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 131-131
- **Lines (code):** 133-144
    
    


###  default() {#mixin-default} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print default button styles
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 146-147
- **Lines (code):** 149-196
    
    

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$with-reset|`Boolean`|false|Include button.reset()|

    

#### Require

- [reset()](/api/sass/core/button/#mixin-reset)
- [get()](/api/sass/core/breakpoint/#function-get)
  


###  size() {#mixin-size} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print button size styles for a specifc size
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 198-201
- **Lines (code):** 203-213
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of size from $sizes|

    

#### See

- [$sizes](/api/sass/core/breakpoint/#variable-sizes)
- [set-sizes()](/api/sass/core/breakpoint/#mixin-set-sizes)
  

#### Require

- require-map-get()
- [get()](/api/sass/core/breakpoint/#function-get)
- [$sizes](/api/sass/core/breakpoint/#variable-sizes)
  


###  style-styles() {#mixin-style-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print a button style's base styles (not hover)
- In most cases you want the style() mixin
- This is used mainly for trying to match a buttons base styles without including the other state (hover, etc) styles
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 237-242
- **Lines (code):** 244-252
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of style from $styles|

    

#### See

- [$styles](/api/sass/core/button/#variable-styles)
- [set-styles()](/api/sass/core/button/#mixin-set-styles)
  

#### Require

- [get-style-value()](/api/sass/core/button/#function-get-style-value)
  


###  style-styles-hover() {#mixin-style-styles-hover} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print a button style's base styles (hover styles only)
- In most cases you want the style() mixin
- This is used mainly for trying to match a buttons hover styles without including the base styling
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 254-259
- **Lines (code):** 261-267
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of style from $styles|

    

#### See

- [$styles](/api/sass/core/button/#variable-styles)
- [set-styles()](/api/sass/core/button/#mixin-set-styles)
  

#### Require

- [get-style-value()](/api/sass/core/button/#function-get-style-value)
  


###  style() {#mixin-style} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print a button style
- Includes base/visited styling, and hover/focus state styles
- To print only one of those states, use style-styles or style-styles-hover
- By default this mixin prints the buttons base styles along with :visited state. 
  This is to avoid link visted states effecting the button styles (if used in editor areas 
  or other areas that apply automatic links styling for example. (param below to override behavior)
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 269-278
- **Lines (code):** 280-293
    
    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|Name of style from $styles||
|$no-visited|`String`|Do not include :visited selector for button base styles|false|

    

#### See

- [$styles](/api/sass/core/button/#variable-styles)
- [set-styles()](/api/sass/core/button/#mixin-set-styles)
  

#### Require

- [style-styles()](/api/sass/core/button/#mixin-style-styles)
- [style-styles-hover()](/api/sass/core/button/#mixin-style-styles-hover)
  
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 105-108
- **Lines (code):** 110-113
    
    

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
- [$config](/api/sass/core/breakpoint/#variable-config)
  


###  get-style-value() {#function-get-style-value} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a value from a button style
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 215-219
- **Lines (code):** 221-235
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of style from $styles|

    

#### Returns


|Type|Description|
|:--|:--|
|*|The property you were trying to get|

    

#### See

- [$styles](/api/sass/core/button/#variable-styles)
- [set-styles()](/api/sass/core/button/#mixin-set-styles)
  

#### Require

- require-map-get()
- [get()](/api/sass/core/breakpoint/#function-get)
- [$styles](/api/sass/core/button/#variable-styles)
  
  
  