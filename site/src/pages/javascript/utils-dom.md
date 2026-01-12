---
title: utils/dom
---

<a name="module_utils/dom"></a>

# utils/dom

* [utils/dom](#module_utils/dom)
    * [.dataAttributeToDatasetKey(dataAttribute)](#module_utils/dom.dataAttributeToDatasetKey) ⇒ <code>string</code>
    * [.setPositionClasses(parent, classes)](#module_utils/dom.setPositionClasses)
    * [.resolveClasses(input)](#module_utils/dom.resolveClasses) ⇒ <code>Array.&lt;string&gt;</code>

<a name="module_utils/dom.dataAttributeToDatasetKey"></a>

## utils/dom.dataAttributeToDatasetKey(dataAttribute) ⇒ <code>string</code>
Converts a data attribute name to its corresponding dataset property name.

**Kind**: static method of [<code>utils/dom</code>](#module_utils/dom)  
**Returns**: <code>string</code> - - The dataset property name (e.g., "uluDialog").  

| Param | Type | Description |
| --- | --- | --- |
| dataAttribute | <code>string</code> | The data attribute name (e.g., "data-ulu-dialog"). |

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

  