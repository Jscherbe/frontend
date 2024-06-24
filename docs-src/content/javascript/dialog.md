---
title: dialog
---

<a name="module_dialog"></a>

## dialog

* [dialog](#module_dialog)
    * [.attrs](#module_dialog.attrs)
    * [.defaults](#module_dialog.defaults)
    * [.setDefaults(options)](#module_dialog.setDefaults)
    * [.init()](#module_dialog.init)
    * [.setup()](#module_dialog.setup)
    * [.setupTrigger(trigger)](#module_dialog.setupTrigger)
    * [.setupDialog(dialog)](#module_dialog.setupDialog)
    * [.getDialogOptions(dialog)](#module_dialog.getDialogOptions) ⇒ <code>Object</code>

<a name="module_dialog.attrs"></a>

### dialog.attrs
Default data attributes

**Kind**: static constant of [<code>dialog</code>](#module_dialog)  
<a name="module_dialog.defaults"></a>

### dialog.defaults
Dialog Defaults 
- Can be overridden using data-attributes

**Kind**: static constant of [<code>dialog</code>](#module_dialog)  
<a name="module_dialog.setDefaults"></a>

### dialog.setDefaults(options)
**Kind**: static method of [<code>dialog</code>](#module_dialog)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Change options used as default for dialogs, can then be overriden by data attribute settings on element |

<a name="module_dialog.init"></a>

### dialog.init()
Initialize everything in document
- This will only initialize elements once, it is safe to call on page changes

**Kind**: static method of [<code>dialog</code>](#module_dialog)  
<a name="module_dialog.setup"></a>

### dialog.setup()
Setup dialogs, triggers and builder type dialogs

**Kind**: static method of [<code>dialog</code>](#module_dialog)  
<a name="module_dialog.setupTrigger"></a>

### dialog.setupTrigger(trigger)
Setup click handlers on a trigger

**Kind**: static method of [<code>dialog</code>](#module_dialog)  

| Param | Type |
| --- | --- |
| trigger | <code>Node</code> | 

<a name="module_dialog.setupDialog"></a>

### dialog.setupDialog(dialog)
Setup click handlers for a dialog

**Kind**: static method of [<code>dialog</code>](#module_dialog)  

| Param | Type |
| --- | --- |
| dialog | <code>Node</code> | 

<a name="module_dialog.getDialogOptions"></a>

### dialog.getDialogOptions(dialog) ⇒ <code>Object</code>
For a given dialog, get it's options (from data attribute)

**Kind**: static method of [<code>dialog</code>](#module_dialog)  

| Param | Type |
| --- | --- |
| dialog | <code>Node</code> | 


  