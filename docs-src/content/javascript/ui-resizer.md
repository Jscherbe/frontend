---
title: ui/resizer
---

<a name="module_ui/resizer"></a>

# ui/resizer

* [ui/resizer](#module_ui/resizer)
    * _static_
        * [.Resizer](#module_ui/resizer.Resizer)
            * [new exports.Resizer(container, control, options)](#new_module_ui/resizer.Resizer_new)
            * [new exports.Resizer(container, control, options)](#new_module_ui/resizer.Resizer_new)
            * [.destroy()](#module_ui/resizer.Resizer+destroy)
            * [.onPointerdown(e)](#module_ui/resizer.Resizer+onPointerdown)
        * [.Resizer](#module_ui/resizer.Resizer)
            * [new exports.Resizer(container, control, options)](#new_module_ui/resizer.Resizer_new)
            * [new exports.Resizer(container, control, options)](#new_module_ui/resizer.Resizer_new)
            * [.destroy()](#module_ui/resizer.Resizer+destroy)
            * [.onPointerdown(e)](#module_ui/resizer.Resizer+onPointerdown)
    * _inner_
        * [~fromX](#module_ui/resizer..fromX) : <code>&quot;left&quot;</code> \| <code>&quot;right&quot;</code> \| <code>null</code>
        * [~fromY](#module_ui/resizer..fromY) : <code>&quot;top&quot;</code> \| <code>&quot;bottom&quot;</code> \| <code>null</code>

<a name="module_ui/resizer.Resizer"></a>

## ui/resizer.Resizer
**Kind**: static class of [<code>ui/resizer</code>](#module_ui/resizer)  

* [.Resizer](#module_ui/resizer.Resizer)
    * [new exports.Resizer(container, control, options)](#new_module_ui/resizer.Resizer_new)
    * [new exports.Resizer(container, control, options)](#new_module_ui/resizer.Resizer_new)
    * [.destroy()](#module_ui/resizer.Resizer+destroy)
    * [.onPointerdown(e)](#module_ui/resizer.Resizer+onPointerdown)

<a name="new_module_ui/resizer.Resizer_new"></a>

### new exports.Resizer(container, control, options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| container | <code>Node</code> |  | Container to be resized |
| control | <code>Node</code> |  | Resize handle element |
| options | <code>Object</code> |  | Options to configure the resizer. |
| options.debug | <code>Boolean</code> |  | Enable non-essential debugging logs. |
| options.overrideMaxDimensions | <code>Boolean</code> |  | When script is activated by handle, remove the element's max-width/max-height and allow the resize to exceed them (default false). |
| [options.fromX] | <code>&quot;left&quot;</code> \| <code>&quot;right&quot;</code> \| <code>null</code> | <code>&quot;right&quot;</code> | Horizontal resizing direction. |
| [options.fromY] | <code>&quot;top&quot;</code> \| <code>&quot;bottom&quot;</code> \| <code>null</code> | <code>&quot;bottom&quot;</code> | Vertical resizing direction. |

<a name="new_module_ui/resizer.Resizer_new"></a>

### new exports.Resizer(container, control, options)

| Param | Type | Description |
| --- | --- | --- |
| container | <code>Node</code> | Container to be resize |
| control | <code>Node</code> | Resize handle element |
| options | <code>Object</code> | Defualt can be changed on class |
| options.debug | <code>Boolean</code> | Enable non-essential debugging logs |
| options.overrideMaxWidth | <code>Boolean</code> | When script is activated by handle remove the elements max-width and allow the width of the resize to exceed the max (default false) |
| options.fromLeft | <code>Boolean</code> | The script should assume the handle is on the left side of the element |

<a name="module_ui/resizer.Resizer+destroy"></a>

### resizer.destroy()
Cleans up event listeners to prevent memory leaks.

**Kind**: instance method of [<code>Resizer</code>](#module_ui/resizer.Resizer)  
<a name="module_ui/resizer.Resizer+onPointerdown"></a>

### resizer.onPointerdown(e)
Handles the pointerdown event on the resize control.

**Kind**: instance method of [<code>Resizer</code>](#module_ui/resizer.Resizer)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>PointerEvent</code> | The pointerdown event. |

<a name="module_ui/resizer.Resizer"></a>

## ui/resizer.Resizer
**Kind**: static class of [<code>ui/resizer</code>](#module_ui/resizer)  

* [.Resizer](#module_ui/resizer.Resizer)
    * [new exports.Resizer(container, control, options)](#new_module_ui/resizer.Resizer_new)
    * [new exports.Resizer(container, control, options)](#new_module_ui/resizer.Resizer_new)
    * [.destroy()](#module_ui/resizer.Resizer+destroy)
    * [.onPointerdown(e)](#module_ui/resizer.Resizer+onPointerdown)

<a name="new_module_ui/resizer.Resizer_new"></a>

### new exports.Resizer(container, control, options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| container | <code>Node</code> |  | Container to be resized |
| control | <code>Node</code> |  | Resize handle element |
| options | <code>Object</code> |  | Options to configure the resizer. |
| options.debug | <code>Boolean</code> |  | Enable non-essential debugging logs. |
| options.overrideMaxDimensions | <code>Boolean</code> |  | When script is activated by handle, remove the element's max-width/max-height and allow the resize to exceed them (default false). |
| [options.fromX] | <code>&quot;left&quot;</code> \| <code>&quot;right&quot;</code> \| <code>null</code> | <code>&quot;right&quot;</code> | Horizontal resizing direction. |
| [options.fromY] | <code>&quot;top&quot;</code> \| <code>&quot;bottom&quot;</code> \| <code>null</code> | <code>&quot;bottom&quot;</code> | Vertical resizing direction. |

<a name="new_module_ui/resizer.Resizer_new"></a>

### new exports.Resizer(container, control, options)

| Param | Type | Description |
| --- | --- | --- |
| container | <code>Node</code> | Container to be resize |
| control | <code>Node</code> | Resize handle element |
| options | <code>Object</code> | Defualt can be changed on class |
| options.debug | <code>Boolean</code> | Enable non-essential debugging logs |
| options.overrideMaxWidth | <code>Boolean</code> | When script is activated by handle remove the elements max-width and allow the width of the resize to exceed the max (default false) |
| options.fromLeft | <code>Boolean</code> | The script should assume the handle is on the left side of the element |

<a name="module_ui/resizer.Resizer+destroy"></a>

### resizer.destroy()
Cleans up event listeners to prevent memory leaks.

**Kind**: instance method of [<code>Resizer</code>](#module_ui/resizer.Resizer)  
<a name="module_ui/resizer.Resizer+onPointerdown"></a>

### resizer.onPointerdown(e)
Handles the pointerdown event on the resize control.

**Kind**: instance method of [<code>Resizer</code>](#module_ui/resizer.Resizer)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>PointerEvent</code> | The pointerdown event. |

<a name="module_ui/resizer..fromX"></a>

## ui/resizer~fromX : <code>&quot;left&quot;</code> \| <code>&quot;right&quot;</code> \| <code>null</code>
Specifies the horizontal edge from which resizing occurs.`null` means no horizontal resizing.- Default null

**Kind**: inner property of [<code>ui/resizer</code>](#module_ui/resizer)  
<a name="module_ui/resizer..fromY"></a>

## ui/resizer~fromY : <code>&quot;top&quot;</code> \| <code>&quot;bottom&quot;</code> \| <code>null</code>
Specifies the vertical edge from which resizing occurs.- `null` means no vertical resizing.- Default null

**Kind**: inner property of [<code>ui/resizer</code>](#module_ui/resizer)  

  