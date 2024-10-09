---
title: Nav-strip
sassdocGroupName: nav-strip
---


# Nav-strip

A horizontal navigation strip or rail that displays a list of links to
different pages or sections of a website. The active link, indicating the 
current page or section, is visually emphasized with an underline.



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
  "color" : null,
  "color-hover" : null,
  "color-active" : null,
  "font-weight" : null,
  "padding-x" : 0,
  "padding-y" : 0.3em,
  "underline-color" : orange,
  "underline-size" : 3px,
  "margin-between" : 2.25em,
  "underline-color-hover" : gray,
  "activeSelector" : ".is-active",
  "rule-size" : 3px,
  "rule-color" : "rule",
  "rule-offset" : -3px,
  "padding-y-ruled" : null,
  "nowrap" : true,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** variable
- **Lines (comments):** 15-32
- **Lines (code):** 34-51
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|color|Color|null|Type color for the nav-strip.|
|color-hover|Color|null|Type color for the nav-strip when hovered or focused.|
|color-active|Color|null|Type color for the nav-strip when active.|
|font-weight|CssValue|null|Font weight of navstrip.|
|padding-x|Dimension|0|Horizontal padding for the nav-strip links.|
|padding-y|Dimension|0.3em|Vertical padding for the nav-strip links.|
|underline-color|Color|orange|Underline color when link is active.|
|underline-size|Dimension|3px|Size of the underline.|
|margin-between|Dimension|2.25em|Margin between nav-strip items.|
|underline-color-hover|Color|gray|Color of the underline when hovered or focused.|
|activeSelector|String|.is-active|Selector that portrays active status.|
|rule-size|Dimension|3px|Size of the nav-strip rule.|
|rule-color|String|rule|Rule color. Uses rule.scss so the value of this options should be a variable from rule.scss.|
|rule-offset|Dimension|-3px|Offset the rule for the navstrip.|
|padding-y-ruled|Dimension|null|Vertical padding for the nav-strip links when using nav-strip--rule.|
|nowrap|Boolean|true|Disables the word wrap.|

    
  

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
- **Lines (comments):** 54-56
- **Lines (code):** 58-60
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
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** mixin
- **Lines (comments):** 70-72
- **Lines (code):** 74-146
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
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
- **Lines (comments):** 62-64
- **Lines (code):** 66-68
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  