---
title: Path
sassdocGroupName: path
---


# Path





## Variables




###  $aliases {#variable-aliases} 

<small>Variable&ensp;|&ensp;Access: Public&ensp;|&ensp;Type: Map
- Important: alias could be used for directory or file so omit trailing slash for directories
- All aliases must start with "#"</small>

  

Aliases 
    
    

``` scss
$aliases: (
  "#Images" : "/images",
);
```
  

#### Details

- **File:** _path.scss
- **Group:** path
- **Type:** variable
- **Lines (comments):** 9-12
- **Lines (code):** 14-16
    
    
  

## Mixins




###  set-aliases() {#mixin-set-aliases} 

<small>Mixin&ensp;|&ensp;Access: Public</small>

  

Set aliases or change defaults
    
    

#### Details

- **File:** _path.scss
- **Group:** path
- **Type:** mixin
- **Lines (comments):** 18-19
- **Lines (code):** 21-23
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$aliases](/scss/core/path/#variable-aliases)
  
  

## Functions




###  get-alias() {#function-get-alias} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Get an aliase's path
    
    

#### Details

- **File:** _path.scss
- **Group:** path
- **Type:** function
- **Lines (comments):** 25-26
- **Lines (code):** 28-30
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$Name|`String`|Name of alias|

    

#### Require

- require-map-get()
- [$aliases](/scss/core/path/#variable-aliases)
  


###  resolve() {#function-resolve} 

<small>Function&ensp;|&ensp;Access: Public</small>

  

Resolves a Path 
- Checks if path is an alias if so rewrite's it
- Future could include rewrites for easier updating or rearranging of legacy things
- Aliases work by starting with "#", Since it's an illegal uri character, needs to be escaped if used as literal, we felt that it was the safest way to mix aliases in with real URLs (so that a dev of a module using path.resolve can always pass paths through (user input unknown if alias)
    
    

#### Details

- **File:** _path.scss
- **Group:** path
- **Type:** function
- **Lines (comments):** 32-40
- **Lines (code):** 42-58
    
    

#### Examples

      


``` scss
.img {
  background-image: url(path.resolve("#Images/branding/logo"));
}
```
  

      

#### Require

- [get-alias()](/scss/core/path/#function-get-alias)
  
  
  