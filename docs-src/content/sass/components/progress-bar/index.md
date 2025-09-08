---
title: Progress-bar
sassdocGroupName: progress-bar
---


# Progress-bar

<div class="type-large">

Groups a set of buttons

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
  "max-width" : 20rem,
  "margin" : (0 0 0.5em 0),
  "line-height" : true,
  "value-color" : "type-tertiary",
  "value-margin" : 0.5em,
  "value-font-weight" : true,
  "value-margin-deficit" : 0.3em,
  "value-color-deficit" : "danger",
  "bar-height" : 12px,
  "bar-color" : rgb(80, 80, 171),
  "bar-color-deficit" : "danger",
  "icon-margin" : 0.25em,
  "icon-color" : "type-tertiary",
  "icon-color-deficit" : "danger",
  "track-color" : #ccc,
  "track-margin" : (0.1em 0),
  "animation-duration" : 200ms,
  "animation-timing" : ease,
  "animation-initial-duration" : 500ms,
  "animation-initial-timing" : ease-in,
  "animation-indeterminate-duration" : 2.5s
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _progress-bar.scss
- **Group:** progress-bar
- **Type:** variable
- **Lines (comments):** 28-50
- **Lines (code):** 52-74

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|max-width|Dimension|20rem|Max-width of the progress bar.|
|margin|List|(0 0 0.5em 0)|Margin for the progress bar.|
|line-height|Boolean|true|Line height for the progress bar. If true, falls back to typography's `line-height-dense`.|
|value-color|Color|"type-tertiary"|Color of the value text.|
|value-margin|Dimension|0.5em|Margin for the value text.|
|value-font-weight|Boolean|true|Font weight for the value text. If true, falls back to typography's `font-weight-light`.|
|value-margin-deficit|Dimension|0.3em|Margin for the deficit value text.|
|value-color-deficit|Color|"danger"|Color of the deficit value text.|
|bar-height|Dimension|12px|Height of the progress bar.|
|bar-color|Color|rgb(80, 80, 171)|Color of the progress bar.|
|bar-color-deficit|Color|"danger"|Color of the deficit portion of the progress bar.|
|icon-margin|Dimension|0.25em|Margin for the icon.|
|icon-color|Color|"type-tertiary"|Color of the icon.|
|icon-color-deficit|Color|"danger"|Color of the icon in a deficit state.|
|track-color|Color|#ccc|Color of the progress bar track.|
|track-margin|List|(0.1em 0)|Margin for the progress bar track.|
|animation-duration|Time|200ms|Duration of the width transition animation.|
|animation-timing|CssValue|ease|Timing function for the width transition animation.|
|animation-initial-duration|Time|500ms|Duration of the initial fill animation.|
|animation-initial-timing|CssValue|ease-in|Timing function for the initial fill animation.|
|animation-indeterminate-duration|Time|2.5s|Duration of the indeterminate loading animation.|

    


<div class="sassdoc-item-header">

###  $styles {#variable-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map
This is the map of styles (variations in progress bar types)
- Each style becomes the modifier and accepts ("bar-color", "bar-height", "track-color")
- Use this to match whatever progress system(s) your creating</span>
  </div>

</div>

  

``` scss
$styles: (
  "positive" : (
    "bar-color" : "success",
    "icon-color" : "success"
  ),
  "negative" : (
    "bar-color" : "danger",
    "icon-color" : "danger"
  ),
  "small" : (
    "bar-height" : 8px
  ),
  "loader" : (
    "bar-height" : 4px,
    "track-color" : transparent
  )
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _progress-bar.scss
- **Group:** progress-bar
- **Type:** variable
- **Lines (comments):** 76-79
- **Lines (code):** 80-96

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
  
- **File:** _progress-bar.scss
- **Group:** progress-bar
- **Type:** mixin
- **Lines (comments):** 98-101
- **Lines (code):** 103-105

</details>

    

#### Examples

      


``` scss
@include ulu.component-progress-bar-set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  set-styles() {#mixin-set-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Change modules $config
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _progress-bar.scss
- **Group:** progress-bar
- **Type:** mixin
- **Lines (comments):** 107-110
- **Lines (code):** 112-114

</details>

    

#### Examples

      


``` scss
@include ulu.component-progress-bar-set-styles(( "small" : ( "bar-height" : 8px ) ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$styles](/sass/components/callout/#variable-styles)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _progress-bar.scss
- **Group:** progress-bar
- **Type:** mixin
- **Lines (comments):** 126-129
- **Lines (code):** 131-257

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/progress-bar">View</a>

</div>



#### Examples

      


``` scss
@include ulu.component-progress-bar-styles();
```
  



      

#### Require

- [get()](/sass/components/accordion/#function-get)
- [$styles](/sass/components/callout/#variable-styles)
  
  

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
  
- **File:** _progress-bar.scss
- **Group:** progress-bar
- **Type:** function
- **Lines (comments):** 116-119
- **Lines (code):** 121-124

</details>

    

#### Examples

      


``` scss
@include ulu.component-progress-bar-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  