---
title: core/events
---

<a name="module_core/events"></a>

# core/events
Internal implementation of global event handling.


* [core/events](#module_core/events)
    * _static_
        * [.dispatchCoreEvent(type, context)](#module_core/events.dispatchCoreEvent)
        * [.getUluEventName(type)](#module_core/events.getUluEventName) ⇒ <code>String</code>
        * [.getCoreEventName(type)](#module_core/events.getCoreEventName) ⇒ <code>String</code> \| <code>null</code>
        * [.createUluEvent(type, data, options)](#module_core/events.createUluEvent) ⇒ <code>CustomEvent</code>
    * _inner_
        * [~events](#module_core/events..events)
        * [~initResize()](#module_core/events..initResize)
        * [~initPrint()](#module_core/events..initPrint)

<a name="module_core/events.dispatchCoreEvent"></a>

## core/events.dispatchCoreEvent(type, context)
Triggers one of the predefined core lifecycle events.

**Kind**: static method of [<code>core/events</code>](#module_core/events)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Type of core event to dispatch. |
| context | <code>Node</code> | Element to trigger the event from. |

<a name="module_core/events.getUluEventName"></a>

## core/events.getUluEventName(type) ⇒ <code>String</code>
A general-purpose utility to get a ULU-namespaced event name.

**Kind**: static method of [<code>core/events</code>](#module_core/events)  
**Returns**: <code>String</code> - The `ulu:` prefixed event name.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | The base name for the event. |

<a name="module_core/events.getCoreEventName"></a>

## core/events.getCoreEventName(type) ⇒ <code>String</code> \| <code>null</code>
Safely gets the full namespaced name for a predefined core event.

**Kind**: static method of [<code>core/events</code>](#module_core/events)  
**Returns**: <code>String</code> \| <code>null</code> - The full event name if valid, otherwise null.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | The base name of the core event (e.g., 'pageModified'). |

<a name="module_core/events.createUluEvent"></a>

## core/events.createUluEvent(type, data, options) ⇒ <code>CustomEvent</code>
A general-purpose utility to create a ULU-namespaced CustomEvent.

**Kind**: static method of [<code>core/events</code>](#module_core/events)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Event base name. |
| data | <code>any</code> | Custom data to pass with the event. |
| options | <code>Object</code> | CustomEvent options. |

<a name="module_core/events..events"></a>

## core/events~events
Event object - called on dispatch

**Kind**: inner constant of [<code>core/events</code>](#module_core/events)  
<a name="module_core/events..initResize"></a>

## core/events~initResize()
Setup resize handler/dispatch

**Kind**: inner method of [<code>core/events</code>](#module_core/events)  
<a name="module_core/events..initPrint"></a>

## core/events~initPrint()
Setup print listeners

**Kind**: inner method of [<code>core/events</code>](#module_core/events)  

  