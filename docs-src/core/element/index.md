---
title: Element
sassdocGroupName: element
outline: deep
---


# Element





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** variable
- **Lines (comments):** 10-37
- **Lines (code):** 39-69

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.backdrop-blur|Number|Backdrop blur amount used on elements/components|
|$config.backdrop-color|Color|Backdrop color (modal overlays, etc)|
|$config.box-shadow|List|Box-shadow definition for elements that are on top of page|
|$config.box-shadow-raised|List|Box-shadow definition for elements that are raised off of the page (dropdowns, etc)|
|$config.box-shadow-above|List|Box-shadow definition for elements that are above the page (fixed items, etc)|
|$config.border-radius|Number|Common element border radius|
|$config.border-radius-small|Number|Common element border radius (small)|
|$config.border-radius-large|Number|Common element border radius (large)|
|$config.text-shadow|List|Common text shadow|
|$config.margin-small|Number|Common element margin (small) (default for lists)|
|$config.margin|Number|Common element margin|
|$config.margin-large|Number|Common element margin (large)|
|$config.ol-list-style-type|String|Ordered list type (level 1)|
|$config.ol-list-style-type-2|String|Ordered list type (level 2)|
|$config.ol-list-style-type-3|String|Ordered list type (level 3)|
|$config.ul-list-style-type|String||
|$config.ul-list-style-type-2|String||
|$config.ul-list-style-type-3|String||
|$config.link-text-decoration-default|String|Whether links use underline, remember that removing underline will create an accessiblity issue (not relying on color)|
|$config.link-text-decoration|String||
|$config.link-text-decoration-style|String||
|$config.link-text-decoration-color|Color||
|$config.link-text-decoration-style-hover|String||
|$config.link-text-decoration-color-hover|Color||
|$config.link-text-decoration-thickness|Number||
|$config.link-text-underline-offset|Number||

    


###  $rule-styles <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-rule-styles} 

  

Rule style map, redifine defaults or add to
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** variable
- **Lines (comments):** 71-72
- **Lines (code):** 74-77

</SassdocDetails>
    
    


###  $rule-margins <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-rule-margins} 

  

Common rule margins (space between rule and type)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** variable
- **Lines (comments):** 79-80
- **Lines (code):** 82-87

</SassdocDetails>
    
    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 89-91
- **Lines (code):** 92-94

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/core/breakpoint/#variable-config)
  


###  set-rule-styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set-rule-styles} 

  

Sets rule styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 104-105
- **Lines (code):** 107-109

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$rule-styles](/core/element/#variable-rule-styles)
  


###  set-rule-margins() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set-rule-margins} 

  

Sets rule margins
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 111-112
- **Lines (code):** 114-116

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$rule-margins](/core/element/#variable-rule-margins)
  


###  rule() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-rule} 

  

Get full rule CSS (style and margin)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 132-133
- **Lines (code):** 135-141

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    


###  link() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-link} 

  

Print link styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 151-153
- **Lines (code):** 155-177

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$visited|`Boolean`|Include visited style|
|$active|`Boolean`|Include active style|

    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  link-defaults() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-link-defaults} 

  

Print the defautl link styling (no hover and focus styles)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 179-179
- **Lines (code):** 181-194

</SassdocDetails>
    
    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  styles-ordered-list() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-styles-ordered-list} 

  

Print the ordered list items styling
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 196-197
- **Lines (code):** 199-223

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$bullet-color|`Boolean`|Optional bullet color (defaults to palette 'bullet')|

    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  styles-unordered-list() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-styles-unordered-list} 

  

Print the unordered list items styling
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 225-226
- **Lines (code):** 228-249

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$bullet-color|`Boolean`|Optional bullet color|

    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  hidden-visually() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-hidden-visually} 

  

Hide text for assistive devices
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** mixin
- **Lines (comments):** 251-256
- **Lines (code):** 258-276

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include ulu.layout-hidden-visually()
// Reset styling
@include ulu.layout-hidden-visually(false)
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$hidden|`Boolean`|Defaults to true, pass false to override the hidden css (ie. on focus)|

    
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** function
- **Lines (comments):** 96-98
- **Lines (code):** 100-102

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- require-map-get()
- [$config](/core/breakpoint/#variable-config)
  


###  get-rule-style() <Badge text="function" type="tip" vertical="top" />  {#function-get-rule-style} 

  

Get a rule style
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** function
- **Lines (comments):** 118-119
- **Lines (code):** 121-123

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- require-map-get()
- [$rule-styles](/core/element/#variable-rule-styles)
  


###  get-rule-margin() <Badge text="function" type="tip" vertical="top" />  {#function-get-rule-margin} 

  

Sets rule margin
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _element.scss
- **Group:** element
- **Type:** function
- **Lines (comments):** 125-126
- **Lines (code):** 128-130

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- require-map-get()
- [$rule-margins](/core/element/#variable-rule-margins)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"element","id":"variable-config","uid":"element-variable-config","title":"$config","groupPath":"/core/element/","path":"/core/element/#variable-config"},{"groupName":"element","id":"variable-rule-styles","uid":"element-variable-rule-styles","title":"$rule-styles","groupPath":"/core/element/","path":"/core/element/#variable-rule-styles"},{"groupName":"element","id":"variable-rule-margins","uid":"element-variable-rule-margins","title":"$rule-margins","groupPath":"/core/element/","path":"/core/element/#variable-rule-margins"},{"groupName":"element","id":"mixin-set","uid":"element-mixin-set","title":"set()","groupPath":"/core/element/","path":"/core/element/#mixin-set"},{"groupName":"element","id":"function-get","uid":"element-function-get","title":"get()","groupPath":"/core/element/","path":"/core/element/#function-get"},{"groupName":"element","id":"mixin-set-rule-styles","uid":"element-mixin-set-rule-styles","title":"set-rule-styles()","groupPath":"/core/element/","path":"/core/element/#mixin-set-rule-styles"},{"groupName":"element","id":"mixin-set-rule-margins","uid":"element-mixin-set-rule-margins","title":"set-rule-margins()","groupPath":"/core/element/","path":"/core/element/#mixin-set-rule-margins"},{"groupName":"element","id":"function-get-rule-style","uid":"element-function-get-rule-style","title":"get-rule-style()","groupPath":"/core/element/","path":"/core/element/#function-get-rule-style"},{"groupName":"element","id":"function-get-rule-margin","uid":"element-function-get-rule-margin","title":"get-rule-margin()","groupPath":"/core/element/","path":"/core/element/#function-get-rule-margin"},{"groupName":"element","id":"mixin-rule","uid":"element-mixin-rule","title":"rule()","groupPath":"/core/element/","path":"/core/element/#mixin-rule"},{"groupName":"element","id":"mixin-link","uid":"element-mixin-link","title":"link()","groupPath":"/core/element/","path":"/core/element/#mixin-link"},{"groupName":"element","id":"mixin-link-defaults","uid":"element-mixin-link-defaults","title":"link-defaults()","groupPath":"/core/element/","path":"/core/element/#mixin-link-defaults"},{"groupName":"element","id":"mixin-styles-ordered-list","uid":"element-mixin-styles-ordered-list","title":"styles-ordered-list()","groupPath":"/core/element/","path":"/core/element/#mixin-styles-ordered-list"},{"groupName":"element","id":"mixin-styles-unordered-list","uid":"element-mixin-styles-unordered-list","title":"styles-unordered-list()","groupPath":"/core/element/","path":"/core/element/#mixin-styles-unordered-list"},{"groupName":"element","id":"mixin-hidden-visually","uid":"element-mixin-hidden-visually","title":"hidden-visually()","groupPath":"/core/element/","path":"/core/element/#mixin-hidden-visually","previewsByIndex":{}}];
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
          `%7B%22previewStyles%22%3A%22%5Cn%20%20%20%20height%3A%2020em%3B%5Cn%20%20%20%20width%3A%20100%25%3B%5Cn%20%20%20%20border%3A%20none%3B%5Cn%20%20%20%20background-color%3A%20%23f9f9f9%3B%5Cn%20%20%20%20border-radius%3A%206px%3B%5Cn%20%20%20%20padding%3A%2012px%3B%5Cn%20%20%20%20margin%3A%201.5em%200%3B%5Cn%20%20%22%2C%22previewHead%22%3A%22%5Cn%20%20%20%20%3Ctitle%3ESassdoc%20Example%3C%2Ftitle%3E%20%5Cn%20%20%20%20%3Cmeta%20charset%3D%5C%22utf-8%5C%22%3E%20%5Cn%20%20%20%20%3Cmeta%20name%3D%5C%22viewport%5C%22%20content%3D%5C%22width%3Ddevice-width%2C%20initial-scale%3D1%5C%22%3E%20%5Cn%20%20%20%20%3Clink%20rel%3D%5C%22stylesheet%5C%22%20href%3D%5C%22%2Fsassdoc-preview.css%5C%22%3E%5Cn%20%20%22%2C%22previewScripts%22%3A%22%5Cn%20%20%20%20%3Cscript%20src%3D%5C%22%2Fsassdoc-preview.js%5C%22%3E%3C%2Fscript%3E%5Cn%20%20%22%7D`
        )
      )
    }
  }

</script>  
  
  