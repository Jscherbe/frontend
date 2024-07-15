---
title: Tabs
sassdocGroupName: tabs
---


# Tabs





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
  "border-radius" : 8px,
  "border-width" : 0.25em,
  "margin" : 2rem,
  "tab-color" : "link",
  "tab-color-hover" : "link:hover",
  "tab-color-selected" : "selected",
  "tab-border-color-selected" : currentColor,
  "tablist-border-bottom" : true,
  "tabpanel-background-color" : rgb(245, 245, 245)
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _tabs.scss
- **Group:** tabs
- **Type:** variable
- **Lines (comments):** 22-23
- **Lines (code):** 25-35
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
- **File:** _tabs.scss
- **Group:** tabs
- **Type:** mixin
- **Lines (comments):** 37-39
- **Lines (code):** 41-43
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

  

Prints tabs component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _tabs.scss
- **Group:** tabs
- **Type:** mixin
- **Lines (comments):** 54-56
- **Lines (code):** 58-150
    </details>
    

#### Examples

      


``` scss
@include ulu.component-tabs-styles();
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
- **File:** _tabs.scss
- **Group:** tabs
- **Type:** function
- **Lines (comments):** 45-47
- **Lines (code):** 49-52
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  