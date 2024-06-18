---
title: programmatic-modal
---

<a name="module_programmatic-modal"></a>

## programmatic-modal

* [programmatic-modal](#module_programmatic-modal)
    * [~newModal(args)](#module_programmatic-modal..newModal)
    * [~setModalId()](#module_programmatic-modal..setModalId)
    * [~newContainer()](#module_programmatic-modal..newContainer)
    * [~cacheTrigger()](#module_programmatic-modal..cacheTrigger)

<a name="module_programmatic-modal..newModal"></a>

### programmatic-modal~newModal(args)
Sets up a new ajax triggered modal and opens it

**Kind**: inner method of [<code>programmatic-modal</code>](#module_programmatic-modal)  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>String</code> | Arguments provided from Drupal (JSON format) |

<a name="module_programmatic-modal..setModalId"></a>

### programmatic-modal~setModalId()
Sets and returns the modal's id

**Kind**: inner method of [<code>programmatic-modal</code>](#module_programmatic-modal)  
<a name="module_programmatic-modal..newContainer"></a>

### programmatic-modal~newContainer()
Once we remove the placeholder containers id (above)
we create another programmatic placeholder container
for the next programmitic container

**Kind**: inner method of [<code>programmatic-modal</code>](#module_programmatic-modal)  
<a name="module_programmatic-modal..cacheTrigger"></a>

### programmatic-modal~cacheTrigger()
Document click handler, will cache the trigger that caused the modal to open

**Kind**: inner method of [<code>programmatic-modal</code>](#module_programmatic-modal)  

  