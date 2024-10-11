---
title: Scroll-slider
sassdocGroupName: scroll-slider
---


# Scroll-slider





## Variables




<div class="sassdoc-item-header">

###  $config {#variable-config}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

Config options
    
    

``` scss
$config: (
  "container" : "container",
  "background-color" : false,
  "margin-top" : 1rem,
  "margin-bottom" : 3rem,
  "padding-top" : 0,
  "padding-bottom" : 0,
  "button-indent" : 1.5rem,
  "button-indent-small" : 0.5rem,
  "button-size" : 3rem,
  "button-font-size" : 1.35rem,
  "button-color" : color.get("type"),
  "button-border" : 2px solid white,
  "button-border-radius" : 50%,
  "button-background-color" : white,
  "button-box-shadow" : element.get("box-shadow"),
  "button-color-hover" : color.get("link"),
  "button-border-color-hover" : white,
  "button-background-color-hover" : white,
  "button-icon-offset-x" : false,
  "button-icon-offset-y" : false,
  "containers" : ("container",),
  "prefix": "scroll-slider"
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _scroll-slider.scss
- **Group:** scroll-slider
- **Type:** variable
- **Lines (comments):** 43-43
- **Lines (code):** 45-68
    </details>
    


Module Settings
    
    
  

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
- **File:** _scroll-slider.scss
- **Group:** scroll-slider
- **Type:** mixin
- **Lines (comments):** 70-73
- **Lines (code):** 75-77
    </details>
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.set(( "property" : value ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  

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
- **File:** _scroll-slider.scss
- **Group:** scroll-slider
- **Type:** function
- **Lines (comments):** 79-81
- **Lines (code):** 83-85
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  