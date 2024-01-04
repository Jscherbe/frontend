---
title: Color
sassdocGroupName: color
outline: deep
---


# Color





## Variables




###  $palette <Badge text="variable" type="tip" vertical="top" /><Badge text="map" type="warning" vertical="top" />  {#variable-palette} 

  

The color palette map, can be extended or modified with set() and accessed with get()
Note do not use names that start with "--" as those are reserved for custom-properties (pass through) also "inherit" is reserved.
    
    

``` scss
(
  "black":        black,
  "white":        white,
  "type":         black,
  "background":   white,
  "focus":        blue,
  "error":        red,
  "warning":      orange,
  "accent":       orange,
  "selected" :    green,
  "box-shadow":   rgba(0, 0, 0, 0.349),
  "box-shadow:hover" : rgba(0, 0, 0, 0.5),
  "rule":         gray,
  "rule-light":   lightgray,
  "link":         blue,
  "link:hover":   darkblue,
  "link:active":  darkblue,
  "link:visited": purple,
  "bullet":       inherit
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** variable
- **Lines (comments):** 11-13
- **Lines (code):** 15-34

</SassdocDetails>
    
    


###  $contexts <Badge text="variable" type="tip" vertical="top" /><Badge text="map" type="warning" vertical="top" />  {#variable-contexts} 

  

Pairs of background-color and color definitions
    
    

``` scss
(
  "dark" : (
    "background-color" : "black",
    "color" : "white",
    "base-class" : true
  ),
  "light" : (
    "background-color" : "white",
    "color" : "black",
    "base-class" : true
  ),
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** variable
- **Lines (comments):** 36-40
- **Lines (code):** 42-53

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$contexts.name.background-color|Number|String|Color value or name of color in $palette|
|$contexts.name.color|Number|String|Color value or name of color in $palette|
|$contexts.name.base-class|Boolean|Print this value in the base module as a class (if base prints)|

    


###  $color-classes <Badge text="variable" type="tip" vertical="top" />  {#variable-color-classes} 

  

Palette entries that are output as classes when using all-color-class-styles
    
    

``` scss
(
  "black" : true,
  "white" : true,
  "type": true
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** variable
- **Lines (comments):** 55-55
- **Lines (code):** 56-60

</SassdocDetails>
    
    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Used to override or extend the color palette
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 62-68
- **Lines (code):** 70-72

</SassdocDetails>
    
    

#### Examples

Setting the error and type color      


``` scss
@include color.set((
  "type" : #444,
  "error" : orange,
));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|A map to merge into the color palette|

    

#### Require

- [$palette](/core/color/#variable-palette)
  


###  set-color-classes() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set-color-classes} 

  

Set ouput classes for all-color-class-styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 94-95
- **Lines (code):** 97-99

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes (you can disable defaults this way)|

    

#### Require

- [$color-classes](/core/color/#variable-color-classes)
  


###  set-contexts() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set-contexts} 

  

Set color contexts
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 106-116
- **Lines (code):** 118-120

</SassdocDetails>
    
    

#### Examples

Overwriting contexts      


``` scss
@include color.set-contexts((
  "dark" : (
    "background-color" : red,
    "color" : white,
  )
), false, true);
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|A map to merge|
|$deep|`Map`|Use deep merge|
|$overwrite|`Map`|Overwrite the completly (cannot be used with deep)|

    

#### Require

- map-merge()
- [$contexts](/core/color/#variable-contexts)
  


###  context-styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-context-styles} 

  

Prints contexts styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 145-146
- **Lines (code):** 148-154

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of context|

    

#### Require

- [get-context()](/core/color/#function-get-context)
- [get-context-value()](/core/color/#function-get-context-value)
- [get()](/core/breakpoint/#function-get)
  


###  all-context-styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-all-context-styles} 

  

Prints all context styles 
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 178-185
- **Lines (code):** 187-196

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include ulu.all-context-styles();
```
  



      

Example of a color-context      


``` html
 <div class="color-context-dark" style="padding: 1rem">
  Some text in dark context
</div>
```
  


##### Preview


<SassdocPreview uid="color-mixin-all-context-styles" :exampleIndex="1" />
  

  

      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$with-prop|`String`|Checks the specific context for a certain prop (has to be truthy)(used for output in helper/base color modules)|

    

#### Require

- [context-styles()](/core/color/#mixin-context-styles)
- class()
- [get()](/core/breakpoint/#function-get)
- [$contexts](/core/color/#variable-contexts)
  


###  all-color-class-styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-all-color-class-styles} 

  

Outputs all color classes
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** mixin
- **Lines (comments):** 198-202
- **Lines (code):** 204-213

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include ulu.all-color-class-styles();
```
  



      

Example of a color-context      


``` html
<span class="color-name">Some text</span>
```
  


##### Preview


<SassdocPreview uid="color-mixin-all-color-class-styles" :exampleIndex="1" />
  

  

      

#### Require

- class()
- [get()](/core/breakpoint/#function-get)
- [$color-classes](/core/color/#variable-color-classes)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a color from the palette by name
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 74-76
- **Lines (code):** 78-92

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of color to get|

    

#### Returns


|Type|Description|
|:--|:--|
|Color|Note if non-string value is passed it is sent back through, along with custom properties and keyword inherit|

    

#### Require

- require-map-get()
- [$palette](/core/color/#variable-palette)
  


###  get-context() <Badge text="function" type="tip" vertical="top" />  {#function-get-context} 

  

Get a context by name
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 122-124
- **Lines (code):** 126-128

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of context|

    

#### Returns


|Type|
|:--|
|Map|

    

#### Require

- require-map-get()
- [$contexts](/core/color/#variable-contexts)
  


###  get-context-value() <Badge text="function" type="tip" vertical="top" />  {#function-get-context-value} 

  

Get a context's value'
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 130-133
- **Lines (code):** 135-143

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of context|
|$prop|`String`|The property to get|

    

#### Returns


|Type|
|:--|
|Color|

    

#### Require

- [get-context()](/core/color/#function-get-context)
- [get()](/core/breakpoint/#function-get)
  


###  tint() <Badge text="function" type="tip" vertical="top" />  {#function-tint} 

  

Lighten a color using the default white by a percentage
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 156-161
- **Lines (code):** 163-165
- **Author:** 

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$color|`Color, String`|Color/palette color name to apply to tint|
|$percentage|`Number`|Percentage|

    

#### Returns


|Type|
|:--|
|Color|

    

#### Related Links

- [Modified from source (CSS Tricks, Kitty Giraudel)](https://css-tricks.com/snippets/sass/tint-shade-functions/)

    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  shade() <Badge text="function" type="tip" vertical="top" />  {#function-shade} 

  

Darken a color with the default black by a percentage
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _color.scss
- **Group:** color
- **Type:** function
- **Lines (comments):** 167-172
- **Lines (code):** 174-176
- **Author:** Kitty Giraudel

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$color|`Color, String`|Color/palette color name to shade|
|$percentage|`Number`|Percentage to shade|

    

#### Returns


|Type|
|:--|
|Color|

    

#### Related Links

- [Modified from source (CSS Tricks, Kitty Giraudel)](https://css-tricks.com/snippets/sass/tint-shade-functions/)

    

#### Require

- [get()](/core/breakpoint/#function-get)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"color","id":"variable-palette","uid":"color-variable-palette","title":"$palette","groupPath":"/core/color/","path":"/core/color/#variable-palette"},{"groupName":"color","id":"variable-contexts","uid":"color-variable-contexts","title":"$contexts","groupPath":"/core/color/","path":"/core/color/#variable-contexts"},{"groupName":"color","id":"variable-color-classes","uid":"color-variable-color-classes","title":"$color-classes","groupPath":"/core/color/","path":"/core/color/#variable-color-classes"},{"groupName":"color","id":"mixin-set","uid":"color-mixin-set","title":"set()","groupPath":"/core/color/","path":"/core/color/#mixin-set","previewsByIndex":{}},{"groupName":"color","id":"function-get","uid":"color-function-get","title":"get()","groupPath":"/core/color/","path":"/core/color/#function-get"},{"groupName":"color","id":"mixin-set-color-classes","uid":"color-mixin-set-color-classes","title":"set-color-classes()","groupPath":"/core/color/","path":"/core/color/#mixin-set-color-classes"},{"groupName":"color","id":"mixin-set-contexts","uid":"color-mixin-set-contexts","title":"set-contexts()","groupPath":"/core/color/","path":"/core/color/#mixin-set-contexts","previewsByIndex":{}},{"groupName":"color","id":"function-get-context","uid":"color-function-get-context","title":"get-context()","groupPath":"/core/color/","path":"/core/color/#function-get-context"},{"groupName":"color","id":"function-get-context-value","uid":"color-function-get-context-value","title":"get-context-value()","groupPath":"/core/color/","path":"/core/color/#function-get-context-value"},{"groupName":"color","id":"mixin-context-styles","uid":"color-mixin-context-styles","title":"context-styles()","groupPath":"/core/color/","path":"/core/color/#mixin-context-styles"},{"groupName":"color","id":"function-tint","uid":"color-function-tint","title":"tint()","groupPath":"/core/color/","path":"/core/color/#function-tint"},{"groupName":"color","id":"function-shade","uid":"color-function-shade","title":"shade()","groupPath":"/core/color/","path":"/core/color/#function-shade"},{"groupName":"color","id":"mixin-all-context-styles","uid":"color-mixin-all-context-styles","title":"all-context-styles()","groupPath":"/core/color/","path":"/core/color/#mixin-all-context-styles","previewsByIndex":{"1":" <div class=\"color-context-dark\" style=\"padding: 1rem\">\n  Some text in dark context\n</div>"}},{"groupName":"color","id":"mixin-all-color-class-styles","uid":"color-mixin-all-color-class-styles","title":"all-color-class-styles()","groupPath":"/core/color/","path":"/core/color/#mixin-all-color-class-styles","previewsByIndex":{"1":"<span class=\"color-name\">Some text</span>"}}];
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
  
  