---
title: core/component
---

<a name="module_core/component"></a>

# core/component
Core classes and mechanisms that define how UI components are created and managed within the library


* [core/component](#module_core/component)
    * [.ComponentInitializer](#module_core/component.ComponentInitializer)
        * [new exports.ComponentInitializer(options)](#new_module_core/component.ComponentInitializer_new)
        * [.init(config)](#module_core/component.ComponentInitializer+init)
        * [.setupElements(config)](#module_core/component.ComponentInitializer+setupElements)
        * [.getAttribute(key)](#module_core/component.ComponentInitializer+getAttribute) ⇒ <code>String</code>
        * [.attributeSelector(key)](#module_core/component.ComponentInitializer+attributeSelector)
        * [.attributeSelectorInitial()](#module_core/component.ComponentInitializer+attributeSelectorInitial) ⇒ <code>String</code>
        * [.queryAllInitial(context, withData, context)](#module_core/component.ComponentInitializer+queryAllInitial) ⇒ <code>Array.&lt;{element: HTMLElement, data: object, initialize: function()}&gt;</code>
        * [.initializeElement(element)](#module_core/component.ComponentInitializer+initializeElement)
        * [.getData()](#module_core/component.ComponentInitializer+getData) ⇒ <code>\*</code>
        * [.log()](#module_core/component.ComponentInitializer+log)
        * [.warn()](#module_core/component.ComponentInitializer+warn)
        * [.logError()](#module_core/component.ComponentInitializer+logError)

<a name="module_core/component.ComponentInitializer"></a>

## core/component.ComponentInitializer
Class serves as a utility for UI modules, handling the selection of elements and the initialization of corresponding component instances, ensuring consistent setup within the module

**Kind**: static class of [<code>core/component</code>](#module_core/component)  

* [.ComponentInitializer](#module_core/component.ComponentInitializer)
    * [new exports.ComponentInitializer(options)](#new_module_core/component.ComponentInitializer_new)
    * [.init(config)](#module_core/component.ComponentInitializer+init)
    * [.setupElements(config)](#module_core/component.ComponentInitializer+setupElements)
    * [.getAttribute(key)](#module_core/component.ComponentInitializer+getAttribute) ⇒ <code>String</code>
    * [.attributeSelector(key)](#module_core/component.ComponentInitializer+attributeSelector)
    * [.attributeSelectorInitial()](#module_core/component.ComponentInitializer+attributeSelectorInitial) ⇒ <code>String</code>
    * [.queryAllInitial(context, withData, context)](#module_core/component.ComponentInitializer+queryAllInitial) ⇒ <code>Array.&lt;{element: HTMLElement, data: object, initialize: function()}&gt;</code>
    * [.initializeElement(element)](#module_core/component.ComponentInitializer+initializeElement)
    * [.getData()](#module_core/component.ComponentInitializer+getData) ⇒ <code>\*</code>
    * [.log()](#module_core/component.ComponentInitializer+log)
    * [.warn()](#module_core/component.ComponentInitializer+warn)
    * [.logError()](#module_core/component.ComponentInitializer+logError)

<a name="new_module_core/component.ComponentInitializer_new"></a>

### new exports.ComponentInitializer(options)
Create a new instance of ComponentInitializer


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options for configuring the component initializer. |
| options.type | <code>String</code> | Type of component (used for logs). |
| options.baseAttribute | <code>String</code> | Prefix and base attribute name (used for base attribute and further element attribute names). |

<a name="module_core/component.ComponentInitializer+init"></a>

### componentInitializer.init(config)
Initializes the component based on the provided configuration.

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_core/component.ComponentInitializer)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | The initialization configuration. |
| config.setup | <code>function</code> | The setup function to call for each element. |
| config.key | <code>String</code> | [null] The optional key to use with attribute selector. |
| config.withData | <code>Boolean</code> | [null] Whether to retrieve element data. |
| config.coreEvents | <code>Array</code> | [null] An array of core event names (e.g., 'pageModified') that should trigger a re-initialization. |
| config.context | <code>HTMLElement</code> | [document] The context to query within. |

<a name="module_core/component.ComponentInitializer+setupElements"></a>

### componentInitializer.setupElements(config)
Processes the elements based on the provided configuration.

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_core/component.ComponentInitializer)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | The initialization configuration. |
| config.setup | <code>function</code> | The setup function to call for each element. |
| config.key | <code>string</code> | The optional key to use with attribute selector. |
| config.withData | <code>boolean</code> | [false] Whether to retrieve element data. |
| config.context | <code>HTMLElement</code> | [document] The context to query within. |

<a name="module_core/component.ComponentInitializer+getAttribute"></a>

### componentInitializer.getAttribute(key) ⇒ <code>String</code>
Get an attribute name

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_core/component.ComponentInitializer)  
**Returns**: <code>String</code> - String like data-ulu-dialog or data-ulu-dialog-element  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Optional key, if no key will return baseAttribute if key will return key added to base |

<a name="module_core/component.ComponentInitializer+attributeSelector"></a>

### componentInitializer.attributeSelector(key)
Create an attribute selector

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_core/component.ComponentInitializer)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Optional key (see getAttribute) |

<a name="module_core/component.ComponentInitializer+attributeSelectorInitial"></a>

### componentInitializer.attributeSelectorInitial() ⇒ <code>String</code>
Create an attribute selector for initial

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_core/component.ComponentInitializer)  
<a name="module_core/component.ComponentInitializer+queryAllInitial"></a>

### componentInitializer.queryAllInitial(context, withData, context) ⇒ <code>Array.&lt;{element: HTMLElement, data: object, initialize: function()}&gt;</code>
Queries all main elements of a component that have not been initialized and extracts their data attributes.

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_core/component.ComponentInitializer)  
**Returns**: <code>Array.&lt;{element: HTMLElement, data: object, initialize: function()}&gt;</code> - An array of objects containing the elements, their data, and convenience function initialize() which when called will set the init attribute on the element  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>HTMLElement</code> | The context to query within. |
| withData | <code>Boolean</code> | Include dataset from element (as optional JSON) |
| context | <code>Node</code> | Element to query elements from |

<a name="module_core/component.ComponentInitializer+initializeElement"></a>

### componentInitializer.initializeElement(element)
Sets the init attribute on an element, marking it as initialized.

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_core/component.ComponentInitializer)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The element to initialize. |

<a name="module_core/component.ComponentInitializer+getData"></a>

### componentInitializer.getData() ⇒ <code>\*</code>
Get an elements dataset value as JSON or other value

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_core/component.ComponentInitializer)  
**Returns**: <code>\*</code> - The value of the dataset, if JSON will return object else will return string value or undefined  
<a name="module_core/component.ComponentInitializer+log"></a>

### componentInitializer.log()
Will output namespaced console logs for the given initializer

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_core/component.ComponentInitializer)  
<a name="module_core/component.ComponentInitializer+warn"></a>

### componentInitializer.warn()
Will output namespaced console warnings for the given initializer

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_core/component.ComponentInitializer)  
<a name="module_core/component.ComponentInitializer+logError"></a>

### componentInitializer.logError()
Will output namespaced console error for the given initializer

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_core/component.ComponentInitializer)  

  