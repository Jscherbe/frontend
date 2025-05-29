---
title: List-inline
sassdocGroupName: list-inline
---


# List-inline

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
  "rule-style" : "light",
  "margin-top": 0,
  "margin-bottom": 1em,
  "space-between" : 1em,
  "space-between-large" : 2em
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _list-inline.scss
- **Group:** list-inline
- **Type:** variable
- **Lines (comments):** 11-16
- **Lines (code):** 18-24

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|rule-style|String|"light"|Name of element > rule style to use for divider/border|
|margin-top|Dimension|0|Top margin of list.|
|margin-bottom|Dimension|1em|Bottom margin of list.|
|space-between|Dimension|1em|Gap between item and dividers|
|space-between-large|Dimension|1em|Gap between item and dividers when using large-gap modifier|

    
  

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
  
- **File:** _list-inline.scss
- **Group:** list-inline
- **Type:** mixin
- **Lines (comments):** 26-29
- **Lines (code):** 31-33

</details>

    

#### Examples

      


``` scss
@include ulu.component-list-inline-set(( "property" : value ));
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
  
- **File:** _list-inline.scss
- **Group:** list-inline
- **Type:** mixin
- **Lines (comments):** 44-46
- **Lines (code):** 48-80

</details>

    

#### Examples

      


``` scss
@include ulu.component-list-inline-styles();
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
  
- **File:** _list-inline.scss
- **Group:** list-inline
- **Type:** function
- **Lines (comments):** 35-38
- **Lines (code):** 40-42

</details>

    

#### Examples

      


``` scss
@include ulu.component-list-inline-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  