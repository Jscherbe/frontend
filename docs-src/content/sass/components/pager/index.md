---
title: Pager
sassdocGroupName: pager
---


# Pager





## Variables




<div class="sassdoc-item-header">

###  $config {#variable-config}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

``` scss
$config: (
  "background-color":              "link",
  "background-color-hover":        "link-hover",
  "border-color":                  "link",
  "border-color-hover":            "link-hover",
  "border-radius":                 50%,
  "border-width":                  1px,
  "color":                         white,
  "color-hover":                   white,
  "font-weight":                   bold,
  "item-margin":                   0.17rem,
  "margin-bottom":                 2rem,
  "margin-top":                    1rem,
  "width":                         2.5rem,

  "active-background-color":       #ccc,
  "active-border-color":           #ccc,
  "active-color":                  "type",
  "active-font-weight":            bold,
  
  "action-background-color":       "link",
  "action-background-color-hover": "link-hover",
  "action-border-color":           transparent,
  "action-border-color-hover":     "link",
  "action-color":                  white,
  "action-color-hover":            white,
  "action-margin":                 0.8rem,
  "action-width":                  2.5rem,
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _pager.scss
- **Group:** pager
- **Type:** variable
- **Lines (comments):** 41-41
- **Lines (code):** 42-70
    </details>
    

#### Todos

- [joe-check] active comes before (active-color) while other modules have it come afer(color-active)
    


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
- **File:** _pager.scss
- **Group:** pager
- **Type:** mixin
- **Lines (comments):** 72-74
- **Lines (code):** 76-78
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
- **File:** _pager.scss
- **Group:** pager
- **Type:** mixin
- **Lines (comments):** 88-90
- **Lines (code):** 92-164
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
- **File:** _pager.scss
- **Group:** pager
- **Type:** function
- **Lines (comments):** 80-82
- **Lines (code):** 84-86
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  