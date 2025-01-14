---
title: List-lines
sassdocGroupName: list-lines
---


# List-lines

<div class="type-large">



</div>



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
- **Lines (comments):** 27-30
- **Lines (code):** 32-34

</details>

    

#### Examples

      


``` scss
@include ulu.component-list-lines-set(( "property" : value ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

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
- **Lines (comments):** 45-45
- **Lines (code):** 47-67

</details>

    

#### Require

- [get()](/sass/components/accordion/#function-get)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output component stylesheet
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** mixin
- **Lines (comments):** 69-71
- **Lines (code):** 73-84

</details>

    

#### Examples

      


``` scss
@include ulu.component-list-lines-styles();
```
  

      

#### Require

- [inner-styles()](/sass/components/list-lines/#mixin-inner-styles)
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
- **Lines (comments):** 36-39
- **Lines (code):** 41-43

</details>

    

#### Examples

      


``` scss
@include ulu.component-list-lines-get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  