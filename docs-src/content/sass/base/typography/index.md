---
title: Typography
sassdocGroupName: typography
---


# Typography

<div class="type-large">

Output base typography classes

</div>



## Mixins




<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints typography base styles
- These are any type sizes that specify "base-class" in their configuration
- Type sizes with "base-class-prefixed" will be prefixed with the "type-" prefix
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 11-22
- **Lines (code):** 24-44

</details>

    

#### Examples

      


``` scss
@include ulu.base-typography-styles();
```
  



      

Example of type size as base unprefixed      


``` html
<span class="h1">A</span>
<span class="h2">A</span>
<span class="h3">A</span>
<span class="h4">A</span>
<span class="h5">A</span>
<span class="h6">A</span>
```
  


##### Preview

<div>
<span class="h1">A</span>
<span class="h2">A</span>
<span class="h3">A</span>
<span class="h4">A</span>
<span class="h5">A</span>
<span class="h6">A</span>
</div>

    

      

#### Require

- [get()](/sass/base/elements/#function-get)
  
  
  