---
title: Form-theme
sassdocGroupName: form-theme
---


# Form-theme

<div class="type-large">

A container for content that highlights important information, provides context, or guides user attention within an interface

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
  "color"                                     : inherit,
  "color-placeholder"                         : "type-tertiary",
  "drupal"                                    : false,
  "error-color"                               : "danger",
  "error-highlight-color"                     : rgb(251, 242, 242),
  "error-selector"                            : ".is-danger",
  "file-button-style"                         : true,
  "font-weight-label"                         : bold,
  "font-weight-legend"                        : bold,
  "font-weight-placeholder"                   : normal,
  "font-weight-input"                         : null,
  "font-weight-textarea"                      : null,
  "font-weight-select"                        : null,
  "input-border"                              : element.get-rule-style(),
  "input-border-radius"                       : 5px,
  "item-margin-y"                            : 0.75em,
  "input-padding-x"                           : 0.5em,
  "input-padding-y"                           : 0.25em,
  "input-min-width"                           : 10em,
  "input-background-color"                    : white,
  "item-border-radius"                        : null,
  "item-highlight-width"                      : 6px,
  "required-color"                            : "danger",
  "text-input-margin-bottom"                  : 0.5em,
  "text-input-margin-top"                     : 1em,
  "warning-color"                             : "warning",
  "warning-highlight-color"                   : rgb(255, 249, 237),
  "warning-selector"                          : ".is-warning",
  "check-input-color"                         : currentColor,
  "check-input-size"                          : 1.15em,
  "check-input-touch-size"                    : 2em,
  "check-input-background-color"              : white,
  "check-input-background-color-checked"      : white,
  "check-input-background-color-hover"        : white,
  "check-input-background-color-indeterminate": white,
  "check-input-border"                        : null,
  "check-input-border-color-hover"            : null,
  "check-input-border-color-checked"          : null,
  "check-input-border-color-indeterminate"    : null,
  "check-input-border-color-focus"            : null,
  "check-input-outline"                       : null,
  "check-input-outline-hover"                 : null,
  "check-input-outline-checked"               : null,
  "check-input-outline-focus"                 : 1px solid white,
  "check-input-touch-color-hover"             : #e8e8e8,
  "check-input-touch-color-focus"             : null,
  "check-input-radio-size"                    : 0.3em,
  "check-input-checkmark-width"               : 0.38em,
  "check-input-checkmark-height"              : 0.68em,
  "check-input-checkmark-offset-y"            : -0.2em,
  "check-input-checkmark-stroke-size"         : 0.18em,
  "check-input-mark-color"                    : currentColor,
  "check-input-mark-color-hover"              : null,
  "check-input-mark-color-focus"              : null,
  "check-input-mark-color-checked"            : null,
  "check-input-mark-color-indeterminate"      : null,
  "check-input-disabled-opacity"              : 0.6,
  "check-input-border-radius"                 : null,
  "description-color"                         : false,
  "description-margin"                        : (0.25em 0),
  "description-max-width"                     : 25em,
  "description-line-height"                   : true,
  "fieldset-background"                       : transparent,
  "fieldset-border"                           : none,
  "fieldset-margin-bottom"                    : 1rem,
  "fieldset-margin-top"                       : 1rem,
  "fieldset-padding"                          : 0,
  "fieldset-margin-compact"                   : 0,
  "fieldset-border-radius"                    : 0,
  "fieldset-legend-color"                     : inherit,
  "fieldset-legend-border-bottom"             : null,
  "fieldset-legend-padding-bottom"            : 0,
  "fieldset-legend-margin-bottom"             : 0.5em,
  "select-border-radius"                      : 4px,
  "select-background-color"                   : null,
  "select-border"                             : null,
  "select-padding-x"                          : null,
  "select-padding-y"                          : null,
  "select-image"                              : null,
  "select-image-size"                         : 0.9em,
  "select-image-offset"                       : 0.7em,
  "select-image-margin"                       : 0.65em,
  "inline-gap"                                : 1em
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _form-theme.scss
- **Group:** form-theme
- **Type:** variable
- **Lines (comments):** 25-107
- **Lines (code):** 109-193

</details>

    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|color|CssValue|inherit|Color of the text of the form.|
|color-placeholder|CssValue|"type-tertiary"|Color for the placeholder text.|
|drupal|Boolean|false|Toggle if using drupal to include drupal specific styling.|
|error-color|Color|"danger"|Type color for errors.|
|error-highlight-color|Color|rgb(251, 242, 242)|Outline color of error container.|
|error-selector|String|".is-danger"|Class for error styling.|
|file-button-style|Map|true|@joe-check should this have a fallback|
|font-weight-label|CssValue|bold|Font weight of the labels.|
|font-weight-legend|CssValue|bold|Font weight of the legend.|
|font-weight-placeholder|CssValue|normal|Font weight of placeholder text.|
|font-weight-input|CssValue|null|Font weight of input text.|
|font-weight-textarea|CssValue|null|Font weight of textarea text.|
|font-weight-select|CssValue|null|Font weight of select text.|
|input-border|CssValue|element.get-rule-style()|Border of the input.|
|input-border-radius|Dimension|0|Border radius of the input.|
|input-padding-x|Dimension|0.5em|Horizontal padding of the input.|
|input-padding-y|Dimension|0.25em|Vertical padding of the input.|
|input-min-width|Dimension|10em|Min width of the input.|
|input-background-color|Color|white|Background color of the input.|
|item-border-radius|Dimension|null|Border radius for __item.|
|item-highlight-width|Dimension|6px|Width of the item box highlight.|
|required-color|Color|"danger"|Color for required text.|
|text-input-margin-bottom|Dimension|0.5em|Bottom margin for the label.|
|text-input-margin-top|Dimension|1em|Top margin for the label.|
|warning-color|Color|"warning"|The warning text color.|
|warning-highlight-color|Color|rgb(255, 249, 237)|Outline color of the warning.|
|warning-selector|String|".is-warning"|Selector for adding warning styles.|
|check-input-color|Color|currentColor|@joe-check unused|
|check-input-size|Dimension|1.15em|Size of input box.|
|check-input-touch-size|Dimension|2em|Touchable size of the input box.|
|check-input-background-color|Color|white|Background color for the check input.|
|check-input-background-color-checked|Color|white|Background color for the check input when checked.|
|check-input-background-color-hover|Color|white|Background color for the check input when hovered or focused.|
|check-input-background-color-indeterminate|Color|white|Background color for the indeterminate check input.|
|check-input-border|Map|null|@joe-check check how this is called with a fallback in the styles mixin|
|check-input-border-color-hover|Color|null|Check input border color.|
|check-input-border-color-checked|Color|null|Check input border color when checked.|
|check-input-border-color-indeterminate|Color|null|Indeterminate check input border color.|
|check-input-border-color-focus|Color|null|Check input border color when hovered or focused.|
|check-input-outline|CssValue|null|Check input outline.|
|check-input-outline-hover|CssValue|null|Check input outline when hovered.|
|check-input-outline-checked|CssValue|null|Check input outline when checked.|
|check-input-outline-focus|CssValue|1px solid white|Check input outline when focused.|
|check-input-touch-color-hover|Color|#e8e8e8|Check input background color when hovered.|
|check-input-touch-color-focus|Color|null|Check input background color when focused.|
|check-input-radio-size|Dimension|0.3em|Radio border size.|
|check-input-checkmark-width|Dimension|0.38em|Width of checkmark.|
|check-input-checkmark-height|Dimension|0.68em|Height of checkmark.|
|check-input-checkmark-offset-y|Dimension|-0.2em|vertical offset of checkmark.|
|check-input-checkmark-stroke-size|Dimension|0.18em|stroke size of checkmark.|
|check-input-mark-color|Color|currentColor|Check input color.|
|check-input-mark-color-hover|Color|null|Check input color when hovered.|
|check-input-mark-color-focus|Color|null|Check input color when focused.|
|check-input-mark-color-checked|Color|null|Check input color when checked.|
|check-input-mark-color-indeterminate|Color|null|Check input color when indeterminate.|
|check-input-disabled-opacity|Number|0.6|Opacity of the check input when disabled.|
|check-input-border-radius|Dimension|null|Checkbox input border radius.|
|description-color|Color|false|Color of help text.|
|description-margin|CssValue|(0.25em 0)|Margin for help text.|
|description-max-width|Dimension|25em|Max width of help text.|
|description-line-height|Number|true|Line height for description element, defaults to typography line-height-dense|
|fieldset-background|Color|transparent|Background color of fieldset element.|
|fieldset-border|CssValue|none|Border for fieldset|
|fieldset-margin-bottom|Dimension|1rem|Bottom margin for the fieldset element.|
|fieldset-margin-top|Dimension|1rem|Bottom margin for the fieldset element.|
|fieldset-padding|Dimension|0|Padding for the fieldset element.|
|fieldset-margin-compact|Dimension|0|@joe-check unused|
|fieldset-border-radius|Dimension|0|Border radius of the fieldset element.|
|fieldset-legend-color|Color|inherit|Text color for the fieldset's label.|
|fieldset-legend-border-bottom|Dimension|null|Bottom border color for the fieldset's label|
|fieldset-legend-padding-bottom|Dimension|null|Bottom padding for the fieldset's label|
|select-border-radius|Dimension|4px|Border radius for the select element.|
|select-background-color|Color|null|Background color for the select element.|
|select-border|CssValue|null|The border for the select element. Fallback to input border.|
|select-padding-x|Dimension|null|Horizontal padding for the select element. Fallback to input-padding-x.|
|select-padding-y|Dimension|null|Vertical padding for the select element. Fallback to input-padding-y.|
|select-image|CssValue|null|Url for select element's background image.|
|select-image-size|Dimension|0.9em|Background size for the select image.|
|select-image-offset|Dimension|0.7em|Offset for the select image.|
|select-image-margin|Dimension|0.65em|select image margin.|
|inline-gap|Dimension|1em|Gap between items that are inline like checkboxes|

    
  

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
  
- **File:** _form-theme.scss
- **Group:** form-theme
- **Type:** mixin
- **Lines (comments):** 195-198
- **Lines (code):** 200-202

</details>

    

#### Examples

      


``` scss
@include ulu.component-form-theme-set(( "property" : value ));
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
  
- **File:** _form-theme.scss
- **Group:** form-theme
- **Type:** mixin
- **Lines (comments):** 218-220
- **Lines (code):** 222-259

</details>

    

#### Examples

      


``` scss
@include ulu.component-form-theme-styles();
```
  



      

#### Require

- [drupal-layout-element-styles()](/sass/components/form-theme/#mixin-drupal-layout-element-styles)
- [layout-element-styles()](/sass/components/form-theme/#mixin-layout-element-styles)
- [get()](/sass/components/accordion/#function-get)
  


<div class="sassdoc-item-header">

###  element-required-char() {#mixin-element-required-char}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Required Character styles (ie. "*")
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _form-theme.scss
- **Group:** form-theme
- **Type:** mixin
- **Lines (comments):** 498-498
- **Lines (code):** 499-506

</details>

    

#### Require

- [get()](/sass/components/accordion/#function-get)
  


<div class="sassdoc-item-header">

###  element-help-text() {#mixin-element-help-text}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Help text / Description
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _form-theme.scss
- **Group:** form-theme
- **Type:** mixin
- **Lines (comments):** 508-508
- **Lines (code):** 509-516

</details>

    

#### Require

- [get()](/sass/components/accordion/#function-get)
  


<div class="sassdoc-item-header">

###  element-form-item-block() {#mixin-element-form-item-block}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Styles for form item that should have label as block and text input
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _form-theme.scss
- **Group:** form-theme
- **Type:** mixin
- **Lines (comments):** 518-518
- **Lines (code):** 519-530

</details>

    

#### Require

- [get()](/sass/components/accordion/#function-get)
  


<div class="sassdoc-item-header">

###  element-form-actions() {#mixin-element-form-actions}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Footer of form (with button for example)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _form-theme.scss
- **Group:** form-theme
- **Type:** mixin
- **Lines (comments):** 532-532
- **Lines (code):** 533-536

</details>

    


<div class="sassdoc-item-header">

###  element-form-actions-right() {#mixin-element-form-actions-right}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Footer of form (with button for example)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _form-theme.scss
- **Group:** form-theme
- **Type:** mixin
- **Lines (comments):** 538-538
- **Lines (code):** 539-541

</details>

    


<div class="sassdoc-item-header">

###  layout-element-styles() {#mixin-layout-element-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Layout styling for static/app sites
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _form-theme.scss
- **Group:** form-theme
- **Type:** mixin
- **Lines (comments):** 543-543
- **Lines (code):** 544-597

</details>

    

#### Require

- [element-required-char()](/sass/components/form-theme/#mixin-element-required-char)
- [element-help-text()](/sass/components/form-theme/#mixin-element-help-text)
- [element-form-item-block()](/sass/components/form-theme/#mixin-element-form-item-block)
- [element-form-actions()](/sass/components/form-theme/#mixin-element-form-actions)
- [element-form-actions-right()](/sass/components/form-theme/#mixin-element-form-actions-right)
- [get()](/sass/components/accordion/#function-get)
  


<div class="sassdoc-item-header">

###  drupal-layout-element-styles() {#mixin-drupal-layout-element-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Layout styles but using drupal form structures
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _form-theme.scss
- **Group:** form-theme
- **Type:** mixin
- **Lines (comments):** 599-599
- **Lines (code):** 600-628

</details>

    

#### Require

- [element-required-char()](/sass/components/form-theme/#mixin-element-required-char)
- [element-help-text()](/sass/components/form-theme/#mixin-element-help-text)
- [element-form-item-block()](/sass/components/form-theme/#mixin-element-form-item-block)
- [element-form-actions()](/sass/components/form-theme/#mixin-element-form-actions)
- [element-form-actions-right()](/sass/components/form-theme/#mixin-element-form-actions-right)
  
  

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
  
- **File:** _form-theme.scss
- **Group:** form-theme
- **Type:** function
- **Lines (comments):** 204-207
- **Lines (code):** 209-212

</details>

    

#### Examples

      


``` scss
@include ulu.component-form-theme-get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  