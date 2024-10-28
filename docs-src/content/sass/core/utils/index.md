---
title: Utils
sassdocGroupName: utils
---


# Utils





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
  "debug-maps": true,
  "file-header-comments": true
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** variable
- **Lines (comments):** 11-14
- **Lines (code):** 16-19
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|debug-maps|Boolean|true|Debugs include map print outs|
|file-header-comments|Boolean|true|Remove comment headers if you'd like|

    
  

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
- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 21-24
- **Lines (code):** 25-27
    </details>
    

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

- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  require-list-has() {#mixin-require-list-has}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Ensure a value is present in the list, throw an error if not found
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 57-60
- **Lines (code):** 62-67
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$list|`List`|The map to get the value from|
|$value|`String`|The value to search for in the list|
|$context|`String`|The context of using this function for debugging help|

    

#### Throw

- ULU: Unable to find item 
    


<div class="sassdoc-item-header">

###  require-list-contains() {#mixin-require-list-contains}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Require that the list only is only made up of allowed items
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 69-71
- **Lines (code):** 73-77
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$allowed|`List`|The list of allowed items|
|$list|`String`|The list to test allowed against|

    

#### Require

- [require-list-has()](/sass/core/utils/#mixin-require-list-has)
  


<div class="sassdoc-item-header">

###  file-header() {#mixin-file-header}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Returns true if we should include something (used for output checking)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 88-90
- **Lines (code):** 92-100
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$context|`List`|The root area of the framework this file comes from|
|$name|`List`|The name of the specific area/file (optional)|

    
  

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
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 29-32
- **Lines (code):** 34-36
    </details>
    

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

- [require-map-get()](/sass/core/utils/#function-require-map-get)
- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  require-map-get() {#function-require-map-get}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a required value from a map, throw an error if not found
- Remember that that maps cannot intentionally use null (use false instead, if trying to avoid output if not configured)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 38-43
- **Lines (code):** 45-55
    </details>
    

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

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  included() {#function-included}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Returns true if we should include something (map of booleans)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 79-81
- **Lines (code):** 83-86
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of item to see if it's included|
|$includes|`Map`|Map of includes|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  if-type() {#function-if-type}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 103-105
- **Lines (code):** 107-113
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$type|`String`|type of value it should be|
|$value|`String`|the value to provide if it is that type|
|$fallback|`String`|the fallback value|

    


<div class="sassdoc-item-header">

###  number-info() {#function-number-info}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 116-117
- **Lines (code):** 119-133
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$number|`String`|Number to get meta info for|

    

#### Returns


|Type|Description|
|:--|:--|
|Map|With properties (unit, value)|

    


<div class="sassdoc-item-header">

###  map-merge() {#function-map-merge}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Reusable merge method 
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 135-139
- **Lines (code):** 141-149
    </details>
    

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

    


<div class="sassdoc-item-header">

###  map-has() {#function-map-has}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Returns true/false if map has property
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 151-154
- **Lines (code):** 156-161
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$map|`Map`|Source map|
|$key|`String`|Property to check for|

    

#### Returns


|Type|
|:--|
|Boolean|

    

#### Throw

- map-has(): Incorrect type for $map (should be map)
    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  map-merge-or-overwrite() {#function-map-merge-or-overwrite}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Repeatable pattern in core
    
    

#### Deprecated

Left in for compatibility, will be removed, use map-merge with mode
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 163-164
- **Lines (code):** 166-174
    </details>
    

#### Require

- [map-merge()](/sass/core/utils/#function-map-merge)
  


<div class="sassdoc-item-header">

###  fallback() {#function-fallback}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Utility for providing fallbacks, the first truthy value (non false or null) will be returned
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 176-177
- **Lines (code):** 179-186
    </details>
    

#### Returns


|Type|Description|
|:--|:--|
|*|The first truthy value|

    


<div class="sassdoc-item-header">

###  map-fallback() {#function-map-fallback}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Provides fallback values from the same map
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 188-188
- **Lines (code):** 189-197
    </details>
    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  map-contains-any() {#function-map-contains-any}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Checks if a map contains one or more of the keys
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 200-204
- **Lines (code):** 205-224
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$map|`Map`|The map to check|
|$keys|`List`|The list of keys to check for|
|$options|`List`|Options for how this behaves|
|$options.with-value|`List`|Requires that at least one of the map entries from the list has a value other than null|

    

#### Throw

- map-contains-any(): Incorrect type for $map (should be map)
- map-contains-any(): Incorrect type for $keys (should be list)
    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  function-fallback() {#function-function-fallback}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Helps in providing a dynamic fallback for modules whose defaults should come from another
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 226-230
- **Lines (code):** 232-258
    </details>
    

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

    

#### Throw

- Arguments must be a list, use single list for single argument ie 
    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  string-replace() {#function-string-replace}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Replaces all or one occurrence of a string within a string
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 260-264
- **Lines (code):** 266-282
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$string|`String`|String to operate on|
|$find|`String`|String to find within string|
|$replace|`String`|String to replace found strings|
|$all|`Boolean`|Default true replace all matches, if false replace only first|

    


<div class="sassdoc-item-header">

###  list-remove() {#function-list-remove}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Remove an item from a list (not map)
- Used for excluding things or as general utility
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 284-288
- **Lines (code):** 290-298
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$list|`List`|String to operate on|
|$remove|`*`|Element in the list to remove|

    

#### Returns


|Type|Description|
|:--|:--|
|List|New list with item removed|

    


<div class="sassdoc-item-header">

###  list-without() {#function-list-without}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Remove an item from a list (not map)
- Used for excluding things or as general utility
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 300-304
- **Lines (code):** 306-314
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$list|`List`|String to operate on|
|$remove|`List`|List elements that should each be removed|

    

#### Returns


|Type|Description|
|:--|:--|
|List|New list with item removed|

    


<div class="sassdoc-item-header">

###  list-join() {#function-list-join}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Join a list with a separator
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 316-320
- **Lines (code):** 322-337
    </details>
    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$list|`List`|List to join||
|$separator|`String`|Separator to use|", "|
|$to-string|`Boolean`|The resulting list with join separator will be converted to a string (false will return new list with separators added between original items|true|

    

#### Returns


|Type|Description|
|:--|:--|
|String|List|If separator was +, the result would be "value1 + value2" or (value1, "+", value2) depending on $to-string argument|

    


<div class="sassdoc-item-header">

###  get-spacing-info() {#function-get-spacing-info}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Resolve spacing info (ie. margin/padding like arguments)
- Will normalize the argument that may be shorthand or single value
- Used to programmatic things with single value config options for padding/margin
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 339-344
- **Lines (code):** 346-362
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`Number|List`|The value to resolve (usually a config option)|

    

#### Returns


|Type|Description|
|:--|:--|
|Map|Map with spacing info for each side (top, right, bottom, left)|

    

#### Throw

- Spacing has more than 4 arguments (not correct shorthand)
    


<div class="sassdoc-item-header">

###  get-spacing-top() {#function-get-spacing-top}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Resolve the top spacing value for margin/padding like arguments
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 364-365
- **Lines (code):** 367-369
    </details>
    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- [get-spacing-info()](/sass/core/utils/#function-get-spacing-info)
  


<div class="sassdoc-item-header">

###  get-spacing-right() {#function-get-spacing-right}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Resolve the right spacing value for margin/padding like arguments
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 371-372
- **Lines (code):** 374-376
    </details>
    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- [get-spacing-info()](/sass/core/utils/#function-get-spacing-info)
  


<div class="sassdoc-item-header">

###  get-spacing-bottom() {#function-get-spacing-bottom}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Resolve the bottom spacing value for margin/padding like arguments
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 378-379
- **Lines (code):** 381-383
    </details>
    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- [get-spacing-info()](/sass/core/utils/#function-get-spacing-info)
  


<div class="sassdoc-item-header">

###  get-spacing-left() {#function-get-spacing-left}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Resolve the left spacing value for margin/padding like arguments
    
    

    <details>
      <summary>File Information</summary>
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 385-386
- **Lines (code):** 388-390
    </details>
    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- [get-spacing-info()](/sass/core/utils/#function-get-spacing-info)
  
  
  