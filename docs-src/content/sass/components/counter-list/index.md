---
title: Counter-list
sassdocGroupName: counter-list
---


# Counter-list

<div class="type-large">

Outputs a styled list with counters

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
  
- **File:** _counter-list.scss
- **Group:** counter-list
- **Type:** mixin
- **Lines (comments):** 39-42
- **Lines (code):** 44-46

</details>

    

#### Examples

      


``` scss
@include ulu.component-counter-list-set(( "property" : value ));
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

  

Output counter-list component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _counter-list.scss
- **Group:** counter-list
- **Type:** mixin
- **Lines (comments):** 57-64
- **Lines (code):** 66-133

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/counter-list">Our Demo</a>

</div>



#### Examples

      


``` html
<ol class="counter-list">
  <li class="counter-list__item">This is a item that will get counted</li>
  <li class="counter-list__item">Another item that has more content to show line wrapping. Lorem ipsum et depsi anu. Dolor et anu.</li>
  <li class="counter-list__item">Small Amount of Text</li>
</ol>
```
  


##### Preview

<div>
<ol class="counter-list">
  <li class="counter-list__item">This is a item that will get counted</li>
  <li class="counter-list__item">Another item that has more content to show line wrapping. Lorem ipsum et depsi anu. Dolor et anu.</li>
  <li class="counter-list__item">Small Amount of Text</li>
</ol>
</div>

    

      

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
  
- **File:** _counter-list.scss
- **Group:** counter-list
- **Type:** function
- **Lines (comments):** 48-51
- **Lines (code):** 53-55

</details>

    

#### Examples

      


``` scss
@include ulu.component-counter-list-get("property");
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
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Module Settings
    
    

``` scss
$config: (
  "margin" : (2rem 0),
  "item-margin" : (0, 0, 1rem, 0),
  "align-items" : baseline, 
  "counter-width" : 2.4em,
  "counter-height" : null,
  "counter-gap" : 1em,
  "counter-style" : numeric,
  "counter-border-radius" : 50%,
  "counter-font-size" : 1.2em,
  "counter-color" : white,
  "counter-background-color" : "accent",
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _counter-list.scss
- **Group:** counter-list
- **Type:** variable
- **Lines (comments):** 11-23
- **Lines (code):** 25-37

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|margin|List|(2rem 0)|The top and bottom margin of the list.|
|item-margin|List|(0, 0, 1rem, 0)|The margin applied to each list item.|
|align-items|Keyword|baseline|How to align the counter (flexbox align-items values)|
|counter-width|Length|2.4em|The width and height (if height is falsy)|
|counter-height|Length|null|The height (optional)|
|counter-gap|Length|1em|The gap between the counter and the list item content.|
|counter-style|String|numeric|The list-style-type used for the counter.|
|counter-border-radius|Keyword|Percentage|50%|The border-radius of the counter element.|
|counter-font-size|Length|1.2em|The font-size of the counter text.|
|counter-color|String|white|The text color of the counter. Accepts color names or hex codes.|
|counter-background-color|String|"accent"|The background color of the counter. Refers to a color in the color module.|

    
  
  