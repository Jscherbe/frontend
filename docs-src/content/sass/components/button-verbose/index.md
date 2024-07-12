---
title: Button-verbose
sassdocGroupName: button-verbose
---


# Button-verbose

A button that has additional markup (ie. page with description for example)
- Used on things like linear pagination (up next)



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
  "margin" : 1em,
  "margin-inline" : 0.75em,
  "padding-x": 0.65em,
  "padding-y": 1em,
  "icon-font-size" : 1.25rem,
  "min-width": 20rem,
  "line-height" : 1.2,
  "icon-color": gray,
  "title-color": color.get("link"),
  "title-margin" : 0.5em,
  "background-color" : white,
  "background-color:hover" : "link",
  "color" : "type",
  "color:hover" : "type",
  "title-color:hover" : "link:hover",
  "border-radius" : "border-radius",
  "box-shadow" : "box-shadow",
  "box-shadow:hover" : element.get("box-shadow:hover"),
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _button-verbose.scss
- **Group:** button-verbose
- **Type:** variable
- **Lines (comments):** 12-13
- **Lines (code):** 15-34
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
- **File:** _button-verbose.scss
- **Group:** button-verbose
- **Type:** mixin
- **Lines (comments):** 36-38
- **Lines (code):** 40-42
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
- **File:** _button-verbose.scss
- **Group:** button-verbose
- **Type:** mixin
- **Lines (comments):** 52-54
- **Lines (code):** 56-100
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
- **File:** _button-verbose.scss
- **Group:** button-verbose
- **Type:** function
- **Lines (comments):** 44-46
- **Lines (code):** 48-50
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  