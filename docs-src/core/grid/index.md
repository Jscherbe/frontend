---
title: Grid
sassdocGroupName: grid
outline: deep
---


# Grid


<div class="sassdoc-intro">
  
Layout grid that uses attributes instead of classes
- See the core layout module for changing defaults
  
</div>
    



## Variables




###  $config <Badge text="variable" type="tip" vertical="top" /><Badge text="Map" type="warning" vertical="top" />  {#variable-config} 

  

Module Settings
    
    

``` scss
(
  "columns":            12,
  "attribute":          "data-grid",
  "attribute-container" : "data-grid-container",
  "gutter":             14px,
  "breakpoint" :        false, // Fallback to default
  "extra-breakpoints" : (
    "medium" : (
      "breakpoint" : "medium",
      "gutter" : 15px
    ),
    "large" : (
      "breakpoint" : "large",
      "gutter" : 20px
    )
  ),
  "position-class-column-first": "position-column-first",
  "position-class-column-last":  "position-column-last",
  "position-class-row-first":    "position-row-first",
  "position-class-row-last":     "position-row-last"
)
```
  


<SassdocDetails summaryText="Meta Information">

- **File:** _grid.scss
- **Group:** grid
- **Type:** variable
- **Lines (comments):** 32-41
- **Lines (code):** 43-63

</SassdocDetails>
    
    

#### Map Properties


|Name|Type|Description|
|:--|:--|:--|
|$config.columns|Number|Default for grid mixin|
|$config.attribute|String|Default attribute to use for grid mixin|
|$config.gutter|Number|Default gutter for grid mixin|
|$config.extra-breakpoints|Map|Default extra breakpoints for grid mixin|
|$config.position-class-column-first|MaStringp|Classname for position system (JS) grid uses to display rules (layout can flow, script will update classes)|
|$config.position-class-column-last|String|See definition above|
|$config.position-class-row-first|String|See definition above|
|$config.position-class-row-last|String|See definition above|

    
  

## Mixins




###  set() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-set} 

  

Change modules $config
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _grid.scss
- **Group:** grid
- **Type:** mixin
- **Lines (comments):** 65-68
- **Lines (code):** 70-72

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include module-name.set(( "property" : value ));
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$changes|`Map`|Map of changes|

    

#### Require

- [$config](/core/breakpoint/#variable-config)
  


###  create() <Badge text="mixin" type="tip" vertical="top" />  {#mixin-create} 

  

Creates grid css (variation of original data-grid)
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _grid.scss
- **Group:** grid
- **Type:** mixin
- **Lines (comments):** 107-116
- **Lines (code):** 118-551

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$columns|`Number`|Columns in grid|
|$breakpoint|`Number`|Breakpoint key for starting the grid|
|$extra-breakpoints|`Map`|Map with other breakpoints to add (map of breakpoint and gutter see config.extra-breakpoints for an example (smalles to largest)|
|$gutter|`Number`|Size in pixels for the gutters|
|$include-rules|`Boolean`|Print styles for including rules|
|$rule-size|`Number`|Size of the rule (border/seperator)|
|$extra-rule-styles|`Map`|Map of other rule styles to add (map of maps of size, and color), key is the styles name ("name": ("size" : 4px, "color" : "color name" || color))|
|$extra-gutter-scales|`String`|A map of gutter scales used like `data-grid="gutter-scale: large`, configuration map property becomes scale name and value is the amount (multiplier) to apply to the grid's gutter ie `( "large" : 2.25 )`|
|$attribute|`Map`|Attribute to use for selecting grid and children. Children attribute get's "-item" as a suffix ("ie. data-grid, data-grid-item")|

    

#### Require

- [get()](/core/breakpoint/#function-get)
- require-map-get()
  
  

## Functions




###  get() <Badge text="function" type="tip" vertical="top" />  {#function-get} 

  

Get a config option
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _grid.scss
- **Group:** grid
- **Type:** function
- **Lines (comments):** 74-77
- **Lines (code):** 79-81

</SassdocDetails>
    
    

#### Examples

      


``` scss
@include module-name.get("property");
```
  



      

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`Map`|Name of property|

    

#### Require

- require-map-get()
- [$config](/core/breakpoint/#variable-config)
  


###  get-gutter() <Badge text="function" type="tip" vertical="top" />  {#function-get-gutter} 

  

Returns gutter size for grid breakpoint map, defaults to the config's values
Pass custom map to get gutter values from it
    
    


<SassdocDetails summaryText="Meta Information">

- **File:** _grid.scss
- **Group:** grid
- **Type:** function
- **Lines (comments):** 83-86
- **Lines (code):** 88-96

</SassdocDetails>
    
    

#### Parameters


|Name|Type|Description|
|:--|:--|:--|
|$name|`String`|The name of the "grid breakpoint" (could be a different name than the actual breakpoint name it maps too)|
|$custom-map|`Map`|Provide custom map of grid breakpoints to get the gutter from (defaults to the grid module's defaults 'extra-breakpoints')|

    

#### Require

- [get()](/core/breakpoint/#function-get)
- require-map-get()
  
  


<script>

  import SassdocPreview from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocPreview.vue";
  import SassdocDetails from "@ulu/vitepress-sassdoc/lib/assets/components/SassdocDetails.vue";
  const sassdocGroup = [{"groupName":"grid","id":"variable-config","uid":"grid-variable-config","title":"$config","groupPath":"/core/grid/","path":"/core/grid/#variable-config"},{"groupName":"grid","id":"mixin-set","uid":"grid-mixin-set","title":"set()","groupPath":"/core/grid/","path":"/core/grid/#mixin-set","previewsByIndex":{}},{"groupName":"grid","id":"function-get","uid":"grid-function-get","title":"get()","groupPath":"/core/grid/","path":"/core/grid/#function-get","previewsByIndex":{}},{"groupName":"grid","id":"function-get-gutter","uid":"grid-function-get-gutter","title":"get-gutter()","groupPath":"/core/grid/","path":"/core/grid/#function-get-gutter"},{"groupName":"grid","id":"mixin-create","uid":"grid-mixin-create","title":"create()","groupPath":"/core/grid/","path":"/core/grid/#mixin-create"}];
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
  
  