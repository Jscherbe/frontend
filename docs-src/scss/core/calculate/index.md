---
title: Calculate
sassdocGroupName: calculate
outline: deep
---


# Calculate





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    

``` scss
$config: (
  "responsive-change": 0.5vw
);
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _calculate.scss
- **Group:** calculate
- **Type:** variable
- **Lines (comments):** 9-11
- **Lines (code):** 13-15

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.responsive-change|Number|Default responsive amount to modify items using responsive-property mixin|

    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _calculate.scss
- **Group:** calculate
- **Type:** mixin
- **Lines (comments):** 17-19
- **Lines (code):** 20-22

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- [$config](/scss/core/breakpoint/#variable-config)
  


###  responsive-property() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-responsive-property} 

  

Provides user with a fallback for a calc that's just an enhancement
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _calculate.scss
- **Group:** calculate
- **Type:** mixin
- **Lines (comments):** 52-55
- **Lines (code):** 57-64

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$property|`String`|The CSS property to set|
|$value|`*`|The value to set on the property|
|$responsive-change|`Css`|The amount to change (vw or vh units) (combined with unit past)|

    
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _calculate.scss
- **Group:** calculate
- **Type:** function
- **Lines (comments):** 24-26
- **Lines (code):** 28-30

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property
  @include module-name.get("property");|

    

#### Require

- require-map-get()
- [$config](/scss/core/breakpoint/#variable-config)
  


###  ratio-scale-size() <Badge text="function" type="tip" vertical="top" />  {#function-ratio-scale-size} 

  

Calculate the size of something at a given scale (percentage/exponential)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _calculate.scss
- **Group:** calculate
- **Type:** function
- **Lines (comments):** 32-37
- **Lines (code):** 39-41

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$base|`Number`|The number the scale starts at|
|$ratio|`Number`|The amount the scale changes over one set|
|$sizes|`Number`|The number of steps in the scale|
|$size|`Number`|The step you are trying to calculate|

    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- [$sizes](/scss/core/breakpoint/#variable-sizes)
  


###  pixel-to-em() <Badge text="function" type="tip" vertical="top" />  {#function-pixel-to-em} 

  

Convert from pixel to em
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _calculate.scss
- **Group:** calculate
- **Type:** function
- **Lines (comments):** 43-46
- **Lines (code):** 48-50

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$pixels|`Number`|The number the scale starts at|
|$base|`Number`|How many pixels equal 1em|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|Em Conversion|

    
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"calculate","id":"variable-config","uid":"calculate-variable-config","title":"$config","groupPath":"/scss/core/calculate/","path":"/scss/core/calculate/#variable-config"},{"groupName":"calculate","id":"mixin-set","uid":"calculate-mixin-set","title":"set()","groupPath":"/scss/core/calculate/","path":"/scss/core/calculate/#mixin-set"},{"groupName":"calculate","id":"function-get","uid":"calculate-function-get","title":"get()","groupPath":"/scss/core/calculate/","path":"/scss/core/calculate/#function-get"},{"groupName":"calculate","id":"function-ratio-scale-size","uid":"calculate-function-ratio-scale-size","title":"ratio-scale-size()","groupPath":"/scss/core/calculate/","path":"/scss/core/calculate/#function-ratio-scale-size"},{"groupName":"calculate","id":"function-pixel-to-em","uid":"calculate-function-pixel-to-em","title":"pixel-to-em()","groupPath":"/scss/core/calculate/","path":"/scss/core/calculate/#function-pixel-to-em"},{"groupName":"calculate","id":"mixin-responsive-property","uid":"calculate-mixin-responsive-property","title":"responsive-property()","groupPath":"/scss/core/calculate/","path":"/scss/core/calculate/#mixin-responsive-property"}];
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
  
  