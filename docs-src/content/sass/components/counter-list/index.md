---
title: Counter-list
sassdocGroupName: counter-list
---


# Counter-list

<div class="type-large">

Outputs badge component stylesheet

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
  // config for number
  "ol-margin" : 2rem 0,
  "li-margin-bottom" : 1rem,
  // "li-padding-top" : 0.5rem,
  "counter-start" : 0,
  "counter-size" : 3rem,
  "counter-gap" : 1rem,
  "counter-list-style" : numeric,
  "counter-border-radius" : 50%,
  "counter-font-size" : 20px,
  "counter-color" : white,
  "counter-background-color" : "accent",

  "counter-mobile-toggle" : true,
  "counter-gap-mobile": 2rem,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _counter-list.scss
- **Group:** counter-list
- **Type:** variable
- **Lines (comments):** 12-13
- **Lines (code):** 15-31

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
  
- **File:** _counter-list.scss
- **Group:** counter-list
- **Type:** mixin
- **Lines (comments):** 33-36
- **Lines (code):** 38-40

</details>

    

#### Examples

      


``` scss
@include ulu.component-counter-list-set(( "property" : value ));
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

  

Output counter-list component styles
needs built
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _counter-list.scss
- **Group:** counter-list
- **Type:** mixin
- **Lines (comments):** 51-52
- **Lines (code):** 54-103

</details>

    

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
  
- **File:** _counter-list.scss
- **Group:** counter-list
- **Type:** function
- **Lines (comments):** 42-45
- **Lines (code):** 47-49

</details>

    

#### Examples

      


``` scss
@include ulu.component-counter-list-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  