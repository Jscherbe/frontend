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
  "tab-color" : color.get("link"),
  "tab-color-hover" : color.get("link:hover"),
  "tab-color-selected" : color.get("selected"),
  "tab-border-color-selected" : currentColor,
  "tablist-border-bottom" : element.get-rule-style("light"),
  "tabpanel-background-color" : rgb(245, 245, 245)
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _tabs.scss
- **Group:** tabs
- **Type:** variable
- **Lines (comments):** 12-13
- **Lines (code):** 15-25
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
- **Lines (comments):** 27-29
- **Lines (code):** 31-33
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/adaptive-spacing/#variable-config)
  


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
- **Lines (comments):** 43-45
- **Lines (code):** 47-139
    </details>
    

#### Examples

      


``` scss
@include ulu.component-tabs-styles();
```
  

      

#### Require

- [get()](/sass/components/adaptive-spacing/#function-get)
  
  

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
- **Lines (comments):** 35-37
- **Lines (code):** 39-41
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/adaptive-spacing/#variable-config)
  
  
  