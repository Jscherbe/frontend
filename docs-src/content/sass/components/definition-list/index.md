---
title: Definition-list
sassdocGroupName: definition-list
---


# Definition-list

<div class="type-large">

Definition list styles

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
  "margin" : (0 0 1.5em 0),
  "term-font-weight": true,
  "line-height": true,
  "item-margin" : 1em,
  "separator": true,
  "separator-border": true,
  "table-breakpoint": "medium",
  "table-template-columns": (25% 75%),
  "table-gap": 1rem,
  "inline-description-separator": ",",
  "inline-term-separator": ":",
  "compact-item-margin" : 0.5em
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _definition-list.scss
- **Group:** definition-list
- **Type:** variable
- **Lines (comments):** 33-45
- **Lines (code):** 47-60

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|term-font-weight|String|true|The font-weight of the dt element.|
|line-height|Dimension|true|The line-height of the definition list.|
|item-margin|CssUnit|0.75em|The spacing for each item.|
|separator|Boolean|true|Whether to show a separator between items.|
|separator-border|Border|true|The border style for the separator.|
|separator-padding|Dimension|0.75em|The padding for the separator.|
|table-breakpoint|String|medium|The breakpoint for the table layout.|
|table-template-columns|String|(25% 75%)|The grid-template-columns for the table layout.|
|table-gap|Dimension|1rem|The gap for the table layout.|
|inline-description-separator|String|","|The separator for multiple dd elements in inline layout.|
|inline-term-separator|String|":"|The separator for dt elements in inline layout.|

    
  

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
  
- **File:** _definition-list.scss
- **Group:** definition-list
- **Type:** mixin
- **Lines (comments):** 62-65
- **Lines (code):** 67-69

</details>

    

#### Examples

      


``` scss
@include ulu.component-definition-list-set(( "property" : value ));
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

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _definition-list.scss
- **Group:** definition-list
- **Type:** mixin
- **Lines (comments):** 81-84
- **Lines (code):** 86-170

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/definition-list">View</a>

</div>



#### Examples

      


``` scss
@include ulu.component-definition-list-styles();
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
  
- **File:** _definition-list.scss
- **Group:** definition-list
- **Type:** function
- **Lines (comments):** 71-74
- **Lines (code):** 76-79

</details>

    

#### Examples

      


``` scss
@include ulu.component-definition-list-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  