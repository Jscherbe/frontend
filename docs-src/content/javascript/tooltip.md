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
        * [~accessible](#module_tooltip..accessible) : <code>Boolean</code>
        * [~content](#module_tooltip..content) : <code>String</code>
        * [~fromElement](#module_tooltip..fromElement) : <code>String</code> \| <code>Node</code>
        * [~fromAnchor](#module_tooltip..fromAnchor)
        * [~endOfDocument](#module_tooltip..endOfDocument) : <code>Boolean</code>
        * [~showEvents](#module_tooltip..showEvents) : <code>Array.&lt;String&gt;</code>
        * [~hideEvents](#module_tooltip..hideEvents) : <code>Array.&lt;String&gt;</code>
        * [~delay](#module_tooltip..delay) : <code>Number</code>
        * [~template()](#module_tooltip..template)
        * [~onChange()](#module_tooltip..onChange) : <code>function</code>

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
<a name="module_tooltip..accessible"></a>

### tooltip~accessible : <code>Boolean</code>
Should the tooltip and content be linked accessibly
- Note tooltips can only apply to interactive elements! (ie button, input, role="...", etc)

**Kind**: inner property of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip..content"></a>

### tooltip~content : <code>String</code>
String/markup to insert into tooltip display

**Kind**: inner property of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip..fromElement"></a>

### tooltip~fromElement : <code>String</code> \| <code>Node</code>
Pull content from pre-existing content on page

**Kind**: inner property of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip..fromAnchor"></a>

### tooltip~fromAnchor
If used on a link that is an anchor link it will display the content of the anchor like fromElement

**Kind**: inner property of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip..endOfDocument"></a>

### tooltip~endOfDocument : <code>Boolean</code>
Move the content to the bottom of the document

**Kind**: inner property of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip..showEvents"></a>

### tooltip~showEvents : <code>Array.&lt;String&gt;</code>
Events to show tooltip on

**Kind**: inner property of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip..hideEvents"></a>

### tooltip~hideEvents : <code>Array.&lt;String&gt;</code>
Events to hide tooltip on

**Kind**: inner property of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip..delay"></a>

### tooltip~delay : <code>Number</code>
Delay when using the directive

**Kind**: inner property of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip..template"></a>

### tooltip~template()
Template for the content display

**Kind**: inner method of [<code>tooltip</code>](#module_tooltip)  
<a name="module_tooltip..onChange"></a>

### tooltip~onChange() : <code>function</code>
Callback when tooltip is shown or hidden

**Kind**: inner method of [<code>tooltip</code>](#module_tooltip)  

  