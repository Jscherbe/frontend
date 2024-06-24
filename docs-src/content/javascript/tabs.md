---
title: tabs
---

<a name="module_tabs"></a>

## tabs

* [tabs](#module_tabs)
    * _static_
        * [.instances](#module_tabs.instances) : <code>Array</code>
        * [.init(options)](#module_tabs.init)
        * [.initWithin(context, options)](#module_tabs.initWithin)
        * [.setup(element, options)](#module_tabs.setup) ⇒ <code>Object</code>
    * _inner_
        * [~openByCurrentHash()](#module_tabs..openByCurrentHash)
        * [~handleOpen()](#module_tabs..handleOpen)
        * [~setHeights()](#module_tabs..setHeights)

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

<a name="module_tabs..openByCurrentHash"></a>

### tabs~openByCurrentHash()
Opens the a tabpanel if it matches current hash (used in initial init)

**Kind**: inner method of [<code>tabs</code>](#module_tabs)  
<a name="module_tabs..handleOpen"></a>

### tabs~handleOpen()
Responsible for setting hash on open if option is set

**Kind**: inner method of [<code>tabs</code>](#module_tabs)  
<a name="module_tabs..setHeights"></a>

### tabs~setHeights()
Responsible for creating equal height tab panels

**Kind**: inner method of [<code>tabs</code>](#module_tabs)  

  