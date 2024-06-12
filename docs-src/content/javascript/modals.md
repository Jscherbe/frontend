---
title: modals
---

<a name="module_modals"></a>

## modals

* [modals](#module_modals)
    * [.setupModal(modal, settings)](#module_modals.setupModal)
    * [.show(id)](#module_modals.show)
    * [.close(id)](#module_modals.close)

<a name="module_modals.setupModal"></a>

### modals.setupModal(modal, settings)
Function to setup each modal
- Creates structure
- Gets settings from elements data attrite
- Moves it to the end of the document
- Adds resizer if position (left || right)

**Kind**: static method of [<code>modals</code>](#module_modals)  

| Param | Type | Description |
| --- | --- | --- |
| modal | <code>Node</code> | Modal element ie. `[data-site-modal]` |
| settings | <code>Object</code> | Custom settings object to merge, same interface as `[data-site-modal]` settings |

<a name="module_modals.show"></a>

### modals.show(id)
Open a modal

**Kind**: static method of [<code>modals</code>](#module_modals)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the modal to open |

<a name="module_modals.close"></a>

### modals.close(id)
Close a modal

**Kind**: static method of [<code>modals</code>](#module_modals)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the modal to open |


  