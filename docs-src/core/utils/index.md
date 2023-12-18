---
title: Utils
sassdocGroupName: utils
outline: deep
---


# Utils





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** variable
- **Lines (comments):** 11-14
- **Lines (code):** 16-19

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.debug-maps|Boolean|Debugs include map print outs|
|$config.file-header-comments|Boolean|Remove comment headers if you'd like|

    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 21-24
- **Lines (code):** 25-27

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

- [$config](/core/breakpoint/#variable-config)
  


###  require-list-has() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-require-list-has} 

  

Ensure a value is present in the list, throw an error if not found
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 57-60
- **Lines (code):** 62-67

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$list|`List`|The map to get the value from|
|$value|`String`|The value to search for in the list|
|$context|`String`|The context of using this function for debugging help|

    

#### Throw

- ULU: Unable to find item 
    


###  require-list-contains() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-require-list-contains} 

  

Require that the list only is only made up of allowed items
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 69-71
- **Lines (code):** 73-77

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$allowed|`List`|The list of allowed items|
|$list|`String`|The list to test allowed against|

    

#### Require

- [require-list-has()](/core/utils/#mixin-require-list-has)
  


###  file-header() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-file-header} 

  

Returns true if we should include something (used for output checking)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** mixin
- **Lines (comments):** 88-90
- **Lines (code):** 92-100

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$context|`List`|The root area of the framework this file comes from|
|$name|`List`|The name of the specific area/file (optional)|

    
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 29-32
- **Lines (code):** 34-36

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

- [require-map-get()](/core/utils/#function-require-map-get)
- [$config](/core/breakpoint/#variable-config)
  


###  require-map-get() <Badge text="function" type="tip" vertical="top" />  {#function-require-map-get} 

  

Get a required value from a map, throw an error if not found
- Remeber that that maps cannot intentionally use null (use false instead, if trying to avoid output if unconfigured)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 38-43
- **Lines (code):** 45-55

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$map|`Map`|The map to get the value from|
|$key|`String`|The key in the map to get value from|
|$context|`String`|The context of using this function for debugging help|

    

#### Returns


|Type|Description|
|:--|:--|
|*|The value from the map|

    

#### Throw

- ULU: Unable to find  
    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  included() <Badge text="function" type="tip" vertical="top" />  {#function-included} 

  

Returns true if we should include something (map of booleans)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 79-81
- **Lines (code):** 83-86

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of item to see if it's included|
|$includes|`Map`|Map of includes|

    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  if-type() <Badge text="function" type="tip" vertical="top" />  {#function-if-type} 

  


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 103-105
- **Lines (code):** 107-113

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$type|`String`|type of value it should be|
|$value|`String`|the value to provide if it is that type|
|$fallback|`String`|the fallback value|

    


###  number-info() <Badge text="function" type="tip" vertical="top" />  {#function-number-info} 

  


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 116-117
- **Lines (code):** 119-133

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$number|`String`|Number to get meta info for|

    

#### Returns


|Type|Description|
|:--|:--|
|Map|With properties (unit, value)|

    


###  map-merge() <Badge text="function" type="tip" vertical="top" />  {#function-map-merge} 

  

Reusable merge method 
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 135-139
- **Lines (code):** 141-149

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$original|`Map`|Source map|
|$changes|`Map`|Changes to merge into source map|
|$mode|`String`|How to merge changes (merge [defualt], deep, or overwrite)|

    

#### Returns


|Type|Description|
|:--|:--|
|Map|New map with changes|

    


###  map-merge-or-overwrite() <Badge text="function" type="tip" vertical="top" />  {#function-map-merge-or-overwrite} 

  

Repeatable pattern in core
    
    

::: warning Deprecated

Left in for compatability, will be removed, use map-merge with mode

:::
  


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 151-152
- **Lines (code):** 154-162

</SassdocDetails>
    
    

#### Require

- [map-merge()](/core/utils/#function-map-merge)
  


###  fallback() <Badge text="function" type="tip" vertical="top" />  {#function-fallback} 

  

Utility for providing fallbacks, the first truthy value (non false or null) will be returned
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 164-165
- **Lines (code):** 167-174

</SassdocDetails>
    
    

#### Returns


|Type|Description|
|:--|:--|
|*|The first truthy value|

    


###  map-fallback() <Badge text="function" type="tip" vertical="top" />  {#function-map-fallback} 

  

Provides fallback values from the same map
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 176-176
- **Lines (code):** 177-185

</SassdocDetails>
    
    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  function-fallback() <Badge text="function" type="tip" vertical="top" />  {#function-function-fallback} 

  

Helps in providing a dynamic fallback for modules whose defaults should come from another
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 187-191
- **Lines (code):** 193-202

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$prop|`String`|Property trying to get fallback for|
|$value|`*`|The value that may need the fallback|
|$lookup|`Map`|Map of properties to functions (use sass:meta > meta.get-function to populate)|

    

#### Returns


|Type|Description|
|:--|:--|
|*|The user's original value, or if the value is true get the default value from the provided function|

    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  string-replace() <Badge text="function" type="tip" vertical="top" />  {#function-string-replace} 

  

Replaces all or one occurence of a string within a string
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _utils.scss
- **Group:** utils
- **Type:** function
- **Lines (comments):** 204-208
- **Lines (code):** 210-226

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$string|`String`|String to operate on|
|$find|`String`|String to find within string|
|$replace|`String`|String to replace found strings|
|$all|`Boolean`|Default true replace all matches, if false replace only first|

    
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"utils","id":"variable-config","uid":"utils-variable-config","title":"$config","groupPath":"/core/utils/","path":"/core/utils/#variable-config"},{"groupName":"utils","id":"mixin-set","uid":"utils-mixin-set","title":"set()","groupPath":"/core/utils/","path":"/core/utils/#mixin-set","previewsByIndex":{}},{"groupName":"utils","id":"function-get","uid":"utils-function-get","title":"get()","groupPath":"/core/utils/","path":"/core/utils/#function-get","previewsByIndex":{}},{"groupName":"utils","id":"function-require-map-get","uid":"utils-function-require-map-get","title":"require-map-get()","groupPath":"/core/utils/","path":"/core/utils/#function-require-map-get"},{"groupName":"utils","id":"mixin-require-list-has","uid":"utils-mixin-require-list-has","title":"require-list-has()","groupPath":"/core/utils/","path":"/core/utils/#mixin-require-list-has"},{"groupName":"utils","id":"mixin-require-list-contains","uid":"utils-mixin-require-list-contains","title":"require-list-contains()","groupPath":"/core/utils/","path":"/core/utils/#mixin-require-list-contains"},{"groupName":"utils","id":"function-included","uid":"utils-function-included","title":"included()","groupPath":"/core/utils/","path":"/core/utils/#function-included"},{"groupName":"utils","id":"mixin-file-header","uid":"utils-mixin-file-header","title":"file-header()","groupPath":"/core/utils/","path":"/core/utils/#mixin-file-header"},{"groupName":"utils","id":"function-if-type","uid":"utils-function-if-type","title":"if-type()","groupPath":"/core/utils/","path":"/core/utils/#function-if-type"},{"groupName":"utils","id":"function-number-info","uid":"utils-function-number-info","title":"number-info()","groupPath":"/core/utils/","path":"/core/utils/#function-number-info"},{"groupName":"utils","id":"function-map-merge","uid":"utils-function-map-merge","title":"map-merge()","groupPath":"/core/utils/","path":"/core/utils/#function-map-merge"},{"groupName":"utils","id":"function-map-merge-or-overwrite","uid":"utils-function-map-merge-or-overwrite","title":"map-merge-or-overwrite()","groupPath":"/core/utils/","path":"/core/utils/#function-map-merge-or-overwrite"},{"groupName":"utils","id":"function-fallback","uid":"utils-function-fallback","title":"fallback()","groupPath":"/core/utils/","path":"/core/utils/#function-fallback"},{"groupName":"utils","id":"function-map-fallback","uid":"utils-function-map-fallback","title":"map-fallback()","groupPath":"/core/utils/","path":"/core/utils/#function-map-fallback"},{"groupName":"utils","id":"function-function-fallback","uid":"utils-function-function-fallback","title":"function-fallback()","groupPath":"/core/utils/","path":"/core/utils/#function-function-fallback"},{"groupName":"utils","id":"function-string-replace","uid":"utils-function-string-replace","title":"string-replace()","groupPath":"/core/utils/","path":"/core/utils/#function-string-replace"}];
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
  
  