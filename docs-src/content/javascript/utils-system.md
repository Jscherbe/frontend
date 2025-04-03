---
title: utils/system
---

<a name="module_utils/system"></a>

# utils/system
Core classes and mechanisms that define how UI components are created and managed within the library


* [utils/system](#module_utils/system)
    * _static_
        * [.ComponentInitializer](#module_utils/system.ComponentInitializer)
            * [new exports.ComponentInitializer(options)](#new_module_utils/system.ComponentInitializer_new)
            * [.defaults](#module_utils/system.ComponentInitializer+defaults)
            * [.getAttribute(key)](#module_utils/system.ComponentInitializer+getAttribute) ⇒ <code>String</code>
            * [.attributeSelector(key)](#module_utils/system.ComponentInitializer+attributeSelector)
            * [.attributeSelectorInitial()](#module_utils/system.ComponentInitializer+attributeSelectorInitial) ⇒ <code>String</code>
            * [.queryAllInitial(context)](#module_utils/system.ComponentInitializer+queryAllInitial) ⇒ <code>Array</code>
            * [.queryAllInitialWithData(context)](#module_utils/system.ComponentInitializer+queryAllInitialWithData) ⇒ <code>Array.&lt;{element: HTMLElement, data: object}&gt;</code>
            * [.initializeElement(element)](#module_utils/system.ComponentInitializer+initializeElement)
            * [.getData()](#module_utils/system.ComponentInitializer+getData) ⇒ <code>\*</code>
            * [.debug()](#module_utils/system.ComponentInitializer+debug)
        * [.ComponentInstance](#module_utils/system.ComponentInstance)
    * _inner_
        * [~type](#module_utils/system..type)
        * [~baseAttribute](#module_utils/system..baseAttribute)

<a name="module_utils/system.ComponentInitializer"></a>

## utils/system.ComponentInitializer
Class serves as a utility for UI modules, handling the selection of elements and the initialization of corresponding component instances, ensuring consistent setup within the module

**Kind**: static class of [<code>utils/system</code>](#module_utils/system)  

* [.ComponentInitializer](#module_utils/system.ComponentInitializer)
    * [new exports.ComponentInitializer(options)](#new_module_utils/system.ComponentInitializer_new)
    * [.defaults](#module_utils/system.ComponentInitializer+defaults)
    * [.getAttribute(key)](#module_utils/system.ComponentInitializer+getAttribute) ⇒ <code>String</code>
    * [.attributeSelector(key)](#module_utils/system.ComponentInitializer+attributeSelector)
    * [.attributeSelectorInitial()](#module_utils/system.ComponentInitializer+attributeSelectorInitial) ⇒ <code>String</code>
    * [.queryAllInitial(context)](#module_utils/system.ComponentInitializer+queryAllInitial) ⇒ <code>Array</code>
    * [.queryAllInitialWithData(context)](#module_utils/system.ComponentInitializer+queryAllInitialWithData) ⇒ <code>Array.&lt;{element: HTMLElement, data: object}&gt;</code>
    * [.initializeElement(element)](#module_utils/system.ComponentInitializer+initializeElement)
    * [.getData()](#module_utils/system.ComponentInitializer+getData) ⇒ <code>\*</code>
    * [.debug()](#module_utils/system.ComponentInitializer+debug)

<a name="new_module_utils/system.ComponentInitializer_new"></a>

### new exports.ComponentInitializer(options)
Create a new instance of ComponentInitializer


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options (see defaults) |

<a name="module_utils/system.ComponentInitializer+defaults"></a>

### componentInitializer.defaults
Default Options

**Kind**: instance property of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  
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

### componentInitializer.queryAllInitial(context) ⇒ <code>Array</code>
Queries all main elements of a component that have not been initialized.

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  
**Returns**: <code>Array</code> - Array of uninitialized main elements.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>HTMLElement</code> | The context to query within. |

<a name="module_utils/system.ComponentInitializer+queryAllInitialWithData"></a>

### componentInitializer.queryAllInitialWithData(context) ⇒ <code>Array.&lt;{element: HTMLElement, data: object}&gt;</code>
Queries all main elements of a component that have not been initialized and extracts their data attributes.

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  
**Returns**: <code>Array.&lt;{element: HTMLElement, data: object}&gt;</code> - An array of objects containing the elements and their data.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>HTMLElement</code> | The context to query within. |

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
<a name="module_utils/system.ComponentInitializer+debug"></a>

### componentInitializer.debug()
Will output namespaced console logs for the given initializer

**Kind**: instance method of [<code>ComponentInitializer</code>](#module_utils/system.ComponentInitializer)  
<a name="module_utils/system.ComponentInstance"></a>

## utils/system.ComponentInstance
Class serves as a base for representing individual occurrences of a UI component, providing a consistent structure for each

**Kind**: static class of [<code>utils/system</code>](#module_utils/system)  
<a name="module_utils/system..type"></a>

## utils/system~type
Type of component (for logs)

**Kind**: inner property of [<code>utils/system</code>](#module_utils/system)  
<a name="module_utils/system..baseAttribute"></a>

## utils/system~baseAttribute
Prefix and base attribute name (used for base attribute and further element attribute names)

**Kind**: inner property of [<code>utils/system</code>](#module_utils/system)  

  