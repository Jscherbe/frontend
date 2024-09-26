---
title: Nav-strip
sassdocGroupName: nav-strip
---


# Nav-strip





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
  "color" : null,
  "color-hover" : null,
  "color-active" : null,
  "font-weight" : null,
  "padding-x" : 0,
  "padding-y" : 0.3em,
  "underline-color" : orange,
  "underline-size" : 3px,
  "margin-between" : 2.25em,
  "underline-color-hover" : gray,
  "activeSelector" : ".is-active",
  "rule-size" : 3px,
  "rule-color" : "rule",
  "rule-offset" : -3px,
  "padding-y-ruled" : null,
  "nowrap" : true
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** variable
- **Lines (comments):** 13-30
- **Lines (code):** 32-49
    </details>
    

#### Map Properties


|Name|Type|Default|
|:--|:--|:--|
|color|Map|null|
|color-hover|Map|null|
|color-active|Map|null|
|font-weight|Map|null|
|padding-x|Map|0|
|padding-y|Map|0.3em|
|underline-color|Map|orange|
|underline-size|Map|3px|
|margin-between|Map|2.25em|
|underline-color-hover|Map|gray|
|activeSelector|Map|.is-active|
|rule-size|Map|3px|
|rule-color|Map|rule|
|rule-offset|Map|-3px|
|padding-y-ruled|Map|null|
|nowrap|Map|true|

    
  

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
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** mixin
- **Lines (comments):** 52-54
- **Lines (code):** 56-58
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
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** mixin
- **Lines (comments):** 68-70
- **Lines (code):** 72-142
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
- **File:** _nav-strip.scss
- **Group:** nav-strip
- **Type:** function
- **Lines (comments):** 60-62
- **Lines (code):** 64-66
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  