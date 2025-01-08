---
title: Path
sassdocGroupName: path
---


# Path

<div class="type-large">



</div>



## Variables




<div class="sassdoc-item-header">

###  $aliases {#variable-aliases}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Variable</strong></span> <span class="tag"><strong>Type</strong>: Map
- Important: alias could be used for directory or file so omit trailing slash for directories
- All aliases must start with "#"</span>
  </div>

</div>

  

Aliases 
    
    

``` scss
$aliases: (
  "#Images" : "/images",
);
```
  


<details>
  <summary>File Information</summary>
  
- **File:** _path.scss
- **Group:** path
- **Type:** variable
- **Lines (comments):** 9-12
- **Lines (code):** 14-16

</details>

    
  

## Mixins




<div class="sassdoc-item-header">

###  set-aliases() {#mixin-set-aliases}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Mixin</strong></span>
  </div>

</div>

  

Set aliases or change defaults
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _path.scss
- **Group:** path
- **Type:** mixin
- **Lines (comments):** 18-19
- **Lines (code):** 21-23

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$aliases](/sass/core/path/#variable-aliases)
  
  

## Functions




<div class="sassdoc-item-header">

###  get-alias() {#function-get-alias}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Get an aliase's path
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _path.scss
- **Group:** path
- **Type:** function
- **Lines (comments):** 25-26
- **Lines (code):** 28-30

</details>

    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$Name|`String`|Name of alias|

    

#### Require

- require-map-get()
- [$aliases](/sass/core/path/#variable-aliases)
  


<div class="sassdoc-item-header">

###  resolve() {#function-resolve}

  <div class="sassdoc-item-header__labels">
    <span class="tag tag--primary"><strong>Function</strong></span>
  </div>

</div>

  

Resolves a Path 
- Checks if path is an alias if so rewrite's it
- Future could include rewrites for easier updating or rearranging of legacy things
- Aliases work by starting with "#", Since it's an illegal uri character, needs to be escaped if used as literal, we felt that it was the safest way to mix aliases in with real URLs (so that a dev of a module using path.resolve can always pass paths through (user input unknown if alias)
    
    


<details>
  <summary>File Information</summary>
  
- **File:** _path.scss
- **Group:** path
- **Type:** function
- **Lines (comments):** 32-40
- **Lines (code):** 42-58

</details>

    

#### Examples

      


``` scss
.img {
  background-image: url(path.resolve("#Images/branding/logo"));
}
```
  



      

#### Require

- [get-alias()](/sass/core/path/#function-get-alias)
  
  
  