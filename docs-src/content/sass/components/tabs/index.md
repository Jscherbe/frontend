---
title: Tabs
sassdocGroupName: tabs
---


# Tabs

<div class="type-large">

Tab interface component styles, for aria based tab interface

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
  "border-radius" : 8px,
  "border-width" : 0.25em,
  "margin" : 2rem,
  "print-margin" : 1.5em,
  "tablist-border-bottom" : true,
  "tablist-border-bottom-width" : 1px,
  "tabpanel-background-color" : rgb(245, 245, 245),
  "tabpanel-x-padding" : 2rem,
  "tab-border-color-selected" : currentColor,
  "tab-color" : "link",
  "tab-color-hover" : "link-hover",
  "tab-color-selected" : "selected",
  "tab-font-weight" : bold,
  "tab-margin-between": 1.25em,
  "tab-margin-between-small": 2em,
  "tab-padding" : 0.75em 0.1em 0.75em 0.1em,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tabs.scss
- **Group:** tabs
- **Type:** variable
- **Lines (comments):** 23-40
- **Lines (code):** 42-59

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|border-radius|Dimension|8px|The border radius of the tabs.|
|border-width|Dimension|0.25em|The width of the tab border.|
|margin|Dimension|2rem|The gap between tabs and above and below tabs.|
|print-margin|Dimension|1.5em|Margin between tabs when stacked for print|
|tablist-border-bottom|CssValue|true|The bottom border of the tabs. If set to true, will use the element.scss property for "get-rule-style".|
|tablist-border-bottom-width|Dimension|1px|The bottom border width for the tablist.|
|tabpanel-background-color|Color|rgb(245, 245, 245)|The tabpanel background color.|
|tabpanel-x-padding|Dimension|2rem|Horizontal padding for the tab panel.|
|tab-border-color-selected|Color|currentColor|The border color when selected.|
|tab-color|String|link|The type color for the tabs. This uses color.scss, so the value of this options should be a variable from color.scss.|
|tab-color-hover|String|link-hover|The type color for the tabs when hovered or focused. This uses color.scss, so the value of this options should be a variable from color.scss.|
|tab-color-selected|String|selected|The tab type color when selected. This uses color.scss, so the value of this options should be a variable from color.scss.|
|tab-font-weight|CssValue|bold|The font weight for the tab text.|
|tab-margin-between|Dimension|1.25em|The margin between tabs.|
|tab-margin-between-small|Dimension|2em|The margin between tabs on small screens.|
|tab-padding|String|0.75em 0.1em 0.75em 0.1em||

    
  

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
  
- **File:** _tabs.scss
- **Group:** tabs
- **Type:** mixin
- **Lines (comments):** 61-64
- **Lines (code):** 66-68

</details>

    

#### Examples

      


``` scss
@include ulu.component-tabs-set(( "property" : value ));
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

  

Output component stylesheet
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _tabs.scss
- **Group:** tabs
- **Type:** mixin
- **Lines (comments):** 80-82
- **Lines (code):** 84-199

</details>

    

#### Examples

      


``` scss
@include ulu.component-tabs-styles();
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
  
- **File:** _tabs.scss
- **Group:** tabs
- **Type:** function
- **Lines (comments):** 70-73
- **Lines (code):** 75-78

</details>

    

#### Examples

      


``` scss
@include ulu.component-tabs-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  