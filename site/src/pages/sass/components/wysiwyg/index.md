---
title: Wysiwyg
sassdocGroupName: wysiwyg
---


# Wysiwyg

<div class="type-large">

For auto formatting general HTML elements (used around editor/body text). This selector can't currently be changed.

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
  "exclude-selector" : ".wysiwyg__exclude",
  "img-excluded-selectors" : (),
  "ul-excluded-selectors" : (".list-lines",),
  "link-excluded-selectors" : ("[class]",),
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
- **Lines (comments):** 14-20
- **Lines (code):** 22-34

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|exclude-selector|String|".wysiwyg__exclude"|Applied to all selectors|
|img-excluded-selectors|List|()|Extra selectors to prevent <img> styling|
|ul-excluded-selectors|List|(".list-lines",)|Extra selectors to prevent <ul> styling|
|link-excluded-selectors|List|("[class|",)] Extra selectors to prevent <a> styling|
|headline-sizes|Map|Map|Headlines from typography sizes (ElementName : TypographySizeName, ...)|

    
  

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
- **Lines (comments):** 36-39
- **Lines (code):** 41-43

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
- **Lines (comments):** 54-59
- **Lines (code):** 61-69

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
- **Lines (comments):** 45-48
- **Lines (code):** 50-52

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
  
  
  