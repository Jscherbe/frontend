---
title: Menu-stack
sassdocGroupName: menu-stack
---


# Menu-stack





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
  "link-color" : "link",
  "link-background-color" : transparent,
  "link-color-hover" : "link:hover",
  "link-background-color-hover" : rgb(219, 219, 219),
  "link-color-active" : black,
  "link-background-color-active" : rgb(219, 219, 219),
  "link-border-radius" : true,
  "link-padding-y": 0.35em,
  "link-padding-x": 1em,
  "link-margin" : 0.2em,
  "link-separated-rule-style" : false,
  "link-separated-margin" : false,
  "link-icon-margin" : 0.65em,
  "link-icon-width" : 1em,
  "toggle-icon-rotate" : false,
  "link-font-weight" : null,
  "link-active-selectors" : (".is-active", '[aria-current="page"]'),
  "compact-link-padding-y": 0.25em,
  "compact-link-padding-x": 0.75em,
  "rule-style" : "default",
  "rule-margin" : 0.5em,
  "label-type-size" : false,
  "label-color" : null,
  "label-margin" : 0.5em,
  "label-text-transform" : uppercase,
  "checkbox-area-width" : 3em,
  "nested-indent" : 0.5em,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _menu-stack.scss
- **Group:** menu-stack
- **Type:** variable
- **Lines (comments):** 25-53
- **Lines (code):** 55-83
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|link-color|String|link|The type color of the menu-stack toggle. This uses color.scss, so the value of this option should be a color variable from color.scss.|
|link-background-color|Color|transparent|The background color of the menu-stack toggle.|
|link-color-hover|String|link:hover|The type color of the menu-stack toggle when hovered or focused.  This uses color.scss, so the value of this option should be a color variable from color.scss.|
|link-background-color-hover|Color|rgb(219, 219, 219)|The background color of the menu-stack toggle when hovered or focused.|
|link-color-active|Color|black|The type color of the menu-stack toggle when active.|
|link-background-color-active|Color|rgb(219, 219, 219)|The background color of the menu-stack toggle when active.|
|link-border-radius|Dimension|true|The border radius of the menu-stack toggle. If set to true, will use the border radius from the button component.|
|link-padding-y|Dimension|0.35em|Vertical padding for menu-stack toggle.|
|link-padding-x|Dimension|1em|Horizontal padding for menu-stack toggle.|
|link-margin|Dimension|0.2em|Margin for the menu-stack toggle.|
|link-separated-rule-style|Boolean|false|Enables a rule between the items in the menu-stack.|
|link-separated-margin|Boolean|false|Enables a margin between the items in the menu-stack.|
|link-icon-margin|Dimension|0.65em|Adds a right margin to the icon.|
|link-icon-width|Dimension|1em|The width of the icon.|
|link-font-weight|CssValue|null|The font weight of the menu-stack toggle.|
|link-active-selectors|list|(.is-active, '[aria-current=page|')] Selectors to apply active styling.|
|compact-link-padding-y|Dimension|0.25em|The links vertical padding when using the compact option.|
|compact-link-padding-x|Dimension|0.75em|The links horizontal padding when using the compact option.|
|rule-style|String|default|Determines the styling of the rule. Uses the rule.scss component.|
|rule-margin|Dimension|0.5em|Sets the padding and margin of the rule.|
|label-type-size|CssValue|false|Adjusts the type size of the label.|
|label-color|Color|null|The type color of the label.|
|label-margin|Dimension|0.5em|The margin of the label.|
|label-text-transform|CssValue|uppercase|Transforms the label text.|
|checkbox-area-width|Dimension|3em|The width of the checkbox are.|
|nested-indent|Dimension|0.5em|The indentation of child lists within the menu-stack.|
|toggle-icon-rotate|Number|false|Set a value to rotate the collapsible item toggle icon rotation when open (ie. 90deg)|

    
  

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
- **File:** _menu-stack.scss
- **Group:** menu-stack
- **Type:** mixin
- **Lines (comments):** 86-88
- **Lines (code):** 90-92
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _menu-stack.scss
- **Group:** menu-stack
- **Type:** mixin
- **Lines (comments):** 108-112
- **Lines (code):** 114-242
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
```
  

      

#### Todos

- Colors stuff
- Selector prefix
    

#### Require

- [get()](/sass/components/accordion/#function-get)
  
  

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
- **File:** _menu-stack.scss
- **Group:** menu-stack
- **Type:** function
- **Lines (comments):** 94-96
- **Lines (code):** 98-101
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  