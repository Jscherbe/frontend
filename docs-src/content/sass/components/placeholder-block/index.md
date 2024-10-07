---
title: Placeholder-block
sassdocGroupName: placeholder-block
---


# Placeholder-block





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
  "color" : true,
  "background-color" : rgba(0,0,0,0.15),
  "border-width" : 2px,
  "border-width-compact" : 1px,
  "border-style" : dashed,
  "border-color" : rgba(0,0,0,0.3),
  "padding" : 2em,
  "padding-compact" : (0.5em 1em),
  "icon-font-size" : 3em,
  "icon-margin" : 0.25em,
  "icon-color" : rgba(0, 0, 0, 0.5),
  "border-radius" : true,
  "margin-bottom" : true,
  "expanded-height" : 15rem
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _placeholder-block.scss
- **Group:** placeholder-block
- **Type:** variable
- **Lines (comments):** 29-44
- **Lines (code):** 46-61
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|color|Color|true|The type color of the placeholder. If set to true, will use the "type-tertiary" variable from color.scss.|
|background-color|Color|rgba(0,0,0,0.15)|The background color of the placeholder.|
|border-width|Dimension|2px|The border width of the placeholder.|
|border-width-compact|Dimension|1px|The border width of the placeholder when using the compact option.|
|border-style|CssValue|dashed|The border style of the placeholder border.|
|border-color|Color|rgba(0,0,0,0.3)|The border color.|
|padding|Dimension|2em|The padding of the placeholder.|
|padding-compact|Dimension|(0.5em 1em)|The padding of the placeholder when using the compact option.|
|icon-font-size|Dimension|3em|The font-size of the placeholder icon.|
|icon-margin|Dimension|0.25em|The margin of the placeholder icon.|
|icon-color|Color|rgba(0, 0, 0, 0.5)|The icon type color.|
|border-radius|Dimension|true|The border radius of the placeholder. If set to true, will use the "border-radius-large" variable from element.scss.|
|margin-bottom|Dimension|true|The bottom margin of the placeholder. If set to true, will use the "margin" variable from element.scss.|
|expanded-height|Dimension|15rem|The height of the placeholder when using the expanded option.|

    
  

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
- **Lines (comments):** 64-66
- **Lines (code):** 68-70
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

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
- **Lines (comments):** 81-83
- **Lines (code):** 85-115
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
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
- **Lines (comments):** 72-74
- **Lines (code):** 76-79
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  