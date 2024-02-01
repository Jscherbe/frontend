---
title: Path
sassdocGroupName: path
outline: deep
---


# Path





## Variables




###  $aliases <Badge text="variable" type="tip" vertical="top" /><Badge text="Map
- Important: alias could be used for directory or file so omit trailing slash for directories
- All aliases must start with "#"" type="warning" vertical="top" />  {#variable-aliases} 

  

Aliases 
    
    

``` scss
$aliases: (
  "#Images" : "/images",
);
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _path.scss
- **Group:** path
- **Type:** variable
- **Lines (comments):** 9-12
- **Lines (code):** 14-16

</SassdocDetails>
    
    
  

## Mixins




###  set-aliases() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set-aliases} 

  

Set aliases or change defaults
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _path.scss
- **Group:** path
- **Type:** mixin
- **Lines (comments):** 18-19
- **Lines (code):** 21-23

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$aliases](/scss/core/path/#variable-aliases)
  
  

## Functions




###  get-alias() <Badge text="function" type="tip" vertical="top" />  {#function-get-alias} 

  

Get an aliase's path
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _path.scss
- **Group:** path
- **Type:** function
- **Lines (comments):** 25-26
- **Lines (code):** 28-30

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$Name|`String`|Name of alias|

    

#### Require

- require-map-get()
- [$aliases](/scss/core/path/#variable-aliases)
  


###  resolve() <Badge text="function" type="tip" vertical="top" />  {#function-resolve} 

  

Resolves a Path 
- Checks if path is an alias if so rewrite's it
- Future could include rewrites for easier updating or rearranging of legacy things
- Aliases work by starting with "#", Since it's an illegal uri character, needs to be escaped if used as literal, we felt that it was the safest way to mix aliases in with real URLs (so that a dev of a module using path.resolve can always pass paths through (user input unknown if alias)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _path.scss
- **Group:** path
- **Type:** function
- **Lines (comments):** 32-40
- **Lines (code):** 42-58

</SassdocDetails>
    
    

#### Examples

      


``` scss
.img {
  background-image: url(path.resolve("#Images/branding/logo"));
}
```
  



      

#### Require

- [get-alias()](/scss/core/path/#function-get-alias)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"path","id":"variable-aliases","uid":"path-variable-aliases","title":"$aliases","groupPath":"/scss/core/path/","path":"/scss/core/path/#variable-aliases"},{"groupName":"path","id":"mixin-set-aliases","uid":"path-mixin-set-aliases","title":"set-aliases()","groupPath":"/scss/core/path/","path":"/scss/core/path/#mixin-set-aliases"},{"groupName":"path","id":"function-get-alias","uid":"path-function-get-alias","title":"get-alias()","groupPath":"/scss/core/path/","path":"/scss/core/path/#function-get-alias"},{"groupName":"path","id":"function-resolve","uid":"path-function-resolve","title":"resolve()","groupPath":"/scss/core/path/","path":"/scss/core/path/#function-resolve","previewsByIndex":{}}];
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
  
  