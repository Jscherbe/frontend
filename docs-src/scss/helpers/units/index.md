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
$config: (
  "sides": ("top", "bottom", "left", "right")
);
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _units.scss
- **Group:** units
- **Type:** variable
- **Lines (comments):** 11-13
- **Lines (code):** 15-17

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.sides|Number|Sides to print for helper classes (ie. reduce output of uneeded sides)|

    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _units.scss
- **Group:** units
- **Type:** mixin
- **Lines (comments):** 19-22
- **Lines (code):** 23-25

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

- [$config](/scss/helpers/units/#variable-config)
  


###  styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-styles} 

  

Prints all unit helper classes
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _units.scss
- **Group:** units
- **Type:** mixin
- **Lines (comments):** 36-36
- **Lines (code):** 38-42

</SassdocDetails>
    
    

#### Require

- [create-property-classes()](/scss/helpers/units/#mixin-create-property-classes)
  


###  create-property-classes() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-create-property-classes} 

  

Creates the unit classes with all variations (from unit presets)
- This can be used by itself if not outputing .styles() or if you wanted to change the default prefixes
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _units.scss
- **Group:** units
- **Type:** mixin
- **Lines (comments):** 44-45
- **Lines (code):** 46-75

</SassdocDetails>
    
    

#### Require

- [get()](/scss/helpers/units/#function-get)
- [$config](/scss/helpers/units/#variable-config)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _units.scss
- **Group:** units
- **Type:** function
- **Lines (comments):** 27-30
- **Lines (code):** 32-34

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

- [$config](/scss/helpers/units/#variable-config)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"units","id":"variable-config","uid":"units-variable-config","title":"$config","groupPath":"/scss/helpers/units/","path":"/scss/helpers/units/#variable-config"},{"groupName":"units","id":"mixin-set","uid":"units-mixin-set","title":"set()","groupPath":"/scss/helpers/units/","path":"/scss/helpers/units/#mixin-set","previewsByIndex":{}},{"groupName":"units","id":"function-get","uid":"units-function-get","title":"get()","groupPath":"/scss/helpers/units/","path":"/scss/helpers/units/#function-get","previewsByIndex":{}},{"groupName":"units","id":"mixin-styles","uid":"units-mixin-styles","title":"styles()","groupPath":"/scss/helpers/units/","path":"/scss/helpers/units/#mixin-styles"},{"groupName":"units","id":"mixin-create-property-classes","uid":"units-mixin-create-property-classes","title":"create-property-classes()","groupPath":"/scss/helpers/units/","path":"/scss/helpers/units/#mixin-create-property-classes"}];
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
  
  