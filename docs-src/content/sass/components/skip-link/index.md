---
title: Skip-link
sassdocGroupName: skip-link
---


# Skip-link





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
  "padding" : (1em 2em),
  "background-color" : white,
  "box-shadow" : true,
  "border-radius" : true,
  "z-index" : true
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _skip-link.scss
- **Group:** skip-link
- **Type:** variable
- **Lines (comments):** 29-30
- **Lines (code):** 32-38

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
  
- **File:** _skip-link.scss
- **Group:** skip-link
- **Type:** mixin
- **Lines (comments):** 40-42
- **Lines (code):** 44-46

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

  

Prints component styles
- Note: This needs to be paired with the display helper class "hidden-visually-focusable"
- Note: Remember to add an id to the content you want to skip to. Often this will go to the content after the nav menu.
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _skip-link.scss
- **Group:** skip-link
- **Type:** mixin
- **Lines (comments):** 57-70
- **Lines (code):** 72-89

</details>

    

#### Examples

      


``` scss
@include ulu.component-skip-link-styles();
```
  

      

      


``` html
<a 
  class="skip-link hidden-visually-focusable" 
  href="#main-content"
>
  Skip to main content
</a>
...
<main id="main-content">...</main>
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
  
- **File:** _skip-link.scss
- **Group:** skip-link
- **Type:** function
- **Lines (comments):** 48-50
- **Lines (code):** 52-55

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  