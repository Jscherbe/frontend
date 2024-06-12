---
title: ui/collapsible
---

<a name="module_ui/collapsible"></a>

## ui/collapsible

* [ui/collapsible](#module_ui/collapsible)
    * _static_
        * [.Collapsible](#module_ui/collapsible.Collapsible)
            * [new exports.Collapsible(elements, config)](#new_module_ui/collapsible.Collapsible_new)
    * _inner_
        * [~selfManaged](#module_ui/collapsible..selfManaged)
        * [~startOpen](#module_ui/collapsible..startOpen)
        * [~openClass](#module_ui/collapsible..openClass)
        * [~debug](#module_ui/collapsible..debug)

<a name="module_ui/collapsible.Collapsible"></a>

### ui/collapsible.Collapsible
Class for accessible hide/show components

**Kind**: static class of [<code>ui/collapsible</code>](#module_ui/collapsible)  
<a name="new_module_ui/collapsible.Collapsible_new"></a>

#### new exports.Collapsible(elements, config)
**Returns**: <code>Object</code> - Collapsible instance  

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>Object</code> | Elements object |
| elements.trigger | <code>Node</code> | Trigger button/element that opens/closes collapsible |
| elements.content | <code>Node</code> | The content element that the trigger reveals |
| config | <code>Object</code> | Configuration options (see defaults) |

<a name="module_ui/collapsible..selfManaged"></a>

### ui/collapsible~selfManaged
The module won't attach the handlers (you need to do it yourself)

**Kind**: inner property of [<code>ui/collapsible</code>](#module_ui/collapsible)  
<a name="module_ui/collapsible..startOpen"></a>

### ui/collapsible~startOpen
This collapsible starts in open state

**Kind**: inner property of [<code>ui/collapsible</code>](#module_ui/collapsible)  
<a name="module_ui/collapsible..openClass"></a>

### ui/collapsible~openClass
Open/active state class

**Kind**: inner property of [<code>ui/collapsible</code>](#module_ui/collapsible)  
<a name="module_ui/collapsible..debug"></a>

### ui/collapsible~debug
Output debug info

**Kind**: inner property of [<code>ui/collapsible</code>](#module_ui/collapsible)  

  