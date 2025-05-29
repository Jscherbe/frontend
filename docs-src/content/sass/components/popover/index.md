---
title: Popover
sassdocGroupName: popover
---


# Popover

<div class="type-large">



</div>



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
  
- **File:** _popover.scss
- **Group:** popover
- **Type:** mixin
- **Lines (comments):** 96-99
- **Lines (code):** 101-103

</details>

    

#### Examples

      


``` scss
@include ulu.component-popover-set(( "property" : value ));
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
  
- **File:** _popover.scss
- **Group:** popover
- **Type:** mixin
- **Lines (comments):** 115-117
- **Lines (code):** 119-234

</details>

    

#### Examples

      


``` scss
@include ulu.component-popover-styles();
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
  
- **File:** _popover.scss
- **Group:** popover
- **Type:** function
- **Lines (comments):** 105-108
- **Lines (code):** 110-113

</details>

    

#### Examples

      


``` scss
@include ulu.component-popover-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  

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
  "arrow-size"                   : 16px,
  "arrow-box-shadow"             : true,
  "arrow-box-shadow-extent"      : null,
  "background-color"             : white,
  "border-radius"                : 6px,
  "color"                        : inherit,
  "max-width"                    : 90vw,
  "max-height"                   : 25rem,
  "padding"                      : 1rem,
  "padding-large"                : 2rem,
  "type-size"                    : null,
  "z-index"                      : true,
  "box-shadow"                   : true,
  "header-background-color"      : #ccc,
  "header-color"                 : null,
  "header-media-background-color": black,
  "header-padding-y"             : 0.25rem,
  "footer-border-top"            : 1px solid #dfdfdf,  
  "footer-background-color"      : #ccc,
  "footer-color"                 : null,
  "footer-padding-y"             : 0.25rem,
  "footer-padding-y-large"       : 0.5rem,
  "tooltip-background-color"     : white,
  "tooltip-color"                : null,
  "tooltip-max-width"            : 20rem,
  "tooltip-padding"              : 0.5rem,
  "tooltip-width"                : auto,
  "width"                        : 15rem,
  "width-large"                  : 30rem,
  "width-large-x"                : 50rem,
  );
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _popover.scss
- **Group:** popover
- **Type:** variable
- **Lines (comments):** 30-61
- **Lines (code):** 63-94

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|arrow-size|Dimension|16px|Size of the dropdown arrow.|
|arrow-box-shadow|Boolean|true|When true the arrow will get the popover's box shadow. Note if the box shadow is not a list (for example custom property), the mask won't be calculated from the box-shadow (use arrow-box-shadow-extent to specify manually)|
|arrow-box-shadow-extent|Number|null|If set will determine the amount of overlap added to the arrow mask, else it's calculated automatically by the box-shadow option (can be used if box-shadow is custom property)|
|background-color|Color|white|Background color of the popover.|
|border-radius|Dimension|6px|Border radius of the popover.|
|color|Color|inherit|Text color of the popover.|
|max-width|Dimension|90vw|Max width of the popover.|
|max-height|Dimension|25rem|Max height of the popover.|
|padding|Dimension|1rem|Padding of the popover.|
|padding-large|Dimension|2rem|Padding of the popover if using "--large" or "--large-x" styling.|
|type-size|Dimension|null|Font size of the popover.|
|z-index|Number|true|z-index of the popover.|
|box-shadow|CssValue|true|Box shadow of the popover.|
|header-background-color|Color|#ccc|Background color of the popover header|
|header-color|Color|null|Text color for the header.|
|header-media-background-color|Color|black|background color for header media.|
|header-padding-y|Dimension|0.25rem|Vertical padding of the header.|
|footer-background-color|Color|#ccc|Background color of the footer.|
|footer-border-top|Color|1px solid #dfdfdf|Optional border used to separate the content from footer|
|footer-color|Color|null|Text color of the footer.|
|footer-padding-y|Dimension|0.25rem|Vertical padding of the footer.|
|footer-padding-y-large|Dimension|0.5rem|Vertical padding of the footer if using "--large" or "--large-x" styling.|
|tooltip-background-color|Color|white|Background color of the tooltip.|
|tooltip-color|Color|null|Font color of the tooltip.|
|tooltip-max-width|Dimension|20rem|Max width of the tooltip.|
|tooltip-padding|Dimension|0.5rem|Padding of the tooltip.|
|tooltip-width|Dimension|auto|Width of the tooltip.|
|width|Dimension|15rem|Width of the popover.|
|width-large|Dimension|30rem|Width of the popover if using "--large".|
|width-large-x|Dimension|50rem|Width of the popover if using "--large-x".|

    
  
  