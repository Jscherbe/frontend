---
title: Skip-link
sassdocGroupName: skip-link
---


# Skip-link





## Mixins




<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints component styles
- Note: This needs to be paired with the display helper class "hidden-visually-focusable"
- Note: Remember to add an id to the content you want to skip to. Often this will go to the content after the nav menu.
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _skip-link.scss
- **Group:** skip-link
- **Type:** mixin
- **Lines (comments):** 10-23
- **Lines (code):** 25-42

</details>

    

#### Examples

      


``` scss
@include ulu.component-skip-link-styles();
```
  

      

      


``` html
<a 
  class="skip-link hidden-visually-focusable" 
  href="#main-content"
>
  Skip to main content
</a>
<nav>...</nav>
<main id="main-content">...</main>
```
  

      

#### Require

- [get()](/sass/components/accordion/#function-get)
  
  
  