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
  "tabpanel-background-color" : rgb(245, 245, 245),
  "tab-border-color-selected" : currentColor,
  "tab-color" : "link",
  "tab-color-hover" : "link-hover",
  "tab-color-selected" : "selected",
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tabs.scss
- **Group:** tabs
- **Type:** variable
- **Lines (comments):** 23-34
- **Lines (code):** 36-47

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|border-radius|Dimension|8px|The border radius of the tabs.|
|border-width|Dimension|0.25em|The width of the tab border.|
|margin|Dimension|2rem|The gap between tabs and above and below tabs.|
|print-margin|Dimension|1.5em|Margin between tabs when stacked for print|
|tablist-border-bottom|CssValue|true|The bottom border of the tabs. If set to true, will use the element.scss property for "get-rule-style".|
|tabpanel-background-color|Color|rgb(245, 245, 245)|The tabpanel background color.|
|tab-border-color-selected|Color|currentColor|The border color when selected.|
|tab-color|String|link|The type color for the tabs. This uses color.scss, so the value of this options should be a variable from color.scss.|
|tab-color-hover|String|link-hover|The type color for the tabs when hovered or focused. This uses color.scss, so the value of this options should be a variable from color.scss.|
|tab-color-selected|String|selected|The tab type color when selected. This uses color.scss, so the value of this options should be a variable from color.scss.|

    
  

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
- **Lines (comments):** 49-52
- **Lines (code):** 54-56

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
- **Lines (comments):** 68-70
- **Lines (code):** 72-179

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
- **Lines (comments):** 58-61
- **Lines (code):** 63-66

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
  
  
  