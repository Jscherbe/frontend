---
title: All
sassdocGroupName: all
---


# All

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
  "accordion",
  "adaptive-spacing",
  "badge",
  "button",
  "button-verbose",
  "callout",
  "card",
  "card-grid",
  "css-icon",
  "data-grid",
  "data-table",
  "fill-context",
  "flipcard",
  "flipcard-grid",
  "form-theme",
  "horizontal-rule",
  "image-grid",
  "links",
  "list-lines",
  "list-ordered",
  "list-unordered",
  "menu-stack",
  "modal",
  "nav-strip",
  "overlay-section",
  "pager",
  "popover",
  "ratio-box",
  "rule",
  "scroll-slider",
  "skip-link",
  "slider",
  "hero",
  "tabs",
  "tag",
  "tile-grid",
  "tile-button",
  "tile-grid-overlay",
  "placeholder-block",
  "pull-quote",
  "vignette",
  "captioned-figure",
  "spoke-spinner",
  "wysiwyg",
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _index.scss
- **Group:** all
- **Type:** variable
- **Lines (comments):** 98-99
- **Lines (code):** 101-146

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
- **Lines (comments):** 148-149
- **Lines (code):** 151-151

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
- **Lines (comments):** 153-155
- **Lines (code):** 157-160

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$includes|`List`|List of modules by name to be included when styles are printed|

    

#### Require

- [$all-includes](/sass/components/all/#variable-all-includes)
- [$current-includes](/sass/components/all/#variable-current-includes)
  


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
- **Group:** all
- **Type:** mixin
- **Lines (comments):** 162-163
- **Lines (code):** 165-167

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$excludes|`List`|List of item names|

    

#### Require

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
- **Lines (comments):** 169-173
- **Lines (code):** 175-312

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
  
  
  