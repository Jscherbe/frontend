---
title: Elements
sassdocGroupName: elements
outline: deep
---


# Elements





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _elements.scss
- **Group:** elements
- **Type:** variable
- **Lines (comments):** 15-17
- **Lines (code):** 19-23

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.links-state-styling|Number|Just color/defaults vs hover/visited/active|

    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _elements.scss
- **Group:** elements
- **Type:** mixin
- **Lines (comments):** 25-28
- **Lines (code):** 29-31

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

- [$config](/base/elements/#variable-config)
  


###  base-elements-styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-base-elements-styles} 

  

Prints elements base styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _elements.scss
- **Group:** elements
- **Type:** mixin
- **Lines (comments):** 42-45
- **Lines (code):** 47-188

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include ulu.base-elements-styles();
```
  



      

#### Require

- [get()](/base/elements/#function-get)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _elements.scss
- **Group:** elements
- **Type:** function
- **Lines (comments):** 33-36
- **Lines (code):** 38-40

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

- [$config](/base/elements/#variable-config)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"elements","id":"variable-config","uid":"elements-variable-config","title":"$config","groupPath":"/base/elements/","path":"/base/elements/#variable-config"},{"groupName":"elements","id":"mixin-set","uid":"elements-mixin-set","title":"set()","groupPath":"/base/elements/","path":"/base/elements/#mixin-set","previewsByIndex":{}},{"groupName":"elements","id":"function-get","uid":"elements-function-get","title":"get()","groupPath":"/base/elements/","path":"/base/elements/#function-get","previewsByIndex":{}},{"groupName":"elements","id":"mixin-base-elements-styles","uid":"elements-mixin-base-elements-styles","title":"base-elements-styles()","groupPath":"/base/elements/","path":"/base/elements/#mixin-base-elements-styles","previewsByIndex":{}}];
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
  
  