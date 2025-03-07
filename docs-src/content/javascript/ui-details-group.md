---
title: ui/details-group
---

<a name="module_ui/details-group"></a>

# ui/details-group
Manages groups of details (ie. onlyOneOpen at a time)


* [ui/details-group](#module_ui/details-group)
    * _static_
        * [.init()](#module_ui/details-group.init)
        * [.setup(context)](#module_ui/details-group.setup) ⇒ <code>Array</code>
        * [.setupGroup(element)](#module_ui/details-group.setupGroup) ⇒ <code>DetailsGroupInstance</code>
            * [~setupChildren()](#module_ui/details-group.setupGroup..setupChildren)
            * [~destroy()](#module_ui/details-group.setupGroup..destroy)
    * _inner_
        * [~DetailsGroupInstance](#module_ui/details-group..DetailsGroupInstance) : <code>Object</code>

<a name="module_ui/details-group.init"></a>

## ui/details-group.init()
Initialize everything in document
- This will only initialize elements once, it is safe to call on page changes

**Kind**: static method of [<code>ui/details-group</code>](#module_ui/details-group)  
<a name="module_ui/details-group.setup"></a>

## ui/details-group.setup(context) ⇒ <code>Array</code>
Setup all dialog groups within context

**Kind**: static method of [<code>ui/details-group</code>](#module_ui/details-group)  
**Returns**: <code>Array</code> - Array matching the groups queried with their return objects from setupGroup() [used for destroy/etc]  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>HTMLElement</code> | [document] Element to query within |

<a name="module_ui/details-group.setupGroup"></a>

## ui/details-group.setupGroup(element) ⇒ <code>DetailsGroupInstance</code>
Sets up a single group of details elements to manage their behavior.

**Kind**: static method of [<code>ui/details-group</code>](#module_ui/details-group)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The parent element containing the details elements. |


* [.setupGroup(element)](#module_ui/details-group.setupGroup) ⇒ <code>DetailsGroupInstance</code>
    * [~setupChildren()](#module_ui/details-group.setupGroup..setupChildren)
    * [~destroy()](#module_ui/details-group.setupGroup..destroy)

<a name="module_ui/details-group.setupGroup..setupChildren"></a>

### setupGroup~setupChildren()
Sets up any children not already setup in group

**Kind**: inner method of [<code>setupGroup</code>](#module_ui/details-group.setupGroup)  
<a name="module_ui/details-group.setupGroup..destroy"></a>

### setupGroup~destroy()
Function removes all handlers and init attributes

**Kind**: inner method of [<code>setupGroup</code>](#module_ui/details-group.setupGroup)  
<a name="module_ui/details-group..DetailsGroupInstance"></a>

## ui/details-group~DetailsGroupInstance : <code>Object</code>
**Kind**: inner typedef of [<code>ui/details-group</code>](#module_ui/details-group)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| destroy | <code>function</code> | A function to remove event listeners and attributes. |
| element | <code>HTMLElement</code> | The parent element. |
| setupChildren | <code>function</code> | A function to initialize the child details elements. |


  