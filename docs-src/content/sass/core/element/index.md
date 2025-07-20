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
  "cap-color" :                       "accent",
  "cap-size" :                        5px
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _element.scss
- **Group:** element
- **Type:** variable
- **Lines (comments):** 10-40
- **Lines (code):** 42-74

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
|link-text-decoration-default|String|Whether links use underline, remember that removing underline will create an accessibility issue (not relying on color)||
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

  

Rule style map, redefine defaults or add to
    
    

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
- **Lines (comments):** 76-77
- **Lines (code):** 79-82

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
- **Lines (comments):** 84-85
- **Lines (code):** 87-92

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
- **Lines (comments):** 94-96
- **Lines (code):** 98-100

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include ulu.element-set(( "property" : value ));|

    

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
- **Lines (comments):** 110-111
- **Lines (code):** 113-115

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
- **Lines (comments):** 117-119
- **Lines (code):** 121-123

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- map-merge()
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
- **Lines (comments):** 139-140
- **Lines (code):** 142-148

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [rule-style()](/sass/core/element/#mixin-rule-style)
- [rule-margin()](/sass/core/element/#mixin-rule-margin)
  


<div class="sassdoc-item-header">

###  rule-style() {#mixin-rule-style}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output CSS for a rule's style (not margins
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 150-151
- **Lines (code):** 153-155

</details>

    

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$name|`String`|"default"|name of rule style|

    

#### Require

- [get-rule-style()](/sass/core/element/#function-get-rule-style)
  


<div class="sassdoc-item-header">

###  rule-margin() {#mixin-rule-margin}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output CSS for a rule's margin
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 157-158
- **Lines (code):** 160-164

</details>

    

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$name|`String`|"default"|name of rule style|

    

#### Require

- [get-rule-margin()](/sass/core/element/#function-get-rule-margin)
- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  link-defaults() {#mixin-link-defaults}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print the default link styling (no hover and focus styles)
- Default link styling just sets the color and the link-text-decoration-default
- This is usually output at the top of the stylesheet to style the general <a> element
- Use link() mixin to print the full link styling (when used in content/text) which includes the full 
  styling (text-decoration, etc)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 166-172
- **Lines (code):** 174-187

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$visited|`Boolean`|Include visited style|
|$active|`Boolean`|Include active style|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  link() {#mixin-link}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output link CSS styles (this is the full link styling when used in content/text)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 189-191
- **Lines (code):** 193-215

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$visited|`Boolean`|Include visited style|
|$active|`Boolean`|Include active style|

    

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
- **Lines (comments):** 217-218
- **Lines (code):** 220-244

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
- **Lines (comments):** 246-247
- **Lines (code):** 249-269

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
- **Lines (comments):** 271-276
- **Lines (code):** 278-296

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

    


<div class="sassdoc-item-header">

###  cap() {#mixin-cap}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Layout utility to add a colored bar (cap) to an element's edge, positioned over the element and its border
- You need to set position (relative, fixed) on parent
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 299-307
- **Lines (code):** 309-332

</details>

    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$side|`String`|The side to place the cap (top, bottom, left, right)||
|$options|`Map`|Options for the appearance of the cap||
|$options.color|`Color`|The color for the end cap|$config.cap-color|
|$options.size|`Number`|The width/height of the cap|$config.cap-size|
|$options.offset|`Number`|A positive number of the amount the cap should extend outside the box (to account for border-width)|0|
|$options.border-radius|`Number`|An optional border-radius to apply to the outward-facing edges of the cap (used to match parent)|null|
|$before|`Boolean`|Whether or not to use the ::before element (if not uses :after)|true|

    

#### Require

- [cap-appearance()](/sass/core/element/#mixin-cap-appearance)
- [get()](/sass/core/breakpoint/#function-get)
- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  cap-appearance() {#mixin-cap-appearance}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Provides the appearance styles for a given cap
- If an option is not provided it won't be output
- This is used to update the caps styling (states, modifiers, etc)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 336-341
- **Lines (code):** 343-385

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$side|`String`|The side to place the cap (top, bottom, left, right)|
|$options|`Map`|Options for the appearance of the cap (see options from element.cap)|
|$before|`Boolean`|Whether or not to use the ::before element (if not uses :after)|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  backdrop-filter-blur() {#mixin-backdrop-filter-blur}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Add backdrop-filter blur
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 387-389
- **Lines (code):** 390-392

</details>

    

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$amount|`CssUnit`|get("backdrop-blur")|Amount to blur|

    


<div class="sassdoc-item-header">

###  hide-focus-ring() {#mixin-hide-focus-ring}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Accessibly hide focus ring while keeping it when it's required
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 394-394
- **Lines (code):** 395-399

</details>

    
  

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
- **Lines (comments):** 102-104
- **Lines (code):** 106-108

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include ulu.element-get("property");|

    

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
- **Lines (comments):** 125-126
- **Lines (code):** 128-130

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
- **Lines (comments):** 132-133
- **Lines (code):** 135-137

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- require-map-get()
- [$rule-margins](/sass/core/element/#variable-rule-margins)
  
  
  