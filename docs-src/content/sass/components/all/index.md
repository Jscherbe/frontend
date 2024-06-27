---
title: All
sassdocGroupName: all
---


# All





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
  "accordion",
  "css-icon",
  "links",
  "button",
  "button-verbose",
  "badge",
  "callout",
  "card",
  "card-grid",
  "rule",
  "list-lines",
  "list-unordered",
  "list-ordered",
  "fill-context",
  "popover",
  "tabs",
  "modal",
  "ratio-box",
  "nav-strip",
  "overlay-section",
  "adaptive-spacing",
  "pager",
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _index.scss
- **Group:** all
- **Type:** variable
- **Lines (comments):** 54-55
- **Lines (code):** 57-80
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
- **Group:** all
- **Type:** variable
- **Lines (comments):** 82-83
- **Lines (code):** 85-85
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
- **Group:** all
- **Type:** mixin
- **Lines (comments):** 87-89
- **Lines (code):** 91-94
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$includes|`List`|List of modules by name to be included when styles are printed|

    

#### Require

- [$all-includes](/sass/components/all/#variable-all-includes)
- [$current-includes](/sass/components/all/#variable-current-includes)
  


<div class="sassdoc-item-header">

###  component-styles() {#mixin-component-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints all Components styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _index.scss
- **Group:** all
- **Type:** mixin
- **Lines (comments):** 96-100
- **Lines (code):** 102-173
    </details>
    

#### Examples

      


``` scss
@include ulu.component-styles();
```
  

      

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$includes|`List`|$all-includes|A list of components to include (defaults to all)|

    

#### Require

- [$all-includes](/sass/components/all/#variable-all-includes)
  
  
  