---
title: Button
sassdocGroupName: button
---


# Button





## Mixins




###  set() {#mixin-set} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Change modules $config
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 16-18
- **Lines (code):** 20-22
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/sass/components/badge/#variable-config)
  


###  styles() {#mixin-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Prints button component styles
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 32-36
- **Lines (code):** 38-95
    
    

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




###  get() {#function-get} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get a config option
    
    

#### Details

- **File:** _button.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 24-26
- **Lines (code):** 28-30
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/sass/components/badge/#variable-config)
  
  
  