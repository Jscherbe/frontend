---
title: None
sassdocGroupName: None
---


# None





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
- **Lines (comments):** 107-109
- **Lines (code):** 111-113
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
- **Lines (comments):** 406-406
- **Lines (code):** 407-414
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
- **Lines (comments):** 416-416
- **Lines (code):** 417-423
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
- **Lines (comments):** 425-425
- **Lines (code):** 426-437
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
- **Lines (comments):** 439-439
- **Lines (code):** 440-443
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
- **Lines (comments):** 445-445
- **Lines (code):** 446-493
    </details>
    

#### Require

- [element-required-char()](/sass/components/None/#mixin-element-required-char)
- [element-help-text()](/sass/components/None/#mixin-element-help-text)
- [element-form-item-block()](/sass/components/None/#mixin-element-form-item-block)
- [element-form-actions()](/sass/components/None/#mixin-element-form-actions)
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
- **Lines (comments):** 495-495
- **Lines (code):** 496-519
    </details>
    

#### Require

- [element-required-char()](/sass/components/None/#mixin-element-required-char)
- [element-help-text()](/sass/components/None/#mixin-element-help-text)
- [element-form-item-block()](/sass/components/None/#mixin-element-form-item-block)
- [element-form-actions()](/sass/components/None/#mixin-element-form-actions)
  
  

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
- **Lines (comments):** 115-117
- **Lines (code):** 119-122
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  