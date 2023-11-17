---
title: Cssvar
sassdocGroupName: cssvar
outline: deep
---


# Cssvar


<div class="sassdoc-intro">
  
Provides support for custom-properties implementations
  
</div>
    



## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** variable
- **Lines (comments):** 12-14
- **Lines (code):** 16-18

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|prefix|String|""|Default prefix, will be added to all custom properties when using mixin or functions, unless overriden, set to empty quotes to disable|

    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 20-23
- **Lines (code):** 25-27

</SassdocDetails>
    
    

#### Examples

Setting the prefix to 'ulu'      


``` scss
@include cssvar.set(( "prefix" : "ulu" ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/core/breakpoint/#variable-config)
  


###  declare() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-declare} 

  

Outputs a single custom property declaration
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 67-74
- **Lines (code):** 76-78

</SassdocDetails>
    
    

#### Examples

Declare a custom property      


``` scss
:root {
  @include cssvar.declare("base-color", red);
}
```
  



      

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|Name of property||
|$value|`*`|The properties value to declare||
|$prefix|`String`|Override default prefix|$config.prefix|

    

#### Require

- [name()](/core/cssvar/#function-name)
  


###  declare-all() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-declare-all} 

  

Outputs a map as custom properties
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 80-86
- **Lines (code):** 88-92

</SassdocDetails>
    
    

#### Examples

Declare each property in a map as a custom property      


``` scss
:root {
  @include cssvar.declare($colors);
}
```
  



      

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$props|`Map`|Properties to declare||
|$prefix|`String`|Override default prefix|$config.prefix|

    

#### Require

- [declare()](/core/cssvar/#mixin-declare)
  


###  declare-breakpoint() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-declare-breakpoint} 

  

Declare a custom property for current breakpoint
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** mixin
- **Lines (comments):** 94-102
- **Lines (code):** 104-116

</SassdocDetails>
    
    

#### Examples

Declare each property in a map as a custom property      


``` scss
:root {
  @include cssvar.declare-breakpoint();
}
```
  



      

#### Parameters


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|$breakpoints|`Map`|breakpoint.get-sizes()|Breakpoints to declare|
|$name|`String`|"breakpoint"|Name to use for custom property|
|$initial|`Map`|breakpoint.get("null-name")|The value for the custom property when not within breakpoint|
|$prefix|`String`|$config.prefix|Override default prefix|

    

#### Require

- [declare()](/core/cssvar/#mixin-declare)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 29-33
- **Lines (code):** 35-37

</SassdocDetails>
    
    

#### Examples

Getting the config value for prefix      


``` scss
$prefix: cssvar.get("prefix");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|Name of property|

    

#### Returns


|Type|Description|
|:--|:--|
|*|Map property value|

    

#### Require

- require-map-get()
- [$config](/core/breakpoint/#variable-config)
  


###  name() <Badge text="function" type="tip" vertical="top" />  {#function-name} 

  

Get a custom property name (with optional prefix)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 39-44
- **Lines (code):** 46-52

</SassdocDetails>
    
    

#### Examples

Getting a custom property name      


``` scss
#{ cssvar.name("base-color") } { ... }
```
  



      

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|Name of custom property||
|$prefix|`String`|Override default prefix|$config.prefix|

    

#### Returns


|Type|Description|
|:--|:--|
|String|The formatted property name (unquoted string)|

    


###  use() <Badge text="function" type="tip" vertical="top" />  {#function-use} 

  

Function to use a custom property within a declartion value 
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _cssvar.scss
- **Group:** cssvar
- **Type:** function
- **Lines (comments):** 54-61
- **Lines (code):** 63-65

</SassdocDetails>
    
    

#### Examples

Print an custom property as a value      


``` scss
.test {
  color: cssvar.use("base-color");
}
```
  



      

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$name|`String`|Name of custom property||
|$prefix|`String`|Override default prefix|$config.prefix|

    

#### Returns


|Type|Description|
|:--|:--|
|String|Formatted custom propety for use in property value (ie. var(...))|

    

#### Require

- [name()](/core/cssvar/#function-name)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"cssvar","id":"variable-config","uid":"cssvar-variable-config","title":"$config","groupPath":"/core/cssvar/","path":"/core/cssvar/#variable-config"},{"groupName":"cssvar","id":"mixin-set","uid":"cssvar-mixin-set","title":"set()","groupPath":"/core/cssvar/","path":"/core/cssvar/#mixin-set","previewsByIndex":{}},{"groupName":"cssvar","id":"function-get","uid":"cssvar-function-get","title":"get()","groupPath":"/core/cssvar/","path":"/core/cssvar/#function-get","previewsByIndex":{}},{"groupName":"cssvar","id":"function-name","uid":"cssvar-function-name","title":"name()","groupPath":"/core/cssvar/","path":"/core/cssvar/#function-name","previewsByIndex":{}},{"groupName":"cssvar","id":"function-use","uid":"cssvar-function-use","title":"use()","groupPath":"/core/cssvar/","path":"/core/cssvar/#function-use","previewsByIndex":{}},{"groupName":"cssvar","id":"mixin-declare","uid":"cssvar-mixin-declare","title":"declare()","groupPath":"/core/cssvar/","path":"/core/cssvar/#mixin-declare","previewsByIndex":{}},{"groupName":"cssvar","id":"mixin-declare-all","uid":"cssvar-mixin-declare-all","title":"declare-all()","groupPath":"/core/cssvar/","path":"/core/cssvar/#mixin-declare-all","previewsByIndex":{}},{"groupName":"cssvar","id":"mixin-declare-breakpoint","uid":"cssvar-mixin-declare-breakpoint","title":"declare-breakpoint()","groupPath":"/core/cssvar/","path":"/core/cssvar/#mixin-declare-breakpoint","previewsByIndex":{}}];
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
          `%7B%22previewStyles%22%3A%22%5Cn%20%20%20%20height%3A%2020em%3B%5Cn%20%20%20%20width%3A%20100%25%3B%5Cn%20%20%20%20border%3A%20none%3B%5Cn%20%20%20%20background-color%3A%20%23f9f9f9%3B%5Cn%20%20%20%20border-radius%3A%206px%3B%5Cn%20%20%20%20padding%3A%2012px%3B%5Cn%20%20%20%20margin%3A%201.5em%200%3B%5Cn%20%20%22%2C%22previewHead%22%3A%22%5Cn%20%20%20%20%3Ctitle%3ESassdoc%20Example%3C%2Ftitle%3E%20%5Cn%20%20%20%20%3Cmeta%20charset%3D%5C%22utf-8%5C%22%3E%20%5Cn%20%20%20%20%3Cmeta%20name%3D%5C%22viewport%5C%22%20content%3D%5C%22width%3Ddevice-width%2C%20initial-scale%3D1%5C%22%3E%20%5Cn%20%20%20%20%3Clink%20rel%3D%5C%22stylesheet%5C%22%20href%3D%5C%22%2Fsassdoc-preview.css%5C%22%3E%5Cn%20%20%22%2C%22previewScripts%22%3A%22%5Cn%20%20%20%20%3Cscript%20src%3D%5C%22%2Fsassdoc-preview.js%5C%22%3E%3C%2Fscript%3E%5Cn%20%20%22%7D`
        )
      )
    }
  }

</script>  
  
  