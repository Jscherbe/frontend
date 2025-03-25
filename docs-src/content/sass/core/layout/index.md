---
title: Layout
sassdocGroupName: layout
---


# Layout

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
  "margin":            2rem,
  "max-width":         90rem,
  "z-index-above":     450,
  "z-index-fixed":     1000,
  "z-index-sticky":    100,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** variable
- **Lines (comments):** 11-17
- **Lines (code):** 19-25

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|margin|Number|2rem|Common margin for site|
|max-width|Number|90rem|Common max-width for site|
|z-index-above|Number|1000|Common z-index, below sticky|
|z-index-fixed|Number|100|Common z-index, above everything|
|z-index-sticky|Number|450|Common z-index for sticky or stuck items|

    


<div class="sassdoc-item-header">

###  $containers {#variable-containers}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Containers Lookup (use set-containers)
    
    

``` scss
$containers: (
  "container" : (
    "width" : 100%,
    "max-width" : get("max-width"),
    "padding" : (get("margin") get("margin")),
    "breakpoints" : null,
    "responsive" : false,
    "responsive-amount" : 3vw
  )
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** variable
- **Lines (comments):** 42-44
- **Lines (code):** 46-55

</details>

    
  

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
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 27-29
- **Lines (code):** 31-33

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include ulu.layout-set(( "property" : value ));|

    

#### Require

- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  set-containers() {#mixin-set-containers}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set layout containers
- See the $containers variable for example of container properties
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 57-60
- **Lines (code):** 62-64

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- map-merge()
- [$containers](/sass/core/layout/#variable-containers)
  


<div class="sassdoc-item-header">

###  match-container-padding() {#mixin-match-container-padding}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Returns padding to another property including breakpoints
ie. \{ top: $containers-padding; }
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 98-102
- **Lines (code):** 104-116

</details>

    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$property|`String`|Property name to apply the padding value to||
|$name|`String`|The container name||
|$sides|`Boolean`|Match the container padding for the sides (left/right), false will match the containers end padding (top/bottom)|true|

    

#### Require

- [get-container()](/sass/core/layout/#function-get-container)
- [get()](/sass/core/breakpoint/#function-get)
- [get-container-padding()](/sass/core/layout/#function-get-container-padding)
  


<div class="sassdoc-item-header">

###  match-container-margin() {#mixin-match-container-margin}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

For a given property for every breakpoint in a given container
creates a css calc value that will match the containers side margin
The margin is created via empty space when the container hits the max-width
If passing include padding it would be the containers
side (x) + the padding. This accounts for the containers max-width to give an absolute value
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 118-125
- **Lines (code):** 127-142

</details>

    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$property|`String`|Property name to apply the margin value to||
|$name|`String`|The container name||
|$include-padding|`Boolean`|Include the containers padding in the margin calculation|true|

    

#### Require

- [get-container()](/sass/core/layout/#function-get-container)
- [get()](/sass/core/breakpoint/#function-get)
- [get-container-padding()](/sass/core/layout/#function-get-container-padding)
  


<div class="sassdoc-item-header">

###  container-padding() {#mixin-container-padding}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print the containers padding properties
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 160-163
- **Lines (code):** 165-191

</details>

    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|The container name||
|$sides|`Boolean`|Sides by default, false is ends|true|
|$specific-breakpoint|`Boolean`|Only for a specific breakpoint|false|

    

#### Require

- [get-container()](/sass/core/layout/#function-get-container)
- [get()](/sass/core/breakpoint/#function-get)
- [get-container-padding-x()](/sass/core/layout/#function-get-container-padding-x)
- [get-container-padding-y()](/sass/core/layout/#function-get-container-padding-y)
  


<div class="sassdoc-item-header">

###  container-styles() {#mixin-container-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Print all container styles for a given container
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 209-211
- **Lines (code):** 213-238

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Container name|
|$specific-breakpoint|`Boolean`|Only for a specific breakpoint (else includes both the base styles and breakpoint styles)|

    

#### Require

- [container-padding()](/sass/core/layout/#mixin-container-padding)
- [get-container()](/sass/core/layout/#function-get-container)
- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  clearfix() {#mixin-clearfix}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints clearfix styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 240-240
- **Lines (code):** 242-253

</details>

    


<div class="sassdoc-item-header">

###  remove-scrollbar() {#mixin-remove-scrollbar}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Removes scrollbar with CSS
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 255-255
- **Lines (code):** 256-262

</details>

    


<div class="sassdoc-item-header">

###  absolute-fill() {#mixin-absolute-fill}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Layout utility for absolute (zero on all sides)
- Probably helpful for gzip if we use this when these exact styles are needed
  so they are identical for compression
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 264-266
- **Lines (code):** 267-278

</details>

    
  

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
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 35-37
- **Lines (code):** 38-40

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include ulu.layout-get("property");|

    

#### Require

- require-map-get()
- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  get-container() {#function-get-container}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a container map
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 66-68
- **Lines (code):** 70-96

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Container name|
|$breakpoint|`String`|Return only the properties for a specific breakpoint for the container|

    

#### Throw

- ULU: No container breakpoints for container 
    

#### Require

- require-map-get()
- [get()](/sass/core/breakpoint/#function-get)
- [$containers](/sass/core/layout/#variable-containers)
  


<div class="sassdoc-item-header">

###  get-container-padding() {#function-get-container-padding}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a containers padding value
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 144-147
- **Lines (code):** 149-158

</details>

    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|Container name||
|$sides|`Boolean`|Get the left/right value, false return top/bottom|true|
|$specific-breakpoint|`String`|Get the value for a specific breakpoint|false|

    

#### Require

- [get-container()](/sass/core/layout/#function-get-container)
- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  get-container-padding-x() {#function-get-container-padding-x}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get containers padding X value (side)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 193-195
- **Lines (code):** 197-199

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Container name|
|$specific-breakpoint|`Boolean`|For a specific breakpoint|

    

#### Require

- [get-container-padding()](/sass/core/layout/#function-get-container-padding)
  


<div class="sassdoc-item-header">

###  get-container-padding-y() {#function-get-container-padding-y}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get containers padding Y value (ends)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 201-203
- **Lines (code):** 205-207

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Container name|
|$specific-breakpoint|`Boolean`|For a specific breakpoint|

    

#### Require

- [get-container-padding()](/sass/core/layout/#function-get-container-padding)
  
  
  