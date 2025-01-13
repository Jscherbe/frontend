---
title: Tag
sassdocGroupName: tag
---


# Tag

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
  "font-weight" : normal,
  "font-family" : true,
  "box-shadow" : none,
  "padding" : (0.4em 0.75em),
  "vertical-align" : baseline,
  "margin-between" : 0.5em,
  "margin-between-tags" : 0,
  "line-height" : 1,
  "type-size" : "small",
  "background-color" : #eaeaea,
  "border-radius" : 1.25em,
  "border-color" : transparent,
  "border-width" : 1px,
  "color": "type-tertiary",
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** variable
- **Lines (comments):** 23-24
- **Lines (code):** 26-41

</details>

    


<div class="sassdoc-item-header">

###  $styles {#variable-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

Style Map (alternate tag styles)
    
    

``` scss
$styles: (
  "success" : (
    "color" : rgb(37, 73, 37),
    "background-color" : rgb(190, 220, 190),
  ),
  "danger" : (
    "color" : rgb(78, 24, 24),
    "background-color" : rgb(235, 179, 179),
  ),
  "outline" : (
    "background-color" : transparent,
    "border-color" : #ccc
  )
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** variable
- **Lines (comments):** 43-43
- **Lines (code):** 44-57

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
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** mixin
- **Lines (comments):** 60-62
- **Lines (code):** 64-66

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  set-styles() {#mixin-set-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set tag styles 
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** mixin
- **Lines (comments):** 68-70
- **Lines (code):** 72-74

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- [$styles](/sass/components/spoke-spinner/#variable-styles)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** mixin
- **Lines (comments):** 85-87
- **Lines (code):** 89-138

</details>

    

#### Examples

      


``` scss
@include ulu.component-tag-styles();
```
  

      

#### Require

- [get()](/sass/components/accordion/#function-get)
- [$styles](/sass/components/spoke-spinner/#variable-styles)
  
  

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
  
- **File:** _tag.scss
- **Group:** tag
- **Type:** function
- **Lines (comments):** 76-78
- **Lines (code):** 80-83

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  