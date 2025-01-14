---
title: Rule
sassdocGroupName: rule
---


# Rule

<div class="type-large">



</div>



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
  "short-border-width" : 4px,
  "short-modifiers" : false,
  "short-width" : 2.75rem,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _rule.scss
- **Group:** rule
- **Type:** variable
- **Lines (comments):** 11-15
- **Lines (code):** 17-21

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|short-border-width|Dimension|4px|Short rule width of border|
|short-modifiers|Object|false|Objects to adjust the styles of different short rule styles.|
|short-width|Dimension|2.75rem|Short rule width (like an inline rule, normally used above headings), Setting this to false will disable output|

    
  

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
- **Lines (comments):** 23-26
- **Lines (code):** 28-30

</details>

    

#### Examples

      


``` scss
@include ulu.component-rule-set(( "property" : value ));
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

  

Output styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _rule.scss
- **Group:** rule
- **Type:** mixin
- **Lines (comments):** 41-43
- **Lines (code):** 45-96

</details>

    

#### Examples

      


``` scss
@include ulu.component-rule-styles();
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
  
- **File:** _rule.scss
- **Group:** rule
- **Type:** function
- **Lines (comments):** 32-35
- **Lines (code):** 37-39

</details>

    

#### Examples

      


``` scss
@include ulu.component-rule-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  