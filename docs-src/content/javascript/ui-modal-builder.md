---
title: ui/modal-builder
---

<a name="module_ui/modal-builder"></a>

# ui/modal-builder
Note this module needs to be initialized before dialogs!


* [ui/modal-builder](#module_ui/modal-builder)
    * _static_
        * [.initializer](#module_ui/modal-builder.initializer)
        * [.defaults](#module_ui/modal-builder.defaults)
        * [.setDefaults(options)](#module_ui/modal-builder.setDefaults)
        * [.init()](#module_ui/modal-builder.init)
        * [.buildModal(content, options)](#module_ui/modal-builder.buildModal)
    * _inner_
        * [~separateDialogOptions(config)](#module_ui/modal-builder..separateDialogOptions) ⇒ <code>Object</code>

<a name="module_ui/modal-builder.initializer"></a>

## ui/modal-builder.initializer
Modal Builder Component Initializer

**Kind**: static constant of [<code>ui/modal-builder</code>](#module_ui/modal-builder)  
<a name="module_ui/modal-builder.defaults"></a>

## ui/modal-builder.defaults
Default builder options (extends dialog defaults, watch name collisions)
- Decided to extend defaults so the interface in HTML is singular
  - This is sometimes easier to template (merging and serializing options 
    in twig for example)

**Kind**: static constant of [<code>ui/modal-builder</code>](#module_ui/modal-builder)  
<a name="module_ui/modal-builder.setDefaults"></a>

## ui/modal-builder.setDefaults(options)
**Kind**: static method of [<code>ui/modal-builder</code>](#module_ui/modal-builder)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Change options used as default for dialogs, can then be overridden by data attribute settings on element |

<a name="module_ui/modal-builder.init"></a>

## ui/modal-builder.init()
Initialize everything in document
- This will only initialize elements once, it is safe to call on page changes

**Kind**: static method of [<code>ui/modal-builder</code>](#module_ui/modal-builder)  
<a name="module_ui/modal-builder.buildModal"></a>

## ui/modal-builder.buildModal(content, options)
**Kind**: static method of [<code>ui/modal-builder</code>](#module_ui/modal-builder)  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>Node</code> | Content element of the dialog (what is inserted into the body) |
| options | <code>Object</code> | Options for built dialog (see defaults) |

<a name="module_ui/modal-builder..separateDialogOptions"></a>

## ui/modal-builder~separateDialogOptions(config) ⇒ <code>Object</code>
Returns JSON string to embed in data-ulu-dialog for dialog handling

**Kind**: inner method of [<code>ui/modal-builder</code>](#module_ui/modal-builder)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | Config object to pull dialog specific settings from |


  