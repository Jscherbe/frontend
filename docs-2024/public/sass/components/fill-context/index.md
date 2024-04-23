---
title: Fill-context
sassdocGroupName: fill-context
---


# Fill-context

Setup images or videos to behave like background images (object-fit).








Use the parent selector '.fill-context' on the element that should be the 
frame for the child object (img,video).  Can be used within the grid with 
modifier (see in example below).
    
    

#### Examples

      


``` html
<div class="fill-context">
  <img class="fill-context__object" src="background.jpg">
</div>
 
 
<div class="fill-context fill-context--auto">
  <img src="background.jpg">
</div>
 
<div data-grid-item="width: 6" class="fill-context fill-context--in-grid fill-context--contain">
  <img src="background.jpg">
</div>
```
  

      
  

## Mixins




###  styles() {#mixin-styles} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Prints fill context styles
    
    

#### Details

- **File:** _fill-context.scss
- **Group:** fill-context
- **Type:** mixin
- **Lines (comments):** 30-32
- **Lines (code):** 34-64
    
    

#### Examples

      


``` scss
@include ulu.component-fill-context-styles();
```
  

      
  
  