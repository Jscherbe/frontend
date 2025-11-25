---
title: Button
sassdocGroupName: button
---


# Button

<div class="type-large">

Output core button styles and sizes

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
  "icon-margin" : 0.5em,
  "icon-centered-vertical-offset": true
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 19-21
- **Lines (code):** 23-26

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|icon-margin|Dimension|1em|List of other sizes (large by default), each size is a map of (width, font-size)|

    
  

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
- **Lines (comments):** 28-31
- **Lines (code):** 33-35

</details>

    

#### Examples

      


``` scss
@include ulu.component-button-set(( "property" : value ));
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

  

Output button component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 47-51
- **Lines (code):** 53-112

</details>

    

#### Examples

      


``` scss
@include ulu.component-button-styles();
```
  



      

      


``` html
<a class="button" href="#">Button Default</a>
```
  


##### Preview

<div>
<a class="button" href="#">Button Default</a>
</div>

    

      

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
- **Lines (comments):** 37-40
- **Lines (code):** 42-45

</details>

    

#### Examples

      


``` scss
@include ulu.component-button-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  