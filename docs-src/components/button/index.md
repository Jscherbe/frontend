---
title: Button
sassdocGroupName: button
outline: deep
---


# Button





## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 16-18
- **Lines (code):** 20-22

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes
  @include module-name.set(( "property" : value ));|

    

#### Require

- $config
  


###  styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-styles} 

  

Prints button component styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
- **Type:** mixin
- **Lines (comments):** 32-36
- **Lines (code):** 38-95

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include ulu.component-button-styles();
```
  



      

      


``` html
<a class="button" href="#">Button Default</a>
```
  


##### Preview


<SassdocPreview uid="button-mixin-styles" :exampleIndex="1" />
  

  

      

#### Require

- [get()](/components/button/#function-get)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _button.scss
- **Group:** button
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

- $config
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"button","id":"mixin-set","uid":"button-mixin-set","title":"set()","groupPath":"/components/button/","path":"/components/button/#mixin-set"},{"groupName":"button","id":"function-get","uid":"button-function-get","title":"get()","groupPath":"/components/button/","path":"/components/button/#function-get"},{"groupName":"button","id":"mixin-styles","uid":"button-mixin-styles","title":"styles()","groupPath":"/components/button/","path":"/components/button/#mixin-styles","previewsByIndex":{"1":"<a class=\"button\" href=\"#\">Button Default</a>"}}];
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
  
  