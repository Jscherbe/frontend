---
title: Nav-strip
sassdocGroupName: nav-strip
---


# Nav-strip

<div class="type-large">

A horizontal navigation strip or rail that displays a list of links to
different pages or sections of a website. The active link, indicating the 
current page or section, is visually emphasized with an underline.

</div>



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
  
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** mixin
- **Lines (comments):** 55-58
- **Lines (code):** 60-62

</details>

    

#### Examples

      


``` scss
@include ulu.component-nav-strip-set(( "property" : value ));
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
  
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** mixin
- **Lines (comments):** 73-75
- **Lines (code):** 77-157

</details>

    

#### Examples

      


``` scss
@include ulu.component-nav-strip-styles();
```
  



      

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
  
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** function
- **Lines (comments):** 64-67
- **Lines (code):** 69-71

</details>

    

#### Examples

      


``` scss
@include ulu.component-nav-strip-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  

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
  "activeSelector" : "&.is-active, &.has-active",
  "color" : null,
  "color-active" : null,
  "color-hover" : null,
  "font-weight" : null,
  "margin-between" : 2.25em,
  "padding-x" : 0,
  "padding-y" : 0.3em,
  "padding-y-ruled" : null,
  "nowrap" : true,
  "rule-color" : "rule-light",
  "rule-offset" : 0,
  "rule-size" : 3px,
  "underline-color" : "selected",
  "underline-color-hover" : "rule",
  "underline-size" : 3px,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** variable
- **Lines (comments):** 16-33
- **Lines (code):** 35-52

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|activeSelector|String|.is-active|Selector that portrays active status.|
|color|Color|null|Type color for the nav-strip.|
|color-active|Color|null|Type color for the nav-strip when active.|
|color-hover|Color|null|Type color for the nav-strip when hovered or focused.|
|font-weight|CssValue|null|Font weight of navstrip.|
|margin-between|Dimension|2.25em|Margin between nav-strip items.|
|nowrap|Boolean|true|Disables the word wrap.|
|padding-x|Dimension|0|Horizontal padding for the nav-strip links.|
|padding-y|Dimension|0.3em|Vertical padding for the nav-strip links.|
|padding-y-ruled|Dimension|null|Vertical padding for the nav-strip links when using nav-strip--rule.|
|underline-color|Color|orange|Underline color when link is active.|
|underline-size|Dimension|3px|Size of the underline.|
|underline-color-hover|Color|gray|Color of the underline when hovered or focused.|
|rule-color|String|rule|Rule color. Uses rule.scss so the value of this options should be a variable from rule.scss.|
|rule-size|Dimension|3px|Size of the nav-strip rule.|
|rule-offset|Dimension|-3px|Offset the rule for the navstrip.|

    
  
  