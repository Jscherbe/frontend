---
title: ui/modals
---

<a name="module_ui/modals"></a>

## ui/modals

* [ui/modals](#module_ui/modals)
    * [.setupModal(modal, settings)](#module_ui/modals.setupModal)
    * [.show(id)](#module_ui/modals.show)
    * [.close(id)](#module_ui/modals.close)

<a name="module_ui/modals.setupModal"></a>

### ui/modals.setupModal(modal, settings)
Function to setup each modal
- Creates structure
- Gets settings from elements data attrite
- Moves it to the end of the document
- Adds resizer if position (left || right)

**Kind**: static method of [<code>ui/modals</code>](#module_ui/modals)  

| Param | Type | Description |
| --- | --- | --- |
| modal | <code>Node</code> | Modal element ie. `[data-site-modal]` |
| settings | <code>Object</code> | Custom settings object to merge, same interface as `[data-site-modal]` settings |

<a name="module_ui/modals.show"></a>

### ui/modals.show(id)
Open a modal

**Kind**: static method of [<code>ui/modals</code>](#module_ui/modals)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the modal to open |

<a name="module_ui/modals.close"></a>

### ui/modals.close(id)
Close a modal

**Kind**: static method of [<code>ui/modals</code>](#module_ui/modals)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the modal to open |


  