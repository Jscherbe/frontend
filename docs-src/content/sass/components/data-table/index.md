---
title: Data-table
sassdocGroupName: data-table
---


# Data-table

<div class="type-large">

For tabular data in native HTML tables. Note, this component can be used with the Vue sticky table plugin.

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
  
- **File:** _data-table.scss
- **Group:** data-table
- **Type:** mixin
- **Lines (comments):** 89-92
- **Lines (code):** 94-96

</details>

    

#### Examples

      


``` scss
@include ulu.component-data-table-set(( "property" : value ));
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

  

Output component stylesheet
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _data-table.scss
- **Group:** data-table
- **Type:** mixin
- **Lines (comments):** 108-110
- **Lines (code):** 112-220

</details>

    

#### Examples

      


``` scss
@include ulu.component-data-table-styles();
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
  
- **File:** _data-table.scss
- **Group:** data-table
- **Type:** function
- **Lines (comments):** 98-101
- **Lines (code):** 103-106

</details>

    

#### Examples

      


``` scss
@include ulu.component-data-table-get("property");
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
  "cell-padding" : (0.5em,),
  "text-align" : left,
  "type-size" : "small",
  "background-color" : white,
  "header-background-color" : #f5f4f4,
  "body-background-color" : white,
  "footer-background-color" : #f3f3f3,
  "color" : "type-secondary",
  "header-color" : "headline",
  "footer-color" : null,
  "line-height" : true,
  "column-min-width" : 6em,
  "first-column-large-min-width" : 15em,
  "border-width" : 1px,
  "border-color" : #dddddd,
  "striped-row-background-color" : #eeeeee,
  "muted-row-background-color" : #ccc,
  "muted-row-border-color" : null,
  "highlighted-row-background-color" : #ccc,
  "highlighted-row-border-color" : null,
  "large-header-cell-padding-y" : 1em,
  "caption-type-size" : "large",
  "caption-background-color" : null,
  "caption-font-weight" : bold,
  "caption-border-bottom" : null,
  "caption-margin" : (0,),
  "caption-padding" : (0.65em 0),
  "caption-text-align" : left,
  "extra-selector" : ".wysiwyg table"
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _data-table.scss
- **Group:** data-table
- **Type:** variable
- **Lines (comments):** 25-55
- **Lines (code):** 57-87

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|cell-padding|Dimension|(0.5em,)|Padding of the th and td elements.|
|text-align|CssValue|left|Text align of the table.|
|type-size|String|"small"|Font size of the table.|
|background-color|Color|white|Background color of table container.|
|header-background-color|Color|#f5f4f4|Background color of the the table header.|
|body-background-color|Color|white|Background color of table body.|
|footer-background-color|Color|#f3f3f3|Background color of table footer.|
|color|Color|"type-secondary"|Font color of the table.|
|header-color|Color|"headline"|Font color for the table header.|
|footer-color|Color|null|Font color for the table footer.|
|line-height|Number|true|Line height for the table.|
|column-min-width|Dimension|6em|Min-width of the th element.|
|first-column-large-min-width|Dimension|15em|When using "--large-first" style, the min width of the first th element.|
|border-width|Dimension|1px|Border width of the table.|
|border-color|Color|#dddddd|Border color for the table.|
|striped-row-background-color|Color|#eeeeee|Background color for even rows if using "--striped" styling.|
|muted-row-background-color|Color|#ccc|Background color for odd rows if using "--striped" styling.|
|muted-row-border-color|Color|null|Border color for odd rows if using "--striped" styling.|
|highlighted-row-background-color|Color|#ccc|Background color row if using "__row-highlighted" styling.|
|highlighted-row-border-color|Color|null|Border color row if using "__row-highlighted" styling.|
|large-header-cell-padding-y|Dimension|1em|Vertical padding of header if using "--large-header" styling.|
|caption-type-size|String|"large"|Type size of table caption.|
|caption-background-color|Color|null|Background color of table caption.|
|caption-font-weight|CssValue|bold|Font weight of caption.|
|caption-border-bottom|CssBalue|null|Bottom border of the caption.|
|caption-margin|Dimension|(0,)|Margin of the caption.|
|caption-padding|Dimension|(0.65em 0)|Padding of the caption.|
|caption-text-align|CssValue|left|Text align of the caption.|
|extra-selector|String|".wysiwyg table"|Additional selectors to include table styling.|

    
  
  