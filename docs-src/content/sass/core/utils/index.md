---
title: Utils
sassdocGroupName: utils
---


# Utils

<div class="type-large">

Basic utility functions/mixins used throughout system

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
  "debug-maps": true,
  "file-header-comments": true,
  "responsive-change": 0.5vw,
  "pixel-em-base" : 16px,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** variable
- **Lines (comments):** 12-17
- **Lines (code):** 19-24

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|debug-maps|Boolean|true|Enable or disable debug map output|
|file-header-comments|Boolean|true|Enable or disable module/file header comments|
|responsive-change|Number|0.5vw|Default responsive amount to modify items using responsive-property mixin|
|pixel-em-base|Number|16px|Default base pixel font size for pixel-to-em|

    
  

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
- **Lines (comments):** 26-29
- **Lines (code):** 31-33

</details>

    

#### Examples

General example      


``` scss
@include ulu.utils-set(( "property" : value ));
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
- **Lines (comments):** 63-67
- **Lines (code):** 69-79

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$list|`List`|The map to get the value from|
|$value|`String`|The value to search for in the list|
|$context|`String`|The context of using this function for debugging help|
|$warn|`String`|Display warning instead of throwing error|

    


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
- **Lines (comments):** 81-85
- **Lines (code):** 87-91

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$allowed|`List`|The list of allowed items|
|$list|`String`|The list to test allowed against|
|$context|`String`|The context of using this function for debugging help|
|$warn|`String`|Display warning instead of throwing error|

    

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
- **Lines (comments):** 102-104
- **Lines (code):** 106-114

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$context|`List`|The root area of the framework this file comes from|
|$name|`List`|The name of the specific area/file (optional)|

    


<div class="sassdoc-item-header">

###  responsive-property() {#mixin-responsive-property}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Provides user with a fallback for a calc that's just an enhancement
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 509-512
- **Lines (code):** 514-521

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$property|`String`|The CSS property to set|
|$value|`*`|The value to set on the property|
|$responsive-change|`Css`|The amount to change (vw or vh units) (combined with unit past)|

    
  

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
- **Lines (comments):** 35-38
- **Lines (code):** 40-42

</details>

    

#### Examples

General example      


``` scss
@include ulu.utils-get("property");
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
- **Lines (comments):** 44-49
- **Lines (code):** 51-61

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
- **Lines (comments):** 93-95
- **Lines (code):** 97-100

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
- **Lines (comments):** 117-119
- **Lines (code):** 121-127

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
- **Lines (comments):** 130-131
- **Lines (code):** 133-153

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$number|`String`|Number to get meta info for|

    

#### Returns


|Type|Description|
|:--|:--|
|Map|With properties (unit, value, invalid [true/false if not number])|

    

#### Throw

- Expected Number, got #\{ meta.type-of($number) } for #{ $number }
    

#### Require

- [strip-unit()](/sass/core/utils/#function-strip-unit)
  


<div class="sassdoc-item-header">

###  add-unit() {#function-add-unit}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Adds unit to unitless number
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 155-158
- **Lines (code):** 160-162

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$number|`Number`|The unitless number to add unit to|
|$unit|`String`|The unit to add to number|

    

#### Returns


|Type|Description|
|:--|:--|
|String|Number with unit attached (can't be used in maths)|

    


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
- **Lines (comments):** 174-178
- **Lines (code):** 180-188

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
- **Lines (comments):** 190-193
- **Lines (code):** 195-200

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
- **Lines (comments):** 202-203
- **Lines (code):** 205-213

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
- **Lines (comments):** 215-216
- **Lines (code):** 218-225

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
- **Lines (comments):** 227-227
- **Lines (code):** 228-236

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
- **Lines (comments):** 239-243
- **Lines (code):** 244-263

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
- **Lines (comments):** 265-269
- **Lines (code):** 271-297

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
- **Lines (comments):** 299-303
- **Lines (code):** 305-321

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
- **Lines (comments):** 323-327
- **Lines (code):** 329-337

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
- **Lines (comments):** 339-343
- **Lines (code):** 345-353

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
- **Lines (comments):** 355-359
- **Lines (code):** 361-376

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

###  get-spacing() {#function-get-spacing}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Resolve spacing info (ie. margin/padding like arguments)
- Will normalize the argument that may be shorthand or single value
- Used for programmatic things with single value config options for padding/margin

    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 378-393
- **Lines (code):** 395-411

</details>

    

#### Examples

Example of getting left value      


``` scss
$user-padding: (1em, 2em, 4em);
$spacing: get-spacing($user-padding);
// $spacing ("top" : 1em, "right" : 2em, "bottom" : 4em, "left" : 2em);

.example {
  left: map.get($spacing, "left");
  // left = 2em
}
```
  



      

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
- **Lines (comments):** 413-422
- **Lines (code):** 424-426

</details>

    

#### Examples

Example of getting top value      


``` scss
$user-padding: (1em, 2em, 4em);

.example {
  top: get-spacing-top($user-padding);
  // top = 2em
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`Number|List`|The value to resolve (usually a config option)|

    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- [get-spacing()](/sass/core/utils/#function-get-spacing)
  


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
- **Lines (comments):** 428-437
- **Lines (code):** 439-441

</details>

    

#### Examples

Example of getting right value      


``` scss
$user-padding: (1em, 2em, 4em);

.example {
  right: get-spacing-right($user-padding);
  // right = 2em
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`Number|List`|The value to resolve (usually a config option)|

    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- [get-spacing()](/sass/core/utils/#function-get-spacing)
  


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
- **Lines (comments):** 443-452
- **Lines (code):** 454-456

</details>

    

#### Examples

Example of getting bottom value      


``` scss
$user-padding: (1em, 2em, 4em);

.example {
  bottom: get-spacing-bottom($user-padding);
  // bottom = 2em
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`Number|List`|The value to resolve (usually a config option)|

    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- [get-spacing()](/sass/core/utils/#function-get-spacing)
  


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
- **Lines (comments):** 458-467
- **Lines (code):** 469-471

</details>

    

#### Examples

Example of getting left value      


``` scss
$user-padding: (1em, 2em, 4em);

.example {
  left: get-spacing-left($user-padding);
  // left = 2em
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`Number|List`|The value to resolve (usually a config option)|

    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- [get-spacing()](/sass/core/utils/#function-get-spacing)
  


<div class="sassdoc-item-header">

###  strip-unit() {#function-strip-unit}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Strips the unit from the number
- Normally this shouldn't be needed
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 473-475
- **Lines (code):** 477-487

</details>

    

#### Throw

- Expected number, got #\{ $value }
    

#### Related Links

- [Original source (Miriam Suzanne)](https://stackoverflow.com/questions/12328259/how-do-you-strip-the-unit-from-any-number-in-sass/12335841#12335841)

    

#### Require

- [is-number()](/sass/core/utils/#function-is-number)
  


<div class="sassdoc-item-header">

###  ratio-scale-size() {#function-ratio-scale-size}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Calculate the size of something at a given scale (percentage/exponential)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 489-494
- **Lines (code):** 496-498

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$base|`Number`|The number the scale starts at|
|$ratio|`Number`|The amount the scale changes over one set|
|$sizes|`Number`|The number of steps in the scale|
|$size|`Number`|The step you are trying to calculate|

    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- [$sizes](/sass/core/breakpoint/#variable-sizes)
  


<div class="sassdoc-item-header">

###  pixel-to-em() {#function-pixel-to-em}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Convert from pixel to em
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 500-503
- **Lines (code):** 505-507

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$pixels|`Number`|The number the scale starts at|
|$base|`Number`|How many pixels equal 1em|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Em Conversion|

    


<div class="sassdoc-item-header">

###  hypotenuse() {#function-hypotenuse}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Calculates the hypotenuse of a triangle
- Can be used to get length between two corners of a rectangle
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 523-527
- **Lines (code):** 529-531

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$width|`Number`|The width of the triangle|
|$height|`Number`|The height of the triangle|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Hypotenuse of a triangle|

    


<div class="sassdoc-item-header">

###  box-shadow-info() {#function-box-shadow-info}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get's the info about a box shadow 
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 533-536
- **Lines (code):** 538-569

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$shadow|`List`|The box shadow property (ie. 0 0 4px red)|

    

#### Returns


|Type|Description|
|:--|:--|
|Map|Map with info about the shadow with the following keys (inset, offset-x, offset-y, blur, spread, color)|

    

#### Throw

- Box shadow passed is not correct type (list)
    


<div class="sassdoc-item-header">

###  box-shadow-extent() {#function-box-shadow-extent}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get's the extent (how far the shadow extends past the box's edge)
- This will only work on box-shadows that have matching units for the numbers
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 571-575
- **Lines (code):** 577-595

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$shadow|`List`|The box shadow property (ie. 0 0 4px red)|
|$side|`String`|Optionally pass the side of box to get extend for, if not specified offsets are ignored and just the extent of the shadow is passed|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|The size the shadow extends past it's box|

    

#### Require

- [box-shadow-info()](/sass/core/utils/#function-box-shadow-info)
- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  is-list() {#function-is-list}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Determines if value passed is a list
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 597-599
- **Lines (code):** 601-603

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`*`|Value to check|

    

#### Returns


|Type|Description|
|:--|:--|
|Boolean|Whether the item was type list|

    


<div class="sassdoc-item-header">

###  is-map() {#function-is-map}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Determines if value passed is a map
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 605-607
- **Lines (code):** 609-611

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`*`|Value to check|

    

#### Returns


|Type|Description|
|:--|:--|
|Boolean|Whether the item was type map|

    


<div class="sassdoc-item-header">

###  is-number() {#function-is-number}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Determines if value passed is a number
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 613-615
- **Lines (code):** 617-619

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`*`|Value to check|

    

#### Returns


|Type|Description|
|:--|:--|
|Boolean|Whether the item was type number|

    


<div class="sassdoc-item-header">

###  is-string() {#function-is-string}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Determines if value passed is a string
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 621-623
- **Lines (code):** 625-627

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`*`|Value to check|

    

#### Returns


|Type|Description|
|:--|:--|
|Boolean|Whether the item was type string|

    


<div class="sassdoc-item-header">

###  is-color() {#function-is-color}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Determines if value passed is a color
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 629-631
- **Lines (code):** 633-635

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`*`|Value to check|

    

#### Returns


|Type|Description|
|:--|:--|
|Boolean|Whether the item was type color|

    


<div class="sassdoc-item-header">

###  is-even() {#function-is-even}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Returns true if number passed is even
- Allows unit and unitless numbers
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 655-658
- **Lines (code):** 660-666

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$number|`Number`|The number to check|

    

#### Returns


|Type|Description|
|:--|:--|
|Boolean|Whether or not it is an even number|

    

#### Throw

- Expected Number, got #\{ $number }
    

#### Require

- [is-number()](/sass/core/utils/#function-is-number)
- [strip-unit()](/sass/core/utils/#function-strip-unit)
  


<div class="sassdoc-item-header">

###  is-odd() {#function-is-odd}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Returns true if number passed is odd
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 668-670
- **Lines (code):** 672-674

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$number|`Number`|The number to check|

    

#### Returns


|Type|Description|
|:--|:--|
|Boolean|Whether or not it is an odd number|

    

#### Require

- [is-even()](/sass/core/utils/#function-is-even)
  


<div class="sassdoc-item-header">

###  ensure-map() {#function-ensure-map}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Always returns a map
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 676-678
- **Lines (code):** 680-682

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`*`|The value to check if is map|

    

#### Returns


|Type|Description|
|:--|:--|
|Map|The $value if it was a map, else empty map|

    

#### Require

- [is-map()](/sass/core/utils/#function-is-map)
  


<div class="sassdoc-item-header">

###  is-end() {#function-is-end}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Returns true if edge passed is an end (top/bottom)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 684-687
- **Lines (code):** 689-697

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$edge|`String`|The edge string to test|

    

#### Returns


|Type|Description|
|:--|:--|
|Boolean|Whether the edge was an end (versus side/x-axis)|

    

#### Throw

- Expected side to be top/bottom/left/right, got #\{ $edge }
    


<div class="sassdoc-item-header">

###  is-side() {#function-is-side}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Returns true if edge passed is an side (left/right)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 699-702
- **Lines (code):** 704-706

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$edge|`String`|The edge string to test|

    

#### Returns


|Type|Description|
|:--|:--|
|Boolean|Whether the edge was an side (versus end/y-axis)|

    

#### Throw

- If $edge is not a valid value (not top/bottom/left/right)
    

#### Require

- [is-end()](/sass/core/utils/#function-is-end)
  
  

## CSS




<div class="sassdoc-item-header">

###  // Could be made into multiple arguments in future if needed 

@function units-match($number, $other-number) {#css-// Could be made into multiple arguments in future if needed 

@function units-match($number, $other-number)}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Css</strong></span>
  </div>

</div>

  

Checks if two numbers are the same unit
    
    

``` scss
{
  @return math.unit($number) == math.unit($other-number);
 }
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** css
- **Lines (comments):** 164-167
- **Lines (code):** 170-706

</details>

    
  
  