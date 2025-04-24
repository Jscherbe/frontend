---
title: utils/system
---

<a name="module_utils/system"></a>

# utils/system
Core classes and mechanisms that define how UI components are created and managed within the library


* [utils/system](#module_utils/system)
    * [.ComponentInitializer](#module_utils/system.ComponentInitializer)
        * [new exports.ComponentInitializer(options)](#new_module_utils/system.ComponentInitializer_new)
        * [.init(config)](#module_utils/system.ComponentInitializer+init)
        * [.setupElements(config)](#module_utils/system.ComponentInitializer+setupElements)
        * [.getAttribute(key)](#module_utils/system.ComponentInitializer+getAttribute) ⇒ <code>String</code>
        * [.attributeSelector(key)](#module_utils/system.ComponentInitializer+attributeSelector)
        * [.attributeSelectorInitial()](#module_utils/system.ComponentInitializer+attributeSelectorInitial) ⇒ <code>String</code>
        * [.queryAllInitial(context, withData, context)](#module_utils/system.ComponentInitializer+queryAllInitial) ⇒ <code>Array.&lt;{element: HTMLElement, data: object, initialize: function()}&gt;</code>
        * [.initializeElement(element)](#module_utils/system.ComponentInitializer+initializeElement)
        * [.getData()](#module_utils/system.ComponentInitializer+getData) ⇒ <code>\*</code>
        * [.log()](#module_utils/system.ComponentInitializer+log)
        * [.warn()](#module_utils/system.ComponentInitializer+warn)
        * [.logError()](#module_utils/system.ComponentInitializer+logError)
    * [.ComponentInstance](#module_utils/system.ComponentInstance)

<a name="module_utils/system.ComponentInitializer"></a>

## utils/system.ComponentInitializer
Class serves as a utility for UI modules, handling the selection of elements and the initialization of corresponding component instances, ensuring consistent setup within the module

**Kind**: static class of [<code>utils/system</code>](#module_utils/system)  

* [.ComponentInitializer](#module_utils/system.ComponentInitializer)
    * [new exports.ComponentInitializer(options)](#new_module_utils/system.ComponentInitializer_new)
    * [.init(config)](#module_utils/system.ComponentInitializer+init)
    * [.setupElements(config)](#module_utils/system.ComponentInitializer+setupElements)
    * [.getAttribute(key)](#module_utils/system.ComponentInitializer+getAttribute) ⇒ <code>String</code>
    * [.attributeSelector(key)](#module_utils/system.ComponentInitializer+attributeSelector)
    * [.attributeSelectorInitial()](#module_utils/system.ComponentInitializer+attributeSelectorInitial) ⇒ <code>String</code>
    * [.queryAllInitial(context, withData, context)](#module_utils/system.ComponentInitializer+queryAllInitial) ⇒ <code>Array.&lt;{element: HTMLElement, data: object, initialize: function()}&gt;</code>
    * [.initializeElement(element)](#module_utils/system.ComponentInitializer+initializeElement)
    * [.getData()](#module_utils/system.ComponentInitializer+getData) ⇒ <code>\*</code>
    * [.log()](#module_utils/system.ComponentInitializer+log)
    * [.warn()](#module_utils/system.ComponentInitializer+warn)
    * [.logError()](#module_utils/system.ComponentInitializer+logError)

<a name="new_module_utils/system.ComponentInitializer_new"></a>

### new exports.ComponentInitializer(options)
Create a new instance of ComponentInitializer


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options for configuring the component initializer. |
| options.type | <code>String</code> | Type of component (used for logs). |
| options.baseAttribute | <code>String</code> | Prefix and base attribute name (used for base attribute and further element attribute names). |

<a name="module_utils/system.ComponentInitializer+init"></a>

### componentInitializer.init(config)
Initializes the component based on the provided configuration.

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | The initialization configuration. |
| config.setup | <code>function</code> | The setup function to call for each element. |
| config.key | <code>String</code> | [null] The optional key to use with attribute selector. |
| config.withData | <code>Boolean</code> | [null] Whether to retrieve element data. |
| config.events | <code>Array</code> | [null] Ulu events that should call setup when dispatched (ie. pageModified, pageResized) |
| config.onPageResized | <code>Boolean</code> | [null] Whether to bind event listener for page resize end |
| config.context | <code>HTMLElement</code> | [document] The context to query within. |

<a name="module_utils/system.ComponentInitializer+setupElements"></a>

### componentInitializer.setupElements(config)
Processes the elements based on the provided configuration.

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | The initialization configuration. |
| config.setup | <code>function</code> | The setup function to call for each element. |
| config.key | <code>string</code> | The optional key to use with attribute selector. |
| config.withData | <code>boolean</code> | [false] Whether to retrieve element data. |
| config.onPageModified | <code>boolean</code> | [true] Whether to bind event listener for page modifications. |
| config.context | <code>HTMLElement</code> | [document] The context to query within. |

<a name="module_utils/system.ComponentInitializer+getAttribute"></a>

### componentInitializer.getAttribute(key) ⇒ <code>String</code>
Get an attribute name

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  
**Returns**: <code>String</code> - String like data-ulu-dialog or data-ulu-dialog-element  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Optional key, if no key will return baseAttribute if key will return key added to base |

<a name="module_utils/system.ComponentInitializer+attributeSelector"></a>

### componentInitializer.attributeSelector(key)
Create an attribute selector

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Optional key (see getAttribute) |

<a name="module_utils/system.ComponentInitializer+attributeSelectorInitial"></a>

### componentInitializer.attributeSelectorInitial() ⇒ <code>String</code>
Create an attribute selector for initial

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  
<a name="module_utils/system.ComponentInitializer+queryAllInitial"></a>

### componentInitializer.queryAllInitial(context, withData, context) ⇒ <code>Array.&lt;{element: HTMLElement, data: object, initialize: function()}&gt;</code>
Queries all main elements of a component that have not been initialized and extracts their data attributes.

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  
**Returns**: <code>Array.&lt;{element: HTMLElement, data: object, initialize: function()}&gt;</code> - An array of objects containing the elements, their data, and convenience function initialize() which when called will set the init attribute on the element  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>HTMLElement</code> | The context to query within. |
| withData | <code>Boolean</code> | Include dataset from element (as optional JSON) |
| context | <code>Node</code> | Element to query elements from |

<a name="module_utils/system.ComponentInitializer+initializeElement"></a>

### componentInitializer.initializeElement(element)
Sets the init attribute on an element, marking it as initialized.

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The element to initialize. |

<a name="module_utils/system.ComponentInitializer+getData"></a>

### componentInitializer.getData() ⇒ <code>\*</code>
Get an elements dataset value as JSON or other value

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  
**Returns**: <code>\*</code> - The value of the dataset, if JSON will return object else will return string value or undefined  
<a name="module_utils/system.ComponentInitializer+log"></a>

### componentInitializer.log()
Will output namespaced console logs for the given initializer

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  
<a name="module_utils/system.ComponentInitializer+warn"></a>

### componentInitializer.warn()
Will output namespaced console warnings for the given initializer

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  
<a name="module_utils/system.ComponentInitializer+logError"></a>

### componentInitializer.logError()
Will output namespaced console error for the given initializer

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  
<a name="module_utils/system.ComponentInstance"></a>

## utils/system.ComponentInstance
Class serves as a base for representing individual occurrences of a UI component, providing a consistent structure for each

**Kind**: static class of [<code>utils/system</code>](#module_utils/system)  

  