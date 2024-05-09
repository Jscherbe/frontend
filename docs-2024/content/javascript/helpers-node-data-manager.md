---
title: helpers/node-data-manager
---

<a name="module_helpers/node-data-manager"></a>

## helpers/node-data-manager

* [helpers/node-data-manager](#module_helpers/node-data-manager)
    * [module.exports](#exp_module_helpers/node-data-manager--module.exports) ⏏
        * _instance_
            * [.get(node, key)](#module_helpers/node-data-manager--module.exports+get)
            * [.set(node, key, value)](#module_helpers/node-data-manager--module.exports+set)
            * [.find()](#module_helpers/node-data-manager--module.exports+find)
            * [.destroy()](#module_helpers/node-data-manager--module.exports+destroy)
        * _static_
            * [.NodeDataStore](#module_helpers/node-data-manager--module.exports.NodeDataStore)

<a name="exp_module_helpers/node-data-manager--module.exports"></a>

### module.exports ⏏
Class that provides a method to store data based on node/element

**Kind**: Exported class  
<a name="module_helpers/node-data-manager--module.exports+get"></a>

#### module.exports.get(node, key)
Get data for an element/node

**Kind**: instance method of [<code>module.exports</code>](#exp_module_helpers/node-data-manager--module.exports)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>Node</code> |  | Html Node/Element to get data for |
| key | <code>String</code> \| <code>Boolean</code> | <code>false</code> | If key is passed, return that key's data for the element, if falsey return elements complete dataset |

<a name="module_helpers/node-data-manager--module.exports+set"></a>

#### module.exports.set(node, key, value)
Bind data to a specific Node/Element

**Kind**: instance method of [<code>module.exports</code>](#exp_module_helpers/node-data-manager--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node</code> | Html Node/Element to get data for |
| key | <code>String</code> | Key to save the data under |
| value | <code>\*</code> | Value to save |

<a name="module_helpers/node-data-manager--module.exports+find"></a>

#### module.exports.find()
Return an elements store object

**Kind**: instance method of [<code>module.exports</code>](#exp_module_helpers/node-data-manager--module.exports)  
<a name="module_helpers/node-data-manager--module.exports+destroy"></a>

#### module.exports.destroy()
Destroy all references to data and nodes/elements

**Kind**: instance method of [<code>module.exports</code>](#exp_module_helpers/node-data-manager--module.exports)  
<a name="module_helpers/node-data-manager--module.exports.NodeDataStore"></a>

#### module.exports.NodeDataStore
Child class that provides a store for one specific node/element

**Kind**: static class of [<code>module.exports</code>](#exp_module_helpers/node-data-manager--module.exports)  

  