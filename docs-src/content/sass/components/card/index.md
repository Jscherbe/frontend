---
title: Card
sassdocGroupName: card
---


# Card










Module Settings
    
    
  

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
- **File:** _card.scss
- **Group:** card
- **Type:** mixin
- **Lines (comments):** 113-115
- **Lines (code):** 117-119
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  


<div class="sassdoc-item-header">

###  when-clickable() {#mixin-when-clickable}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Mixin styles for card when it has proxy click enabled and is being interacted with (hover/focus)
    
    

    <details>
      <summary>File Information</summary>
- **File:** _card.scss
- **Group:** card
- **Type:** mixin
- **Lines (comments):** 129-130
- **Lines (code):** 132-147
    </details>
    

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$hover|`Boolean`|false|Apply styles when the card is being hover/focused within, else applies styles to rest state of a clickable card (one who has a proxy click setup)|

    

#### Require

- [get()](/sass/components/accordion/#function-get)
  


<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _card.scss
- **Group:** card
- **Type:** mixin
- **Lines (comments):** 154-157
- **Lines (code):** 159-415
    </details>
    


<div class="callout callout--demo crop-margins">

#### Demo



<a class="button" href="/demos/Check out our card. [card]">Our Demo</a>

</div>



#### Examples

      


``` scss
@include ulu.component-example-styles();
```
  

      

#### Require

- [when-clickable()](/sass/components/card/#mixin-when-clickable)
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
- **File:** _card.scss
- **Group:** card
- **Type:** function
- **Lines (comments):** 121-123
- **Lines (code):** 125-127
    </details>
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/accordion/#variable-config)
  
  
  