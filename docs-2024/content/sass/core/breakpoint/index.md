---
title: Breakpoint
sassdocGroupName: breakpoint
---


# Breakpoint





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
  "gap":       0.01em,
  "null-name": "none",
  "default" :  "small"
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** variable
- **Lines (comments):** 9-14
- **Lines (code):** 16-21
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|base|Number|16px|Assumed pixel base, can change based on users font settings so this is just o get us in the ballpark). Note this is not the base font size but the user agent's or user's browser preferernce. This number is just being used for calculating estimated em sizes from average base. Since pixels are easier to understand but since we allow the user to set their font size. All of our css is relative to that, including most of the layout (rems, other relative units)|
|gap|Number|0.01em|The amount to offset min from max media queries incase you are using both (ie prevent overlap)|
|null-name|String|"none"|The name of the space from 0 to the first breakpoint (doesn't really matter) used when passing breakpoints to JS via content property|
|default|String|"small"|The name of the breakpont that is considered the major change (ie desktop to mobile) used by other modules/components|

    


<div class="sassdoc-item-header">

###  $sizes {#variable-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

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
  

    <details>
      <summary>File Information</summary>
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** variable
- **Lines (comments):** 43-47
- **Lines (code):** 49-53
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
- **Lines (comments):** 23-26
- **Lines (code):** 28-30
    </details>
    

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
- **Lines (comments):** 55-62
- **Lines (code):** 64-66
    </details>
    

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
- **Lines (comments):** 90-99
- **Lines (code):** 101-107
    </details>
    

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

- [get-size()](/sass/core/breakpoint/#function-get-size)
  


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
- **Lines (comments):** 109-118
- **Lines (code):** 120-126
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

- [get-size()](/sass/core/breakpoint/#function-get-size)
- [get()](/sass/core/breakpoint/#function-get)
  


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
- **Lines (comments):** 128-138
- **Lines (code):** 140-147
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
- This is for mostly programmatic usage, so that a user could pass a breakpoint confiuration in either direction
- This way you don't need to repeat conditions (ie if min ... else ...)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 149-159
- **Lines (code):** 161-173
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

###  embed-for-scripts() {#mixin-embed-for-scripts}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Attaches breakpoints to an element psuedo content for access via script
- Note you can also use cssvar.declare-breakpoints to get a similiar implementation with css custom-properties
- Use with ulu/js/breakpoints. Breakpoints always min-width (upwards) for javascript setup
    
    

    <details>
      <summary>File Information</summary>
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 175-177
- **Lines (code):** 179-189
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
- **Lines (comments):** 32-36
- **Lines (code):** 38-40
    </details>
    

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
- [$config](/sass/core/breakpoint/#variable-config)
  


<div class="sassdoc-item-header">

###  get-sizes() {#function-get-sizes}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get all breakpoint sizes (ie. $sizes) 
    
    

    <details>
      <summary>File Information</summary>
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 68-68
- **Lines (code):** 69-71
    </details>
    

#### Require

- [$sizes](/sass/core/breakpoint/#variable-sizes)
  


<div class="sassdoc-item-header">

###  get-size() {#function-get-size}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Geta a specific size
    
    

    <details>
      <summary>File Information</summary>
- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 73-75
- **Lines (code):** 76-79
    </details>
    

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
- **Lines (comments):** 81-83
- **Lines (code):** 85-88
    </details>
    

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
  
  
  