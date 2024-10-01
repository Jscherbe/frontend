---
title: collapsible
---

<a name="module_collapsible"></a>

# collapsible

* [collapsible](#module_collapsible)
    * _static_
        * [.Collapsible](#module_collapsible.Collapsible)
            * [new exports.Collapsible(elements, config)](#new_module_collapsible.Collapsible_new)
            * [.setupTemporaryHandlers()](#module_collapsible.Collapsible+setupTemporaryHandlers)
            * [.destroyTemporaryHandlers()](#module_collapsible.Collapsible+destroyTemporaryHandlers)
    * _inner_
        * [~selfManaged](#module_collapsible..selfManaged)
        * [~startOpen](#module_collapsible..startOpen)
        * [~openClass](#module_collapsible..openClass)
        * [~debug](#module_collapsible..debug)

<a name="module_collapsible.Collapsible"></a>

## collapsible.Collapsible
Class for accessible hide/show components

**Kind**: static class of [<code>collapsible</code>](#module_collapsible)  

* [.Collapsible](#module_collapsible.Collapsible)
    * [new exports.Collapsible(elements, config)](#new_module_collapsible.Collapsible_new)
    * [.setupTemporaryHandlers()](#module_collapsible.Collapsible+setupTemporaryHandlers)
    * [.destroyTemporaryHandlers()](#module_collapsible.Collapsible+destroyTemporaryHandlers)

<a name="new_module_collapsible.Collapsible_new"></a>

### new exports.Collapsible(elements, config)
**Returns**: <code>Object</code> - Collapsible instance  

| Param | Type | Description |
| --- | --- | --- |
| elements | <code>Object</code> | Elements object |
| elements.trigger | <code>Node</code> | Trigger button/element that opens/closes collapsible |
| elements.content | <code>Node</code> | The content element that the trigger reveals |
| config | <code>Object</code> | Configuration options (see defaults) |

<a name="module_collapsible.Collapsible+setupTemporaryHandlers"></a>

### collapsible.setupTemporaryHandlers()
Setup handlers needed for closing once open

**Kind**: instance method of [<code>Collapsible</code>](#module_collapsible.Collapsible)  
<a name="module_collapsible.Collapsible+destroyTemporaryHandlers"></a>

### collapsible.destroyTemporaryHandlers()
Destroy handlers attached for closing once open

**Kind**: instance method of [<code>Collapsible</code>](#module_collapsible.Collapsible)  
<a name="module_collapsible..selfManaged"></a>

## collapsible~selfManaged
The module won't attach the handlers (you need to do it yourself)

**Kind**: inner property of [<code>collapsible</code>](#module_collapsible)  
<a name="module_collapsible..startOpen"></a>

## collapsible~startOpen
This collapsible starts in open state

**Kind**: inner property of [<code>collapsible</code>](#module_collapsible)  
<a name="module_collapsible..openClass"></a>

## collapsible~openClass
Open/active state class

**Kind**: inner property of [<code>collapsible</code>](#module_collapsible)  
<a name="module_collapsible..debug"></a>

## collapsible~debug
Output debug info

**Kind**: inner property of [<code>collapsible</code>](#module_collapsible)  

  