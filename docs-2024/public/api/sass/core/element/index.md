---
title: Element
sassdocGroupName: element
---


# Element





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "backdrop-blur":                    4px,
  "backdrop-color":                   rgba(73, 73, 73, 0.459),
  "box-shadow":                       0 1px 5px color.get('box-shadow'),
  "box-shadow:hover":                 0 1px 5px color.get('box-shadow:hover'),
  "box-shadow-raised":                0 1px 12px color.get('box-shadow'),
  "box-shadow-above":                 0 1px 20px color.get('box-shadow'),
  "box-shadow-inset":                 0 1px 5px color.get('box-shadow'),
  "border-radius":                    6px,
  "border-radius-small":              3px,
  "border-radius-large":              12px,
  "text-shadow":                      0 1px 4px rgba(0,0,0,0.3),
  "margin-small":                     0.65em,
  "margin":                           1em,
  "margin-large":                     2em,
  "list-item-indent" :                1.5em,
  "ol-list-style-type":               decimal,
  "ol-list-style-type-2":             lower-alpha,
  "ol-list-style-type-3":             lower-roman,
  "ul-list-style-type":               disc,
  "ul-list-style-type-2":             circle,
  "ul-list-style-type-3":             square,
  "link-text-decoration-default":     none,
  "link-text-decoration":             underline,
  "link-text-decoration-style":       dotted,
  "link-text-decoration-color":       initial,
  "link-text-decoration-style-hover": solid,
  "link-text-decoration-color-hover": false,
  "link-text-decoration-thickness":   0.1em,
  "link-text-underline-offset" :     auto
);
```
  

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** variable
- **Lines (comments):** 10-37
- **Lines (code):** 39-69
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.backdrop-blur|Number|Backdrop blur amount used on elements/components|
|$config.backdrop-color|Color|Backdrop color (modal overlays, etc)|
|$config.box-shadow|List|Box-shadow definition for elements that are on top of page|
|$config.box-shadow-raised|List|Box-shadow definition for elements that are raised off of the page (dropdowns, etc)|
|$config.box-shadow-above|List|Box-shadow definition for elements that are above the page (fixed items, etc)|
|$config.border-radius|Number|Common element border radius|
|$config.border-radius-small|Number|Common element border radius (small)|
|$config.border-radius-large|Number|Common element border radius (large)|
|$config.text-shadow|List|Common text shadow|
|$config.margin-small|Number|Common element margin (small) (default for lists)|
|$config.margin|Number|Common element margin|
|$config.margin-large|Number|Common element margin (large)|
|$config.ol-list-style-type|String|Ordered list type (level 1)|
|$config.ol-list-style-type-2|String|Ordered list type (level 2)|
|$config.ol-list-style-type-3|String|Ordered list type (level 3)|
|$config.ul-list-style-type|String||
|$config.ul-list-style-type-2|String||
|$config.ul-list-style-type-3|String||
|$config.link-text-decoration-default|String|Whether links use underline, remember that removing underline will create an accessiblity issue (not relying on color)|
|$config.link-text-decoration|String||
|$config.link-text-decoration-style|String||
|$config.link-text-decoration-color|Color||
|$config.link-text-decoration-style-hover|String||
|$config.link-text-decoration-color-hover|Color||
|$config.link-text-decoration-thickness|Number||
|$config.link-text-underline-offset|Number||

    


###  $rule-styles {#variable-rule-styles} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Rule style map, redifine defaults or add to
    
    

``` scss
$rule-styles: (
  "default": 1px solid color.get("rule"),
  "light":   1px solid color.get("rule-light"),
);
```
  

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** variable
- **Lines (comments):** 71-72
- **Lines (code):** 74-77
    
    


###  $rule-margins {#variable-rule-margins} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Common rule margins (space between rule and type)
    
    

``` scss
$rule-margins: (
  "smallest": 0.5rem,
  "small":    1rem,
  "medium":   2rem,
  "large":    3rem
);
```
  

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** variable
- **Lines (comments):** 79-80
- **Lines (code):** 82-87
    
    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 89-91
- **Lines (code):** 92-94
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/api/sass/core/breakpoint/#variable-config)
  


###  set-rule-styles() {#mixin-set-rule-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Sets rule styles
    
    

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 104-105
- **Lines (code):** 107-109
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$rule-styles](/api/sass/core/element/#variable-rule-styles)
  


###  set-rule-margins() {#mixin-set-rule-margins} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Sets rule margins
    
    

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 111-112
- **Lines (code):** 114-116
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$rule-margins](/api/sass/core/element/#variable-rule-margins)
  


###  rule() {#mixin-rule} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Get full rule CSS (style and margin)
    
    

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 132-133
- **Lines (code):** 135-141
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    


###  link() {#mixin-link} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print link styles
    
    

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 151-153
- **Lines (code):** 155-177
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$visited|`Boolean`|Include visited style|
|$active|`Boolean`|Include active style|

    

#### Require

- [get()](/api/sass/core/breakpoint/#function-get)
  


###  link-defaults() {#mixin-link-defaults} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print the defautl link styling (no hover and focus styles)
    
    

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 179-179
- **Lines (code):** 181-194
    
    

#### Require

- [get()](/api/sass/core/breakpoint/#function-get)
  


###  styles-ordered-list() {#mixin-styles-ordered-list} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print the ordered list items styling
    
    

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 196-197
- **Lines (code):** 199-223
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$bullet-color|`Boolean`|Optional bullet color (defaults to palette 'bullet')|

    

#### Require

- [get()](/api/sass/core/breakpoint/#function-get)
  


###  styles-unordered-list() {#mixin-styles-unordered-list} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print the unordered list items styling
    
    

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 225-226
- **Lines (code):** 228-249
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$bullet-color|`Boolean`|Optional bullet color|

    

#### Require

- [get()](/api/sass/core/breakpoint/#function-get)
  


###  hidden-visually() {#mixin-hidden-visually} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Hide text for assistive devices
    
    

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 251-256
- **Lines (code):** 258-276
    
    

#### Examples

      


``` scss
@include ulu.layout-hidden-visually()
// Reset styling
@include ulu.layout-hidden-visually(false)
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$hidden|`Boolean`|Defaults to true, pass false to override the hidden css (ie. on focus)|

    
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** function
- **Lines (comments):** 96-98
- **Lines (code):** 100-102
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- require-map-get()
- [$config](/api/sass/core/breakpoint/#variable-config)
  


###  get-rule-style() {#function-get-rule-style} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a rule style
    
    

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** function
- **Lines (comments):** 118-119
- **Lines (code):** 121-123
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- require-map-get()
- [$rule-styles](/api/sass/core/element/#variable-rule-styles)
  


###  get-rule-margin() {#function-get-rule-margin} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Sets rule margin
    
    

#### Details

- **File:** _element.scss
- **Group:** element
- **Type:** function
- **Lines (comments):** 125-126
- **Lines (code):** 128-130
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- require-map-get()
- [$rule-margins](/api/sass/core/element/#variable-rule-margins)
  
  
  