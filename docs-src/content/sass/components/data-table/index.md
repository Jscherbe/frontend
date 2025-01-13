---
title: Data-table
sassdocGroupName: data-table
---


# Data-table

<div class="type-large">

For tabular data in native HTML tables. Note, this component can be used with the Vue sticky table plugin.

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
  "cell-padding" : (0.5em,),
  "text-align" : left,
  "type-size" : "small",
  "background-color" : white,
  "header-background-color" : #eeeeee,
  "body-background-color" : white,
  "footer-background-color" : #f3f3f3,
  "color" : "type-secondary",
  "line-height" : true,
  "column-min-width" : 6em,
  "first-column-large-min-width" : 15em,
  "border-width" : 1px,
  "border-color" : #dddddd,
  "striped-row-background-color" : #eeeeee,
  "muted-row-background-color" : #ccc,
  "muted-row-border-color" : null,
  "highlighted-row-background-color" : #ccc,
  "highlighted-row-border-color" : null,
  "large-header-cell-padding-y" : 1em,
  "caption-type-size" : "large",
  "caption-font-weight" : bold,
  "caption-margin" : (0 0 1em 0),
  "caption-padding" : (0,),
  "extra-selector" : ".wysiwyg table"
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _data-table.scss
- **Group:** data-table
- **Type:** variable
- **Lines (comments):** 25-26
- **Lines (code):** 28-53

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
  
- **File:** _data-table.scss
- **Group:** data-table
- **Type:** mixin
- **Lines (comments):** 55-57
- **Lines (code):** 59-61

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include ulu.component-data-table-set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output component stylesheet
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _data-table.scss
- **Group:** data-table
- **Type:** mixin
- **Lines (comments):** 72-74
- **Lines (code):** 76-178

</details>

    

#### Examples

      


``` scss
@include ulu.component-data-table-styles();
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
  
- **File:** _data-table.scss
- **Group:** data-table
- **Type:** function
- **Lines (comments):** 63-65
- **Lines (code):** 67-70

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include ulu.component-data-table-get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  