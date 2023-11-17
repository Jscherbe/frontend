---
title: Breakpoint
sassdocGroupName: breakpoint
outline: deep
---


# Breakpoint





## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** variable
- **Lines (comments):** 9-14
- **Lines (code):** 16-21

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Default|Description|
|:--|:--|:--|:--|
|base|Number|16px|Assumed pixel base, can change based on users font settings so this is just o get us in the ballpark). Note this is not the base font size but the user agent's or user's browser preferernce. This number is just being used for calculating estimated em sizes from average base. Since pixels are easier to understand but since we allow the user to set their font size. All of our css is relative to that, including most of the layout (rems, other relative units)|
|gap|Number|0.01em|The amount to offset min from max media queries incase you are using both (ie prevent overlap)|
|null-name|String|"none"|The name of the space from 0 to the first breakpoint (doesn't really matter) used when passing breakpoints to JS via content property|
|default|String|"small"|The name of the breakpont that is considered the major change (ie desktop to mobile) used by other modules/components|

    


###  $sizes <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-sizes} 

  

The default breakpoint sizes (targets are not precise, using em's)
- Map of breakpoints
- Each property is the breakpoints name
- Each value is that breakpoints point (set in em)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** variable
- **Lines (comments):** 43-47
- **Lines (code):** 49-53

</SassdocDetails>
    
    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 23-26
- **Lines (code):** 28-30

</SassdocDetails>
    
    

#### Examples

Change default name      


``` scss
@include breakpoint.set(( "default" : "mini" ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/core/breakpoint/#variable-config)
  


###  set-sizes() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set-sizes} 

  

Update the breakpoint sizes map
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 55-63
- **Lines (code):** 65-67

</SassdocDetails>
    
    

#### Examples

Changing the medium breakpoint and adding jumbo      


``` scss
@include breakpoints.set((
  "medium" : 50em,
  "jumbo" : 100em
));
```
  



      

#### Parameters


|Name|Type|Description|Default|
|:--|:--|:--|:--|
|$changes|`Map`|A map to merge into the breakpoints map||
|$deep|`Map`|Deep map merge (doesn't apply here)|false|
|$overwrite|`Map`|Overwrite the sizes, instead of merging changes|false|

    

#### Require

- map-merge-or-overwrite()
- [$sizes](/core/breakpoint/#variable-sizes)
  


###  min() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-min} 

  

Create a media query that matches the min-width for a given size
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 91-100
- **Lines (code):** 102-108

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include breakpoints.min("small") {
  // Your styles
}
```
  



      

      


``` css
@media screen and (min-width: 42.5em) {
   // Your Styles
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`String`|The name of the breakpoint size|

    

#### Require

- [get-size()](/core/breakpoint/#function-get-size)
  


###  max() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-max} 

  

Create a media query that matches the max-width for a given size
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 110-119
- **Lines (code):** 121-127

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include breakpoints.max("medium") {
  // Your styles
}
```
  



      

      


``` css
@media screen and (max-width: 42.4em) {
   // Your Styles
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`Number`|The name of the breakpoint size|

    

#### Require

- [get-size()](/core/breakpoint/#function-get-size)
- [get()](/core/breakpoint/#function-get)
  


###  min-max() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-min-max} 

  

Create a media query that matches between two breakpoint sizes
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 129-139
- **Lines (code):** 141-148

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include breakpoints.min-max("small", "medium") {
  // Your styles
}
```
  



      

      


``` css
@media screen and (min-width: 42.5) and (max-width: 75em) {
   // Your Styles
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size-min|`String`|The name of the smallest breakpoint size|
|$size-max|`String`|The name of the largest breakpoint size|

    

#### Require

- [get-size()](/core/breakpoint/#function-get-size)
  


###  from() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-from} 

  

Create a media query from a specific size in either direction 
- This is for mostly programmatic usage, so that a user could pass a breakpoint confiuration in either direction
- This way you don't need to repeat conditions (ie if min ... else ...)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 150-160
- **Lines (code):** 162-174

</SassdocDetails>
    
    

#### Examples

      


``` scss
$size: map.get($user-breakpoint, "size");
$dir: map.get($user-breakpoint, "direction");
@include breakpoints.from($size, $dir) {
  // Your styles
}
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|The name of the breakpoint size|
|$direction|`String`|The direction the media query should target (min|up, max|down)|

    

#### Throw

- ULU: Mixin error (breakpoint.from), incorrect argument 
    

#### Require

- [min()](/core/breakpoint/#mixin-min)
- [max()](/core/breakpoint/#mixin-max)
  


###  embed-for-scripts() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-embed-for-scripts} 

  

Attaches breakpoints to an element psuedo content for access via script
- Note you can also use cssvar.declare-breakpoints to get a similiar implementation with css custom-properties
- Use with ulu/js/breakpoints. Breakpoints always min-width (upwards) for javascript setup
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** mixin
- **Lines (comments):** 176-178
- **Lines (code):** 180-190

</SassdocDetails>
    
    

#### Require

- [min()](/core/breakpoint/#mixin-min)
- [get()](/core/breakpoint/#function-get)
- [$sizes](/core/breakpoint/#variable-sizes)
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 32-36
- **Lines (code):** 38-40

</SassdocDetails>
    
    

#### Examples

Get default breakpoint name      


``` scss
$default: breakpoint.get("default");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Returns


|Type|Description|
|:--|:--|
|*|Property Value|

    

#### Require

- require-map-get()
- [$config](/core/breakpoint/#variable-config)
  


###  get-sizes() <Badge text="function" type="tip" vertical="top" />  {#function-get-sizes} 

  

Get all breakpoint sizes (ie. $sizes) 
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 69-69
- **Lines (code):** 70-72

</SassdocDetails>
    
    

#### Require

- [$sizes](/core/breakpoint/#variable-sizes)
  


###  get-size() <Badge text="function" type="tip" vertical="top" />  {#function-get-size} 

  

Geta a specific size
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 74-76
- **Lines (code):** 77-80

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$size|`String`|The name of the size to get|

    

#### Returns


|Type|Description|
|:--|:--|
|Number|The sizes value|

    

#### Require

- require-map-get()
- [$sizes](/core/breakpoint/#variable-sizes)
  


###  exists() <Badge text="function" type="tip" vertical="top" />  {#function-exists} 

  

Check if a specific size exist
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _breakpoint.scss
- **Group:** breakpoint
- **Type:** function
- **Lines (comments):** 82-84
- **Lines (code):** 86-89

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|The breakpoint size to check if exists|

    

#### Returns


|Type|
|:--|
|Boolean|

    

#### Require

- [get()](/core/breakpoint/#function-get)
- [$sizes](/core/breakpoint/#variable-sizes)
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"breakpoint","id":"variable-config","uid":"breakpoint-variable-config","title":"$config","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#variable-config"},{"groupName":"breakpoint","id":"mixin-set","uid":"breakpoint-mixin-set","title":"set()","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#mixin-set","previewsByIndex":{}},{"groupName":"breakpoint","id":"function-get","uid":"breakpoint-function-get","title":"get()","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#function-get","previewsByIndex":{}},{"groupName":"breakpoint","id":"variable-sizes","uid":"breakpoint-variable-sizes","title":"$sizes","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#variable-sizes"},{"groupName":"breakpoint","id":"mixin-set-sizes","uid":"breakpoint-mixin-set-sizes","title":"set-sizes()","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#mixin-set-sizes","previewsByIndex":{}},{"groupName":"breakpoint","id":"function-get-sizes","uid":"breakpoint-function-get-sizes","title":"get-sizes()","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#function-get-sizes"},{"groupName":"breakpoint","id":"function-get-size","uid":"breakpoint-function-get-size","title":"get-size()","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#function-get-size"},{"groupName":"breakpoint","id":"function-exists","uid":"breakpoint-function-exists","title":"exists()","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#function-exists"},{"groupName":"breakpoint","id":"mixin-min","uid":"breakpoint-mixin-min","title":"min()","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#mixin-min","previewsByIndex":{}},{"groupName":"breakpoint","id":"mixin-max","uid":"breakpoint-mixin-max","title":"max()","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#mixin-max","previewsByIndex":{}},{"groupName":"breakpoint","id":"mixin-min-max","uid":"breakpoint-mixin-min-max","title":"min-max()","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#mixin-min-max","previewsByIndex":{}},{"groupName":"breakpoint","id":"mixin-from","uid":"breakpoint-mixin-from","title":"from()","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#mixin-from","previewsByIndex":{}},{"groupName":"breakpoint","id":"mixin-embed-for-scripts","uid":"breakpoint-mixin-embed-for-scripts","title":"embed-for-scripts()","groupPath":"/core/breakpoint/","path":"/core/breakpoint/#mixin-embed-for-scripts"}];
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
  
  