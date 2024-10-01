---
title: modal-builder
---

<a name="module_modal-builder"></a>

# modal-builder

* [modal-builder](#module_modal-builder)
    * _static_
        * [.defaults](#module_modal-builder.defaults)
        * [.setDefaults(options)](#module_modal-builder.setDefaults)
        * [.init()](#module_modal-builder.init)
        * [.setup()](#module_modal-builder.setup)
        * [.setupBuilder(element)](#module_modal-builder.setupBuilder)
        * [.buildModal(content, options)](#module_modal-builder.buildModal)
    * _inner_
        * [~separateDialogOptions(config)](#module_modal-builder..separateDialogOptions) ⇒ <code>Object</code>

<a name="module_modal-builder.defaults"></a>

## modal-builder.defaults
Default builder options (extends dialog defaults, watch name collisions)
- Decided to extend defaults so the interface in HTML is singular
  - This is sometimes easier to template (merging and serializing options 
    in twig for example)

**Kind**: static constant of [<code>modal-builder</code>](#module_modal-builder)  
<a name="module_modal-builder.setDefaults"></a>

## modal-builder.setDefaults(options)
**Kind**: static method of [<code>modal-builder</code>](#module_modal-builder)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Change options used as default for dialogs, can then be overridden by data attribute settings on element |

<a name="module_modal-builder.init"></a>

## modal-builder.init()
Initialize everything in document
- This will only initialize elements once, it is safe to call on page changes

**Kind**: static method of [<code>modal-builder</code>](#module_modal-builder)  
<a name="module_modal-builder.setup"></a>

## modal-builder.setup()
Query and setup all builder

**Kind**: static method of [<code>modal-builder</code>](#module_modal-builder)  
<a name="module_modal-builder.setupBuilder"></a>

## modal-builder.setupBuilder(element)
Build a dialog for the given content

**Kind**: static method of [<code>modal-builder</code>](#module_modal-builder)  

| Param | Type |
| --- | --- |
| element | <code>Node</code> | 

<a name="module_modal-builder.buildModal"></a>

## modal-builder.buildModal(content, options)
**Kind**: static method of [<code>modal-builder</code>](#module_modal-builder)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>Node</code> | Content element of the dialog (what is inserted into the body) |
| options | <code>Object</code> | Options for built dialog (see defaults) |

<a name="module_modal-builder..separateDialogOptions"></a>

## modal-builder~separateDialogOptions(config) ⇒ <code>Object</code>
Returns JSON string to embed in data-ulu-dialog for dialog handling

**Kind**: inner method of [<code>modal-builder</code>](#module_modal-builder)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | Config object to pull dialog specific settings from |


  