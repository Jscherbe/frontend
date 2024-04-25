---
title: Button
sassdocGroupName: button
---


# Button





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
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 16-18
- **Lines (code):** 20-22
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/badge/#variable-config)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints button component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 32-36
- **Lines (code):** 38-95
    </details>
    

#### Examples

      


``` scss
@include ulu.component-button-styles();
```
  

      

      


``` html
<a class="button" href="#">Button Default</a>
```
  

      

#### Require

- [get()](/sass/components/badge/#function-get)
  
  

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
- **File:** _button.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 24-26
- **Lines (code):** 28-30
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/badge/#variable-config)
  
  
  