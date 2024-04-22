---
title: Breakpoint
sassdocGroupName: breakpoint
---


# Breakpoint





## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "base":      16px,
  "gap":       0.01em,
  "null-name": "none",
  "default" :  "small"
);
```
  

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** variable
- **Lines (comments):** 9-14
- **Lines (code):** 16-21
    
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|base|Number|16px|Assumed pixel base, can change based on users font settings so this is just o get us in the ballpark). Note this is not the base font size but the user agent's or user's browser preferernce. This number is just being used for calculating estimated em sizes from average base. Since pixels are easier to understand but since we allow the user to set their font size. All of our css is relative to that, including most of the layout (rems, other relative units)|
|gap|Number|0.01em|The amount to offset min from max media queries incase you are using both (ie prevent overlap)|
|null-name|String|"none"|The name of the space from 0 to the first breakpoint (doesn't really matter) used when passing breakpoints to JS via content property|
|default|String|"small"|The name of the breakpont that is considered the major change (ie desktop to mobile) used by other modules/components|

    


###  $sizes {#variable-sizes} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

The default breakpoint sizes (targets are not precise, using em's)
- Map of breakpoints
- Each property is the breakpoints name
- Each value is that breakpoints point (set in em)
    
    

``` scss
$sizes: (
  "small"  : calculate.pixel-to-em(680px, get("base")),
  "medium" : calculate.pixel-to-em(1200px, get("base")),
  "large"  : calculate.pixel-to-em(1500px, get("base"))
);
```
  

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** variable
- **Lines (comments):** 43-47
- **Lines (code):** 49-53
    
    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 23-26
- **Lines (code):** 28-30
    
    

#### Examples

Change default name      


``` scss
@include breakpoint.set(( "default" : "mini" ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/scss/core/breakpoint/#variable-config)
  


###  set-sizes() {#mixin-set-sizes} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Update the breakpoint sizes map
    
    

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 55-62
- **Lines (code):** 64-66
    
    

#### Examples

Changing the medium breakpoint and adding jumbo      


``` scss
@include breakpoints.set((
  "medium" : 50em,
  "jumbo" : 100em
));
```
  

      

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$changes|`Map`|A map to merge into the breakpoints map||
|$merge-mode|`Map`|Merge stradegy see, utils.map-merge options|null|

    

#### Require

- map-merge()
- [$sizes](/scss/core/breakpoint/#variable-sizes)
  


###  min() {#mixin-min} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Create a media query that matches the min-width for a given size
    
    

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 90-99
- **Lines (code):** 101-107
    
    

#### Examples

      


``` scss
@include breakpoints.min("small") {
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

- [get-size()](/scss/core/breakpoint/#function-get-size)
  


###  max() {#mixin-max} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Create a media query that matches the max-width for a given size
    
    

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 109-118
- **Lines (code):** 120-126
    
    

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

- [get-size()](/scss/core/breakpoint/#function-get-size)
- [get()](/scss/core/breakpoint/#function-get)
  


###  min-max() {#mixin-min-max} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Create a media query that matches between two breakpoint sizes
    
    

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 128-138
- **Lines (code):** 140-147
    
    

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

- [get-size()](/scss/core/breakpoint/#function-get-size)
  


###  from() {#mixin-from} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Create a media query from a specific size in either direction 
- This is for mostly programmatic usage, so that a user could pass a breakpoint confiuration in either direction
- This way you don't need to repeat conditions (ie if min ... else ...)
    
    

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 149-159
- **Lines (code):** 161-173
    
    

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

- [min()](/scss/core/breakpoint/#mixin-min)
- [max()](/scss/core/breakpoint/#mixin-max)
  


###  embed-for-scripts() {#mixin-embed-for-scripts} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Attaches breakpoints to an element psuedo content for access via script
- Note you can also use cssvar.declare-breakpoints to get a similiar implementation with css custom-properties
- Use with ulu/js/breakpoints. Breakpoints always min-width (upwards) for javascript setup
    
    

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 175-177
- **Lines (code):** 179-189
    
    

#### Require

- [min()](/scss/core/breakpoint/#mixin-min)
- [get()](/scss/core/breakpoint/#function-get)
- [$sizes](/scss/core/breakpoint/#variable-sizes)
  
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 32-36
- **Lines (code):** 38-40
    
    

#### Examples

Get default breakpoint name      


``` scss
$default: breakpoint.get("default");
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
- [$config](/scss/core/breakpoint/#variable-config)
  


###  get-sizes() {#function-get-sizes} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get all breakpoint sizes (ie. $sizes) 
    
    

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 68-68
- **Lines (code):** 69-71
    
    

#### Require

- [$sizes](/scss/core/breakpoint/#variable-sizes)
  


###  get-size() {#function-get-size} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Geta a specific size
    
    

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 73-75
- **Lines (code):** 76-79
    
    

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
- [$sizes](/scss/core/breakpoint/#variable-sizes)
  


###  exists() {#function-exists} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Check if a specific size exist
    
    

#### Details

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 81-83
- **Lines (code):** 85-88
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|The breakpoint size to check if exists|

    

#### Returns


|Type|
|:--|
|Boolean|

    

#### Require

- [get()](/scss/core/breakpoint/#function-get)
- [$sizes](/scss/core/breakpoint/#variable-sizes)
  
  
  