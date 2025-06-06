---
title: ui/dialog
---

<a name="module_ui/dialog"></a>

# ui/dialog

* [ui/dialog](#module_ui/dialog)
    * _static_
        * [.baseAttribute](#module_ui/dialog.baseAttribute)
        * [.initializer](#module_ui/dialog.initializer)
        * [.closeAttribute](#module_ui/dialog.closeAttribute)
        * [.defaults](#module_ui/dialog.defaults)
        * [.setDefaults(options)](#module_ui/dialog.setDefaults)
        * [.init()](#module_ui/dialog.init)
        * [.setupTrigger(trigger, dialogId)](#module_ui/dialog.setupTrigger)
        * [.setupDialog(dialog)](#module_ui/dialog.setupDialog)
        * [.getDialogOptions(dialog)](#module_ui/dialog.getDialogOptions) ⇒ <code>Object</code>
    * _inner_
        * [~prepVideos()](#module_ui/dialog..prepVideos)
        * [~pauseVideos()](#module_ui/dialog..pauseVideos)

<a name="module_ui/dialog.baseAttribute"></a>

## ui/dialog.baseAttribute
Base attribute for a dialog

**Kind**: static constant of [<code>ui/dialog</code>](#module_ui/dialog)  
<a name="module_ui/dialog.initializer"></a>

## ui/dialog.initializer
Dialog Component Initializer

**Kind**: static constant of [<code>ui/dialog</code>](#module_ui/dialog)  
<a name="module_ui/dialog.closeAttribute"></a>

## ui/dialog.closeAttribute
Attribute for close buttons within a dialog

**Kind**: static constant of [<code>ui/dialog</code>](#module_ui/dialog)  
<a name="module_ui/dialog.defaults"></a>

## ui/dialog.defaults
Dialog Defaults 
- Can be overridden using data-attributes

**Kind**: static constant of [<code>ui/dialog</code>](#module_ui/dialog)  
<a name="module_ui/dialog.setDefaults"></a>

## ui/dialog.setDefaults(options)
**Kind**: static method of [<code>ui/dialog</code>](#module_ui/dialog)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Change options used as default for dialogs, can then be overridden by data attribute settings on element |

<a name="module_ui/dialog.init"></a>

## ui/dialog.init()
Initialize everything in document
- This will only initialize elements once, it is safe to call on page changes

**Kind**: static method of [<code>ui/dialog</code>](#module_ui/dialog)  
<a name="module_ui/dialog.setupTrigger"></a>

## ui/dialog.setupTrigger(trigger, dialogId)
Setup click handlers on a trigger

**Kind**: static method of [<code>ui/dialog</code>](#module_ui/dialog)  

| Param | Type | Description |
| --- | --- | --- |
| trigger | <code>Node</code> | Trigger button element |
| dialogId | <code>String</code> | The dialog's id to open |

<a name="module_ui/dialog.setupDialog"></a>

## ui/dialog.setupDialog(dialog)
Setup click handlers for a dialog

**Kind**: static method of [<code>ui/dialog</code>](#module_ui/dialog)  

| Param | Type |
| --- | --- |
| dialog | <code>Node</code> | 

<a name="module_ui/dialog.getDialogOptions"></a>

## ui/dialog.getDialogOptions(dialog) ⇒ <code>Object</code>
For a given dialog, get it's options (from data attribute)

**Kind**: static method of [<code>ui/dialog</code>](#module_ui/dialog)  

| Param | Type |
| --- | --- |
| dialog | <code>Node</code> | 

<a name="module_ui/dialog..prepVideos"></a>

## ui/dialog~prepVideos()
Pause native and youtube videos for a given dialog

**Kind**: inner method of [<code>ui/dialog</code>](#module_ui/dialog)  
<a name="module_ui/dialog..pauseVideos"></a>

## ui/dialog~pauseVideos()
Prep videos to be paused for a given dialog

**Kind**: inner method of [<code>ui/dialog</code>](#module_ui/dialog)  

  