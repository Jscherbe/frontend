---
title: utils/dom
---

<a name="module_utils/dom"></a>

# utils/dom

* [utils/dom](#module_utils/dom)
    * [.getDatasetJson(element, key)](#module_utils/dom.getDatasetJson) ⇒ <code>Object</code>
    * [.getDatasetOptionalJson(element, key)](#module_utils/dom.getDatasetOptionalJson) ⇒ <code>Object</code> \| <code>String</code>
    * [.wasClickOutside()](#module_utils/dom.wasClickOutside)
    * [.setPositionClasses(parent, classes)](#module_utils/dom.setPositionClasses)
    * [.getElement(target, context)](#module_utils/dom.getElement) ⇒ <code>HTMLElement</code>
    * [.getElements(target, context)](#module_utils/dom.getElements) ⇒ <code>Array</code>
    * [.resolveClasses(input)](#module_utils/dom.resolveClasses) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addScrollbarProperty(element, container, propName)](#module_utils/dom.addScrollbarProperty)

<a name="module_utils/dom.getDatasetJson"></a>

## utils/dom.getDatasetJson(element, key) ⇒ <code>Object</code>
Get an elements JSON dataset value

**Kind**: static method of [<code>utils/dom</code>](#module_utils/dom)  
**Returns**: <code>Object</code> - Empty object or JSON object from dataset  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Node</code> |  |
| key | <code>String</code> | key in dataset object for element |

<a name="module_utils/dom.getDatasetOptionalJson"></a>

## utils/dom.getDatasetOptionalJson(element, key) ⇒ <code>Object</code> \| <code>String</code>
Get an elements JSON dataset value that could potentially just be a single string
- If JSON it will return the object else it will return the value directly

**Kind**: static method of [<code>utils/dom</code>](#module_utils/dom)  
**Returns**: <code>Object</code> \| <code>String</code> - JSON object or current dataset value (string or empty string if no value)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Node</code> |  |
| key | <code>String</code> | key in dataset object for element |

<a name="module_utils/dom.wasClickOutside"></a>

## utils/dom.wasClickOutside()
Check if a pointer event x/y was outside an elements bounding box

**Kind**: static method of [<code>utils/dom</code>](#module_utils/dom)  
<a name="module_utils/dom.setPositionClasses"></a>

## utils/dom.setPositionClasses(parent, classes)
Sets up the positional classes that would come from the equal
  height module. Needs to be rerun by user when layout changes
  or new instances are added to the screen
  - Used for gutter crops
  - Used for rule placement
  - **Devs** Remember that default classes should match sass defaults

**Kind**: static method of [<code>utils/dom</code>](#module_utils/dom)  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>Node</code> | The grid parent <data-grid=""> |
| classes | <code>Object</code> | Override the default equal heights classes |

<a name="module_utils/dom.getElement"></a>

## utils/dom.getElement(target, context) ⇒ <code>HTMLElement</code>
Resolve a target to Element

**Kind**: static method of [<code>utils/dom</code>](#module_utils/dom)  
**Returns**: <code>HTMLElement</code> - The element or null if not found  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>String</code> \| <code>Node</code> | The selector or node/element |
| context | <code>Object</code> | [document] The context to query possible selectors from |

<a name="module_utils/dom.getElements"></a>

## utils/dom.getElements(target, context) ⇒ <code>Array</code>
Resolve a target to Elements

**Kind**: static method of [<code>utils/dom</code>](#module_utils/dom)  
**Returns**: <code>Array</code> - The elements or null if not found  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>String</code> \| <code>Node</code> | The selector or node/element |
| context | <code>Object</code> | [document] The context to query possible selectors from |

<a name="module_utils/dom.resolveClasses"></a>

## utils/dom.resolveClasses(input) ⇒ <code>Array.&lt;string&gt;</code>
Resolves a class input (string or array) into a consistent array of class names.

**Kind**: static method of [<code>utils/dom</code>](#module_utils/dom)  
**Returns**: <code>Array.&lt;string&gt;</code> - An array of class names. Returns an empty array for invalid or falsy input.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>Array.&lt;string&gt;</code> | The class input, which can be a string, an array of strings, or any other value. |

**Example**  
```js
resolveClassArray("fas fa-check  my-class"); // Returns ["fas", "fa-check", "my-class"]
resolveClassArray(["another-class", "yet-another-class"]); // Returns ["another-class", "yet-another-class"]
resolveClassArray("single-class"); // Returns ["single-class"]
```
<a name="module_utils/dom.addScrollbarProperty"></a>

## utils/dom.addScrollbarProperty(element, container, propName)
Sets a CSS custom property equal to the scrollbar width

**Kind**: static method of [<code>utils/dom</code>](#module_utils/dom)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Node</code> | The element that is the child of a scrollabel container |
| container | <code>Node</code> | The container that can be scrolled |
| propName | <code>Stirng</code> | Custom property to set |


  