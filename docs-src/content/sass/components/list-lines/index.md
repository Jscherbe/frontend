---
title: List-lines
sassdocGroupName: list-lines
---


# List-lines

<div class="type-large">



</div>



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
- **Lines (comments):** 42-45
- **Lines (code):** 47-49

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
- **Lines (comments):** 61-63
- **Lines (code):** 65-95

</details>

    

#### Examples

      


``` scss
@include ulu.component-list-lines-styles();
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
  
- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** function
- **Lines (comments):** 51-54
- **Lines (code):** 56-59

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
  "rule-style" : "light",
  "padding-between" : 1em,
  "dense-padding-between" : 0.65em,
  "dense-line-height" : true
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** variable
- **Lines (comments):** 21-29
- **Lines (code):** 31-40

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|border-first|Boolean|true|If enabled, adds a top border to the first item in list-lines.|
|border-last|Boolean|true|If enabled, adds a bottom border to the last item in list-lines.|
|rule-style|String|"light"|Name of element > rule style to use for divider/border|
|margin-bottom|Dimension|1em|Bottom margin of list.|
|margin-top|Dimension|0|Top margin of list.|
|padding-between|Dimension|1em|Padding between items in list.|
|padding-between|Dimension|1em|Padding between items in list when using dense modifier|
|line-height-dense|Dimension|true|Line height when list lines has dense modifier (defaults to typography line-height-dense)|

    
  
  