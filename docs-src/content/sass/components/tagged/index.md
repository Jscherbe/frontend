---
title: Tagged
sassdocGroupName: tagged
---


# Tagged

<div class="type-large">

Provides styles to tags that should appear as superscripts of their related content. Custom properties --ulu-tagged-y, --ulu-tagged-x, and --ulu-tagged-transform can be adjusted if needed (inline style, in a specific styling for something, etc)

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
  "position-x": -0.25em,
  "position-y": -0.25em,
  "transform":  translate(15%, -15%)
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tagged.scss
- **Group:** tagged
- **Type:** variable
- **Lines (comments):** 11-12
- **Lines (code):** 14-18

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
- **Lines (comments):** 20-23
- **Lines (code):** 25-27

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
- **Lines (comments):** 38-40
- **Lines (code):** 42-56

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
- **Lines (comments):** 29-32
- **Lines (code):** 34-36

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
  
  
  