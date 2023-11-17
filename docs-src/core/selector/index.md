---
title: Selector
sassdocGroupName: selector
outline: deep
---


# Selector





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
- This module can be used for dynamic classnames (used in base and some components). Some components selectors are too complex or coupled for dynamic classnames. 
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _selector.scss
- **Group:** selector
- **Type:** variable
- **Lines (comments):** 9-13
- **Lines (code):** 15-17

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.prefix|String|Global prefix for selectors (would be used for classname prefix for example)|

    

#### Todos

- See about documenting when a component doesn't run through the selecotr module to get it's base classname
    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _selector.scss
- **Group:** selector
- **Type:** mixin
- **Lines (comments):** 23-26
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

- [$config](/core/breakpoint/#variable-config)
  


###  set-class-overrides() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set-class-overrides} 

  

Set the class selector overrides
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _selector.scss
- **Group:** selector
- **Type:** mixin
- **Lines (comments):** 40-41
- **Lines (code):** 43-53

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Changes to merge|

    
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _selector.scss
- **Group:** selector
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

- require-map-get()
- [$config](/core/breakpoint/#variable-config)
  


###  class() <Badge text="function" type="tip" vertical="top" />  {#function-class} 

  

Used to allow global prefixing of classes, and also the ability to 
Change a class used in the system (ie. like a component for example)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _selector.scss
- **Group:** selector
- **Type:** function
- **Lines (comments):** 55-57
- **Lines (code):** 59-70

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$class|`String`|The classname to set|

    

#### Require

- [get()](/core/breakpoint/#function-get)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"selector","id":"variable-config","uid":"selector-variable-config","title":"$config","groupPath":"/core/selector/","path":"/core/selector/#variable-config"},{"groupName":"selector","id":"mixin-set","uid":"selector-mixin-set","title":"set()","groupPath":"/core/selector/","path":"/core/selector/#mixin-set","previewsByIndex":{}},{"groupName":"selector","id":"function-get","uid":"selector-function-get","title":"get()","groupPath":"/core/selector/","path":"/core/selector/#function-get","previewsByIndex":{}},{"groupName":"selector","id":"mixin-set-class-overrides","uid":"selector-mixin-set-class-overrides","title":"set-class-overrides()","groupPath":"/core/selector/","path":"/core/selector/#mixin-set-class-overrides"},{"groupName":"selector","id":"function-class","uid":"selector-function-class","title":"class()","groupPath":"/core/selector/","path":"/core/selector/#function-class"}];
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
  
  