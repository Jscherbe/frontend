---
title: None
sassdocGroupName: None
---


# None





## Variables




<div class="sassdoc-item-header">

###  $config {#variable-config}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span>
  </div>

</div>

  

Config options
    
    

``` scss
$config: (
  "container" : "container",
  "background-color" : false,
  "margin-top" : 1rem,
  "margin-bottom" : 3rem,
  "padding-top" : 0,
  "padding-bottom" : 0,
  "button-indent" : 1.5rem,
  "button-indent-small" : 0.5rem,
  "button-size" : 3rem,
  "button-font-size" : 1.35rem,
  "button-color" : color.get("type"),
  "button-border" : 2px solid white,
  "button-border-radius" : 50%,
  "button-background-color" : white,
  "button-box-shadow" : element.get("box-shadow"),
  "button-color-hover" : color.get("link"),
  "button-border-color-hover" : white,
  "button-background-color-hover" : white,
  "button-icon-offset-x" : false,
  "button-icon-offset-y" : false,
  "containers" : ("container",)
);
```
  

    <details>
      <summary>File Information</summary>
- **File:** _scroll-slider.scss
- **Group:** None
- **Type:** variable
- **Lines (comments):** 12-12
- **Lines (code):** 14-36
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
- **File:** _form-theme.scss
- **Group:** None
- **Type:** mixin
- **Lines (comments):** 102-104
- **Lines (code):** 106-108
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


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
- **Group:** None
- **Type:** mixin
- **Lines (comments):** 405-405
- **Lines (code):** 406-413
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
- **Group:** None
- **Type:** mixin
- **Lines (comments):** 415-415
- **Lines (code):** 416-422
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
- **Group:** None
- **Type:** mixin
- **Lines (comments):** 424-424
- **Lines (code):** 425-436
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
- **Group:** None
- **Type:** mixin
- **Lines (comments):** 438-438
- **Lines (code):** 439-442
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
- **Group:** None
- **Type:** mixin
- **Lines (comments):** 444-444
- **Lines (code):** 445-447
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
- **Group:** None
- **Type:** mixin
- **Lines (comments):** 449-449
- **Lines (code):** 450-502
    </details>
    

#### Require

- [element-required-char()](/sass/components/None/#mixin-element-required-char)
- [element-help-text()](/sass/components/None/#mixin-element-help-text)
- [element-form-item-block()](/sass/components/None/#mixin-element-form-item-block)
- [element-form-actions()](/sass/components/None/#mixin-element-form-actions)
- [element-form-actions-right()](/sass/components/None/#mixin-element-form-actions-right)
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
- **Group:** None
- **Type:** mixin
- **Lines (comments):** 504-504
- **Lines (code):** 505-533
    </details>
    

#### Require

- [element-required-char()](/sass/components/None/#mixin-element-required-char)
- [element-help-text()](/sass/components/None/#mixin-element-help-text)
- [element-form-item-block()](/sass/components/None/#mixin-element-form-item-block)
- [element-form-actions()](/sass/components/None/#mixin-element-form-actions)
- [element-form-actions-right()](/sass/components/None/#mixin-element-form-actions-right)
  


<div class="sassdoc-item-header">

###  set() {#mixin-set-1}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Change modules $config
    
    

    <details>
      <summary>File Information</summary>
- **File:** _scroll-slider.scss
- **Group:** None
- **Type:** mixin
- **Lines (comments):** 38-41
- **Lines (code):** 43-45
    </details>
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.set(( "property" : value ));
```
  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  

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
- **Group:** None
- **Type:** function
- **Lines (comments):** 110-112
- **Lines (code):** 114-116
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  get() {#function-get-1}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get a config option
    
    

    <details>
      <summary>File Information</summary>
- **File:** _scroll-slider.scss
- **Group:** None
- **Type:** function
- **Lines (comments):** 47-49
- **Lines (code):** 51-53
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  