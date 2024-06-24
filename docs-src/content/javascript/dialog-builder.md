---
title: dialog-builder
---

<a name="module_dialog-builder"></a>

## dialog-builder

* [dialog-builder](#module_dialog-builder)
    * _static_
        * [.defaults](#module_dialog-builder.defaults)
        * [.setDefaults(options)](#module_dialog-builder.setDefaults)
        * [.init()](#module_dialog-builder.init)
        * [.setup()](#module_dialog-builder.setup)
        * [.setupBuilder(element)](#module_dialog-builder.setupBuilder)
        * [.buildModal(content, options)](#module_dialog-builder.buildModal)
    * _inner_
        * [~separateDialogOptions(config)](#module_dialog-builder..separateDialogOptions) ⇒ <code>Object</code>

<a name="module_dialog-builder.defaults"></a>

### dialog-builder.defaults
Default builder options (extends dialog defaults, watch name collisions)
- Decided to extend defaults so the interface in HTML is singular
  - This is sometimes easier to template (merging and serializing options 
    in twig for example)

**Kind**: static constant of [<code>dialog-builder</code>](#module_dialog-builder)  
<a name="module_dialog-builder.setDefaults"></a>

### dialog-builder.setDefaults(options)
**Kind**: static method of [<code>dialog-builder</code>](#module_dialog-builder)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Change options used as default for dialogs, can then be overriden by data attribute settings on element |

<a name="module_dialog-builder.init"></a>

### dialog-builder.init()
Initialize everything in document
- This will only initialize elements once, it is safe to call on page changes

**Kind**: static method of [<code>dialog-builder</code>](#module_dialog-builder)  
<a name="module_dialog-builder.setup"></a>

### dialog-builder.setup()
Query and setup all builder

**Kind**: static method of [<code>dialog-builder</code>](#module_dialog-builder)  
<a name="module_dialog-builder.setupBuilder"></a>

### dialog-builder.setupBuilder(element)
Build a dialog for the given content

**Kind**: static method of [<code>dialog-builder</code>](#module_dialog-builder)  

| Param | Type |
| --- | --- |
| element | <code>Node</code> | 

<a name="module_dialog-builder.buildModal"></a>

### dialog-builder.buildModal(content, options)
**Kind**: static method of [<code>dialog-builder</code>](#module_dialog-builder)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>Node</code> | Content element of the dialog (what is inserted into the body) |
| options | <code>Object</code> | Options for built dialog (see defaults) |

<a name="module_dialog-builder..separateDialogOptions"></a>

### dialog-builder~separateDialogOptions(config) ⇒ <code>Object</code>
Returns JSON string to embed in data-ulu-dialog for dialog handling

**Kind**: inner method of [<code>dialog-builder</code>](#module_dialog-builder)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | Config object to pull dialog specific settings from |


  