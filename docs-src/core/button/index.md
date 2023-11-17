---
title: Button
sassdocGroupName: button
outline: deep
---


# Button





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 22-23
- **Lines (code):** 25-51

</SassdocDetails>
    
    


###  $sizes <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-sizes} 

  

Button sizes
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** variable
- **Lines (comments):** 53-54
- **Lines (code):** 56-68

</SassdocDetails>
    
    


###  $styles <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-styles} 

  

Button styles
    
    


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

- [$config](/core/breakpoint/#variable-config)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** function
- **Lines (comments):** 105-108
- **Lines (code):** 110-114

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
- [$config](/core/breakpoint/#variable-config)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"button","id":"variable-config","uid":"button-variable-config","title":"$config","groupPath":"/core/button/","path":"/core/button/#variable-config"},{"groupName":"button","id":"variable-sizes","uid":"button-variable-sizes","title":"$sizes","groupPath":"/core/button/","path":"/core/button/#variable-sizes"},{"groupName":"button","id":"variable-styles","uid":"button-variable-styles","title":"$styles","groupPath":"/core/button/","path":"/core/button/#variable-styles"},{"groupName":"button","id":"mixin-set","uid":"button-mixin-set","title":"set()","groupPath":"/core/button/","path":"/core/button/#mixin-set","previewsByIndex":{}},{"groupName":"button","id":"function-get","uid":"button-function-get","title":"get()","groupPath":"/core/button/","path":"/core/button/#function-get","previewsByIndex":{}}];
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
  
  