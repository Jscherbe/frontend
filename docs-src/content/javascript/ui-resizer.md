---
title: ui/resizer
---

<a name="module_ui/resizer"></a>

# ui/resizer

* [ui/resizer](#module_ui/resizer)
    * _static_
        * [.Resizer](#module_ui/resizer.Resizer)
            * [new exports.Resizer(container, control, options)](#new_module_ui/resizer.Resizer_new)
            * [.destroy()](#module_ui/resizer.Resizer+destroy)
    * _inner_
        * [~multiplier](#module_ui/resizer..multiplier)
        * [~overrideMaxDimensions](#module_ui/resizer..overrideMaxDimensions)
        * [~fromX](#module_ui/resizer..fromX) : <code>&quot;left&quot;</code> \| <code>&quot;right&quot;</code> \| <code>null</code>
        * [~fromY](#module_ui/resizer..fromY) : <code>&quot;top&quot;</code> \| <code>&quot;bottom&quot;</code> \| <code>null</code>

<a name="module_ui/resizer.Resizer"></a>

## ui/resizer.Resizer
**Kind**: static class of [<code>ui/resizer</code>](#module_ui/resizer)  

* [.Resizer](#module_ui/resizer.Resizer)
    * [new exports.Resizer(container, control, options)](#new_module_ui/resizer.Resizer_new)
    * [.destroy()](#module_ui/resizer.Resizer+destroy)

<a name="new_module_ui/resizer.Resizer_new"></a>

### new exports.Resizer(container, control, options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| container | <code>Node</code> |  | Container to be resized |
| control | <code>Node</code> |  | Resize handle element |
| options | <code>Object</code> |  | Options to configure the resizer. |
| options.debug | <code>Boolean</code> |  | Enable non-essential debugging logs. |
| options.overrideMaxDimensions | <code>Boolean</code> |  | When script is activated by handle, remove the element's max-width/max-height and allow the resize to exceed them (default false). |
| [options.fromX] | <code>&quot;left&quot;</code> \| <code>&quot;right&quot;</code> \| <code>null</code> | <code></code> | Horizontal resizing direction. |
| [options.fromY] | <code>&quot;top&quot;</code> \| <code>&quot;bottom&quot;</code> \| <code>null</code> | <code></code> | Vertical resizing direction. |

<a name="module_ui/resizer.Resizer+destroy"></a>

### resizer.destroy()
Cleans up event listeners to prevent memory leaks.

**Kind**: instance method of [<code>Resizer</code>](#module_ui/resizer.Resizer)  
<a name="module_ui/resizer..multiplier"></a>

## ui/resizer~multiplier
Amount to increase size by (ie. pointer movement * multiplier)

**Kind**: inner property of [<code>ui/resizer</code>](#module_ui/resizer)  
<a name="module_ui/resizer..overrideMaxDimensions"></a>

## ui/resizer~overrideMaxDimensions
Remove max-width, max-height

**Kind**: inner property of [<code>ui/resizer</code>](#module_ui/resizer)  
<a name="module_ui/resizer..fromX"></a>

## ui/resizer~fromX : <code>&quot;left&quot;</code> \| <code>&quot;right&quot;</code> \| <code>null</code>
Specifies the horizontal edge from which resizing occurs.`null` means no horizontal resizing.- Default null

**Kind**: inner property of [<code>ui/resizer</code>](#module_ui/resizer)  
<a name="module_ui/resizer..fromY"></a>

## ui/resizer~fromY : <code>&quot;top&quot;</code> \| <code>&quot;bottom&quot;</code> \| <code>null</code>
Specifies the vertical edge from which resizing occurs.- `null` means no vertical resizing.- Default null

**Kind**: inner property of [<code>ui/resizer</code>](#module_ui/resizer)  

  