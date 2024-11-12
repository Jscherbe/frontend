---
title: Split-hero
sassdocGroupName: split-hero
---


# Split-hero





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
  "breakpoint" : "medium",
  "height" : 100vh,
  "height-stacked" : 60vh
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _split-hero.scss
- **Group:** split-hero
- **Type:** variable
- **Lines (comments):** 13-14
- **Lines (code):** 16-20

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
  
- **File:** _split-hero.scss
- **Group:** split-hero
- **Type:** mixin
- **Lines (comments):** 22-24
- **Lines (code):** 26-28

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
  
- **File:** _split-hero.scss
- **Group:** split-hero
- **Type:** mixin
- **Lines (comments):** 38-41
- **Lines (code):** 43-104

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/Check out our demo [accordion]">Our Demo</a>

</div>



#### Examples

      


``` scss
@include ulu.component-split-hero-styles();
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
  
- **File:** _split-hero.scss
- **Group:** split-hero
- **Type:** function
- **Lines (comments):** 30-32
- **Lines (code):** 34-36

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  