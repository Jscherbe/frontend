---
title: List-lines
sassdocGroupName: list-lines
---


# List-lines





## Variables




<div class="sassdoc-item-header">

###  $config {#variable-config}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

Module Config
    
    

``` scss
$config: (
  "border-first" : true,
  "border-last" : true,
  "margin-bottom": 1em,
  "margin-top": 0,
  "padding-between" : 1em
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** variable
- **Lines (comments):** 12-17
- **Lines (code):** 19-25
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|border-first|Boolean|true|If enabled, adds a top border to the first item in list-lines.|
|border-last|Boolean|true|If enabled, adds a bottom border to the last item in list-lines.|
|margin-bottom|Dimension|1em|Bottom margin of list.|
|margin-top|Dimension|0|Top margin of list.|
|padding-between|Dimension|1em|Padding between items in list.|

    
  

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
- **File:** _list-lines.scss
- **Group:** list-lines
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

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  inner-styles() {#mixin-inner-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** mixin
- **Lines (comments):** 43-43
- **Lines (code):** 45-65
    </details>
    

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
- **File:** _list-lines.scss
- **Group:** list-lines
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

- [$config](/sass/components/accordion/#variable-config)
  
  
  