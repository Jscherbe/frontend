---
title: ui/resizer
---

<a name="module_ui/resizer"></a>

# ui/resizer

* [ui/resizer](#module_ui/resizer)
    * _static_
        * [.Resizer](#module_ui/resizer.Resizer)
            * [new exports.Resizer(container, control, config)](#new_module_ui/resizer.Resizer_new)
            * [.destroy()](#module_ui/resizer.Resizer+destroy)
            * [.onPointerdown(e)](#module_ui/resizer.Resizer+onPointerdown)
            * [.onKeydown(e)](#module_ui/resizer.Resizer+onKeydown)
            * [.getAriaLabel()](#module_ui/resizer.Resizer+getAriaLabel) ⇒ <code>string</code>
            * [.dispatchEvent(type, [data])](#module_ui/resizer.Resizer+dispatchEvent)
    * _inner_
        * [~multiplier](#module_ui/resizer..multiplier)
        * [~overrideMaxDimensions](#module_ui/resizer..overrideMaxDimensions)
        * [~fromX](#module_ui/resizer..fromX) : <code>&quot;left&quot;</code> \| <code>&quot;right&quot;</code> \| <code>null</code>
        * [~fromY](#module_ui/resizer..fromY) : <code>&quot;top&quot;</code> \| <code>&quot;bottom&quot;</code> \| <code>null</code>
        * [~keyboardStep](#module_ui/resizer..keyboardStep)
        * [~keyboardDebounceTime](#module_ui/resizer..keyboardDebounceTime)
        * [~manageEvents](#module_ui/resizer..manageEvents)
        * [~manageAriaLabel](#module_ui/resizer..manageAriaLabel)
        * [~enablePointerResizing](#module_ui/resizer..enablePointerResizing)
        * [~enableKeyboardResizing](#module_ui/resizer..enableKeyboardResizing)

<a name="module_ui/resizer.Resizer"></a>

## ui/resizer.Resizer
Class for creating/controlling a container size with a handle/control

**Kind**: static class of [<code>ui/resizer</code>](#module_ui/resizer)  

* [.Resizer](#module_ui/resizer.Resizer)
    * [new exports.Resizer(container, control, config)](#new_module_ui/resizer.Resizer_new)
    * [.destroy()](#module_ui/resizer.Resizer+destroy)
    * [.onPointerdown(e)](#module_ui/resizer.Resizer+onPointerdown)
    * [.onKeydown(e)](#module_ui/resizer.Resizer+onKeydown)
    * [.getAriaLabel()](#module_ui/resizer.Resizer+getAriaLabel) ⇒ <code>string</code>
    * [.dispatchEvent(type, [data])](#module_ui/resizer.Resizer+dispatchEvent)

<a name="new_module_ui/resizer.Resizer_new"></a>

### new exports.Resizer(container, control, config)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| container | <code>Node</code> |  | Container to be resized |
| control | <code>HTMLElement</code> |  | Resize handle element (should be focusable like a button) |
| config | <code>Object</code> |  | Options to configure the resizer. |
| [config.debug] | <code>Boolean</code> | <code>false</code> | Enable non-essential debugging logs. |
| [config.multiplier] | <code>Boolean</code> | <code>1</code> | Amount to increase size by (ie. pointer movement * multiplier). |
| [config.overrideMaxDimensions] | <code>Boolean</code> | <code>false</code> | When script is activated by handle, remove the element's max-width/max-height and allow the resize to exceed them. |
| [config.fromX] | <code>&quot;left&quot;</code> \| <code>&quot;right&quot;</code> \| <code>null</code> | <code></code> | Horizontal resizing direction. |
| [config.fromY] | <code>&quot;top&quot;</code> \| <code>&quot;bottom&quot;</code> \| <code>null</code> | <code></code> | Vertical resizing direction. |
| [config.keyboardStep] | <code>number</code> | <code>10</code> | The step in pixels for keyboard resizing. |
| [config.keyboardDebounceTime] | <code>number</code> | <code>200</code> | Debounce time for keyboard resize end. |
| [config.manageEvents] | <code>boolean</code> | <code>true</code> | If true, the Resizer will automatically bind its own events. |
| [config.manageAriaLabel] | <code>boolean</code> | <code>false</code> | If true, the Resizer will manage the control's aria-label. |
| [config.enablePointerResizing] | <code>boolean</code> | <code>true</code> | If true, pointer events will enable resizing. |
| [config.enableKeyboardResizing] | <code>boolean</code> | <code>true</code> | If true, keyboard events will enable resizing. |

<a name="module_ui/resizer.Resizer+destroy"></a>

### resizer.destroy()
Cleans up event listeners and internal state to prevent memory leaks.

**Kind**: instance method of [<code>Resizer</code>](#module_ui/resizer.Resizer)  
<a name="module_ui/resizer.Resizer+onPointerdown"></a>

### resizer.onPointerdown(e)
Public handler for pointerdown events. Call this method from your own event listeners
if `manageEvents` is false. Its logic will only execute if `enablePointerResizing` is true.

**Kind**: instance method of [<code>Resizer</code>](#module_ui/resizer.Resizer)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>PointerEvent</code> | The pointerdown event. |

<a name="module_ui/resizer.Resizer+onKeydown"></a>

### resizer.onKeydown(e)
Public handler for keydown events. Call this method from your own event listeners
if `manageEvents` is false. Its logic will only execute if `enableKeyboardResizing` is true.

**Kind**: instance method of [<code>Resizer</code>](#module_ui/resizer.Resizer)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>KeyboardEvent</code> | The keydown event. |

<a name="module_ui/resizer.Resizer+getAriaLabel"></a>

### resizer.getAriaLabel() ⇒ <code>string</code>
Generates an accessible label for the resize control based on its configuration.
This is a convenience function that can be used by the consumer if `manageAriaLabel` is false.

**Kind**: instance method of [<code>Resizer</code>](#module_ui/resizer.Resizer)  
**Returns**: <code>string</code> - The suggested aria-label for the control.  
<a name="module_ui/resizer.Resizer+dispatchEvent"></a>

### resizer.dispatchEvent(type, [data])
Dispatches a custom event on the container element.

**Kind**: instance method of [<code>Resizer</code>](#module_ui/resizer.Resizer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | The event type (e.g., "resizer:start", "resizer:update", "resizer:end"). |
| [data] | <code>Object</code> | <code>{}</code> | Optional data to attach to the event's detail property. |

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
<a name="module_ui/resizer..keyboardStep"></a>

## ui/resizer~keyboardStep
The step in pixels for keyboard resizing with arrow keys.

**Kind**: inner property of [<code>ui/resizer</code>](#module_ui/resizer)  
<a name="module_ui/resizer..keyboardDebounceTime"></a>

## ui/resizer~keyboardDebounceTime
Debounce time in milliseconds for ending a keyboard resize.

**Kind**: inner property of [<code>ui/resizer</code>](#module_ui/resizer)  
<a name="module_ui/resizer..manageEvents"></a>

## ui/resizer~manageEvents
If true, the Resizer instance will automatically bind its own DOM event listeners
(pointerdown, keydown) to the control element. If `false`, the user is
responsible for calling `resizerInstance.onPointerdown(event)` and
`resizerInstance.onKeydown(event)` from their own listeners.
Default: true

**Kind**: inner property of [<code>ui/resizer</code>](#module_ui/resizer)  
<a name="module_ui/resizer..manageAriaLabel"></a>

## ui/resizer~manageAriaLabel
If true, the Resizer instance will automatically manage the `aria-label`
attribute of the control element. If `false`, the user is responsible
for setting this attribute.
Default: false

**Kind**: inner property of [<code>ui/resizer</code>](#module_ui/resizer)  
<a name="module_ui/resizer..enablePointerResizing"></a>

## ui/resizer~enablePointerResizing
If true, pointer events (mouse/touch) will enable resizing.
Default: true

**Kind**: inner property of [<code>ui/resizer</code>](#module_ui/resizer)  
<a name="module_ui/resizer..enableKeyboardResizing"></a>

## ui/resizer~enableKeyboardResizing
If true, keyboard events (arrow keys) will enable resizing.
Default: true

**Kind**: inner property of [<code>ui/resizer</code>](#module_ui/resizer)  

  