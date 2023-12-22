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
(
  "max-width":         90rem,
  "margin":            2rem,
  "z-index-sticky":    100,
  "z-index-above":     450,
  "z-index-fixed":     1000
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** variable
- **Lines (comments):** 12-18
- **Lines (code):** 20-26

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.max-width|Number|Common max-width for site|
|$config.margin|Number|Common margin for site|
|$config.z-index-fixed|Number|Common z-index, above everything|
|$config.z-index-sticky|Number|Common z-index for sticky or stuck items|
|$config.z-index-above|Number|Common z-index, below sticky|

    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 28-30
- **Lines (code):** 31-33

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/core/breakpoint/#variable-config)
  


###  match-container-padding() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-match-container-padding} 

  

Returns padding to another property including breakpoints
ie. { top: $containers-padding; }
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 67-68
- **Lines (code):** 69-81

</SassdocDetails>
    
    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  match-container-margin() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-match-container-margin} 

  

For a given property for every breakpoint in a given container
creates a css calc value that will match the containers side margin
The margin is created via empty space when the container hits the max-width
If passing inlude padding it would be the containers
side (x) + the padding. This accounts for the containers max-width to give an absoute value
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 83-87
- **Lines (code):** 88-103

</SassdocDetails>
    
    

#### Require

- [get()](/core/breakpoint/#function-get)
  


###  clearfix() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-clearfix} 

  

Prints clearfix styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 179-179
- **Lines (code):** 181-192

</SassdocDetails>
    
    


###  remove-scrollbar() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-remove-scrollbar} 

  

Removes scrollbar with CSS
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 194-194
- **Lines (code):** 195-201

</SassdocDetails>
    
    
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 35-37
- **Lines (code):** 39-41

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- require-map-get()
- [$config](/core/breakpoint/#variable-config)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"layout","id":"variable-config","uid":"layout-variable-config","title":"$config","groupPath":"/core/layout/","path":"/core/layout/#variable-config"},{"groupName":"layout","id":"mixin-set","uid":"layout-mixin-set","title":"set()","groupPath":"/core/layout/","path":"/core/layout/#mixin-set"},{"groupName":"layout","id":"function-get","uid":"layout-function-get","title":"get()","groupPath":"/core/layout/","path":"/core/layout/#function-get"},{"groupName":"layout","id":"mixin-match-container-padding","uid":"layout-mixin-match-container-padding","title":"match-container-padding()","groupPath":"/core/layout/","path":"/core/layout/#mixin-match-container-padding"},{"groupName":"layout","id":"mixin-match-container-margin","uid":"layout-mixin-match-container-margin","title":"match-container-margin()","groupPath":"/core/layout/","path":"/core/layout/#mixin-match-container-margin"},{"groupName":"layout","id":"mixin-clearfix","uid":"layout-mixin-clearfix","title":"clearfix()","groupPath":"/core/layout/","path":"/core/layout/#mixin-clearfix"},{"groupName":"layout","id":"mixin-remove-scrollbar","uid":"layout-mixin-remove-scrollbar","title":"remove-scrollbar()","groupPath":"/core/layout/","path":"/core/layout/#mixin-remove-scrollbar"}];
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
  
  