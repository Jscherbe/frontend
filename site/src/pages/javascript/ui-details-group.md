---
title: ui/details-group
---

<a name="module_ui/details-group"></a>

# ui/details-group
Manages groups of details (ie. onlyOneOpen at a time)


* [ui/details-group](#module_ui/details-group)
    * _static_
        * [.initializer](#module_ui/details-group.initializer)
        * [.init()](#module_ui/details-group.init)
        * [.setupGroup(element, options)](#module_ui/details-group.setupGroup) ⇒ <code>DetailsGroupInstance</code>
            * [~setupChildren()](#module_ui/details-group.setupGroup..setupChildren)
            * [~destroy()](#module_ui/details-group.setupGroup..destroy)
    * _inner_
        * [~DetailsGroupInstance](#module_ui/details-group..DetailsGroupInstance) : <code>Object</code>

<a name="module_ui/details-group.initializer"></a>

## ui/details-group.initializer
Dialog Component Initializer

**Kind**: static constant of [<code>ui/details-group</code>](#module_ui/details-group)  
<a name="module_ui/details-group.init"></a>

## ui/details-group.init()
Initialize everything in document
- This will only initialize elements once, it is safe to call on page changes

**Kind**: static method of [<code>ui/details-group</code>](#module_ui/details-group)  
<a name="module_ui/details-group.setupGroup"></a>

## ui/details-group.setupGroup(element, options) ⇒ <code>DetailsGroupInstance</code>
Sets up a single group of details elements to manage their behavior.

**Kind**: static method of [<code>ui/details-group</code>](#module_ui/details-group)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The parent element containing the details elements. |
| options | <code>Object</code> | The options for this group |


* [.setupGroup(element, options)](#module_ui/details-group.setupGroup) ⇒ <code>DetailsGroupInstance</code>
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


  