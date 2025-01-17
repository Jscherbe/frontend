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
  "margin" : (2rem, 0),
  "print-margin" : 1.5em,
  "tablist-divider" : true,
  "tablist-divider-width" : 1px,
  "indicator-size" : 3px,
  "indicator-color" : currentColor,
  "tab-color" : "type-tertiary",
  "tab-color-hover" : "link-hover",
  "tab-color-selected" : "selected",
  "tab-background-color-selected" : null,
  "tab-font-weight" : true,
  "tab-padding" : (0.75em),
  "tab-gap" : 1em,
  "tabpanel-background-color" : #f6f6f6,
  "tabpanel-padding" : (2rem),
  "vertical-tablist-width" : minmax(15rem, 30%),
  "vertical-tab-padding" : (0.25em 0.75em),
  "vertical-divider-width" : 0px,
  "vertical-tab-gap" : 0.75em,
  "vertical-indicator-left" : true,
  "vertical-breakpoint" : true,
  "horizontal-tab-wrap" : false
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tabs.scss
- **Group:** tabs
- **Type:** variable
- **Lines (comments):** 32-55
- **Lines (code):** 57-80

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|margin|Dimension|(2rem, 0)|The margin for the tabs container|
|print-margin|Dimension|1.5em|Margin between tabs when stacked for print|
|tablist-divider|CssValue|true|The border separating the tabs from the panels. By default (true) will use element rule light style|
|tablist-divider-width|Dimension|1px|The width of the divider|
|tabpanel-background-color|Color|rgb(245, 245, 245)|The tabpanel background color.|
|tabpanel-padding|Dimension|(2rem,)|Padding for the tabpanel|
|indicator-size|Dimension|0.25em|The size of the tab's active border/indicator|
|indicator-color|Color|currentColor|The color of the indicator|
|tab-color|Color|link|The type color for the tabs. This uses color.scss, so the value of this options should be a variable from color.scss.|
|tab-color-hover|Color|link-hover|The type color for the tabs when hovered or focused. This uses color.scss, so the value of this options should be a variable from color.scss.|
|tab-color-selected|Color|selected|The tab type color when selected. This uses color.scss, so the value of this options should be a variable from color.scss.|
|tab-background-color-selected|Color|null|The tab background color when selected|
|tab-font-weight|CssValue|true|The font weight for the tab, defaults to typography "font-weight-semibold"|
|tab-padding|Dimension|0.75em 0.1em 0.75em 0.1em|Padding for the tab|
|tab-gap|Dimension|1em|Gap between tabs|
|vertical-tablist-width|Dimension|minmax(15rem, 30%),|The width of the tablist column when tabs are layout is vertical|
|vertical-tab-padding|Dimension|(0.25em 0.75em)|Tab padding when vertical|
|vertical-divider-width|Dimension|0px|Divider between tabs and panels when vertical|
|vertical-tab-gap|Dimension|0.75em|The gap between tabs when vertical|
|vertical-indicator-left|Boolean|true|The indicator for selected tab should be on the left when vertical (false will be on right/inside)|
|vertical-breakpoint|Boolean|true|Set the breakpoint when the vertical tabs should switch to horizontal (defaults to breakpoint 'default')|
|horizontal-tab-wrap|Boolean|false|Set to true to allow line wrapping when the tabs are in horizontal orientation, vertical is always allowed to wrap|

    
  

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
- **Lines (comments):** 82-85
- **Lines (code):** 87-89

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
- **Lines (comments):** 101-103
- **Lines (code):** 105-245

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
- **Lines (comments):** 91-94
- **Lines (code):** 96-99

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
  
  
  