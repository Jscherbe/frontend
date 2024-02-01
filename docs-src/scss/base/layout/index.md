---
title: Layout
sassdocGroupName: layout
outline: deep
---


# Layout





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    

``` scss
$config: (
  "containers" : true,
  "container-nested-no-padding" : false,
  "layout-flex" : true,
);
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** variable
- **Lines (comments):** 10-12
- **Lines (code):** 14-18

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.sides|Number|Sides to print for helper classes (ie. reduce output of uneeded sides)|

    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 20-23
- **Lines (code):** 24-26

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

- [$config](/scss/base/elements/#variable-config)
  


###  styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-styles} 

  

Output Styles 
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 37-37
- **Lines (code):** 39-100

</SassdocDetails>
    
    

#### Require

- [get()](/scss/base/elements/#function-get)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 28-31
- **Lines (code):** 33-35

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

- [$config](/scss/base/elements/#variable-config)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"layout","id":"variable-config","uid":"layout-variable-config","title":"$config","groupPath":"/scss/base/layout/","path":"/scss/base/layout/#variable-config"},{"groupName":"layout","id":"mixin-set","uid":"layout-mixin-set","title":"set()","groupPath":"/scss/base/layout/","path":"/scss/base/layout/#mixin-set","previewsByIndex":{}},{"groupName":"layout","id":"function-get","uid":"layout-function-get","title":"get()","groupPath":"/scss/base/layout/","path":"/scss/base/layout/#function-get","previewsByIndex":{}},{"groupName":"layout","id":"mixin-styles","uid":"layout-mixin-styles","title":"styles()","groupPath":"/scss/base/layout/","path":"/scss/base/layout/#mixin-styles"}];
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
  
  