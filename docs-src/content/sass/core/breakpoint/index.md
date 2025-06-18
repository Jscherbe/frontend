---
title: Breakpoint
sassdocGroupName: breakpoint
---


# Breakpoint

<div class="type-large">

Utilities for working with breakpoints

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
  "base":      16px,
  "default" :  "small",
  "gap":       0.01em,
  "null-name": "none",
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** variable
- **Lines (comments):** 10-15
- **Lines (code):** 17-22

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|base|Number|16px|Assumed pixel base, can change based on users font settings so this is just to get us in the ballpark. Note this is not the base font size but the user agent's or user's browser preference. This number is just being used for calculating estimated em sizes from average base. Since pixels are easier to understand but since we allow the user to set their font size. All of our css is relative to that, including most of the layout (rems, other relative units)|
|gap|Number|0.01em|The amount to offset min from max media queries incase you are using both (prevent overlap)|
|null-name|String|"none"|The name of the space from 0 to the first breakpoint (doesn't really matter) used when passing breakpoints to JS via content property (see breakpoint.embed-for-scripts() or cssvar.declare-breakpoint-sizes()) to pass breakpoints to JS. The js ui/breakpoints.js module provides methods for interacting with breakpoints in JS.|
|default|String|"small"|The name of the breakpoint that is considered the major change (ie desktop to mobile) used by other modules/components|

    


<div class="sassdoc-item-header">

###  $sizes {#variable-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

The default breakpoint sizes
- Map of breakpoints
- Each property is the breakpoints name
- Each value is that breakpoints point (set in em by default)
    
    

``` scss
$sizes: (
  "small"  : utils.pixel-to-em(680px, get("base")),
  "medium" : utils.pixel-to-em(1200px, get("base")),
  "large"  : utils.pixel-to-em(1500px, get("base"))
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** variable
- **Lines (comments):** 47-51
- **Lines (code):** 53-57

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
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 24-27
- **Lines (code):** 29-31

</details>

    

#### Examples

Change default name      


``` scss
@include ulu.breakpoint-set(( "default" : "mini" ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  set-sizes() {#mixin-set-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Update the breakpoint sizes map
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 59-66
- **Lines (code):** 68-70

</details>

    

#### Examples

Changing the medium breakpoint and adding jumbo      


``` scss
@include ulu.breakpoints-set-sizes((
  "medium" : 50em,
  "jumbo" : 100em
));
```
  



      

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$changes|`Map`|A map to merge into the breakpoints map||
|$merge-mode|`Map`|Merge strategy see, utils.map-merge options|null|

    

#### Require

- map-merge()
- [$sizes](/sass/core/breakpoint/#variable-sizes)
  


<div class="sassdoc-item-header">

###  min() {#mixin-min}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Create a media query that matches the min-width for a given size
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 147-156
- **Lines (code):** 158-164

</details>

    

#### Examples

      


``` scss
@include ulu.breakpoints-min("small") {
  // Your styles
}
```
  



      

      


``` css
@media screen and (min-width: 42.5em) {
   // Your Styles
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`String`|The name of the breakpoint size|

    

#### Require

- [get-size-value()](/sass/core/breakpoint/#function-get-size-value)
  


<div class="sassdoc-item-header">

###  max() {#mixin-max}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Create a media query that matches the max-width for a given size
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 166-175
- **Lines (code):** 177-183

</details>

    

#### Examples

      


``` scss
@include breakpoints.max("medium") {
  // Your styles
}
```
  



      

      


``` css
@media screen and (max-width: 42.4em) {
   // Your Styles
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`Number`|The name of the breakpoint size|

    

#### Require

- [get-size-value()](/sass/core/breakpoint/#function-get-size-value)
  


<div class="sassdoc-item-header">

###  min-max() {#mixin-min-max}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Create a media query that matches between two breakpoint sizes
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 185-195
- **Lines (code):** 197-204

</details>

    

#### Examples

      


``` scss
@include breakpoints.min-max("small", "medium") {
  // Your styles
}
```
  



      

      


``` css
@media screen and (min-width: 42.5) and (max-width: 75em) {
   // Your Styles
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size-min|`String`|The name of the smallest breakpoint size|
|$size-max|`String`|The name of the largest breakpoint size|

    

#### Require

- [get-size()](/sass/core/breakpoint/#function-get-size)
  


<div class="sassdoc-item-header">

###  from() {#mixin-from}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Create a media query from a specific size in either direction 
- This is for mostly programmatic usage, so that a user could pass a breakpoint configuration that may contain values that go in either direction
- This way you don't need to repeat conditions (ie if min ... else ...)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 206-216
- **Lines (code):** 218-230

</details>

    

#### Examples

      


``` scss
$size: map.get($user-breakpoint, "size");
$dir: map.get($user-breakpoint, "direction");
@include breakpoints.from($size, $dir) {
  // Your styles
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|The name of the breakpoint size|
|$direction|`String`|The direction the media query should target (min|up, max|down)|

    

#### Throw

- ULU: Mixin error (breakpoint.from), incorrect argument 
    

#### Require

- [min()](/sass/core/breakpoint/#mixin-min)
- [max()](/sass/core/breakpoint/#mixin-max)
  


<div class="sassdoc-item-header">

###  from-each() {#mixin-from-each}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Utility Method for iterating over a map of breakpoints and apply styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 232-239
- **Lines (code):** 241-259

</details>

    

#### Examples

      


``` scss
@include breakpoints.fromEach($breakpoints) using ($props) {
  width: map.get($props, "width");
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$breakpoints|`String`|A map with breakpoints direction will be pulled from each items "direction" property, if direction is missing and no breakpoint will wrap the code|
|$options|`String`|A map with options to change the behavior|
|$options.directionRequired|`Boolean`|Require direction throw error if missing direction|

    

#### Throw

- ULU: Missing required 
    

#### Require

- [from()](/sass/core/breakpoint/#mixin-from)
- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  embed-for-scripts() {#mixin-embed-for-scripts}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Attaches breakpoints to an element pseudo content for access via script
- Note you can also use cssvar.declare-breakpoints to get a similar implementation with css custom-properties
- Use with ulu/js/breakpoints (class has options for content property or css custom property)
- Breakpoints always min-width (upwards) for javascript setup
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 261-264
- **Lines (code):** 266-276

</details>

    

#### Require

- [min()](/sass/core/breakpoint/#mixin-min)
- [get()](/sass/core/breakpoint/#function-get)
- [$sizes](/sass/core/breakpoint/#variable-sizes)
  
  

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
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 33-41
- **Lines (code):** 43-45

</details>

    

#### Examples

Example usage      


``` scss
.test-get {
  font-size: ulu.breakpoint-get("base");
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Returns


|Type|Description|
|:--|:--|
|*|Property Value|

    

#### Require

- require-map-get()
- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  get-sizes() {#function-get-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get all breakpoint sizes
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 72-81
- **Lines (code):** 83-85

</details>

    

#### Examples

Example usage      


``` scss
.test-get-sizes {
  $sizes: ulu.breakpoint-get-sizes();
  height: map.get($sizes, "medium");
}
```
  



      

#### Returns


|Type|Description|
|:--|:--|
|Map|Map of breakpoints (equivalent to $sizes)|

    

#### Require

- [$sizes](/sass/core/breakpoint/#variable-sizes)
  


<div class="sassdoc-item-header">

###  get-size() {#function-get-size}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a specific breakpoint's raw value/size
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 87-96
- **Lines (code):** 98-100

</details>

    

#### Examples

Example usage      


``` scss
.test-get-size {
  height: ulu.breakpoint-get-size("medium");
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`String`|The name of the size to get|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|The sizes value|

    

#### Require

- require-map-get()
- [$sizes](/sass/core/breakpoint/#variable-sizes)
  


<div class="sassdoc-item-header">

###  get-size-value() {#function-get-size-value}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a specific breakpoint's size's value and optionally specify max to get the ending/max value for a breakpoint
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 102-112
- **Lines (code):** 114-120

</details>

    

#### Examples

Example usage      


``` scss
.test-get-size-value {
  height: ulu.breakpoint-get-size-value("medium", true);
  max-height: ulu.breakpoint-get-size-value("medium");
}
```
  



      

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$max|`Boolean`|false|Get the max value|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|The value for the given size|

    

#### Require

- [get-size()](/sass/core/breakpoint/#function-get-size)
- [get()](/sass/core/breakpoint/#function-get)
  


<div class="sassdoc-item-header">

###  exists() {#function-exists}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Check if a specific size exist
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 122-140
- **Lines (code):** 142-145

</details>

    

#### Examples

Example usage      


``` scss
.test-exists {
  @if(ulu.breakpoint-exists("medium")) {
    @include ulu.breakpoint-min("medium") {
      padding: 2rem;
    }
  }
  // The below content doesn't print because the size doesn't exist.
  @if(ulu.breakpoint-exists("too-large")) {
    @include ulu.breakpoint-min("too-large") {
      padding: 20000rem;
    }
  }
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|The breakpoint size to check if exists|

    

#### Returns


|Type|
|:--|
|Boolean|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- [$sizes](/sass/core/breakpoint/#variable-sizes)
  
  
  