---
title: Flipcard
sassdocGroupName: flipcard
---


# Flipcard

Creates adaptive (changing at breakpoints)n between items (vertical/horizontal layout)



## Variables




<div class="sassdoc-item-header">

###  $config {#variable-config}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

``` scss
$config: (
  "background-color" : white,
  "background-color-back" : rgb(178, 178, 178),
  "border" : 1px solid black,
  "border-radius" : 6px,
  "border-color-hover" : black,
  "control-button-border-focus" : 2px solid blue,
  "anim-duration" : 430ms,
  "anim-delay" : 200ms,
  "padding" : 1.5rem,
  "title-color" : red,
  "title-color-hover" : green,
  "icon-color" : pink,
  "icon-color-hover" : aqua,
  "icon-color-image" : aqua,
  "icon-color-image-hover" : pink,
  "title-color-image" : black,
  "title-color-image-hover" : blue,
  "bottom-shadow" : true
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** variable
- **Lines (comments):** 15-17
- **Lines (code):** 19-38
    </details>
    

#### Todos

- Why was the shadow originally set to the negative size of it's parent element? Should it just be bottom?  Line 173
added some reduced motion where I thought applicable. Line 111
    


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
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** mixin
- **Lines (comments):** 40-42
- **Lines (code):** 44-46
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  set-sizes() {#mixin-set-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set sizes map
    
    

    <details>
      <summary>File Information</summary>
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** mixin
- **Lines (comments):** 48-50
- **Lines (code):** 52-54
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- [$sizes](/sass/components/adaptive-spacing/#variable-sizes)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints adaptive spacing component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** mixin
- **Lines (comments):** 64-66
- **Lines (code):** 68-244
    </details>
    

#### Examples

      


``` scss
@include ulu.component-adaptive-spacing-styles();
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
- **File:** _flipcard.scss
- **Group:** flipcard
- **Type:** function
- **Lines (comments):** 56-58
- **Lines (code):** 60-62
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  