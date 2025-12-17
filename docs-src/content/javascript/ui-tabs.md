---
title: ui/tabs
---

<a name="module_ui/tabs"></a>

# ui/tabs

* [ui/tabs](#module_ui/tabs)
    * _static_
        * [.instances](#module_ui/tabs.instances) : <code>Array</code>
        * [.initializer](#module_ui/tabs.initializer)
        * [.init()](#module_ui/tabs.init)
        * [.setup(element, options)](#module_ui/tabs.setup) ⇒ <code>Object</code>
    * _inner_
        * [~openByCurrentHash()](#module_ui/tabs..openByCurrentHash)
        * [~handleOpen()](#module_ui/tabs..handleOpen)
        * [~setHeights()](#module_ui/tabs..setHeights)

<a name="module_ui/tabs.instances"></a>

## ui/tabs.instances : <code>Array</code>
Array of current tab instances (exported if you need to interact with them)

**Kind**: static constant of [<code>ui/tabs</code>](#module_ui/tabs)  
<a name="module_ui/tabs.initializer"></a>

## ui/tabs.initializer
Tabs Component Initializer

**Kind**: static constant of [<code>ui/tabs</code>](#module_ui/tabs)  
<a name="module_ui/tabs.init"></a>

## ui/tabs.init()
Init all instances currently in document

**Kind**: static method of [<code>ui/tabs</code>](#module_ui/tabs)  
<a name="module_ui/tabs.setup"></a>

## ui/tabs.setup(element, options) ⇒ <code>Object</code>
**Kind**: static method of [<code>ui/tabs</code>](#module_ui/tabs)  
**Returns**: <code>Object</code> - Instance object  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Node</code> | Tablist Element |
| options | <code>Node</code> | Options to set as defaults (can be overridden by element dataset options) |

<a name="module_ui/tabs..openByCurrentHash"></a>

## ui/tabs~openByCurrentHash()
Opens the a tabpanel if it matches current hash (used in initial init)

**Kind**: inner method of [<code>ui/tabs</code>](#module_ui/tabs)  
<a name="module_ui/tabs..handleOpen"></a>

## ui/tabs~handleOpen()
Responsible for setting hash on open if option is set

**Kind**: inner method of [<code>ui/tabs</code>](#module_ui/tabs)  
<a name="module_ui/tabs..setHeights"></a>

## ui/tabs~setHeights()
Responsible for creating equal height tab panels

**Kind**: inner method of [<code>ui/tabs</code>](#module_ui/tabs)  

  