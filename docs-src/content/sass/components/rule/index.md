---
title: Rule
sassdocGroupName: rule
---


# Rule





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
  "short-width" : 2.75rem,
  "short-border-width" : 4px,
  "short-modifiers" : false
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _rule.scss
- **Group:** rule
- **Type:** variable
- **Lines (comments):** 11-14
- **Lines (code):** 16-20
    </details>
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.short-width|Number|Short rule width (like an inline rule, normally used above headings), Setting this to false will disable output|
|$config.short-border-width|Number|Short rule width of border|

    
  

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
- **File:** _rule.scss
- **Group:** rule
- **Type:** mixin
- **Lines (comments):** 22-25
- **Lines (code):** 27-29
    </details>
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.set(( "property" : value ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/adaptive-spacing/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _rule.scss
- **Group:** rule
- **Type:** mixin
- **Lines (comments):** 40-40
- **Lines (code):** 42-93
    </details>
    

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
- **File:** _rule.scss
- **Group:** rule
- **Type:** function
- **Lines (comments):** 31-34
- **Lines (code):** 36-38
    </details>
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/adaptive-spacing/#variable-config)
  
  
  