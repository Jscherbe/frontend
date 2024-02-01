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

    


###  $containers <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-containers} 

  

Containers Lookup (use set-containers)
    
    

``` scss
(
  "container" : (
    "width" : 100%,
    "max-width" : get("max-width"),
    "padding" : (get("margin") get("margin")),
    "breakpoints" : null,
    "responsive" : false,
    "responsive-amount" : 3vw
  )
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** variable
- **Lines (comments):** 28-29
- **Lines (code):** 31-40

</SassdocDetails>
    
    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 42-44
- **Lines (code):** 46-48

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/scss/core/breakpoint/#variable-config)
  


###  set-containers() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set-containers} 

  

Set layout containers
- See the $containers variable for example of container properties
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 57-60
- **Lines (code):** 62-64

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|
|$merge-mode|`String`|Merge mode see utils.map-merge() [null|"deep"|"overwrite"]|

    

#### Require

- map-merge()
- [$containers](/scss/core/layout/#variable-containers)
  


###  match-container-padding() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-match-container-padding} 

  

Returns padding to another property including breakpoints
ie. \{ top: $containers-padding; }
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 80-84
- **Lines (code):** 86-98

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$property|`String`|Property name to apply the padding value to||
|$name|`String`|The container name||
|$sides|`Boolean`|Match the container padding for the sides (left/right), false will match the containers end padding (top/bottom)|true|

    

#### Require

- [get-container()](/scss/core/layout/#function-get-container)
- [get()](/scss/core/breakpoint/#function-get)
- [get-container-padding()](/scss/core/layout/#function-get-container-padding)
  


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
- **Lines (comments):** 100-107
- **Lines (code):** 109-124

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$property|`String`|Property name to apply the margin value to||
|$name|`String`|The container name||
|$include-padding|`Boolean`|Include the containers padding in the margin calculation|true|

    

#### Require

- [get-container()](/scss/core/layout/#function-get-container)
- [get()](/scss/core/breakpoint/#function-get)
- [get-container-padding()](/scss/core/layout/#function-get-container-padding)
  


###  container-padding() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-container-padding} 

  

Print the containers padding properties
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 142-145
- **Lines (code):** 147-173

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|The container name||
|$sides|`Boolean`|Sides by default, false is ends|true|
|$specific-breakpoint|`Boolean`|Only for a specific breakpoint|false|

    

#### Require

- [get-container()](/scss/core/layout/#function-get-container)
- [get()](/scss/core/breakpoint/#function-get)
- [get-container-padding-x()](/scss/core/layout/#function-get-container-padding-x)
- [get-container-padding-y()](/scss/core/layout/#function-get-container-padding-y)
  


###  container-styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-container-styles} 

  

Print all container styles for a given container
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 191-193
- **Lines (code):** 195-223

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Container name|
|$specific-breakpoint|`Boolean`|Only for a specific breakpoint (else includes both the base styles and breakpoint styles)|

    

#### Require

- [container-padding()](/scss/core/layout/#mixin-container-padding)
- [get-container()](/scss/core/layout/#function-get-container)
- [get()](/scss/core/breakpoint/#function-get)
  


###  clearfix() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-clearfix} 

  

Prints clearfix styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 225-225
- **Lines (code):** 227-238

</SassdocDetails>
    
    


###  remove-scrollbar() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-remove-scrollbar} 

  

Removes scrollbar with CSS
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** mixin
- **Lines (comments):** 240-240
- **Lines (code):** 241-247

</SassdocDetails>
    
    
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 50-52
- **Lines (code):** 53-55

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- require-map-get()
- [$config](/scss/core/breakpoint/#variable-config)
  


###  get-container() <Badge text="function" type="tip" vertical="top" />  {#function-get-container} 

  

Get a container map
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 66-68
- **Lines (code):** 70-78

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Container name|
|$breakpoint|`String`|Return only the properties for a specific breakpoint for the container|

    

#### Require

- require-map-get()
- [get()](/scss/core/breakpoint/#function-get)
- [$containers](/scss/core/layout/#variable-containers)
  


###  get-container-padding() <Badge text="function" type="tip" vertical="top" />  {#function-get-container-padding} 

  

Get a containers padding value
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 126-129
- **Lines (code):** 131-140

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|Container name||
|$sides|`Boolean`|Get the left/right value, false return top/bottom|true|
|$specific-breakpoint|`String`|Get the value for a specific breakpoint|false|

    

#### Require

- [get-container()](/scss/core/layout/#function-get-container)
- [get()](/scss/core/breakpoint/#function-get)
  


###  get-container-padding-x() <Badge text="function" type="tip" vertical="top" />  {#function-get-container-padding-x} 

  

Get containers padding X value (side)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 175-177
- **Lines (code):** 179-181

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Container name|
|$specific-breakpoint|`Boolean`|For a specific breakpoint|

    

#### Require

- [get-container-padding()](/scss/core/layout/#function-get-container-padding)
  


###  get-container-padding-y() <Badge text="function" type="tip" vertical="top" />  {#function-get-container-padding-y} 

  

Get containers padding Y value (ends)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _layout.scss
- **Group:** layout
- **Type:** function
- **Lines (comments):** 183-185
- **Lines (code):** 187-189

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Container name|
|$specific-breakpoint|`Boolean`|For a specific breakpoint|

    

#### Require

- [get-container-padding()](/scss/core/layout/#function-get-container-padding)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"layout","id":"variable-config","uid":"layout-variable-config","title":"$config","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#variable-config"},{"groupName":"layout","id":"variable-containers","uid":"layout-variable-containers","title":"$containers","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#variable-containers"},{"groupName":"layout","id":"mixin-set","uid":"layout-mixin-set","title":"set()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#mixin-set"},{"groupName":"layout","id":"function-get","uid":"layout-function-get","title":"get()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#function-get"},{"groupName":"layout","id":"mixin-set-containers","uid":"layout-mixin-set-containers","title":"set-containers()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#mixin-set-containers"},{"groupName":"layout","id":"function-get-container","uid":"layout-function-get-container","title":"get-container()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#function-get-container"},{"groupName":"layout","id":"mixin-match-container-padding","uid":"layout-mixin-match-container-padding","title":"match-container-padding()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#mixin-match-container-padding"},{"groupName":"layout","id":"mixin-match-container-margin","uid":"layout-mixin-match-container-margin","title":"match-container-margin()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#mixin-match-container-margin"},{"groupName":"layout","id":"function-get-container-padding","uid":"layout-function-get-container-padding","title":"get-container-padding()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#function-get-container-padding"},{"groupName":"layout","id":"mixin-container-padding","uid":"layout-mixin-container-padding","title":"container-padding()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#mixin-container-padding"},{"groupName":"layout","id":"function-get-container-padding-x","uid":"layout-function-get-container-padding-x","title":"get-container-padding-x()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#function-get-container-padding-x"},{"groupName":"layout","id":"function-get-container-padding-y","uid":"layout-function-get-container-padding-y","title":"get-container-padding-y()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#function-get-container-padding-y"},{"groupName":"layout","id":"mixin-container-styles","uid":"layout-mixin-container-styles","title":"container-styles()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#mixin-container-styles"},{"groupName":"layout","id":"mixin-clearfix","uid":"layout-mixin-clearfix","title":"clearfix()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#mixin-clearfix"},{"groupName":"layout","id":"mixin-remove-scrollbar","uid":"layout-mixin-remove-scrollbar","title":"remove-scrollbar()","groupPath":"/scss/core/layout/","path":"/scss/core/layout/#mixin-remove-scrollbar"}];
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
  
  