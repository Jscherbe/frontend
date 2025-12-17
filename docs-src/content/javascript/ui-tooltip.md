---
title: ui/tooltip
---

<a name="module_ui/tooltip"></a>

# ui/tooltip

* [ui/tooltip](#module_ui/tooltip)
    * _static_
        * [.Tooltip](#module_ui/tooltip.Tooltip)
            * [.defaults](#module_ui/tooltip.Tooltip+defaults)
        * [.initializer](#module_ui/tooltip.initializer)
        * [.init()](#module_ui/tooltip.init)
    * _inner_
        * [~accessible](#module_ui/tooltip..accessible) : <code>Boolean</code>
        * [~content](#module_ui/tooltip..content) : <code>String</code>
        * [~fromElement](#module_ui/tooltip..fromElement) : <code>String</code> \| <code>Node</code>
        * [~fromAnchor](#module_ui/tooltip..fromAnchor)
        * [~endOfDocument](#module_ui/tooltip..endOfDocument) : <code>Boolean</code>
        * [~showEvents](#module_ui/tooltip..showEvents) : <code>Array.&lt;String&gt;</code>
        * [~hideEvents](#module_ui/tooltip..hideEvents) : <code>Array.&lt;String&gt;</code>
        * [~delay](#module_ui/tooltip..delay) : <code>Number</code>
        * [~template()](#module_ui/tooltip..template)
        * [~onChange()](#module_ui/tooltip..onChange) : <code>function</code>

<a name="module_ui/tooltip.Tooltip"></a>

## ui/tooltip.Tooltip
Tooltip
- Provides basic tooltip functionality
- Uses floating UI for positioning

**Kind**: static class of [<code>ui/tooltip</code>](#module_ui/tooltip)  
<a name="module_ui/tooltip.Tooltip+defaults"></a>

### tooltip.defaults
Defaults options

**Kind**: instance property of [<code>Tooltip</code>](#module_ui/tooltip.Tooltip)  
<a name="module_ui/tooltip.initializer"></a>

## ui/tooltip.initializer
Tooltip Component Initializer

**Kind**: static constant of [<code>ui/tooltip</code>](#module_ui/tooltip)  
<a name="module_ui/tooltip.init"></a>

## ui/tooltip.init()
Initialize default popover

**Kind**: static method of [<code>ui/tooltip</code>](#module_ui/tooltip)  
<a name="module_ui/tooltip..accessible"></a>

## ui/tooltip~accessible : <code>Boolean</code>
Should the tooltip and content be linked accessibly
- Note tooltips can only apply to interactive elements! (ie button, input, role="...", etc)

**Kind**: inner property of [<code>ui/tooltip</code>](#module_ui/tooltip)  
<a name="module_ui/tooltip..content"></a>

## ui/tooltip~content : <code>String</code>
String/markup to insert into tooltip display

**Kind**: inner property of [<code>ui/tooltip</code>](#module_ui/tooltip)  
<a name="module_ui/tooltip..fromElement"></a>

## ui/tooltip~fromElement : <code>String</code> \| <code>Node</code>
Pull content from pre-existing content on page

**Kind**: inner property of [<code>ui/tooltip</code>](#module_ui/tooltip)  
<a name="module_ui/tooltip..fromAnchor"></a>

## ui/tooltip~fromAnchor
If used on a link that is an anchor link it will display the content of the anchor like fromElement

**Kind**: inner property of [<code>ui/tooltip</code>](#module_ui/tooltip)  
<a name="module_ui/tooltip..endOfDocument"></a>

## ui/tooltip~endOfDocument : <code>Boolean</code>
Move the content to the bottom of the document

**Kind**: inner property of [<code>ui/tooltip</code>](#module_ui/tooltip)  
<a name="module_ui/tooltip..showEvents"></a>

## ui/tooltip~showEvents : <code>Array.&lt;String&gt;</code>
Events to show tooltip on

**Kind**: inner property of [<code>ui/tooltip</code>](#module_ui/tooltip)  
<a name="module_ui/tooltip..hideEvents"></a>

## ui/tooltip~hideEvents : <code>Array.&lt;String&gt;</code>
Events to hide tooltip on

**Kind**: inner property of [<code>ui/tooltip</code>](#module_ui/tooltip)  
<a name="module_ui/tooltip..delay"></a>

## ui/tooltip~delay : <code>Number</code>
Delay when using the directive

**Kind**: inner property of [<code>ui/tooltip</code>](#module_ui/tooltip)  
<a name="module_ui/tooltip..template"></a>

## ui/tooltip~template()
Template for the content display

**Kind**: inner method of [<code>ui/tooltip</code>](#module_ui/tooltip)  
<a name="module_ui/tooltip..onChange"></a>

## ui/tooltip~onChange() : <code>function</code>
Callback when tooltip is shown or hidden

**Kind**: inner method of [<code>ui/tooltip</code>](#module_ui/tooltip)  

  