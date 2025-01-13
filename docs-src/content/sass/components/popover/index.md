---
title: Popover
sassdocGroupName: popover
---


# Popover

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
  "arrow-size"                   : 16px,
  "background-color"             : white,
  "border-radius"                : 6px,
  "color"                        : inherit,
  "max-width"                    : 90vw,
  "max-height"                   : 25rem,
  "padding"                      : 1rem,
  "padding-large"                : 2rem,
  "type-size"                    : null,
  "z-index"                      : true,
  
  "box-shadow"                   : true,
  "box-shadow-footer"            : 0 0 4px,
  "box-shadow-footer-color"      : "box-shadow",
  "header-background-color"      : #ccc,
  "header-color"                 : null,
  "header-media-background-color": black,
  "header-padding-y"             : 0.25rem,
  "footer-background-color"      : #ccc,
  "footer-color"                 : null,
  "footer-padding-y"             : 0.25rem,
  "footer-padding-y-large"       : 0.5rem,
  "tooltip-background-color"     : white,
  "tooltip-color"                : null,
  "tooltip-max-width"            : 20rem,
  "tooltip-padding"              : 0.5rem,
  "tooltip-width"                : auto,
  "width"                        : 15rem,
  "width-large"                  : 30rem,
  "width-large-x"                : 50rem,
  );
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _popover.scss
- **Group:** popover
- **Type:** variable
- **Lines (comments):** 30-60
- **Lines (code):** 62-93

</details>

    

#### Map Properties


|Name|Type|Default|
|:--|:--|:--|
|arrow-size|Dimension|16px|
|background-color|Color|white|
|border-radius|Dimension|6px|
|color|Color|inherit|
|max-width|Dimension|90vw|
|max-height|Dimension|25rem|
|padding|Dimension|1rem|
|padding-large|Dimension|2rem|
|type-size|Dimension|null|
|z-index|Number|true|
|box-shadow|CssValue|true|
|box-shadow-footer|CssValue|0 0 4px|
|box-shadow-footer-color|String|"box-shadow"|
|header-background-color|Color|#ccc|
|header-color|Color|null|
|header-media-background-color|Color|black|
|header-padding-y|Dimension|0.25rem|
|footer-background-color|Color|#ccc|
|footer-color|Color|null|
|footer-padding-y|Dimension|0.25rem|
|footer-padding-y-large|Dimension|0.5rem|
|tooltip-background-color|Color|white|
|tooltip-color|Color|null|
|tooltip-max-width|Dimension|20rem|
|tooltip-padding|Dimension|0.5rem|
|tooltip-width|Dimension|auto|
|width|Dimension|15rem|
|width-large|Dimension|30rem|
|width-large-x|Dimension|50rem|

    
  

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
  
- **File:** _popover.scss
- **Group:** popover
- **Type:** mixin
- **Lines (comments):** 95-98
- **Lines (code):** 100-102

</details>

    

#### Examples

      


``` scss
@include ulu.component-popover-set(( "property" : value ));
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
  
- **File:** _popover.scss
- **Group:** popover
- **Type:** mixin
- **Lines (comments):** 114-116
- **Lines (code):** 118-263

</details>

    

#### Examples

      


``` scss
@include ulu.component-popover-styles();
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
  
- **File:** _popover.scss
- **Group:** popover
- **Type:** function
- **Lines (comments):** 104-107
- **Lines (code):** 109-112

</details>

    

#### Examples

      


``` scss
@include ulu.component-popover-get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  