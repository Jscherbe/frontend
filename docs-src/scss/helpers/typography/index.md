---
title: Typography
sassdocGroupName: typography
outline: deep
---


# Typography





## Mixins




###  styles() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-styles} 

  

Prints Typography Helper styles
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _typography.scss
- **Group:** typography
- **Type:** mixin
- **Lines (comments):** 10-20
- **Lines (code):** 22-80

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include ulu.helper-typography-styles();
```
  



      

Example of type size as helper prefixed      


``` html
<span class="type-large-xxx">A</span>
<span class="type-large-xx">A</span>
<span class="type-large-x">A</span>
<span class="type-large">A</span>
<span class="type-base">A</span>
<span class="type-small">A</span>
<span class="type-small-x">A</span>
```
  


##### Preview


<SassdocPreview uid="typography-mixin-styles" :exampleIndex="1" />
  

  

      

#### Require

- get()
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"typography","id":"mixin-styles","uid":"typography-mixin-styles","title":"styles()","groupPath":"/scss/helpers/typography/","path":"/scss/helpers/typography/#mixin-styles","previewsByIndex":{"1":"<span class=\"type-large-xxx\">A</span>\n<span class=\"type-large-xx\">A</span>\n<span class=\"type-large-x\">A</span>\n<span class=\"type-large\">A</span>\n<span class=\"type-base\">A</span>\n<span class=\"type-small\">A</span>\n<span class=\"type-small-x\">A</span>"}}];
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
  
  