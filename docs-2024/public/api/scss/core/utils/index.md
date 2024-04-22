---
title: Utils
sassdocGroupName: utils
---


# Utils





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "debug-maps": true,
  "file-header-comments": true
);
```
  

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** variable
- **Lines (comments):** 11-14
- **Lines (code):** 16-19
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.debug-maps|Boolean|Debugs include map print outs|
|$config.file-header-comments|Boolean|Remove comment headers if you'd like|

    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 21-24
- **Lines (code):** 25-27
    
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.set(( "property" : value ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/scss/core/breakpoint/#variable-config)
  


###  require-list-has() {#mixin-require-list-has} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Ensure a value is present in the list, throw an error if not found
    
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 57-60
- **Lines (code):** 62-67
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$list|`List`|The map to get the value from|
|$value|`String`|The value to search for in the list|
|$context|`String`|The context of using this function for debugging help|

    

#### Throw

- ULU: Unable to find item 
    


###  require-list-contains() {#mixin-require-list-contains} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Require that the list only is only made up of allowed items
    
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 69-71
- **Lines (code):** 73-77
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$allowed|`List`|The list of allowed items|
|$list|`String`|The list to test allowed against|

    

#### Require

- [require-list-has()](/scss/core/utils/#mixin-require-list-has)
  


###  file-header() {#mixin-file-header} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Returns true if we should include something (used for output checking)
    
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 88-90
- **Lines (code):** 92-100
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$context|`List`|The root area of the framework this file comes from|
|$name|`List`|The name of the specific area/file (optional)|

    
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 29-32
- **Lines (code):** 34-36
    
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [require-map-get()](/scss/core/utils/#function-require-map-get)
- [$config](/scss/core/breakpoint/#variable-config)
  


###  require-map-get() {#function-require-map-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a required value from a map, throw an error if not found
- Remeber that that maps cannot intentionally use null (use false instead, if trying to avoid output if unconfigured)
    
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 38-43
- **Lines (code):** 45-55
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$map|`Map`|The map to get the value from|
|$key|`String`|The key in the map to get value from|
|$context|`String`|The context of using this function for debugging help|

    

#### Returns


|Type|Description|
|:--|:--|
|*|The value from the map|

    

#### Throw

- ULU: Unable to find  
    

#### Require

- [get()](/scss/core/breakpoint/#function-get)
  


###  included() {#function-included} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Returns true if we should include something (map of booleans)
    
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 79-81
- **Lines (code):** 83-86
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of item to see if it's included|
|$includes|`Map`|Map of includes|

    

#### Require

- [get()](/scss/core/breakpoint/#function-get)
  


###  if-type() {#function-if-type} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 103-105
- **Lines (code):** 107-113
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$type|`String`|type of value it should be|
|$value|`String`|the value to provide if it is that type|
|$fallback|`String`|the fallback value|

    


###  number-info() {#function-number-info} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 116-117
- **Lines (code):** 119-133
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$number|`String`|Number to get meta info for|

    

#### Returns


|Type|Description|
|:--|:--|
|Map|With properties (unit, value)|

    


###  map-merge() {#function-map-merge} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Reusable merge method 
    
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 135-139
- **Lines (code):** 141-149
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$original|`Map`|Source map|
|$changes|`Map`|Changes to merge into source map|
|$mode|`String`|How to merge changes (merge [defualt], deep, or overwrite)|

    

#### Returns


|Type|Description|
|:--|:--|
|Map|New map with changes|

    


###  map-merge-or-overwrite() {#function-map-merge-or-overwrite} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Repeatable pattern in core
    
    

#### Deprecated

Left in for compatability, will be removed, use map-merge with mode
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 151-152
- **Lines (code):** 154-162
    
    

#### Require

- [map-merge()](/scss/core/utils/#function-map-merge)
  


###  fallback() {#function-fallback} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Utility for providing fallbacks, the first truthy value (non false or null) will be returned
    
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 164-165
- **Lines (code):** 167-174
    
    

#### Returns


|Type|Description|
|:--|:--|
|*|The first truthy value|

    


###  map-fallback() {#function-map-fallback} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Provides fallback values from the same map
    
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 176-176
- **Lines (code):** 177-185
    
    

#### Require

- [get()](/scss/core/breakpoint/#function-get)
  


###  function-fallback() {#function-function-fallback} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Helps in providing a dynamic fallback for modules whose defaults should come from another
    
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 187-191
- **Lines (code):** 193-202
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$prop|`String`|Property trying to get fallback for|
|$value|`*`|The value that may need the fallback|
|$lookup|`Map`|Map of properties to functions (use sass:meta > meta.get-function to populate)|

    

#### Returns


|Type|Description|
|:--|:--|
|*|The user's original value, or if the value is true get the default value from the provided function|

    

#### Require

- [get()](/scss/core/breakpoint/#function-get)
  


###  string-replace() {#function-string-replace} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Replaces all or one occurence of a string within a string
    
    

#### Details

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 204-208
- **Lines (code):** 210-226
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$string|`String`|String to operate on|
|$find|`String`|String to find within string|
|$replace|`String`|String to replace found strings|
|$all|`Boolean`|Default true replace all matches, if false replace only first|

    
  
  