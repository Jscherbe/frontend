---
title: Index
sassdocGroupName: index
---


# Index

<div class="type-large">

Outputs helper stylesheets (overriding stylesheets that should be output after base and components)

</div>



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
- **Lines (comments):** 40-42
- **Lines (code):** 44-47

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$includes|`List`|List of modules by name to be included when styles are printed|

    

#### Require

- [$all-includes](/sass/helpers/index/#variable-all-includes)
- [$current-includes](/sass/helpers/index/#variable-current-includes)
  


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
- **Lines (comments):** 49-50
- **Lines (code):** 52-54

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$excludes|`List`|List of item names|

    

#### Require

- [$current-includes](/sass/helpers/index/#variable-current-includes)
  


<div class="sassdoc-item-header">

###  helper-styles() {#mixin-helper-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints all Helper styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _index.scss
- **Group:** index
- **Type:** mixin
- **Lines (comments):** 56-60
- **Lines (code):** 62-85

</details>

    

#### Examples

      


``` scss
@include ulu.helper-styles();
```
  



      

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$includes|`List`|$all-includes|A list of components to include (defaults to all)|

    

#### Require

- [$all-includes](/sass/helpers/index/#variable-all-includes)
  
  

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
  "typography", 
  "units",
  "display",
  "utilities", 
  "print",
  "color"
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _index.scss
- **Group:** index
- **Type:** variable
- **Lines (comments):** 23-24
- **Lines (code):** 26-33

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
- **Lines (comments):** 35-36
- **Lines (code):** 38-38

</details>

    
  
  