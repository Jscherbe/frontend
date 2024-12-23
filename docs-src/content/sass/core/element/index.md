---
title: Element
sassdocGroupName: element
---


# Element

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
  "backdrop-blur":                    4px,
  "backdrop-color":                   rgba(73, 73, 73, 0.459),
  "list-item-indent" :                1.5em,
  "text-shadow":                      0 1px 4px rgba(0,0,0,0.3),

  "border-radius":                    6px,
  "border-radius-small":              3px,
  "border-radius-large":              12px,
  "box-shadow":                       0 1px 5px color.get('box-shadow'),
  "box-shadow-above":                 0 1px 20px color.get('box-shadow'),
  "box-shadow-hover":                 0 1px 5px color.get('box-shadow-hover'),
  "box-shadow-inset":                 0 1px 5px color.get('box-shadow'),
  "box-shadow-raised":                0 1px 12px color.get('box-shadow'),
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
- **Lines (comments):** 10-40
- **Lines (code):** 42-73

</details>

    

#### Map Properties


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|backdrop-blur|Number|Backdrop blur amount used on elements/components||
|backdrop-color|Color|Backdrop color (modal overlays, etc)||
|list-item-indent|Dimension||1.5em|
|text-shadow|List|Common text shadow||
|border-radius|Number|Common element border radius||
|border-radius-large|Number|Common element border radius (large)||
|border-radius-small|Number|Common element border radius (small)||
|box-shadow|List|Box-shadow definition for elements that are on top of page||
|box-shadow-above|List|Box-shadow definition for elements that are above the page (fixed items, etc)||
|box-shadow-hover|CssValue||0 1px 5px color.get('box-shadow-hover')|
|box-shadow-inset|CssValue||0 1px 5px color.get('box-shadow')|
|box-shadow-raised|List|Box-shadow definition for elements that are raised off of the page (dropdowns, etc)||
|link-text-decoration|String|||
|link-text-decoration-color|Color|||
|link-text-decoration-default|String|Whether links use underline, remember that removing underline will create an accessiblity issue (not relying on color)||
|link-text-decoration-color-hover|Color|||
|link-text-underline-offset|Number|||
|link-text-decoration-style|String|||
|link-text-decoration-style-hover|String|||
|link-text-decoration-thickness|Number|||
|margin|Number|Common element margin||
|margin-large|Number|Common element margin (large)||
|margin-small|Number|Common element margin (small) (default for lists)||
|ol-list-style-type|String|Ordered list type (level 1)||
|ol-list-style-type-2|String|Ordered list type (level 2)||
|ol-list-style-type-3|String|Ordered list type (level 3)||
|ul-list-style-type|String|||
|ul-list-style-type-2|String|||
|ul-list-style-type-3|String|||

    


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
- **Lines (comments):** 75-76
- **Lines (code):** 78-81

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
- **Lines (comments):** 83-84
- **Lines (code):** 86-91

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
- **Lines (comments):** 93-95
- **Lines (code):** 96-98

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
- **Lines (comments):** 108-109
- **Lines (code):** 111-113

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
- **Lines (comments):** 115-116
- **Lines (code):** 118-120

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
- **Lines (comments):** 136-137
- **Lines (code):** 139-145

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
- **Lines (comments):** 155-157
- **Lines (code):** 159-181

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
- **Lines (comments):** 183-183
- **Lines (code):** 185-198

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
- **Lines (comments):** 200-201
- **Lines (code):** 203-227

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
- **Lines (comments):** 229-230
- **Lines (code):** 232-253

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
- **Lines (comments):** 255-260
- **Lines (code):** 262-280

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
- **Lines (comments):** 100-102
- **Lines (code):** 104-106

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
- **Lines (comments):** 122-123
- **Lines (code):** 125-127

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
- **Lines (comments):** 129-130
- **Lines (code):** 132-134

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- require-map-get()
- [$rule-margins](/sass/core/element/#variable-rule-margins)
  
  
  