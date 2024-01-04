---
title: Button
sassdocGroupName: button
outline: deep
---


# Button





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    

``` scss
(
  "padding":                 (0.75em 1.5em),
  "background-color":        color.tint(black, 30%),
  "background-color-hover": black,
  "font-family":             inherit,
  "white-space" :            nowrap,
  "font-weight":             bold,
  "line-height":             1.1,
  "letter-spacing":          0.02em,
  "text-transform":          none,
  "text-shadow":             none,
  "font-size":               "base",
  "color":                   white,
  "color-hover":            white,
  "color-active":            white,
  "box-shadow":              true,
  "border-radius":           2rem,
  "border-width":            0,
  "border-color":            transparent,
  "border-color-hover":     transparent,
  "margin":                  (0.45em 0.5em 0.45em 0),
  "min-width":               9rem,
  "icon-size":               2.5rem,
  "icon-font-size":          1.38rem,
  "icon-border-radius":      50%,
  "text-decoration" :        none
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 22-23
- **Lines (code):** 25-51

</SassdocDetails>
    
    


###  $sizes <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-sizes} 

  

Button sizes
    
    

``` scss
(
  "small" : (
    "padding":        (0.35em 1.5em),
    "min-width":      0,
    "icon-size":      2rem,
    "icon-font-size": 1rem
  ),
  "large" : (
    "padding":   (1em 2em),
    "min-width": 11rem,
    "icon-size": 3.5rem
  )
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 53-54
- **Lines (code):** 56-68

</SassdocDetails>
    
    


###  $styles <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-styles} 

  

Button styles
    
    

``` scss
(
  "transparent" : (
    "background-color" : transparent,
    "color" : "type",
    "border-color" : transparent,
    "box-shadow" : none,
    "hover" : (
      "background-color" : "white",
      "color" : inherit,
      "border-color" : transparent,
    )
  ),
  "outline" : (
    "background-color" : transparent,
    "color" : "type",
    "border-color" : "rule",
    "box-shadow" : none,
    "hover" : (
      "background-color" : "white",
    )
  ),
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 70-71
- **Lines (code):** 73-94

</SassdocDetails>
    
    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 96-99
- **Lines (code):** 101-103

</SassdocDetails>
    
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/scss/core/breakpoint/#variable-config)
  


###  set-styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set-styles} 

  

Set button styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 115-117
- **Lines (code):** 119-121

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- map-merge()
- [$styles](/scss/core/button/#variable-styles)
  


###  set-sizes() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set-sizes} 

  

Set Button Sizes
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 123-125
- **Lines (code):** 127-129

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- map-merge()
- [$sizes](/scss/core/breakpoint/#variable-sizes)
  


###  reset() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-reset} 

  

Print styles to reset browser button style
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 131-131
- **Lines (code):** 133-144

</SassdocDetails>
    
    


###  default() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-default} 

  

Print default button styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 146-147
- **Lines (code):** 149-194

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$with-reset|`Boolean`|false|Include button.reset()|

    

#### Require

- [reset()](/scss/core/button/#mixin-reset)
- [get()](/scss/core/breakpoint/#function-get)
  


###  size() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-size} 

  

Print button size styles for a specifc size
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 196-199
- **Lines (code):** 201-211

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of size from $sizes|

    

#### See

- [$sizes](/scss/core/breakpoint/#variable-sizes)
- [set-sizes()](/scss/core/breakpoint/#mixin-set-sizes)
  

#### Require

- require-map-get()
- [get()](/scss/core/breakpoint/#function-get)
- [$sizes](/scss/core/breakpoint/#variable-sizes)
  


###  style-styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-style-styles} 

  

Print a button style's base styles (not hover)
- In most cases you want the style() mixin
- This is used mainly for trying to match a buttons base styles without including the other state (hover, etc) styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 235-240
- **Lines (code):** 242-250

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of style from $styles|

    

#### See

- [$styles](/scss/core/button/#variable-styles)
- [set-styles()](/scss/core/button/#mixin-set-styles)
  

#### Require

- [get-style-value()](/scss/core/button/#function-get-style-value)
  


###  style-styles-hover() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-style-styles-hover} 

  

Print a button style's base styles (hover styles only)
- In most cases you want the style() mixin
- This is used mainly for trying to match a buttons hover styles without including the base styling
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 252-257
- **Lines (code):** 259-265

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of style from $styles|

    

#### See

- [$styles](/scss/core/button/#variable-styles)
- [set-styles()](/scss/core/button/#mixin-set-styles)
  

#### Require

- [get-style-value()](/scss/core/button/#function-get-style-value)
  


###  style() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-style} 

  

Print a button style
- Includes base/visited styling, and hover/focus state styles
- To print only one of those states, use style-styles or style-styles-hover
- By default this mixin prints the buttons base styles along with :visited state. 
  This is to avoid link visted states effecting the button styles (if used in editor areas 
  or other areas that apply automatic links styling for example. (param below to override behavior)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 267-276
- **Lines (code):** 278-291

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|Name of style from $styles||
|$no-visited|`String`|Do not include :visited selector for button base styles|false|

    

#### See

- [$styles](/scss/core/button/#variable-styles)
- [set-styles()](/scss/core/button/#mixin-set-styles)
  

#### Require

- [style-styles()](/scss/core/button/#mixin-style-styles)
- [style-styles-hover()](/scss/core/button/#mixin-style-styles-hover)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 105-108
- **Lines (code):** 110-113

</SassdocDetails>
    
    

#### Examples

General example, replace module-name with module's name      


``` scss
@include module-name.get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- require-map-get()
- function-fallback()
- [$config](/scss/core/breakpoint/#variable-config)
  


###  get-style-value() <Badge text="function" type="tip" vertical="top" />  {#function-get-style-value} 

  

Get a value from a button style
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 213-217
- **Lines (code):** 219-233

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of style from $styles|

    

#### Returns


|Type|Description|
|:--|:--|
|*|The property you were trying to get|

    

#### See

- [$styles](/scss/core/button/#variable-styles)
- [set-styles()](/scss/core/button/#mixin-set-styles)
  

#### Require

- require-map-get()
- [get()](/scss/core/breakpoint/#function-get)
- [$styles](/scss/core/button/#variable-styles)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"button","id":"variable-config","uid":"button-variable-config","title":"$config","groupPath":"/scss/core/button/","path":"/scss/core/button/#variable-config"},{"groupName":"button","id":"variable-sizes","uid":"button-variable-sizes","title":"$sizes","groupPath":"/scss/core/button/","path":"/scss/core/button/#variable-sizes"},{"groupName":"button","id":"variable-styles","uid":"button-variable-styles","title":"$styles","groupPath":"/scss/core/button/","path":"/scss/core/button/#variable-styles"},{"groupName":"button","id":"mixin-set","uid":"button-mixin-set","title":"set()","groupPath":"/scss/core/button/","path":"/scss/core/button/#mixin-set","previewsByIndex":{}},{"groupName":"button","id":"function-get","uid":"button-function-get","title":"get()","groupPath":"/scss/core/button/","path":"/scss/core/button/#function-get","previewsByIndex":{}},{"groupName":"button","id":"mixin-set-styles","uid":"button-mixin-set-styles","title":"set-styles()","groupPath":"/scss/core/button/","path":"/scss/core/button/#mixin-set-styles"},{"groupName":"button","id":"mixin-set-sizes","uid":"button-mixin-set-sizes","title":"set-sizes()","groupPath":"/scss/core/button/","path":"/scss/core/button/#mixin-set-sizes"},{"groupName":"button","id":"mixin-reset","uid":"button-mixin-reset","title":"reset()","groupPath":"/scss/core/button/","path":"/scss/core/button/#mixin-reset"},{"groupName":"button","id":"mixin-default","uid":"button-mixin-default","title":"default()","groupPath":"/scss/core/button/","path":"/scss/core/button/#mixin-default"},{"groupName":"button","id":"mixin-size","uid":"button-mixin-size","title":"size()","groupPath":"/scss/core/button/","path":"/scss/core/button/#mixin-size"},{"groupName":"button","id":"function-get-style-value","uid":"button-function-get-style-value","title":"get-style-value()","groupPath":"/scss/core/button/","path":"/scss/core/button/#function-get-style-value"},{"groupName":"button","id":"mixin-style-styles","uid":"button-mixin-style-styles","title":"style-styles()","groupPath":"/scss/core/button/","path":"/scss/core/button/#mixin-style-styles"},{"groupName":"button","id":"mixin-style-styles-hover","uid":"button-mixin-style-styles-hover","title":"style-styles-hover()","groupPath":"/scss/core/button/","path":"/scss/core/button/#mixin-style-styles-hover"},{"groupName":"button","id":"mixin-style","uid":"button-mixin-style","title":"style()","groupPath":"/scss/core/button/","path":"/scss/core/button/#mixin-style"}];
  export default {
    components: {
      SassdocPreview,
      SassdocDetails
    },
    provide: {
      getSassdocItem(uid) {
        return sassdocGroup.find(item => item.uid === uid);
      },
      getSassdocGroup() {
        return sassdocGroup;
      },
      sassdocPreviewOptions: JSON.parse(
        decodeURIComponent(
          `%7B%22previewStyles%22%3A%22%5Cn%20%20%20%20height%3A%2020em%3B%5Cn%20%20%20%20width%3A%20100%25%3B%5Cn%20%20%20%20border%3A%20none%3B%5Cn%20%20%20%20background-color%3A%20%23f9f9f9%3B%5Cn%20%20%20%20border-radius%3A%206px%3B%5Cn%20%20%20%20padding%3A%2012px%3B%5Cn%20%20%20%20margin%3A%201.5em%200%3B%5Cn%20%20%22%2C%22previewHead%22%3A%22%5Cn%20%20%20%20%3Ctitle%3EULU%20Example%3C%2Ftitle%3E%20%5Cn%20%20%20%20%3Cmeta%20charset%3D%5C%22utf-8%5C%22%3E%20%5Cn%20%20%20%20%3Cmeta%20name%3D%5C%22viewport%5C%22%20content%3D%5C%22width%3Ddevice-width%2C%20initial-scale%3D1%5C%22%3E%20%5Cn%20%20%20%20%3Clink%20rel%3D%5C%22stylesheet%5C%22%20href%3D%5C%22%2Ffrontend%2Fulu-frontend.min.css%5C%22%3E%5Cn%20%20%22%2C%22previewScripts%22%3A%22%5Cn%20%20%20%20%3Cscript%20src%3D%5C%22%2Ffrontend%2Fulu-frontend.min.js%5C%22%3E%3C%2Fscript%3E%5Cn%20%20%22%7D`
        )
      )
    }
  }

</script>  
  
  