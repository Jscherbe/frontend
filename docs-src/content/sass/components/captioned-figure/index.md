---
title: Captioned-figure
sassdocGroupName: captioned-figure
---


# Captioned-figure

Figure with caption layout (to position caption)



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
  "box-shadow" : true,
  "margin-bottom" : true,
  "line-height" : true,
  "padding" :  0.5em,
  "max-width" : min(100%, 25em),
  "color" : null,
  "background-color" : rgba(255,255,255,0.7),
  "backdrop-filter" : blur(2px),
  "traditional-color" : null,
  "traditional-background-color" : transparent,
  "traditional-margin-top" : 1em,
  "traditional-padding" : 0,
  "traditional-max-width" : 35em,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _captioned-figure.scss
- **Group:** captioned-figure
- **Type:** variable
- **Lines (comments):** 30-31
- **Lines (code):** 33-47
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
- **File:** _captioned-figure.scss
- **Group:** captioned-figure
- **Type:** mixin
- **Lines (comments):** 49-51
- **Lines (code):** 53-55
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
- **File:** _captioned-figure.scss
- **Group:** captioned-figure
- **Type:** mixin
- **Lines (comments):** 66-69
- **Lines (code):** 71-146
    </details>
    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/Check out our demo [accordion]">Our Demo</a>

</div>



#### Examples

      


``` scss
@include ulu.component-captioned-figure-styles();
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
- **File:** _captioned-figure.scss
- **Group:** captioned-figure
- **Type:** function
- **Lines (comments):** 57-59
- **Lines (code):** 61-64
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  