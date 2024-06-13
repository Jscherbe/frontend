---
title: Button
sassdocGroupName: button
---


# Button





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
  "icon-margin" : 1em
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 12-13
- **Lines (code):** 15-17
    </details>
    


<div class="sassdoc-item-header">

###  $config {#variable-config-1}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Module Settings
    
    

``` scss
$config: (
  "color"                   : inherit,
  "background-color"        : white,
  "padding"                 : 1rem,
  "padding-large"           : 2rem,
  "max-width"               : 90vw,
  "max-height"              : 25rem,
  "width"                   : 15rem,
  "width-large"             : 30rem,
  "width-large-x"           : 50rem,
  "type-size"               : null,
  "z-index"                 : layout.get("z-index-fixed") + 1,
  "box-shadow"              : element.get("box-shadow-above"),
  "box-shadow-footer"       : 0 0 4px color.get("box-shadow"),
  "border-radius"           : 6px,
  "arrow-size"              : 16px,
  "footer-padding-y"        : 0.25rem,
  "footer-padding-y-large"  : 0.5rem,
  "footer-background-color" : color.shade(white, 3%),
  "footer-color"            : inherit,
  "tooltip-background-color": white,
  "tooltip-padding"         : (1.5rem 1.25rem),
  "tooltip-width"           : max(min-content, 20rem),
  "tooltip-color"           : inherit,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _popover.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 16-35
- **Lines (code):** 37-61
    </details>
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.color|Number|Type color|
|$config.background-color|Number|Popover background color|
|$config.padding|Number|Padding for popover|
|$config.padding-large|Number|Padding for large popover|
|$config.max-width|Number|Max width for popover (default 90% viewport width)|
|$config.width|Number|Width for popovers|
|$config.width-large|Number|Width for large popovers|
|$config.width-large-x|Number|Width for large-x popovers|
|$config.max-height|Number|Max height of the inner content of popover|
|$config.type-size|Number|Set a type size (see typography)|
|$config.z-index|Number|Change default z-index|
|$config.box-shadow|Number|Box shadow|
|$config.box-shadow-footer|Number|Box shadow for footer|
|$config.border-radius|Number|Border radius|
|$config.arrow-size|Number|Arrow size (should match JS setting)|
|$config.tooltip-background-color|Number|Background color for tooltip type popovers|
|$config.tooltip-padding|Number|Padding for tooltip type popovers|
|$config.tooltip-color|Number|Color for tooltip type popovers|

    
  

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
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 19-21
- **Lines (code):** 23-25
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

  

Prints button component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 35-39
- **Lines (code):** 41-98
    </details>
    

#### Examples

      


``` scss
@include ulu.component-button-styles();
```
  

      

      


``` html
<a class="button" href="#">Button Default</a>
```
  

      

#### Require

- [get()](/sass/components/accordion/#function-get)
  


<div class="sassdoc-item-header">

###  set() {#mixin-set-1}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Change modules $config
    
    

    <details>
      <summary>File Information</summary>
- **File:** _popover.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 63-65
- **Lines (code):** 67-69
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles-1}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _popover.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 79-81
- **Lines (code):** 83-198
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
- **File:** _button.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 27-29
- **Lines (code):** 31-33
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  get() {#function-get-1}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a config option
    
    

    <details>
      <summary>File Information</summary>
- **File:** _popover.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 71-73
- **Lines (code):** 75-77
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  