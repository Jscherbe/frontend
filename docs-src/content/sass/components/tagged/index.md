---
title: Tagged
sassdocGroupName: tagged
---


# Tagged

<div class="type-large">

Provides styles to use tile-grid over the top of image

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
  "tag-x-position" :      -0.75em,
  "tag-y-position" :      -0.75em,
  "tag-margin" :          0.25em
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tagged.scss
- **Group:** tagged
- **Type:** variable
- **Lines (comments):** 15-16
- **Lines (code):** 18-22

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
  
- **File:** _tagged.scss
- **Group:** tagged
- **Type:** mixin
- **Lines (comments):** 24-27
- **Lines (code):** 29-31

</details>

    

#### Examples

      


``` scss
@include ulu.component-tagged-set(( "property" : value ));
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

  

Output component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _tagged.scss
- **Group:** tagged
- **Type:** mixin
- **Lines (comments):** 42-44
- **Lines (code):** 46-59

</details>

    

#### Examples

      


``` scss
@include ulu.component-tagged-styles();
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
  
- **File:** _tagged.scss
- **Group:** tagged
- **Type:** function
- **Lines (comments):** 33-36
- **Lines (code):** 38-40

</details>

    

#### Examples

      


``` scss
@include ulu.component-tagged-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  