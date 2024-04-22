---
title: Layout
sassdocGroupName: layout
---


# Layout





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

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
  

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** variable
- **Lines (comments):** 12-18
- **Lines (code):** 20-26
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.max-width|Number|Common max-width for site|
|$config.margin|Number|Common margin for site|
|$config.z-index-fixed|Number|Common z-index, above everything|
|$config.z-index-sticky|Number|Common z-index for sticky or stuck items|
|$config.z-index-above|Number|Common z-index, below sticky|

    


###  $containers {#variable-containers} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

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
  

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** variable
- **Lines (comments):** 45-47
- **Lines (code):** 49-58
    
    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 30-32
- **Lines (code):** 34-36
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/scss/core/breakpoint/#variable-config)
  


###  set-containers() {#mixin-set-containers} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Set layout containers
- See the $containers variable for example of container properties
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 60-63
- **Lines (code):** 65-67
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- map-merge()
- [$containers](/scss/core/layout/#variable-containers)
  


###  match-container-padding() {#mixin-match-container-padding} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Returns padding to another property including breakpoints
ie. \{ top: $containers-padding; }
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 83-87
- **Lines (code):** 89-101
    
    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$property|`String`|Property name to apply the padding value to||
|$name|`String`|The container name||
|$sides|`Boolean`|Match the container padding for the sides (left/right), false will match the containers end padding (top/bottom)|true|

    

#### Require

- [get-container()](/scss/core/layout/#function-get-container)
- [get()](/scss/core/breakpoint/#function-get)
- [get-container-padding()](/scss/core/layout/#function-get-container-padding)
  


###  match-container-margin() {#mixin-match-container-margin} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

For a given property for every breakpoint in a given container
creates a css calc value that will match the containers side margin
The margin is created via empty space when the container hits the max-width
If passing inlude padding it would be the containers
side (x) + the padding. This accounts for the containers max-width to give an absoute value
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 103-110
- **Lines (code):** 112-127
    
    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$property|`String`|Property name to apply the margin value to||
|$name|`String`|The container name||
|$include-padding|`Boolean`|Include the containers padding in the margin calculation|true|

    

#### Require

- [get-container()](/scss/core/layout/#function-get-container)
- [get()](/scss/core/breakpoint/#function-get)
- [get-container-padding()](/scss/core/layout/#function-get-container-padding)
  


###  container-padding() {#mixin-container-padding} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print the containers padding properties
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 145-148
- **Lines (code):** 150-176
    
    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|The container name||
|$sides|`Boolean`|Sides by default, false is ends|true|
|$specific-breakpoint|`Boolean`|Only for a specific breakpoint|false|

    

#### Require

- [get-container()](/scss/core/layout/#function-get-container)
- [get()](/scss/core/breakpoint/#function-get)
- [get-container-padding-x()](/scss/core/layout/#function-get-container-padding-x)
- [get-container-padding-y()](/scss/core/layout/#function-get-container-padding-y)
  


###  container-styles() {#mixin-container-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Print all container styles for a given container
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 194-196
- **Lines (code):** 198-226
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Container name|
|$specific-breakpoint|`Boolean`|Only for a specific breakpoint (else includes both the base styles and breakpoint styles)|

    

#### Require

- [container-padding()](/scss/core/layout/#mixin-container-padding)
- [get-container()](/scss/core/layout/#function-get-container)
- [get()](/scss/core/breakpoint/#function-get)
  


###  clearfix() {#mixin-clearfix} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Prints clearfix styles
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 228-228
- **Lines (code):** 230-241
    
    


###  remove-scrollbar() {#mixin-remove-scrollbar} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Removes scrollbar with CSS
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 243-243
- **Lines (code):** 244-250
    
    
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 38-40
- **Lines (code):** 41-43
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- require-map-get()
- [$config](/scss/core/breakpoint/#variable-config)
  


###  get-container() {#function-get-container} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a container map
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 69-71
- **Lines (code):** 73-81
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Container name|
|$breakpoint|`String`|Return only the properties for a specific breakpoint for the container|

    

#### Require

- require-map-get()
- [get()](/scss/core/breakpoint/#function-get)
- [$containers](/scss/core/layout/#variable-containers)
  


###  get-container-padding() {#function-get-container-padding} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a containers padding value
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 129-132
- **Lines (code):** 134-143
    
    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|Container name||
|$sides|`Boolean`|Get the left/right value, false return top/bottom|true|
|$specific-breakpoint|`String`|Get the value for a specific breakpoint|false|

    

#### Require

- [get-container()](/scss/core/layout/#function-get-container)
- [get()](/scss/core/breakpoint/#function-get)
  


###  get-container-padding-x() {#function-get-container-padding-x} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get containers padding X value (side)
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 178-180
- **Lines (code):** 182-184
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Container name|
|$specific-breakpoint|`Boolean`|For a specific breakpoint|

    

#### Require

- [get-container-padding()](/scss/core/layout/#function-get-container-padding)
  


###  get-container-padding-y() {#function-get-container-padding-y} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get containers padding Y value (ends)
    
    

#### Details

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 186-188
- **Lines (code):** 190-192
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Container name|
|$specific-breakpoint|`Boolean`|For a specific breakpoint|

    

#### Require

- [get-container-padding()](/scss/core/layout/#function-get-container-padding)
  
  
  