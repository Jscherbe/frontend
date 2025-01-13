---
title: Typography
sassdocGroupName: typography
---


# Typography

<div class="type-large">

Output all typography helper classes

</div>



## Mixins




<div class="sassdoc-item-header">

###  styles() {#mixin-styles}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Prints Typography Helper styles
- Outputs all typography sizes that specify "helper-class"
- Outputs general typography helper classes (.type-bold, .line-height-dense, etc)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 11-23
- **Lines (code):** 25-83

</details>

    

#### Examples

      


``` scss
@include ulu.helper-typography-styles();
```
  

      

Example of type size as helper prefixed      


``` html
<span class="type-large-xxx">A</span>
<span class="type-large-xx">A</span>
<span class="type-large-x">A</span>
<span class="type-large">A</span>
<span class="type-base">A</span>
<span class="type-small">A</span>
<span class="type-small-x">A</span>
```
  

      

#### Require

- get()
  
  
  