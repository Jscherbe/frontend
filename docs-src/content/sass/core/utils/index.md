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
- **Lines (comments):** 71-75
- **Lines (code):** 77-87

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
- **Lines (comments):** 89-93
- **Lines (code):** 95-99

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
- **Lines (comments):** 126-128
- **Lines (code):** 130-138

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
- **Lines (comments):** 642-645
- **Lines (code):** 647-654

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
- **Lines (comments):** 35-41
- **Lines (code):** 43-45

</details>

    

#### Examples

Example usage      



``` scss
.test-em-to-pixel {
  width: ulu.utils-get("pixel-em-base");
}
```
  

``` css
.test-em-to-pixel {
  width: 16px;
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Returns


|Type|
|:--|
|Dimension|

    

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
- **Lines (comments):** 47-57
- **Lines (code):** 59-69

</details>

    

#### Examples

Example usage      



``` scss
.test-require-map {
  $test-map: ("test-font-size": 12px);
  font-size: ulu.utils-require-map-get($test-map, "test-font-size");
}
```
  

``` css
.test-require-map {
  font-size: 12px;
}
```
  



      

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
- **Lines (comments):** 101-119
- **Lines (code):** 121-124

</details>

    

#### Examples

Example usage      



``` scss
$include-styles : (
  "h2" : true,
  "h3" : false
);
@if(ulu.utils-included("h2", $include-styles)) {
  h2 {
    font-size: 24px;
  }
}
@if(ulu.utils-included("h3", $include-styles)) {
  h3 {
    font-size: 18px;
  }
}
```
  

``` css
h2 {
  font-size: 24px;
}
```
  



      

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

  

Provide a default when value type is not correct
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 140-154
- **Lines (code):** 156-162

</details>

    

#### Examples

Example usage      



``` scss
$user-accent-color: #FE5F55;
$user-error-color: "##C6ECAE";
$default-color: #777DA7;
.accent-color {
  background-color: ulu.utils-if-type("color", $user-accent-color, $default-color);
}
.error-color {
  background-color: ulu.utils-if-type("color", $user-error-color, $default-color);
}
```
  

``` css
.accent-color {
  background-color: #FE5F55;
}

.error-color {
  background-color: #777DA7;
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$type|`String`|type of value it should be|
|$value|`String`|the value to provide if it is that type|
|$fallback|`String`|the fallback value|

    

#### Returns


|Type|Description|
|:--|:--|
|CssValue|Returns the value or the fallback.|

    


<div class="sassdoc-item-header">

###  number-info() {#function-number-info}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Returns number unit info, and strips the unit
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 164-176
- **Lines (code):** 178-198

</details>

    

#### Examples

Example usage      



``` scss
$size-info: ulu.utils-number-info(24px);
$size-info-invalid: ulu.utils-number-info("Twenty Four Pixels");
.number-info-result {
  content: meta.inspect($size-info);
}
.number-info-invalid-result {
  content: meta.inspect($size-info-invalid);
}
```
  

``` css
.number-info-result {
  content: ("unit": "px", "value": 24, "invalid": false);
}

.number-info-invalid-result {
  content: ("unit": null, "value": "Twenty Four Pixels", "invalid": true);
}
```
  



      

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
- **Lines (comments):** 200-212
- **Lines (code):** 214-216

</details>

    

#### Examples

Example usage      



``` scss
$number: 12;
$unit: "px";
$number-with-unit: ulu.utils-add-unit($number, $unit);
.add-unit-result {
  content: $number-with-unit;
}
```
  

``` css
.add-unit-result {
  content: 12px;
}
```
  



      

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

###  units-match() {#function-units-match}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Checks if two numbers are the same unit
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 218-233
- **Lines (code):** 235-237

</details>

    

#### Examples

Example usage      



``` scss
$number-1: 12px;
$number-2: 12px;
$number-3: 12rem;
.positive-result {
  content: ulu.utils-units-match($number-1, $number-2);
}
.negative-result {
  content: ulu.utils-units-match($number-1, $number-3);
}
```
  

``` css
.positive-result {
  content: true;
}

.negative-result {
  content: false;
}
```
  



      

#### Parameters


|Name|Type|
|:--|:--|
|$number|`Number`|
|$other-number|`String`|

    

#### Returns


|Type|Description|
|:--|:--|
|Boolean|Whether they have the same unit type
Could be made into multiple arguments in future if needed|

    


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
- **Lines (comments):** 239-270
- **Lines (code):** 272-280

</details>

    

#### Examples

Example usage      



``` scss
$map-1: (
  "inner-map" : (
    "color" : "green",
    "secondary-color" : "green"
  ),
  "color" : "green",
  "secondary-color" : "green"
);
$map-2: (
  "inner-map" : (
    "color" : "red"
  ),
  "color" : "red",
);
.result-default {
  $merged-map: ulu.utils-map-merge($map-1, $map-2);
  content: meta.inspect($merged-map);
}
.result-deep {
  $merged-map-deep: ulu.utils-map-merge($map-1, $map-2, "deep");
  content: meta.inspect($merged-map-deep);
}
.result-overwrite {
  $merged-map-overwrite: ulu.utils-map-merge($map-1, $map-2, "overwrite");
  content: meta.inspect($merged-map-overwrite);
}
```
  

``` css
.result-default {
  content: ("inner-map": ("color": "red"), "color": "red", "secondary-color": "green");
}

.result-deep {
  content: ("inner-map": ("color": "red", "secondary-color": "green"), "color": "red", "secondary-color": "green");
}

.result-overwrite {
  content: ("inner-map": ("color": "red"), "color": "red");
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$original|`Map`|Source map|
|$changes|`Map`|Changes to merge into source map|
|$mode|`String`|How to merge changes (merge [defualt], deep, or overwrite)|

    


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
- **Lines (comments):** 282-299
- **Lines (code):** 301-306

</details>

    

#### Examples

Example usage      



``` scss
$map-1 : (
  "has-key" : true
);
$map-2 : (
  "missing-key" : true
);
.map-1 {
  content: ulu.utils-map-has($map-1, "has-key");
}
.map-2 {
  content: ulu.utils-map-has($map-2, "has-key");
}
```
  

``` css
.map-1 {
  content: true;
}

.map-2 {
  content: false;
}
```
  



      

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
- **Lines (comments):** 308-309
- **Lines (code):** 311-319

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
- **Lines (comments):** 321-333
- **Lines (code):** 335-342

</details>

    

#### Examples

Example usage      



``` scss
$fallback-text: "No input received";
.user-name:after {
  $user-name: "Johnny";
  content: ulu.utils-fallback($user-name, $fallback-text);
}
.user-birthdate:after {
  $user-birthdate: null;
  content: ulu.utils-fallback($user-birthdate, $fallback-text);
}
```
  

``` css
.user-name:after {
  content: "Johnny";
}

.user-birthdate:after {
  content: "No input received";
}
```
  



      

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
- **Lines (comments):** 344-344
- **Lines (code):** 345-353

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
- **Lines (comments):** 356-372
- **Lines (code):** 373-392

</details>

    

#### Examples

Example usage      



``` scss
$map : (
  "has-key" : true
);
$keys : (
  "has-key",
  "needs-key",
);
.map-contains-any-result {
  content: ulu.utils-map-contains-any($map, $keys);
}
```
  

``` css
.map-contains-any-result {
  content: true;
}
```
  



      

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
- **Lines (comments):** 394-398
- **Lines (code):** 400-426

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
- **Lines (comments):** 428-432
- **Lines (code):** 434-450

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
- **Lines (comments):** 452-456
- **Lines (code):** 458-466

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
- **Lines (comments):** 468-472
- **Lines (code):** 474-482

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
- **Lines (comments):** 484-488
- **Lines (code):** 490-505

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
- **Lines (comments):** 507-522
- **Lines (code):** 524-540

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
- **Lines (comments):** 542-551
- **Lines (code):** 553-555

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
- **Lines (comments):** 557-566
- **Lines (code):** 568-570

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
- **Lines (comments):** 572-581
- **Lines (code):** 583-585

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
- **Lines (comments):** 587-596
- **Lines (code):** 598-600

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
- **Lines (comments):** 602-608
- **Lines (code):** 610-620

</details>

    

#### Examples

Example usage      



``` scss
.test {
  line-height: ulu.utils-strip-unit(4rem);
}
```
  

``` css
.test {
  line-height: 4;
}
```
  



      

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
- **Lines (comments):** 622-627
- **Lines (code):** 629-631

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
- **Lines (comments):** 633-636
- **Lines (code):** 638-640

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
- **Lines (comments):** 656-660
- **Lines (code):** 662-664

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
- **Lines (comments):** 666-669
- **Lines (code):** 671-702

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
- **Lines (comments):** 704-708
- **Lines (code):** 710-728

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
- **Lines (comments):** 730-732
- **Lines (code):** 734-736

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
- **Lines (comments):** 738-740
- **Lines (code):** 742-744

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
- **Lines (comments):** 746-748
- **Lines (code):** 750-752

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
- **Lines (comments):** 754-756
- **Lines (code):** 758-760

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
- **Lines (comments):** 762-764
- **Lines (code):** 766-768

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
- **Lines (comments):** 788-791
- **Lines (code):** 793-799

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
- **Lines (comments):** 801-803
- **Lines (code):** 805-807

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
- **Lines (comments):** 809-811
- **Lines (code):** 813-815

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
- **Lines (comments):** 817-820
- **Lines (code):** 822-830

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
- **Lines (comments):** 832-835
- **Lines (code):** 837-839

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
  
  
  