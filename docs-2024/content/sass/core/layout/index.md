---
title: Layout
sassdocGroupName: layout
---


# Layout





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
  "max-width":         90rem,
  "margin":            2rem,
  "z-index-sticky":    100,
  "z-index-above":     450,
  "z-index-fixed":     1000
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _layout.scss
- **Group:** layout
- **Type:** variable
- **Lines (comments):** 12-18
- **Lines (code):** 20-26
    </details>
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.max-width|Number|Common max-width for site|
|$config.margin|Number|Common margin for site|
|$config.z-index-fixed|Number|Common z-index, above everything|
|$config.z-index-sticky|Number|Common z-index for sticky or stuck items|
|$config.z-index-above|Number|Common z-index, below sticky|

    


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
- **Lines (comments):** 45-47
- **Lines (code):** 49-58
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
- **Lines (comments):** 30-32
- **Lines (code):** 34-36
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

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
- **Lines (comments):** 60-63
- **Lines (code):** 65-67
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
- **Lines (comments):** 83-87
- **Lines (code):** 89-101
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
If passing inlude padding it would be the containers
side (x) + the padding. This accounts for the containers max-width to give an absoute value
    
    

    <details>
      <summary>File Information</summary>
- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 103-110
- **Lines (code):** 112-127
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
- **Lines (comments):** 145-148
- **Lines (code):** 150-176
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
- **Lines (comments):** 194-196
- **Lines (code):** 198-226
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
- **Lines (comments):** 228-228
- **Lines (code):** 230-241
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
- **Lines (comments):** 243-243
- **Lines (code):** 244-250
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
- **Lines (comments):** 38-40
- **Lines (code):** 41-43
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

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
- **Lines (comments):** 69-71
- **Lines (code):** 73-81
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Container name|
|$breakpoint|`String`|Return only the properties for a specific breakpoint for the container|

    

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
- **Lines (comments):** 129-132
- **Lines (code):** 134-143
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
- **Lines (comments):** 178-180
- **Lines (code):** 182-184
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
- **Lines (comments):** 186-188
- **Lines (code):** 190-192
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Container name|
|$specific-breakpoint|`Boolean`|For a specific breakpoint|

    

#### Require

- [get-container-padding()](/sass/core/layout/#function-get-container-padding)
  
  
  