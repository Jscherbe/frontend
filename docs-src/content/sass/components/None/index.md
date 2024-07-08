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
- **Lines (comments):** 101-103
- **Lines (code):** 105-107
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
- **Lines (comments):** 395-395
- **Lines (code):** 396-403
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
- **Lines (comments):** 405-405
- **Lines (code):** 406-412
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
- **Lines (comments):** 414-414
- **Lines (code):** 415-426
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
- **Lines (comments):** 428-428
- **Lines (code):** 429-432
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
- **Lines (comments):** 434-434
- **Lines (code):** 435-482
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
- **Lines (comments):** 484-484
- **Lines (code):** 485-508
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
- **Lines (comments):** 109-111
- **Lines (code):** 113-115
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  