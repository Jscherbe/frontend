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
  "list-item-indent" :                1.5em,
  "text-shadow":                      0 1px 4px rgba(0,0,0,0.3),

  "border-radius":                    6px,
  "border-radius-small":              3px,
  "border-radius-large":              12px,
  "box-shadow":                       0 1px 5px color.get('box-shadow'),
  "box-shadow-hover":                 0 1px 5px color.get('box-shadow-hover'),
  "box-shadow-raised":                0 1px 12px color.get('box-shadow'),
  "box-shadow-above":                 0 1px 20px color.get('box-shadow'),
  "box-shadow-inset":                 0 1px 5px color.get('box-shadow'),
  "link-text-decoration":             underline,
  "link-text-decoration-color":       initial,
  "link-text-decoration-color-hover": false,
  "link-text-decoration-default":     none,
  "link-text-underline-offset" :     auto,
  "link-text-decoration-style":       dotted,
  "link-text-decoration-style-hover": solid,
  "link-text-decoration-thickness":   0.1em,
  "margin":                           1em,
  "margin-small":                     0.65em,
  "margin-large":                     2em,
  "ol-list-style-type":               decimal,
  "ol-list-style-type-2":             lower-alpha,
  "ol-list-style-type-3":             lower-roman,
  "ul-list-style-type":               disc,
  "ul-list-style-type-2":             circle,
  "ul-list-style-type-3":             square,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _element.scss
- **Group:** element
- **Type:** variable
- **Lines (comments):** 10-37
- **Lines (code):** 39-70
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
- **Lines (comments):** 72-73
- **Lines (code):** 75-78
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
- **Lines (comments):** 80-81
- **Lines (code):** 83-88
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
- **Lines (comments):** 90-92
- **Lines (code):** 93-95
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
- **Lines (comments):** 105-106
- **Lines (code):** 108-110
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
- **Lines (comments):** 112-113
- **Lines (code):** 115-117
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
- **Lines (comments):** 133-134
- **Lines (code):** 136-142
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
- **Lines (comments):** 152-154
- **Lines (code):** 156-178
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
- **Lines (comments):** 180-180
- **Lines (code):** 182-195
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
- **Lines (comments):** 197-198
- **Lines (code):** 200-224
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
- **Lines (comments):** 226-227
- **Lines (code):** 229-250
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
- **Lines (comments):** 252-257
- **Lines (code):** 259-277
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
- **Lines (comments):** 97-99
- **Lines (code):** 101-103
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
- **Lines (comments):** 119-120
- **Lines (code):** 122-124
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
- **Lines (comments):** 126-127
- **Lines (code):** 129-131
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- require-map-get()
- [$rule-margins](/sass/core/element/#variable-rule-margins)
  
  
  