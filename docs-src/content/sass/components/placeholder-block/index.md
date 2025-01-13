---
title: Placeholder-block
sassdocGroupName: placeholder-block
---


# Placeholder-block

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
  "background-color" : rgba(0,0,0,0.15),
  "color" : true,
  "expanded-height" : 15rem,
  "margin-bottom" : true,
  "padding" : 2em,
  "padding-compact" : (0.5em 1em),

  "border-color" : rgba(0,0,0,0.3),
  "border-radius" : true,
  "border-style" : dashed,
  "border-width" : 2px,
  "border-width-compact" : 1px,
  "icon-color" : rgba(0, 0, 0, 0.5),
  "icon-font-size" : 3em,
  "icon-margin" : 0.25em,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _placeholder-block.scss
- **Group:** placeholder-block
- **Type:** variable
- **Lines (comments):** 31-46
- **Lines (code):** 48-65

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|rgba(0,0,0,0.15)|The background color of the placeholder.|
|color|Color|true|The type color of the placeholder. If set to true, will use the "type-tertiary" variable from color.scss.|
|margin-bottom|Dimension|true|The bottom margin of the placeholder. If set to true, will use the "margin" variable from element.scss.|
|padding|Dimension|2em|The padding of the placeholder.|
|padding-compact|Dimension|(0.5em 1em)|The padding of the placeholder when using the compact option.|
|expanded-height|Dimension|15rem|The height of the placeholder when using the expanded option.|
|border-color|Color|rgba(0,0,0,0.3)|The border color.|
|border-radius|Dimension|true|The border radius of the placeholder. If set to true, will use the "border-radius-large" variable from element.scss.|
|border-style|CssValue|dashed|The border style of the placeholder border.|
|border-width|Dimension|2px|The border width of the placeholder.|
|border-width-compact|Dimension|1px|The border width of the placeholder when using the compact option.|
|icon-font-size|Dimension|3em|The font-size of the placeholder icon.|
|icon-margin|Dimension|0.25em|The margin of the placeholder icon.|
|icon-color|Color|rgba(0, 0, 0, 0.5)|The icon type color.|

    
  

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
  
- **File:** _placeholder-block.scss
- **Group:** placeholder-block
- **Type:** mixin
- **Lines (comments):** 68-71
- **Lines (code):** 73-75

</details>

    

#### Examples

      


``` scss
@include ulu.component-placeholder-block-set(( "property" : value ));
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
  
- **File:** _placeholder-block.scss
- **Group:** placeholder-block
- **Type:** mixin
- **Lines (comments):** 87-89
- **Lines (code):** 91-121

</details>

    

#### Examples

      


``` scss
@include ulu.component-placeholder-block-styles();
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
  
- **File:** _placeholder-block.scss
- **Group:** placeholder-block
- **Type:** function
- **Lines (comments):** 77-80
- **Lines (code):** 82-85

</details>

    

#### Examples

      


``` scss
@include ulu.component-placeholder-block-get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  