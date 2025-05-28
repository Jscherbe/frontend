---
title: Wysiwyg
sassdocGroupName: wysiwyg
---


# Wysiwyg

<div class="type-large">

For auto formatting general HTML elements (used around editor/body text). This selector can't currently be changed.

</div>



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
- **Lines (comments):** 32-35
- **Lines (code):** 37-39

</details>

    

#### Examples

      


``` scss
@include ulu.component-wysiwyg-set(( "property" : value ));
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

  

Output component stylesheet
- Note this is setup so that it can be used for separate stylesheets (ie. tinyMCE or ckeditor)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _wysiwyg.scss
- **Group:** wysiwyg
- **Type:** mixin
- **Lines (comments):** 50-55
- **Lines (code):** 57-65

</details>

    

#### Examples

      


``` scss
@include ulu.component-wysiwyg-styles(true);
// Output not in selector (for editor stylesheet/preview)
@include ulu.component-wysiwyg-styles(false);
```
  



      
  

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
- **Lines (comments):** 41-44
- **Lines (code):** 46-48

</details>

    

#### Examples

      


``` scss
@include ulu.component-wysiwyg-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  

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

    

#### Map Properties


|Name|Type|Default|
|:--|:--|:--|
|img-excluded-selectors|List|(".wysiwyg__exclude",)|
|ul-excluded-selectors|List|(".list-lines", ".wysiwyg__exclude")|
|headline-sizes|Map|Map|

    
  
  