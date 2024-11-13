---
title: Hero
sassdocGroupName: hero
---


# Hero





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
  "graphic-height-stacked" : 60vh,
  "content-max-width" : 40rem,
  "text-align" : center
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _hero.scss
- **Group:** hero
- **Type:** variable
- **Lines (comments):** 14-15
- **Lines (code):** 17-23

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
  
- **File:** _hero.scss
- **Group:** hero
- **Type:** mixin
- **Lines (comments):** 25-27
- **Lines (code):** 29-31

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
  
- **File:** _hero.scss
- **Group:** hero
- **Type:** mixin
- **Lines (comments):** 41-44
- **Lines (code):** 46-149

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/Check out our demo [accordion]">Our Demo</a>

</div>



#### Examples

      


``` scss
@include ulu.component-hero-styles();
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
  
- **File:** _hero.scss
- **Group:** hero
- **Type:** function
- **Lines (comments):** 33-35
- **Lines (code):** 37-39

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  