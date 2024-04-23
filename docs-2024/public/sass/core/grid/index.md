---
title: Grid
sassdocGroupName: grid
---


# Grid

Layout grid that uses attributes instead of classes
- See the core layout module for changing defaults



## Variables




###  $config {#variable-config} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map</small>

  

Module Settings
    
    

``` scss
$config: (
  "columns":            12,
  "attribute":          "data-grid",
  "attribute-container" : "data-grid-container",
  "gutter":             14px,
  "breakpoint" :        false, // Fallback to default
  "extra-breakpoints" : (
    "medium" : (
      "breakpoint" : "medium",
      "gutter" : 15px
    ),
    "large" : (
      "breakpoint" : "large",
      "gutter" : 20px
    )
  ),
  "position-class-column-first": "position-column-first",
  "position-class-column-last":  "position-column-last",
  "position-class-row-first":    "position-row-first",
  "position-class-row-last":     "position-row-last"
);
```
  

#### Details

- **File:** _grid.scss
- **Group:** grid
- **Type:** variable
- **Lines (comments):** 32-41
- **Lines (code):** 43-63
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.columns|Number|Default for grid mixin|
|$config.attribute|String|Default attribute to use for grid mixin|
|$config.gutter|Number|Default gutter for grid mixin|
|$config.extra-breakpoints|Map|Default extra breakpoints for grid mixin|
|$config.position-class-column-first|MaStringp|Classname for position system (JS) grid uses to display rules (layout can flow, script will update classes)|
|$config.position-class-column-last|String|See definition above|
|$config.position-class-row-first|String|See definition above|
|$config.position-class-row-last|String|See definition above|

    
  

## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _grid.scss
- **Group:** grid
- **Type:** mixin
- **Lines (comments):** 65-68
- **Lines (code):** 70-72
    
    

#### Examples

      


``` scss
@include module-name.set(( "property" : value ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/core/breakpoint/#variable-config)
  


###  create() {#mixin-create} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Creates grid css (variation of original data-grid)
    
    

#### Details

- **File:** _grid.scss
- **Group:** grid
- **Type:** mixin
- **Lines (comments):** 107-116
- **Lines (code):** 118-551
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$columns|`Number`|Columns in grid|
|$breakpoint|`Number`|Breakpoint key for starting the grid|
|$extra-breakpoints|`Map`|Map with other breakpoints to add (map of breakpoint and gutter see config.extra-breakpoints for an example (smalles to largest)|
|$gutter|`Number`|Size in pixels for the gutters|
|$include-rules|`Boolean`|Print styles for including rules|
|$rule-size|`Number`|Size of the rule (border/seperator)|
|$extra-rule-styles|`Map`|Map of other rule styles to add (map of maps of size, and color), key is the styles name ("name": ("size" : 4px, "color" : "color name" || color))|
|$extra-gutter-scales|`String`|A map of gutter scales used like `data-grid="gutter-scale: large`, configuration map property becomes scale name and value is the amount (multiplier) to apply to the grid's gutter ie `( "large" : 2.25 )`|
|$attribute|`Map`|Attribute to use for selecting grid and children. Children attribute get's "-item" as a suffix ("ie. data-grid, data-grid-item")|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- require-map-get()
  
  

## Functions




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _grid.scss
- **Group:** grid
- **Type:** function
- **Lines (comments):** 74-77
- **Lines (code):** 79-81
    
    

#### Examples

      


``` scss
@include module-name.get("property");
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- require-map-get()
- [$config](/sass/core/breakpoint/#variable-config)
  


###  get-gutter() {#function-get-gutter} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Returns gutter size for grid breakpoint map, defaults to the config's values
Pass custom map to get gutter values from it
    
    

#### Details

- **File:** _grid.scss
- **Group:** grid
- **Type:** function
- **Lines (comments):** 83-86
- **Lines (code):** 88-96
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|The name of the "grid breakpoint" (could be a different name than the actual breakpoint name it maps too)|
|$custom-map|`Map`|Provide custom map of grid breakpoints to get the gutter from (defaults to the grid module's defaults 'extra-breakpoints')|

    

#### Require

- [get()](/sass/core/breakpoint/#function-get)
- require-map-get()
  
  
  