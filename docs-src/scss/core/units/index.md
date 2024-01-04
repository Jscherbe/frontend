---
title: Units
sassdocGroupName: units
outline: deep
---


# Units





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    

``` scss
(
  "small-x" : 1rem * 0.5,
  "small" : 1rem * 0.75,
  "default" : 1rem,
  "large" : 1rem * 2,
  "large-x" : 1rem * 3,
  "large-xx" : 1rem * 4
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _units.scss
- **Group:** units
- **Type:** variable
- **Lines (comments):** 9-16
- **Lines (code):** 18-25

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|small-x|Number||
|small|Number||
|default|Number|Base unit of measurent|
|large|Number||
|large-x|Number||
|large-xx|Number||

    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Update the units config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _units.scss
- **Group:** units
- **Type:** mixin
- **Lines (comments):** 27-32
- **Lines (code):** 34-36

</SassdocDetails>
    
    

#### Examples

Setting the error and type color      


``` scss
@include units.set((
  "default" : 1.5em
));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|A map to merge into the color palette|

    

#### Require

- [$config](/core/breakpoint/#variable-config)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a unit by name (preset) or number (multiplier of base)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _units.scss
- **Group:** units
- **Type:** function
- **Lines (comments):** 38-40
- **Lines (code):** 42-47

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$value|`Number|String`|if a number is passed it is used as a multiplier of the base, if a string is passed it is used to lookup a value from unit presets @see $config|

    

#### Returns


|Type|
|:--|
|Number|

    

#### Require

- require-map-get()
- [$config](/core/breakpoint/#variable-config)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"units","id":"variable-config","uid":"units-variable-config","title":"$config","groupPath":"/core/units/","path":"/core/units/#variable-config"},{"groupName":"units","id":"mixin-set","uid":"units-mixin-set","title":"set()","groupPath":"/core/units/","path":"/core/units/#mixin-set","previewsByIndex":{}},{"groupName":"units","id":"function-get","uid":"units-function-get","title":"get()","groupPath":"/core/units/","path":"/core/units/#function-get"}];
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
  
  