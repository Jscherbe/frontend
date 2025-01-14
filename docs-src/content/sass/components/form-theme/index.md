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
  "error-color"                               : "error",
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
  "input-border-radius"                       : 0,
  "input-margin-y"                            : 0.75em,
  "input-padding-x"                           : 0.5em,
  "input-padding-y"                           : 0.25em,
  "input-min-width"                           : 10em,
  "input-background-color"                    : white,
  "item-border-radius"                        : null,
  "item-highlight-width"                      : 6px,
  "required-color"                            : "error",
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
  "fieldset-background"                       : transparent,
  "fieldset-border"                           : none,
  "fieldset-margin-bottom"                    : 1rem,
  "fieldset-margin-top"                       : 1rem,
  "fieldset-padding"                          : 0,
  "fieldset-margin-compact"                   : 0,
  "fieldset-border-radius"                    : 0,
  "fieldset-legend-color"                     : inherit,
  "fieldset-legend-border-bottom"             : null,
  "select-border-radius"                      : 4px,
  "select-background-color"                   : null,
  "select-border"                             : null,
  "select-padding-x"                          : null,
  "select-padding-y"                          : null,
  "select-image"                              : null,
  "select-image-size"                         : 0.9em,
  "select-image-offset"                       : 0.7em,
  "select-image-margin"                       : 0.65em,
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _form-theme.scss
- **Group:** form-theme
- **Type:** variable
- **Lines (comments):** 16-96
- **Lines (code):** 98-178

</details>

    

#### Map Properties


|Name|Type|Default|
|:--|:--|:--|
|color|Map|inherit|
|color-placeholder|Map|"type-tertiary"|
|drupal|Map|false|
|error-color|Map|"error"|
|error-highlight-color|Map|rgb(251, 242, 242)|
|error-selector|Map|".is-danger"|
|file-button-style|Map|true|
|font-weight-label|Map|bold|
|font-weight-legend|Map|bold|
|font-weight-placeholder|Map|normal|
|font-weight-input|Map|null|
|font-weight-textarea|Map|null|
|font-weight-select|Map|null|
|input-border|Map|element.get-rule-style()|
|input-border-radius|Map|0|
|input-margin-y|Map|0.75em|
|input-padding-x|Map|0.5em|
|input-padding-y|Map|0.25em|
|input-min-width|Map|10em|
|input-background-color|Map|white|
|item-border-radius|Map|null|
|item-highlight-width|Map|6px|
|required-color|Map|"error"|
|text-input-margin-bottom|Map|0.5em|
|text-input-margin-top|Map|1em|
|warning-color|Map|"warning"|
|warning-highlight-color|Map|rgb(255, 249, 237)|
|warning-selector|Map|".is-warning"|
|check-input-color|Map|currentColor|
|check-input-size|Map|1.15em|
|check-input-touch-size|Map|2em|
|check-input-background-color|Map|white|
|check-input-background-color-checked|Map|white|
|check-input-background-color-hover|Map|white|
|check-input-background-color-indeterminate|Map|white|
|check-input-border|Map|null|
|check-input-border-color-hover|Map|null|
|check-input-border-color-checked|Map|null|
|check-input-border-color-indeterminate|Map|null|
|check-input-border-color-focus|Map|null|
|check-input-outline|Map|null|
|check-input-outline-hover|Map|null|
|check-input-outline-checked|Map|null|
|check-input-outline-focus|Map|1px solid white|
|check-input-touch-color-hover|Map|#e8e8e8|
|check-input-touch-color-focus|Map|null|
|check-input-radio-size|Map|0.3em|
|check-input-checkmark-width|Map|0.38em|
|check-input-checkmark-height|Map|0.68em|
|check-input-checkmark-offset-y|Map|-0.2em|
|check-input-checkmark-stroke-size|Map|0.18em|
|check-input-mark-color|Map|currentColor|
|check-input-mark-color-hover|Map|null|
|check-input-mark-color-focus|Map|null|
|check-input-mark-color-checked|Map|null|
|check-input-mark-color-indeterminate|Map|null|
|check-input-disabled-opacity|Map|0.6|
|check-input-border-radius|Map|null|
|description-color|Map|false|
|description-margin|Map|(0.25em 0)|
|description-max-width|Map|25em|
|fieldset-background|Map|transparent|
|fieldset-border|Map|none|
|fieldset-margin-bottom|Map|1rem|
|fieldset-margin-top|Map|1rem|
|fieldset-padding|Map|0|
|fieldset-margin-compact|Map|0|
|fieldset-border-radius|Map|0|
|fieldset-legend-color|Map|inherit|
|fieldset-legend-border-bottom|Map|null|
|select-border-radius|Map|4px|
|select-background-color|Map|null|
|select-border|Map|null|
|select-padding-x|Map|null|
|select-padding-y|Map|null|
|select-image|Map|null|
|select-image-size|Map|0.9em|
|select-image-offset|Map|0.7em|
|select-image-margin|Map|0.65em|

    
  

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
- **Lines (comments):** 180-183
- **Lines (code):** 185-187

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
- **Lines (comments):** 202-204
- **Lines (code):** 206-243

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
- **Lines (comments):** 489-489
- **Lines (code):** 490-497

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
- **Lines (comments):** 499-499
- **Lines (code):** 500-506

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
- **Lines (comments):** 508-508
- **Lines (code):** 509-520

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
- **Lines (comments):** 522-522
- **Lines (code):** 523-526

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
- **Lines (comments):** 528-528
- **Lines (code):** 529-531

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
- **Lines (comments):** 533-533
- **Lines (code):** 534-586

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
- **Lines (comments):** 588-588
- **Lines (code):** 589-617

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
- **Lines (comments):** 189-192
- **Lines (code):** 194-196

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
  
  
  