---
title: Element
sassdocGroupName: element
---


# Element





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
  "backdrop-blur":                    4px,
  "backdrop-color":                   rgba(73, 73, 73, 0.459),
  "box-shadow":                       0 1px 5px color.get('box-shadow'),
  "box-shadow-hover":                 0 1px 5px color.get('box-shadow-hover'),
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
  

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** variable
- **Lines (comments):** 10-37
- **Lines (code):** 39-69
    </details>
    

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

    


<div class="sassdoc-item-header">

###  $rule-styles {#variable-rule-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Rule style map, redifine defaults or add to
    
    

``` scss
$rule-styles: (
  "default": 1px solid color.get("rule"),
  "light":   1px solid color.get("rule-light"),
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** variable
- **Lines (comments):** 71-72
- **Lines (code):** 74-77
    </details>
    


<div class="sassdoc-item-header">

###  $rule-margins {#variable-rule-margins}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Common rule margins (space between rule and type)
    
    

``` scss
$rule-margins: (
  "smallest": 0.5rem,
  "small":    1rem,
  "medium":   2rem,
  "large":    3rem
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** variable
- **Lines (comments):** 79-80
- **Lines (code):** 82-87
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
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 89-91
- **Lines (code):** 92-94
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  set-rule-styles() {#mixin-set-rule-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Sets rule styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 104-105
- **Lines (code):** 107-109
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$rule-styles](/sass/core/element/#variable-rule-styles)
  


<div class="sassdoc-item-header">

###  set-rule-margins() {#mixin-set-rule-margins}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Sets rule margins
    
    

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 111-112
- **Lines (code):** 114-116
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$rule-margins](/sass/core/element/#variable-rule-margins)
  


<div class="sassdoc-item-header">

###  rule() {#mixin-rule}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Get full rule CSS (style and margin)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 132-133
- **Lines (code):** 135-141
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    


<div class="sassdoc-item-header">

###  link() {#mixin-link}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print link styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 151-153
- **Lines (code):** 155-177
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$visited|`Boolean`|Include visited style|
|$active|`Boolean`|Include active style|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  link-defaults() {#mixin-link-defaults}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print the defautl link styling (no hover and focus styles)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 179-179
- **Lines (code):** 181-194
    </details>
    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  styles-ordered-list() {#mixin-styles-ordered-list}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print the ordered list items styling
    
    

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 196-197
- **Lines (code):** 199-223
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$bullet-color|`Boolean`|Optional bullet color (defaults to palette 'bullet')|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  styles-unordered-list() {#mixin-styles-unordered-list}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print the unordered list items styling
    
    

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 225-226
- **Lines (code):** 228-249
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$bullet-color|`Boolean`|Optional bullet color|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  hidden-visually() {#mixin-hidden-visually}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Hide text for assistive devices
    
    

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 251-256
- **Lines (code):** 258-276
    </details>
    

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




<div class="sassdoc-item-header">

###  get() {#function-get}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a config option
    
    

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** function
- **Lines (comments):** 96-98
- **Lines (code):** 100-102
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- require-map-get()
- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  get-rule-style() {#function-get-rule-style}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a rule style
    
    

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** function
- **Lines (comments):** 118-119
- **Lines (code):** 121-123
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- require-map-get()
- [$rule-styles](/sass/core/element/#variable-rule-styles)
  


<div class="sassdoc-item-header">

###  get-rule-margin() {#function-get-rule-margin}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Sets rule margin
    
    

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** function
- **Lines (comments):** 125-126
- **Lines (code):** 128-130
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- require-map-get()
- [$rule-margins](/sass/core/element/#variable-rule-margins)
  
  
  