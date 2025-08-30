---
title: Skeleton
sassdocGroupName: skeleton
---


# Skeleton

<div class="type-large">

Placeholder component for skeleton (ie. loading state

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
  "animation" : UluPulse 2s cubic-bezier(0.4,0,0.6,1) infinite,
  "color" : "type-disabled",
  "background-color" : #e2e2e2,
  "background-color-alt" : #cecece,
  "border-radius": true,
  "inline-margin" : 0.35em,
  "media-ratio" : list.slash(4, 3),
  "text-border-radius" : 3em,
  "text-sizes": (
    "small-xxx" : 10%,
    "small-xx" : 20%,
    "small-x" : 30%,
    "small" : 40%,
    "large" : 70%,
    "large-x" : 85%,
    "large-xx" : 100%
  ),
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _skeleton.scss
- **Group:** skeleton
- **Type:** variable
- **Lines (comments):** 25-35
- **Lines (code):** 36-54

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|animation|CssValue|pulse 2s cubic-bezier(0.4,0,0.6,1) infinite|The animation applied to skeleton elements.|
|color|Color|type-disabled|The base color for skeleton elements.|
|background-color|Color|#cbcbcb|The primary background color for skeleton elements.|
|background-color-alt|Color|#aeaeae|An alternative background color for skeleton elements, used for variations.|
|border-radius|Dimension|true|The border-radius for skeleton blocks and text. If set to true, uses the element.scss property for "border-radius".|
|inline-margin|Dimension|0.35em|The margin between inline skeleton text elements.|
|media-ratio|Number|(4/3)|The aspect ratio for skeleton media blocks (width/height).|
|text-border-radius|Dimension|3em|The border-radius for skeleton text lines.|
|text-sizes|Map|Map|A map defining various width percentages for skeleton text lines.|

    
  

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
  
- **File:** _skeleton.scss
- **Group:** skeleton
- **Type:** mixin
- **Lines (comments):** 56-59
- **Lines (code):** 61-63

</details>

    

#### Examples

      


``` scss
@include ulu.component-skeleton-set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _skeleton.scss
- **Group:** skeleton
- **Type:** mixin
- **Lines (comments):** 75-78
- **Lines (code):** 80-117

</details>

    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/skeleton">View</a>

</div>



#### Examples

      


``` scss
@include ulu.component-skeleton-styles();
```
  



      

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
  
- **File:** _skeleton.scss
- **Group:** skeleton
- **Type:** function
- **Lines (comments):** 65-68
- **Lines (code):** 70-73

</details>

    

#### Examples

      


``` scss
@include ulu.component-skeleton-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  