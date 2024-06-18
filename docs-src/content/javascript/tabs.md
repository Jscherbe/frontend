---
title: tabs
---

<a name="module_tabs"></a>

## tabs

* [tabs](#module_tabs)
    * [.instances](#module_tabs.instances) : <code>Array</code>
    * [.init(options)](#module_tabs.init)
    * [.initWithin(context, options)](#module_tabs.initWithin)
    * [.setup(element, options)](#module_tabs.setup) ⇒ <code>Object</code>

<a name="module_tabs.instances"></a>

### tabs.instances : <code>Array</code>
Array of current tab instances (exported if you need to interact with them)

**Kind**: static constant of [<code>tabs</code>](#module_tabs)  
<a name="module_tabs.init"></a>

### tabs.init(options)
Init all instances currently in document

**Kind**: static method of [<code>tabs</code>](#module_tabs)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options to serve as defaults |

<a name="module_tabs.initWithin"></a>

### tabs.initWithin(context, options)
Init all tabs within a certain context

**Kind**: static method of [<code>tabs</code>](#module_tabs)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Node</code> | Element to init within |
| options | <code>Object</code> | Options to serve as defaults |

<a name="module_tabs.setup"></a>

### tabs.setup(element, options) ⇒ <code>Object</code>
**Kind**: static method of [<code>tabs</code>](#module_tabs)  
**Returns**: <code>Object</code> - Instance object  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Node</code> | Tablist Element |
| options | <code>Node</code> | Options to set as defaults (can be overridden by element dataset options) |


  