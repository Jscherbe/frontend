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
  "ul-excluded-selectors" : (".list-lines",),
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
- **Lines (comments):** 13-14
- **Lines (code):** 16-25
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
- **File:** _wysiwyg.scss
- **Group:** wysiwyg
- **Type:** mixin
- **Lines (comments):** 27-29
- **Lines (code):** 31-33
    </details>
    

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
- **Lines (comments):** 35-37
- **Lines (code):** 39-41
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  