---
title: Wysiwyg
sassdocGroupName: wysiwyg
---


# Wysiwyg

For auto formatting general HTML elements (used around editor/body text)



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
  "img-excluded-selectors" : (".wysiwyg__exclude",),
  "ul-excluded-selectors" : (".list-lines", ".wysiwyg__exclude"),
  "headline-sizes" : (
    "h2" : "h2",
    "h3" : "h3",
    "h4" : "h4",
    "h5" : "h5",
    "h6" : "h6",
  )
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _wysiwyg.scss
- **Group:** wysiwyg
- **Type:** variable
- **Lines (comments):** 14-18
- **Lines (code):** 20-30
    </details>
    

Hello World
  

#### Map Properties


|Name|Type|Default|
|:--|:--|:--|
|img-excluded-selectors|List|(".wysiwyg__exclude",)|
|ul-excluded-selectors|List|(".list-lines", ".wysiwyg__exclude")|
|headline-sizes|Map|Map|

    
  

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
- **File:** _wysiwyg.scss
- **Group:** wysiwyg
- **Type:** mixin
- **Lines (comments):** 32-34
- **Lines (code):** 36-38
    </details>
    

Hello World
  

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  

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
- **File:** _wysiwyg.scss
- **Group:** wysiwyg
- **Type:** function
- **Lines (comments):** 40-42
- **Lines (code):** 44-46
    </details>
    

Hello World
  

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  