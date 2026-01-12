---
title: Button-group
sassdocGroupName: button-group
---


# Button-group

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
  "gap": 0.45em,
  "no-min-width" : true
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _button-group.scss
- **Group:** button-group
- **Type:** variable
- **Lines (comments):** 14-17
- **Lines (code):** 19-22

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|gap|Dimension|0.45em|Gap between buttons|
|no-min-width|Boolean|true|Buttons within the button group should have no min width|

    
  

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
  
- **File:** _button-group.scss
- **Group:** button-group
- **Type:** mixin
- **Lines (comments):** 24-27
- **Lines (code):** 29-31

</details>

    

#### Examples

      


``` scss
@include ulu.component-button-group-set(( "property" : value ));
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
  
- **File:** _button-group.scss
- **Group:** button-group
- **Type:** mixin
- **Lines (comments):** 42-45
- **Lines (code):** 47-90

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/button-group">View</a>

</div>



#### Examples

      


``` scss
@include ulu.component-button-group-styles();
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
  
- **File:** _button-group.scss
- **Group:** button-group
- **Type:** function
- **Lines (comments):** 33-36
- **Lines (code):** 38-40

</details>

    

#### Examples

      


``` scss
@include ulu.component-button-group-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  