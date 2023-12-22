---
title: Typography
sassdocGroupName: typography
outline: deep
---


# Typography





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    

``` scss
(
  "font-size" : 16px, 
  "font-family" : (ui-sans-serif, "Open Sans", Helvetica, Arial, sans-serif),
  "font-family-sans" : (ui-sans-serif, "Open Sans", Helvetica, Arial, sans-serif),
  "font-family-serif" : (Cambria, Georgia, serif),
  "font-family-monospace" : (Menlo, Consolas, Monaco, monospace),
  "font-weight" : inherit,
  "font-weight-headline" : bold,
  "font-weight-light" : 300,
  "font-weight-normal" : normal,
  "font-weight-semibold" : 600,
  "font-weight-bold" : bold,
  "line-height" : 1.5,
  "line-height-dense": 1.3,
  "line-height-spaced": 1.75,
  "size-ratio": 2,
  "size-line-height-ratio": 0.97,
  "scale-steps": 5,
  "responsive-change": 0.05vw, 
  "margin-bottom":  1em,
  "margin-top":  false,
  "letter-spacing-uppercase" : 0.04em,
  "max-width" : 60rem,
  "max-width-small" : 50rem
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** variable
- **Lines (comments):** 17-27
- **Lines (code):** 29-53

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.font-size|Number|Default font size (use pixels, converted, is used for rem base)|
|$config.font-family|Number|Default font family|
|$config.font-family-monospace|Number|Base font-family for monospace|
|$config.line-height|Number|Default line height|
|$config.line-height-dense|Number|Default dense line height|
|$config.size-ratio|Number|Font size scale when using preset sizes, ratio mixin)|
|$config.size-line-height-ratio|Number|Default line height scaling (when using preset sizes, ratio mixin). Can shrink line-height as size increase if desrireable|
|$config.responsive-change|Number|Amount to scale typography by browser's width (use viewport units)|
|$config.margin|Number|Default margin for typography (like paragraphs)|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    


###  $sizes <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-sizes} 

  

Default size presets
    
    

``` scss
(
  "small-x" :       new-size(scale(-2)),
  "small" :         new-size(scale(-1)),
  "base" :          new-size(scale(0)),
  "large" :         new-size(scale(1),   scale-line-height(1)),
  "large-x" :       new-size(scale(2),   scale-line-height(2)),
  "large-xx" :      new-size(scale(3),   scale-line-height(3)),
  "large-xxx" :     new-size(scale(4),   scale-line-height(4)),
  "h1" :            new-size(scale(6),   scale-line-height(6),   true),
  "h2" :            new-size(scale(5),   scale-line-height(5),   true),
  "h3" :            new-size(scale(4),   scale-line-height(4),   true),
  "h4" :            new-size(scale(3),   scale-line-height(3),   true),
  "h5" :            new-size(scale(2),   scale-line-height(2),   true),
  "h6" :            new-size(scale(1),   scale-line-height(1),   true)
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** variable
- **Lines (comments):** 143-152
- **Lines (code):** 154-168

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$size.name|Number|Name of size|
|$size.name.font-size|Number|Font size in rems or pixels|
|$size.name.line-height|Number|Line height (unitless)|
|$size.name.responsive|Number|Apply responsive sizes|
|$size.name.base-class|Boolean|This style should be included in the base (top can be overriden)|
|$size.name.helper-class|Boolean|This style should be included in the helpers (overrides)|

    

#### Todos

- Add adaptive and use a map of breakpoints and whether it's up or down
- Add headlines
    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 55-57
- **Lines (code):** 59-61

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include typography.set-options(( "font-size" : 14px ));|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [$config](/core/breakpoint/#variable-config)
  


###  word-break() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-word-break} 

  

Break word stradegy
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 114-115
- **Lines (code):** 117-121

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$force|`Boolean`|Force words to break (will have unusual breaks)|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    


###  set-sizes() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set-sizes} 

  

Update the typography presets map
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 170-177
- **Lines (code):** 179-181

</SassdocDetails>
    
    

#### Examples

Setting the error and type color      


``` scss
@include typography.set((
  "small" : 0.8rem
));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|A map to merge into the color palette|
|$deep|`Map`|Use deep merge|
|$overwrite|`Map`|Overwrite the presets completly (cannot be used with deep)|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- map-merge()
- [$sizes](/core/breakpoint/#variable-sizes)
  


###  font-size-responsive() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-font-size-responsive} 

  

Print's the responsive type formula
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 267-269
- **Lines (code):** 271-273

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$font-size|`String`|Name to retrieve from sizes map or a unique size map that follows the API|
|$changes|`Map`|Modifications to be merged into size before using|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    


###  size() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-size} 

  

Print a typography size (font-size, line-height)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 275-277
- **Lines (code):** 279-319

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$nameOrMap|`String`|Name to retrieve from sizes map or a unique size map that follows the API|
|$changes|`Map`|Modifications to be merged into size before using|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [font-size-responsive()](/core/typography/#mixin-font-size-responsive)
- [get-size()](/core/breakpoint/#function-get-size)
- [get-size-converted-value()](/core/typography/#function-get-size-converted-value)
- [get()](/core/breakpoint/#function-get)
- [get-size-value()](/core/typography/#function-get-size-value)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 63-65
- **Lines (code):** 67-69

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include typography.set-options(( "font-size" : 14px ));|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- require-map-get()
- [$config](/core/breakpoint/#variable-config)
  


###  scale() <Badge text="function" type="tip" vertical="top" />  {#function-scale} 

  

Get scale of the base font-size
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 71-73
- **Lines (code):** 75-77

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$step|`Number`|Current size in the scale you want to calculate|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Scaled value|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [ratio-scale-size()](/core/calculate/#function-ratio-scale-size)
- [get()](/core/breakpoint/#function-get)
  


###  scale-line-height() <Badge text="function" type="tip" vertical="top" />  {#function-scale-line-height} 

  

Get scale of the line-height
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 79-82
- **Lines (code):** 84-86

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$step|`Number`|Current size in the scale you want to calculate|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Scaled value|

    

#### Todos

- Setup breakpoints
    

#### Require

- [ratio-scale-size()](/core/calculate/#function-ratio-scale-size)
- [get()](/core/breakpoint/#function-get)
  


###  rem() <Badge text="function" type="tip" vertical="top" />  {#function-rem} 

  

Convert pixel value to rem value based on typography $font-size
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 88-90
- **Lines (code):** 92-98

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$pixels|`Number`|Pixel value to convert from|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Rem value|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  em() <Badge text="function" type="tip" vertical="top" />  {#function-em} 

  

Changes pixels to em
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 100-103
- **Lines (code):** 105-112

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`Number`|Pixel value to convert from|
|$base|`Number`|Conversion base (defaults to font-size)|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Rem value|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  new-size() <Badge text="function" type="tip" vertical="top" />  {#function-new-size} 

  

Creates a size map 
- This is just an accelerator for creating a size map
- You can pass your own size maps using set-sizes()
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 123-128
- **Lines (code):** 130-141

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$font-size|`Number`|Font size|
|$line-height|`Number`|Line height|
|$is-headline|`Boolean`|Is a headline|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  get-size() <Badge text="function" type="tip" vertical="top" />  {#function-get-size} 

  

Get a size's map
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 183-185
- **Lines (code):** 187-189

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of size|

    

#### Returns


|Type|
|:--|
|Map|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- require-map-get()
- [$sizes](/core/breakpoint/#variable-sizes)
  


###  font-size() <Badge text="function" type="tip" vertical="top" />  {#function-font-size} 

  

Print a font-size for a given size
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 191-193
- **Lines (code):** 195-199

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`String`|Size name|

    

#### Todos

- Remove doesn't work for breakpoints or responsive
    

#### Require

- [get-size()](/core/breakpoint/#function-get-size)
- [get()](/core/breakpoint/#function-get)
- [rem()](/core/typography/#function-rem)
  


###  unitless-line-height() <Badge text="function" type="tip" vertical="top" />  {#function-unitless-line-height} 

  

Forces conversion to unitless line-height
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 201-203
- **Lines (code):** 205-219

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$line-height|`Number`|Line height size in px, em, or rem|
|$font-size|`Number`|Font size in px, em, or rem|

    

#### Throw

- ULU: Unable to convert to unitless line-height for: #{ $line-height }
    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- strip-unit()
- [rem()](/core/typography/#function-rem)
  


###  get-size-converted-value() <Badge text="function" type="tip" vertical="top" />  {#function-get-size-converted-value} 

  

Print a value from the size and convert it (to appropriate unit for framework)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 220-222
- **Lines (code):** 224-250

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`Map`|Size's map|
|$props|`String`|The property to get|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [get()](/core/breakpoint/#function-get)
- [unitless-line-height()](/core/typography/#function-unitless-line-height)
- [rem()](/core/typography/#function-rem)
  


###  get-size-value() <Badge text="function" type="tip" vertical="top" />  {#function-get-size-value} 

  

Get a sizes property value that doesn't need conversion 
- Reason: Will map to default if user set's size prop to true
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** function
- **Lines (comments):** 253-256
- **Lines (code):** 258-265

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`Map`|Size's map|
|$props|`String`|The property to get|

    

#### Todos

- Idea: Should the maps value be processes when using the set-sizes, set? Instead of recalculated each time get-size is or get is used.
    

#### Require

- [get()](/core/breakpoint/#function-get)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"typography","id":"variable-config","uid":"typography-variable-config","title":"$config","groupPath":"/core/typography/","path":"/core/typography/#variable-config"},{"groupName":"typography","id":"mixin-set","uid":"typography-mixin-set","title":"set()","groupPath":"/core/typography/","path":"/core/typography/#mixin-set"},{"groupName":"typography","id":"function-get","uid":"typography-function-get","title":"get()","groupPath":"/core/typography/","path":"/core/typography/#function-get"},{"groupName":"typography","id":"function-scale","uid":"typography-function-scale","title":"scale()","groupPath":"/core/typography/","path":"/core/typography/#function-scale"},{"groupName":"typography","id":"function-scale-line-height","uid":"typography-function-scale-line-height","title":"scale-line-height()","groupPath":"/core/typography/","path":"/core/typography/#function-scale-line-height"},{"groupName":"typography","id":"function-rem","uid":"typography-function-rem","title":"rem()","groupPath":"/core/typography/","path":"/core/typography/#function-rem"},{"groupName":"typography","id":"function-em","uid":"typography-function-em","title":"em()","groupPath":"/core/typography/","path":"/core/typography/#function-em"},{"groupName":"typography","id":"mixin-word-break","uid":"typography-mixin-word-break","title":"word-break()","groupPath":"/core/typography/","path":"/core/typography/#mixin-word-break"},{"groupName":"typography","id":"function-new-size","uid":"typography-function-new-size","title":"new-size()","groupPath":"/core/typography/","path":"/core/typography/#function-new-size"},{"groupName":"typography","id":"variable-sizes","uid":"typography-variable-sizes","title":"$sizes","groupPath":"/core/typography/","path":"/core/typography/#variable-sizes"},{"groupName":"typography","id":"mixin-set-sizes","uid":"typography-mixin-set-sizes","title":"set-sizes()","groupPath":"/core/typography/","path":"/core/typography/#mixin-set-sizes","previewsByIndex":{}},{"groupName":"typography","id":"function-get-size","uid":"typography-function-get-size","title":"get-size()","groupPath":"/core/typography/","path":"/core/typography/#function-get-size"},{"groupName":"typography","id":"function-font-size","uid":"typography-function-font-size","title":"font-size()","groupPath":"/core/typography/","path":"/core/typography/#function-font-size"},{"groupName":"typography","id":"function-unitless-line-height","uid":"typography-function-unitless-line-height","title":"unitless-line-height()","groupPath":"/core/typography/","path":"/core/typography/#function-unitless-line-height"},{"groupName":"typography","id":"function-get-size-converted-value","uid":"typography-function-get-size-converted-value","title":"get-size-converted-value()","groupPath":"/core/typography/","path":"/core/typography/#function-get-size-converted-value"},{"groupName":"typography","id":"function-get-size-value","uid":"typography-function-get-size-value","title":"get-size-value()","groupPath":"/core/typography/","path":"/core/typography/#function-get-size-value"},{"groupName":"typography","id":"mixin-font-size-responsive","uid":"typography-mixin-font-size-responsive","title":"font-size-responsive()","groupPath":"/core/typography/","path":"/core/typography/#mixin-font-size-responsive"},{"groupName":"typography","id":"mixin-size","uid":"typography-mixin-size","title":"size()","groupPath":"/core/typography/","path":"/core/typography/#mixin-size"}];
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
  
  