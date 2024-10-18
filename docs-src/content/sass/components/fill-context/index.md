---
title: Fill-context
sassdocGroupName: fill-context
---


# Fill-context

Setup images or videos to behave like background images (object-fit).








Use the parent selector '.fill-context' on the element that should be the 
frame for the child object (img,video).  Can be used within the grid with 
modifier (see in example below).
    
    

Hello World
  

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




<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints fill context styles
    
    

    <details>
      <summary>File Information</summary>
- **File:** _fill-context.scss
- **Group:** fill-context
- **Type:** mixin
- **Lines (comments):** 30-32
- **Lines (code):** 34-64
    </details>
    

Hello World
  

#### Examples

      


``` scss
@include ulu.component-fill-context-styles();
```
  

      
  
  