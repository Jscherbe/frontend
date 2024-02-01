---
title: Fill-context
sassdocGroupName: fill-context
outline: deep
---


# Fill-context


<div class="sassdoc-intro">
  
Setup images or videos to behave like background images (object-fit).
  
</div>
    








Use the parent selector '.fill-context' on the element that should be the 
frame for the child object (img,video).  Can be used within the grid with 
modifier (see in example below).
    
    

#### Examples

      


``` html
<div class="fill-context">
  <img class="fill-context__object" src="background.jpg">
</div>
 
 
<div class="fill-context fill-context--auto">
  <img src="background.jpg">
</div>
 
<div data-grid-item="width: 6" class="fill-context fill-context--in-grid fill-context--contain">
  <img src="background.jpg">
</div>
```
  


##### Preview


<SassdocPreview uid="fill-context-content-content-block-id-1" :exampleIndex="0" />
  

  

      
  

## Mixins




###  styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-styles} 

  

Prints fill context styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _fill-context.scss
- **Group:** fill-context
- **Type:** mixin
- **Lines (comments):** 30-32
- **Lines (code):** 34-64

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include ulu.component-fill-context-styles();
```
  



      
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"fill-context","id":"content-content-block-id-1","uid":"fill-context-content-content-block-id-1","title":"content-block-id-1","groupPath":"/scss/components/fill-context/","path":"/scss/components/fill-context/#content-content-block-id-1","previewsByIndex":{"0":"<div class=\"fill-context\">\n  <img class=\"fill-context__object\" src=\"background.jpg\">\n</div>\n \n \n<div class=\"fill-context fill-context--auto\">\n  <img src=\"background.jpg\">\n</div>\n \n<div data-grid-item=\"width: 6\" class=\"fill-context fill-context--in-grid fill-context--contain\">\n  <img src=\"background.jpg\">\n</div>"}},{"groupName":"fill-context","id":"mixin-styles","uid":"fill-context-mixin-styles","title":"styles()","groupPath":"/scss/components/fill-context/","path":"/scss/components/fill-context/#mixin-styles","previewsByIndex":{}}];
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
  
  