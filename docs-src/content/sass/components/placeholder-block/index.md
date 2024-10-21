---
title: Placeholder-block
sassdocGroupName: placeholder-block
---


# Placeholder-block





## Variables




<div class="sassdoc-item-header">

###  $config {#variable-config}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

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
- **Lines (comments):** 46-46
- **Lines (code):** 48-64
    </details>
    

#### Todos

- [joe-check] compact is at the end here (padding-compact) but at the beginning in card-grid(gap-compact)
    


Module Settings
    
    
  

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
- **Lines (comments):** 67-69
- **Lines (code):** 71-73
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
- **Lines (comments):** 84-86
- **Lines (code):** 88-118
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
- **Lines (comments):** 75-77
- **Lines (code):** 79-82
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  