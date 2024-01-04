---
title: Rule
sassdocGroupName: rule
outline: deep
---


# Rule





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    

``` scss
(
  "short-width" : 2.75rem,
  "short-border-width" : 4px,
  "short-modifiers" : false
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _rule.scss
- **Group:** rule
- **Type:** variable
- **Lines (comments):** 11-14
- **Lines (code):** 16-20

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.short-width|Number|Short rule width (like an inline rule, normally used above headings), Setting this to false will disable output|
|$config.short-border-width|Number|Short rule width of border|

    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _rule.scss
- **Group:** rule
- **Type:** mixin
- **Lines (comments):** 22-25
- **Lines (code):** 27-29

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

- [$config](/components/badge/#variable-config)
  


###  styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-styles} 

  

Output styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _rule.scss
- **Group:** rule
- **Type:** mixin
- **Lines (comments):** 40-40
- **Lines (code):** 42-93

</SassdocDetails>
    
    

#### Require

- [get()](/components/badge/#function-get)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _rule.scss
- **Group:** rule
- **Type:** function
- **Lines (comments):** 31-34
- **Lines (code):** 36-38

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

- [$config](/components/badge/#variable-config)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"rule","id":"variable-config","uid":"rule-variable-config","title":"$config","groupPath":"/components/rule/","path":"/components/rule/#variable-config"},{"groupName":"rule","id":"mixin-set","uid":"rule-mixin-set","title":"set()","groupPath":"/components/rule/","path":"/components/rule/#mixin-set","previewsByIndex":{}},{"groupName":"rule","id":"function-get","uid":"rule-function-get","title":"get()","groupPath":"/components/rule/","path":"/components/rule/#function-get","previewsByIndex":{}},{"groupName":"rule","id":"mixin-styles","uid":"rule-mixin-styles","title":"styles()","groupPath":"/components/rule/","path":"/components/rule/#mixin-styles"}];
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
  
  