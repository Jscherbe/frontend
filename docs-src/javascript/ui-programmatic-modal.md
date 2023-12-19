---
title: ui/programmatic-modal
---

<a name="module_ui/programmatic-modal"></a>

## ui/programmatic-modal

* [ui/programmatic-modal](#module_ui/programmatic-modal)
    * [~newModal(args)](#module_ui/programmatic-modal..newModal)
    * [~setModalId()](#module_ui/programmatic-modal..setModalId)
    * [~newContainer()](#module_ui/programmatic-modal..newContainer)
    * [~cacheTrigger()](#module_ui/programmatic-modal..cacheTrigger)

<a name="module_ui/programmatic-modal..newModal"></a>

### ui/programmatic-modal~newModal(args)
Sets up a new ajax triggered modal and opens it

**Kind**: inner method of [<code>ui/programmatic-modal</code>](#module_ui/programmatic-modal)  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>String</code> | Arguments provided from Drupal (JSON format) |

<a name="module_ui/programmatic-modal..setModalId"></a>

### ui/programmatic-modal~setModalId()
Sets and returns the modal's id

**Kind**: inner method of [<code>ui/programmatic-modal</code>](#module_ui/programmatic-modal)  
<a name="module_ui/programmatic-modal..newContainer"></a>

### ui/programmatic-modal~newContainer()
Once we remove the placeholder containers id (above)
we create another programmatic placeholder container
for the next programmitic container

**Kind**: inner method of [<code>ui/programmatic-modal</code>](#module_ui/programmatic-modal)  
<a name="module_ui/programmatic-modal..cacheTrigger"></a>

### ui/programmatic-modal~cacheTrigger()
Document click handler, will cache the trigger that caused the modal to open

**Kind**: inner method of [<code>ui/programmatic-modal</code>](#module_ui/programmatic-modal)  

  