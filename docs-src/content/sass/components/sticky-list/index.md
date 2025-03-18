---
title: Sticky-list
sassdocGroupName: sticky-list
---


# Sticky-list

<div class="type-large">

Sticky first column, sticky elements inside adjacent columns to first. (Sticky list with header)

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
  "margin" : true,
  "offset" : 55vh,
  "mask-size" : 5rem,
  "sticky-top" : 45vh,
  "breakpoint" : "medium",
  "title-size" : "medium",
  "title-width" : 40%,
  "title-min-width" : 8em,
  "title-text-align" : right,
  "item-padding-x" : 0,
  "gap" : 2rem,
  "background-color" : white,
  "background-contexts" : (
    (
      "selector" : ".theme-dark",
      "background-color" : black,
      "item-padding-x" : 1em
    ),
  )
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _sticky-list.scss
- **Group:** sticky-list
- **Type:** variable
- **Lines (comments):** 26-41
- **Lines (code):** 43-63

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|transparent|Background color for the entire slider section.|
|margin|Number|true|Margin on ends of component (defaults to element margin)|
|offset|Number|55vh|The offset for the mask (static padding on mask to create space between item's)|
|mask-size|Number|5rem|The size of the mask (background-color) above the items|
|sticky-top|Number|45vh|When to stick|
|breakpoint|String|"medium"|The upward breakpoint that this is allowed to be sticky|
|title-size|String|"medium"|The typography size to use for title|
|title-width|Number|40%|The width of the title when this is displayed in columns|
|title-min-width|Number|8em|The min width for title when displayed in columns|
|title-text-align|CssValue|right|Text alignment for title when displayed in columns|
|item-padding-x|Number|0|Optional padding on the left/right for items|
|gap|Number|2rem|The gap between title and items when displayed in columns|
|background-color|Color|white|The background color used for the mask|
|background-contexts|List||Adjust the background mask color by contextual selectors. Pass List of Maps with ("selector" [parent/contextual selector], "background-color", "item-padding-x" [optional])|

    
  

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
  
- **File:** _sticky-list.scss
- **Group:** sticky-list
- **Type:** mixin
- **Lines (comments):** 65-68
- **Lines (code):** 70-72

</details>

    

#### Examples

      


``` scss
@include ulu.component-sticky-list-set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  set-sizes() {#mixin-set-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set sizes map
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _sticky-list.scss
- **Group:** sticky-list
- **Type:** mixin
- **Lines (comments):** 74-76
- **Lines (code):** 78-80

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- [$sizes](/sass/components/adaptive-spacing/#variable-sizes)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _sticky-list.scss
- **Group:** sticky-list
- **Type:** mixin
- **Lines (comments):** 92-116
- **Lines (code):** 118-197

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/sticky-list">Our Demo</a>

</div>



#### Examples

      


``` scss
@include ulu.component-sticky-list-styles();
```
  



      

      


``` html
<div class="sticky-list">
  <strong class="sticky-list__title">Example:</strong>
  <ul class="sticky-list__list">
    <li class="sticky-list__item">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec nisl magna
    </li>
    <li class="sticky-list__item">
      Aenean sollicitudin mauris lectus, blandit suscipit lectus fringilla sed
    </li>
    <li class="sticky-list__item">
      Suspendisse sollicitudin, justo sed efficitur tempor, risus
    </li>
    <li class="sticky-list__item">
      Suspendisse sollicitudin, justo sed efficitur tempor, risus
    </li>
    <li class="sticky-list__item">
      Suspendisse sollicitudin, justo sed efficitur tempor, risus
    </li>
  </ul>
</div>
```
  


##### Preview

<div>
<div class="sticky-list">
  <strong class="sticky-list__title">Example:</strong>
  <ul class="sticky-list__list">
    <li class="sticky-list__item">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec nisl magna
    </li>
    <li class="sticky-list__item">
      Aenean sollicitudin mauris lectus, blandit suscipit lectus fringilla sed
    </li>
    <li class="sticky-list__item">
      Suspendisse sollicitudin, justo sed efficitur tempor, risus
    </li>
    <li class="sticky-list__item">
      Suspendisse sollicitudin, justo sed efficitur tempor, risus
    </li>
    <li class="sticky-list__item">
      Suspendisse sollicitudin, justo sed efficitur tempor, risus
    </li>
  </ul>
</div>
</div>

    

      

#### Require

- [set-background()](/sass/components/sticky-list/#mixin-set-background)
- [get()](/sass/components/accordion/#function-get)
  


<div class="sassdoc-item-header">

###  set-background() {#mixin-set-background}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Outputs background color mask CSS (gradient from transparent to original color)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _sticky-list.scss
- **Group:** sticky-list
- **Type:** mixin
- **Lines (comments):** 199-200
- **Lines (code):** 202-207

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$color|`Color`|The color to create the CSS for|

    

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
  
- **File:** _sticky-list.scss
- **Group:** sticky-list
- **Type:** function
- **Lines (comments):** 82-85
- **Lines (code):** 87-90

</details>

    

#### Examples

      


``` scss
@include ulu.component-sticky-list-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  