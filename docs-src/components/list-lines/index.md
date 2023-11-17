---
title: List-lines
sassdocGroupName: list-lines
outline: deep
---


# List-lines





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" />  {#variable-config} 

  

Module Config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** variable
- **Lines (comments):** 12-12
- **Lines (code):** 14-20

</SassdocDetails>
    
    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** mixin
- **Lines (comments):** 22-24
- **Lines (code):** 26-28

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/components/list-lines/#variable-config)
  


###  inner-styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-inner-styles} 

  

Output component styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** mixin
- **Lines (comments):** 38-38
- **Lines (code):** 40-60

</SassdocDetails>
    
    

#### Require

- [get()](/components/button/#function-get)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _list-lines.scss
- **Group:** list-lines
- **Type:** function
- **Lines (comments):** 30-32
- **Lines (code):** 34-36

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/components/list-lines/#variable-config)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"list-lines","id":"variable-config","uid":"list-lines-variable-config","title":"$config","groupPath":"/components/list-lines/","path":"/components/list-lines/#variable-config"},{"groupName":"list-lines","id":"mixin-set","uid":"list-lines-mixin-set","title":"set()","groupPath":"/components/list-lines/","path":"/components/list-lines/#mixin-set"},{"groupName":"list-lines","id":"function-get","uid":"list-lines-function-get","title":"get()","groupPath":"/components/list-lines/","path":"/components/list-lines/#function-get"},{"groupName":"list-lines","id":"mixin-inner-styles","uid":"list-lines-mixin-inner-styles","title":"inner-styles()","groupPath":"/components/list-lines/","path":"/components/list-lines/#mixin-inner-styles"}];
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
  
  