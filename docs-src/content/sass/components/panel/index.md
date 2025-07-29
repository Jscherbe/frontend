---
title: Panel
sassdocGroupName: panel
---


# Panel

<div class="type-large">

A structured container for content with distinct header, body, and footer sections that can bleed to the edges.

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
  "background-color" : rgb(255, 255, 255),
  "border" : null,
  "border-radius" : true,
  "box-shadow" : true,
  "margin-bottom" : 1.5em,
  "overflow" : null,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _panel.scss
- **Group:** panel
- **Type:** variable
- **Lines (comments):** 26-33
- **Lines (code):** 35-42

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|background-color|Color|rgb(255, 255, 255)|The background color of the panel|
|border|Color|null|Set border to panel|
|border-radius|Dimension|element.$config.border-radius|The border radius of the panel|
|box-shadow|CssValue|element.$config.box-shadow|The box-shadow of the panel|
|margin-bottom|Dimension|1.5rem|The bottom margin of the panel|
|overflow|CssValue|null|Value for overflow, not included by default as it interferes with position sticky, but could be useful for cropping if that's needed (can be set on rows too)|

    


<div class="sassdoc-item-header">

###  $styles {#variable-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map</span>
  </div>

</div>

  

Styles Map (for unique variations/modifiers)
- Use this map to define distinct visual styles for the panel
- This map is two levels the first level is the name of the modifier (see default below). 
  This will become the modifier for the pane; so ("transparent" : (...)) = .panel--transparent.
  The second level is that modifier row modifiers (ie. panel__row--header) (see row options below)
- Keyword "default" means without modifier for both parent and row configs
  - For example "default" as panel container modifier name will mean
    styles for this without any modifiers
  - In a panels row config (second level) "default" will refer to the non-modified row (ie .panel__row)
- Order matters, default should be first
- Row Options
  - Each row can have the following options:
      overflow: Set overflow property if needed,
      aspect-ratio,
      height,
      min-height,
      padding,
      margin: Can be used to create gap between container and row
      background-color,
      font-weight,
      font-family,
      color,
      box-shadow,
      grow: Default the panel will grow to fill the containers height, passing false disables this
      border-top: If a string is passed it will resolved as an element rule style
      border-bottom: If a string is passed it will resolved as an element rule style
    
    

``` scss
$styles: (
  "default" : (
    "default" : (
      "padding": (0.25em 1em)
    ),
    "header" : (
      "padding" : (0.5em 1em),
      "background-color" : #eeeeee,
      "border-bottom" : "default",
      "grow" : false
    ),
    "footer" : (
      "padding" : (0.5em 1em),
      "background-color" : #f4f4f4,
      "border-top" : "default",
      "grow" : false
    ),
    "separator-top" : (
      "border-top" : "light",
    ),
    "separator-bottom" : (
      "border-bottom" : "light",
    )
  ),
  "transparent" : (
    "default" : (
      "padding" : (1em 0),
      "margin" : (0 1em),
    ),
    "header" : (
      "padding" : (1em 0),
      "margin" : (0 1em),
      "background-color" : transparent,
      "grow" : false
    ),
    "footer" : (
      "padding" : (1em 0),
      "margin" : (0 1em),
      "background-color" : transparent,
      "grow" : false
    )
  ),
  "compact" : (
    "default" : (
      "padding" : (0.25em 0.5em)
    ),
    "header" : (
      "padding" : (0.25em 0.5em)
    ),
    "body" : (
      "padding" : (0.5em 1em)
    )
  )
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _panel.scss
- **Group:** panel
- **Type:** variable
- **Lines (comments):** 44-70
- **Lines (code):** 72-125

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
  
- **File:** _panel.scss
- **Group:** panel
- **Type:** mixin
- **Lines (comments):** 127-130
- **Lines (code):** 131-133

</details>

    

#### Examples

      


``` scss
@include ulu.component-panel-set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  set-styles() {#mixin-set-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set style variations
- See $styles for more information on map properties/structure
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _panel.scss
- **Group:** panel
- **Type:** mixin
- **Lines (comments):** 144-147
- **Lines (code):** 148-150

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes (options for style include all config properties)|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- [$styles](/sass/components/callout/#variable-styles)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Output component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _panel.scss
- **Group:** panel
- **Type:** mixin
- **Lines (comments):** 152-154
- **Lines (code):** 155-207

</details>

    

#### Examples

      


``` scss
@include ulu.component-panel-styles();
```
  



      

#### Require

- [create-row-style()](/sass/components/panel/#mixin-create-row-style)
- [get()](/sass/components/accordion/#function-get)
- [$styles](/sass/components/callout/#variable-styles)
  


<div class="sassdoc-item-header">

###  create-row-style() {#mixin-create-row-style}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Create row styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _panel.scss
- **Group:** panel
- **Type:** mixin
- **Lines (comments):** 209-210
- **Lines (code):** 211-226

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$props|`Map`|Row Options|

    

#### Require

- [get()](/sass/components/accordion/#function-get)
  
  

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
  
- **File:** _panel.scss
- **Group:** panel
- **Type:** function
- **Lines (comments):** 135-138
- **Lines (code):** 139-142

</details>

    

#### Examples

      


``` scss
@include ulu.component-panel-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  