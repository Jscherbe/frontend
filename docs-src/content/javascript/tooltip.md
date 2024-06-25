---
title: tooltip
---

<a name="module_tooltip"></a>

## tooltip

* [tooltip](#module_tooltip)
    * _static_
        * [.Tooltip](#module_tooltip.Tooltip)
            * [.defaults](#module_tooltip.Tooltip+defaults)
        * [.init()](#module_tooltip.init)
        * [.setup()](#module_tooltip.setup)
    * _inner_
        * [~content](#module_tooltip..content)
        * [~fromElement](#module_tooltip..fromElement)

<a name="module_tooltip.Tooltip"></a>

### tooltip.Tooltip
Tooltip
- Provides basic tooltip functionality
- Uses floating UI for positioning

**Kind**: static class of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip.Tooltip+defaults"></a>

#### tooltip.defaults
Defaults options

**Kind**: instance property of [<code>Tooltip</code>](#module_tooltip.Tooltip)  
<a name="module_tooltip.init"></a>

### tooltip.init()
Initialize default popover

**Kind**: static method of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip.setup"></a>

### tooltip.setup()
Query all popovers on current page and set them up
- Use this manually if needed
- Won't setup a popover more than once

**Kind**: static method of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip..content"></a>

### tooltip~content
String/markup to insert into tooltip display

**Kind**: inner property of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip..fromElement"></a>

### tooltip~fromElement
Pull content from pre-existing content on page

**Kind**: inner property of [<code>tooltip</code>](#module_tooltip)  

  