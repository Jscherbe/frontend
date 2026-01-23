---
title: Badge-stack
sassdocGroupName: badge-stack
---


# Badge-stack

<div class="type-large">

Stacks badges

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
  "width": 10rem,
  "overlap": -5px,
  "border-width": 3px,
  "border-color" : "accent"
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _badge-stack.scss
- **Group:** badge-stack
- **Type:** variable
- **Lines (comments):** 12-16
- **Lines (code):** 18-23

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|width|Dimension|10rem|Width of the badge stack|
|overlap|Dimension|-5px|Right margin for stacked items|
|border-width|Dimension|3px|Border width for stacked items|

    
  

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
  
- **File:** _badge-stack.scss
- **Group:** badge-stack
- **Type:** mixin
- **Lines (comments):** 25-28
- **Lines (code):** 30-32

</details>

    

#### Examples

      


``` scss
@include ulu.component-badge-stack-set(( "property" : value ));
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

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _badge-stack.scss
- **Group:** badge-stack
- **Type:** mixin
- **Lines (comments):** 43-46
- **Lines (code):** 48-84

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/badge-stack">View</a>

</div>



#### Examples

      


``` scss
@include ulu.component-badge-stack-styles();
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
  
- **File:** _badge-stack.scss
- **Group:** badge-stack
- **Type:** function
- **Lines (comments):** 34-37
- **Lines (code):** 39-41

</details>

    

#### Examples

      


``` scss
@include ulu.component-badge-stack-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  