---
title: events
---

<a name="module_events"></a>

## events

* [events](#module_events)
    * _static_
        * [.dispatch(type, context)](#module_events.dispatch)
        * [.getName(type)](#module_events.getName) ⇒ <code>String</code>
    * _inner_
        * [~events](#module_events..events)

<a name="module_events.dispatch"></a>

### events.dispatch(type, context)
Triggers one of our custom events

**Kind**: static method of [<code>events</code>](#module_events)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Type of event to dispatch |
| context | <code>Node</code> | Element to trigger the event from |

**Example**  
```js
if (updatedMarkup) {
    dispatch("pageModified", modalElement);
  }
```
<a name="module_events.getName"></a>

### events.getName(type) ⇒ <code>String</code>
Namespaced event

**Kind**: static method of [<code>events</code>](#module_events)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Type of event to get the actual event name for |

<a name="module_events..events"></a>

### events~events
Event object - called on dispatch

**Kind**: inner constant of [<code>events</code>](#module_events)  

  