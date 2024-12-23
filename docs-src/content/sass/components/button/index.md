---
title: Button
sassdocGroupName: button
---


# Button

<div class="type-large">



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
  "icon-margin" : 0.5em
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 12-14
- **Lines (code):** 16-19

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|icon-margin|Dimension|1em|List of other sizes (large by defualt), each size is a map of (width, font-size)|

    
  

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
  
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 21-23
- **Lines (code):** 25-27

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

  

Prints button component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 37-41
- **Lines (code):** 43-100

</details>

    

#### Examples

      


``` scss
@include ulu.component-button-styles();
```
  

      

      


``` html
<a class="button" href="#">Button Default</a>
```
  

      

#### Require

- [get()](/sass/components/accordion/#function-get)
- [$sizes](/sass/components/adaptive-spacing/#variable-sizes)
- $styles
  
  

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
  
- **File:** _button.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 29-31
- **Lines (code):** 33-35

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  