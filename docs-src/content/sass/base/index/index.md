---
title: Index
sassdocGroupName: index
---


# Index

<div class="type-large">



</div>



## Variables




<div class="sassdoc-item-header">

###  $all-includes {#variable-all-includes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: List</span>
  </div>

</div>

  

Default includes, all modules
    
    

``` scss
$all-includes: (
  "normalize",
  "root"
  "elements," 
  "print", 
  "elements", 
  "keyframes", 
  "typography",
  "color",
  "layout"
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _index.scss
- **Group:** index
- **Type:** variable
- **Lines (comments):** 26-27
- **Lines (code):** 29-39

</details>

    


<div class="sassdoc-item-header">

###  $current-includes {#variable-current-includes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: List</span>
  </div>

</div>

  

Current included modules (for output when using styles), defaults to all
    
    

``` scss
$current-includes: $all-includes;
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _index.scss
- **Group:** index
- **Type:** variable
- **Lines (comments):** 41-42
- **Lines (code):** 44-44

</details>

    
  

## Mixins




<div class="sassdoc-item-header">

###  set-includes() {#mixin-set-includes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Change default includes (when user prints modules)
- This available as configuration so that it can be configured (to allow easily copying configuration)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _index.scss
- **Group:** index
- **Type:** mixin
- **Lines (comments):** 46-48
- **Lines (code):** 50-53

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$includes|`List`|List of modules by name to be included when styles are printed|

    

#### Require

- [$all-includes](/sass/base/index/#variable-all-includes)
- [$current-includes](/sass/base/index/#variable-current-includes)
  


<div class="sassdoc-item-header">

###  set-excludes() {#mixin-set-excludes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Exclude certain items from includes
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _index.scss
- **Group:** index
- **Type:** mixin
- **Lines (comments):** 55-56
- **Lines (code):** 58-60

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$excludes|`List`|List of item names|

    

#### Require

- [$current-includes](/sass/base/index/#variable-current-includes)
  


<div class="sassdoc-item-header">

###  base-styles() {#mixin-base-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints all Base styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _index.scss
- **Group:** index
- **Type:** mixin
- **Lines (comments):** 62-66
- **Lines (code):** 68-97

</details>

    

#### Examples

      


``` scss
@include ulu.base-styles();
```
  



      

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$includes|`List`|$all-includes|A list of components to include (defaults to current)|

    

#### Require

- [$all-includes](/sass/base/index/#variable-all-includes)
  
  
  