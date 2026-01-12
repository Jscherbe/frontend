---
title: Breadcrumb
sassdocGroupName: breadcrumb
---


# Breadcrumb

<div class="type-large">

Breadcrumb trail list layout

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
  "row-gap":              0.5em,
  "margin" :              (0 0 1.25em 0),
  "color":                 "type-tertiary",
  "color-hover":           "link-hover",
  "line-height":           true,
  "item-max-width":        15em,
  "separator-margin":      (0 0.5em),
  "separator-color":       null,
  "separator-opacity":     0.7,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _breadcrumb.scss
- **Group:** breadcrumb
- **Type:** variable
- **Lines (comments):** 24-34
- **Lines (code):** 36-46

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|margin|List|(0 0 1.25em 0)|Margin for component|
|row-gap|CssUnit|0.35em|Gap when breadcrumbs wrap|
|color|Color|"type-tertiary"|Base color (links inherit this)|
|color-hover|Color|"link-hover"|Color for link hover|
|line-height|CssUnit|true|Line height, defaults to typography line-height-densest|
|item-max-width|CssUnit|15em|Max length of item text|
|separator-color|Color|null|Optional color to apply to separator|
|separator-opacity|Number|0.7|Optional opacity for separator|
|separator-margin|List|(0 0.5em)|Separator margin|

    
  

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
  
- **File:** _breadcrumb.scss
- **Group:** breadcrumb
- **Type:** mixin
- **Lines (comments):** 48-51
- **Lines (code):** 53-55

</details>

    

#### Examples

      


``` scss
@include ulu.component-breadcrumb-set(( "property" : value ));
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

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _breadcrumb.scss
- **Group:** breadcrumb
- **Type:** mixin
- **Lines (comments):** 67-70
- **Lines (code):** 72-110

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/breadcrumb">View</a>

</div>



#### Examples

      


``` scss
@include ulu.component-breadcrumb-styles();
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
  
- **File:** _breadcrumb.scss
- **Group:** breadcrumb
- **Type:** function
- **Lines (comments):** 57-60
- **Lines (code):** 62-65

</details>

    

#### Examples

      


``` scss
@include ulu.component-breadcrumb-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  