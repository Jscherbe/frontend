---
title: Layout
sassdocGroupName: layout
---


# Layout

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
  "containers" : true,
  "container-nested-no-padding" : false,
  "layout-flex" : true,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** variable
- **Lines (comments):** 10-14
- **Lines (code):** 16-20

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|containers|Boolean|true|Enables container styling.|
|container-nested-no-padding|Boolean|false|Toggles whether nested receive horizontal padding or not.|
|layout-flex|Boolean|true|Enables layout-flex styling.|

    
  

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
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 22-25
- **Lines (code):** 26-28

</details>

    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/base/elements/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output Styles 
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 39-39
- **Lines (code):** 41-102

</details>

    

#### Require

- [get()](/sass/base/elements/#function-get)
  
  

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
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 30-33
- **Lines (code):** 35-37

</details>

    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/base/elements/#variable-config)
  
  
  