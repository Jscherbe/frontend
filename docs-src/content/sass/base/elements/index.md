---
title: Elements
sassdocGroupName: elements
---


# Elements





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
  "details-animation" : (UluFadeInDown 350ms ease-in-out),
  "link" : true,
  "link-hover" : true,
  "link-visited" : false,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _elements.scss
- **Group:** elements
- **Type:** variable
- **Lines (comments):** 15-20
- **Lines (code):** 22-27

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|details-animation|CssValue|(UluFadeInDown 350ms ease-in-out)|Animation for the details element when toggled.|
|link|Boolean|true|Enables link styling.|
|link-hover|Boolean|true|Enables link hover and focus styling.|
|link-visited|Boolean|true|Enables visited link styling.|

    
  

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
  
- **File:** _elements.scss
- **Group:** elements
- **Type:** mixin
- **Lines (comments):** 29-32
- **Lines (code):** 33-35

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

###  base-elements-styles() {#mixin-base-elements-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints elements base styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _elements.scss
- **Group:** elements
- **Type:** mixin
- **Lines (comments):** 46-49
- **Lines (code):** 51-208

</details>

    

#### Examples

      


``` scss
@include ulu.base-elements-styles();
```
  

      

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
  
- **File:** _elements.scss
- **Group:** elements
- **Type:** function
- **Lines (comments):** 37-40
- **Lines (code):** 42-44

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
  
  
  