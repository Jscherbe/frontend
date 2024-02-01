---
title: Badge
sassdocGroupName: badge
outline: deep
---


# Badge





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    

``` scss
$config: (
  "font-size":           1.3rem,
  "border-radius":       50%,
  "width":               10rem,
  "font-weight":         bold,
  "background-color":    gray,
  "color":               black,
  "sizes" : (
    "large" : (
      "font-size" : 2.75rem,
      "width" :  6rem
    )
  )
);
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _badge.scss
- **Group:** badge
- **Type:** variable
- **Lines (comments):** 9-17
- **Lines (code):** 19-32

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.font-size|Number|Font size (basic ie. 1.3rem) for badge|
|$config.border-radius|Number|Border radius of badge|
|$config.width|Number|Width of badge (default size)|
|$config.font-weight|Number|Font weight|
|$config.background-color|Number|Background color (if no image)|
|$config.color|Number|Type color|
|$config.sizes|List|List of other sizes (large by defualt), each size is a map of (width, font-size)|

    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _badge.scss
- **Group:** badge
- **Type:** mixin
- **Lines (comments):** 34-36
- **Lines (code):** 38-40

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/scss/components/badge/#variable-config)
  


###  styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-styles} 

  

Prints badge component styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _badge.scss
- **Group:** badge
- **Type:** mixin
- **Lines (comments):** 50-64
- **Lines (code):** 66-126

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include ulu.component-badge-styles();
```
  



      

      


``` html
<div class="badge">
  <div class="badge__inner">
    <img src="..." alt="...">
  </div>
</div>

<div class="badge">
  <div class="badge__inner">
    <span>JS</span>
  </div>
</div>
```
  


##### Preview


<SassdocPreview uid="badge-mixin-styles" :exampleIndex="1" />
  

  

      

#### Require

- [get()](/scss/components/badge/#function-get)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _badge.scss
- **Group:** badge
- **Type:** function
- **Lines (comments):** 42-44
- **Lines (code):** 46-48

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- [$config](/scss/components/badge/#variable-config)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"badge","id":"variable-config","uid":"badge-variable-config","title":"$config","groupPath":"/scss/components/badge/","path":"/scss/components/badge/#variable-config"},{"groupName":"badge","id":"mixin-set","uid":"badge-mixin-set","title":"set()","groupPath":"/scss/components/badge/","path":"/scss/components/badge/#mixin-set"},{"groupName":"badge","id":"function-get","uid":"badge-function-get","title":"get()","groupPath":"/scss/components/badge/","path":"/scss/components/badge/#function-get"},{"groupName":"badge","id":"mixin-styles","uid":"badge-mixin-styles","title":"styles()","groupPath":"/scss/components/badge/","path":"/scss/components/badge/#mixin-styles","previewsByIndex":{"1":"<div class=\"badge\">\n  <div class=\"badge__inner\">\n    <img src=\"...\" alt=\"...\">\n  </div>\n</div>\n\n<div class=\"badge\">\n  <div class=\"badge__inner\">\n    <span>JS</span>\n  </div>\n</div>"}}];
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
  
  