---
title: Menu-stack
sassdocGroupName: menu-stack
---


# Menu-stack

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
  "checkbox-area-width" : 3em,
  "nested-indent" : 0.5em,
  "rule-style" : "default",
  "rule-margin" : 0.5em,
  "link-separated-margin" : false,
  "link-separated-rule-style" : false,
  "toggle-icon-rotate" : false,
  "compact-link-padding-x": 0.75em,
  "compact-link-padding-y": 0.25em,
  "label-color" : null,
  "label-margin" : 0.5em,
  "label-text-transform" : uppercase,
  "label-type-size" : false,
  "link-active-selectors" : (".is-active", '[aria-current="page"]'),
  "link-background-color" : transparent,
  "link-background-color-active" : rgb(219, 219, 219),
  "link-background-color-hover" : rgb(219, 219, 219),
  "link-border-radius" : true,
  "link-color" : "link",
  "link-color-active" : black,
  "link-color-hover" : "link-hover",
  "link-font-weight" : null,
  "link-icon-margin" : 0.65em,
  "link-icon-width" : 1em,
  "link-margin" : 0.2em,
  "link-padding-x": 1em,
  "link-padding-y": 0.35em,
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
|checkbox-area-width|Dimension|3em|The width of the checkbox area.|
|link-separated-margin|Boolean|false|Enables a margin between the items in the menu-stack.|
|link-separated-rule-style|Boolean|false|Enables a rule between the items in the menu-stack.|
|nested-indent|Dimension|0.5em|The indentation of child lists within the menu-stack.|
|rule-margin|Dimension|0.5em|Sets the padding and margin of the rule.|
|rule-style|String|default|Determines the styling of the rule. Uses the rule.scss component.|
|toggle-icon-rotate|Number|false|Set a value to rotate the collapsible item toggle icon rotation when open (ie. 90deg)|
|compact-link-padding-x|Dimension|0.75em|The links horizontal padding when using the compact option.|
|compact-link-padding-y|Dimension|0.25em|The links vertical padding when using the compact option.|
|label-color|Color|null|The type color of the label.|
|label-margin|Dimension|0.5em|The margin of the label.|
|label-text-transform|CssValue|uppercase|Transforms the label text.|
|label-type-size|CssValue|false|Adjusts the type size of the label.|
|link-active-selectors|list|(.is-active, '[aria-current=page|')] Selectors to apply active styling.|
|link-background-color|Color|transparent|The background color of the menu-stack toggle.|
|link-background-color-active|Color|rgb(219, 219, 219)|The background color of the menu-stack toggle when active.|
|link-background-color-hover|Color|rgb(219, 219, 219)|The background color of the menu-stack toggle when hovered or focused.|
|link-border-radius|Dimension|true|The border radius of the menu-stack toggle. If set to true, will use the border radius from the button component.|
|link-color|String|link|The type color of the menu-stack toggle. This uses color.scss, so the value of this option should be a color variable from color.scss.|
|link-color-active|Color|black|The type color of the menu-stack toggle when active.|
|link-color-hover|String|link-hover|The type color of the menu-stack toggle when hovered or focused.  This uses color.scss, so the value of this option should be a color variable from color.scss.|
|link-font-weight|CssValue|null|The font weight of the menu-stack toggle.|
|link-icon-margin|Dimension|0.65em|Adds a right margin to the icon.|
|link-icon-width|Dimension|1em|The width of the icon.|
|link-margin|Dimension|0.2em|Margin for the menu-stack toggle.|
|link-padding-x|Dimension|1em|Horizontal padding for menu-stack toggle.|
|link-padding-y|Dimension|0.35em|Vertical padding for menu-stack toggle.|

    
  

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
- **Lines (comments):** 86-89
- **Lines (code):** 91-93

</details>

    

#### Examples

      


``` scss
@include ulu.component-menu-stack-set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

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
- **Lines (comments):** 110-114
- **Lines (code):** 116-244

</details>

    

#### Examples

      


``` scss
@include ulu.component-menu-stack-styles();
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
- **Lines (comments):** 95-98
- **Lines (code):** 100-103

</details>

    

#### Examples

      


``` scss
@include ulu.component-menu-stack-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  