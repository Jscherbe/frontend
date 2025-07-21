---
title: ui/modal-builder
---

<a name="module_ui/modal-builder"></a>

# ui/modal-builder
Note this module needs to be initialized before dialogs!


* [ui/modal-builder](#module_ui/modal-builder)
    * _static_
        * [.initializer](#module_ui/modal-builder.initializer)
        * [.setDefaults(options)](#module_ui/modal-builder.setDefaults)
        * [.init()](#module_ui/modal-builder.init)
        * [.buildModal(content, options)](#module_ui/modal-builder.buildModal)
    * _inner_
        * [~separateDialogOptions(config)](#module_ui/modal-builder..separateDialogOptions) ⇒ <code>Object</code>
        * [~DefaultModalOptions](#module_ui/modal-builder..DefaultModalOptions) ⇒ <code>string</code> \| <code>string</code> \| <code>string</code>

<a name="module_ui/modal-builder.initializer"></a>

## ui/modal-builder.initializer
Modal Builder Component Initializer

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

<a name="module_ui/modal-builder..DefaultModalOptions"></a>

## ui/modal-builder~DefaultModalOptions ⇒ <code>string</code> \| <code>string</code> \| <code>string</code>
Default builder options (extends dialog defaults, watch name collisions)
- Decided to extend defaults so the interface in HTML is singular
- This is sometimes easier to template (merging and serializing options
in twig for example)

**Kind**: inner typedef of [<code>ui/modal-builder</code>](#module_ui/modal-builder)  
**Returns**: <code>string</code> - The HTML string for the close icon.<code>string</code> - The HTML string for the resizer icon.<code>string</code> - Markup for the modal.  

| Param | Type | Description |
| --- | --- | --- |
| template.id | <code>string</code> | The ID for the new modal. |
| template.config | <code>DefaultModalOptions</code> | The resolved modal options. |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> \| <code>null</code> | The title of the modal. Defaults to `null`. |
| titleIcon | <code>string</code> \| <code>null</code> | The class name for an icon to display in the title. Defaults to `null`. |
| titleClass | <code>string</code> | Extra class/classes to add to title |
| titleId | <code>string</code> | Set the title id (to tie to a custom title implementation, if using built in title this will be set automatically) |
| nonModal | <code>boolean</code> | If `true`, the modal will not prevent interaction with elements behind it. Defaults to `false`. |
| documentEnd | <code>boolean</code> | If `true`, the modal will be appended to the end of the `document.body`. Defaults to `true`. |
| allowResize | <code>boolean</code> | If `true`, the modal will be resizable. Defaults to `false`. |
| position | <code>&quot;center&quot;</code> \| <code>&quot;top-left&quot;</code> \| <code>&quot;top-center&quot;</code> \| <code>&quot;top-right&quot;</code> \| <code>&quot;bottom-left&quot;</code> \| <code>&quot;bottom-center&quot;</code> \| <code>&quot;bottom-right&quot;</code> | The initial position of the modal. Defaults to `"center"`. |
| bodyFills | <code>boolean</code> | If `true`, the modal body will fill the available space. Defaults to `false`. |
| noBackdrop | <code>boolean</code> | If `true`, no backdrop will be displayed behind the modal. Defaults to `false`. |
| size | <code>&quot;default&quot;</code> \| <code>&quot;small&quot;</code> \| <code>&quot;large&quot;</code> \| <code>&quot;fullscreen&quot;</code> | The size of the modal. Defaults to `"default"`. |
| print | <code>boolean</code> | If `true`, the modal content will be optimized for printing. Defaults to `false`. |
| noMinHeight | <code>boolean</code> | If `true`, the modal will not have a minimum height. Defaults to `false`. |
| class | <code>string</code> | Additional CSS class(es) to add to the modal. Defaults to `""`. |
| baseClass | <code>string</code> | The base CSS class for the modal elements. Defaults to `"modal"`. |
| classCloseIcon | <code>string</code> | The class name for the close icon. Uses the wrapped setting string. |
| classResizerIcon | <code>string</code> | The class name for the resizer icon. Uses the wrapped setting string. |
| debug | <code>boolean</code> | Enables debug logging. Defaults to `false`. |
| templateCloseIcon | <code>function</code> | A function that returns the HTML for the close icon. |
| templateCloseIcon.config | <code>function</code> | The resolved modal configuration object. |
| templateResizerIcon | <code>function</code> | A function that returns the HTML for the resizer icon. |
| templateResizerIcon.config | <code>function</code> | The resolved modal configuration object. |
| template | <code>function</code> | The default modal template function. |


  