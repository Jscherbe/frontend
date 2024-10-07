---
title: Pager
sassdocGroupName: pager
---


# Pager





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
  "font-weight":                   bold,
  "width":                         2.5rem,
  "margin-top":                    1rem,
  "margin-bottom":                 2rem,
  "item-margin":                   0.17rem,
  "color":                         white,
  "color-hover":                   white,
  "background-color":              "link",
  "background-color-hover":        "link:hover",
  "border-color":                  "link",
  "border-color-hover":            "link:hover",
  "border-width":                  1px,
  "border-radius":                 50%,
  "active-color":                  "type",
  "active-font-weight":            bold,
  "active-background-color":       #ccc,
  "active-border-color":           #ccc,
  "action-width":                  2.5rem,
  "action-margin":                 0.8rem,
  "action-color":                  white,
  "action-background-color":       "link",
  "action-background-color-hover": "link:hover",
  "action-border-color":           transparent,
  "action-border-color-hover":     "link",
  "action-color-hover":            white
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _pager.scss
- **Group:** pager
- **Type:** variable
- **Lines (comments):** 13-39
- **Lines (code):** 41-67
    </details>
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|font-weight|CssValue|bold|Font-weight of the pager.|
|width|Dimension|2.5rem|The width of the pager items.|
|margin-top|Dimension|1rem|The top margin of the pager.|
|margin-bottom|Dimension|2rem|The bottom margin of the pager.|
|item-margin|Dimension|0.17rem|The item margin.|
|color|Color|white|The type color of the pager item.|
|color-hover|Color|white|The type color of the pager item when covered and focused.|
|background-color|String|link|The background color of the pager. This uses color.scss, so the value of this options should be a color variable from color.scss.|
|background-color-hover|String|linkhover|The background color of the pager when hovered or focused. This uses color.scss, so the value of this options should be a color variable from color.scss.|
|border-color|String|link|The border color of the pager item. This uses color.scss, so the value of this options should be a color variable from color.scss.|
|border-color-hover|String|linkhover|The border color of the pager item when hovered or focused. This uses color.scss, so the value of this options should be a color variable from color.scss.|
|border-width|Dimension|1px|The border width of the pager item.|
|border-radius|Dimension|50%|The border radius of the pager item.|
|active-color|Color|type|The type color when active. This uses color.scss, so the value of this options should be a color variable from color.scss.|
|active-font-weight|CssValue|bold|The font weight of the pager when focused or hovered.|
|active-background-color|Color|#ccc|The background color of the pager when active.|
|active-border-color|Color|#ccc|The border color of the pager when active.|
|action-width|Dimension|2.5rem|The width of the action options of the pager.|
|action-margin|Dimension|0.8rem|The margin of the action options of the pager.|
|action-color|Color|white|The type color of the actions options of the pager.|
|action-background-color|String|link|The background color of the actions options of the pager. This uses color.scss, so the value of this options should be a color variable from color.scss.|
|action-background-color-hover|String|linkhover|The background color of the actions options of the pager when focused or hovered. This uses color.scss, so the value of this options should be a color variable from color.scss.|
|action-border-color|Color|transparent|The border color of the action options of the pager.|
|action-border-color-hover|String|link|The border color of the action options of the pager when focused or hovered. This uses color.scss, so the value of this options should be a color variable from color.scss.|
|action-color-hover|Color|white|The type color of the actions options of the pager when focused or hovered.|

    
  

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
- **File:** _pager.scss
- **Group:** pager
- **Type:** mixin
- **Lines (comments):** 69-71
- **Lines (code):** 73-75
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

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
- **File:** _pager.scss
- **Group:** pager
- **Type:** mixin
- **Lines (comments):** 85-87
- **Lines (code):** 89-161
    </details>
    

#### Examples

      


``` scss
@include ulu.component-example-styles();
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
- **File:** _pager.scss
- **Group:** pager
- **Type:** function
- **Lines (comments):** 77-79
- **Lines (code):** 81-83
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  