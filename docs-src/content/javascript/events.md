---
title: events
---

<a name="module_events"></a>

# events

* [events](#module_events)
    * _static_
        * [.dispatch(type, context)](#module_events.dispatch)
        * [.getName(type)](#module_events.getName) ⇒ <code>String</code>
        * [.createEvent(type, data, options)](#module_events.createEvent)
    * _inner_
        * [~events](#module_events..events)
            * [.pageModified()](#module_events..events.pageModified)
            * [.pageResized()](#module_events..events.pageResized)
            * [.beforePrint()](#module_events..events.beforePrint)
            * [.afterPrint()](#module_events..events.afterPrint)
        * [~initResize()](#module_events..initResize)
        * [~initPrint()](#module_events..initPrint)

<a name="module_events.dispatch"></a>

## events.dispatch(type, context)
Triggers one of our custom events (page/document level events)
- UI components may dispatch their own events, this is just used for system wide events

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

## events.getName(type) ⇒ <code>String</code>
Namespaced event
- Should be used for all ulu script/component events

**Kind**: static method of [<code>events</code>](#module_events)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Type of event to get the actual event name for |

<a name="module_events.createEvent"></a>

## events.createEvent(type, data, options)
Create ulu namespaced custom event

**Kind**: static method of [<code>events</code>](#module_events)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Event base name (not prefixed) |
| data | <code>any</code> | Custom data to pass with the event (will be available as `event.detail`) |
| options | <code>Object</code> | CustomEvent options default `{ bubbles: true }`. If `detail` is also provided, it will be merged with this options object and will override the 'data' argument for this function |

<a name="module_events..events"></a>

## events~events
Event object - called on dispatch

**Kind**: inner constant of [<code>events</code>](#module_events)  

* [~events](#module_events..events)
    * [.pageModified()](#module_events..events.pageModified)
    * [.pageResized()](#module_events..events.pageResized)
    * [.beforePrint()](#module_events..events.beforePrint)
    * [.afterPrint()](#module_events..events.afterPrint)

<a name="module_events..events.pageModified"></a>

### events.pageModified()
Event is dispatched when DOM in the page has changed, triggers updates from
all modules listening for the change (init instances, etc)
- Is triggered by modules that were responsible for modifying the page

**Kind**: static method of [<code>events</code>](#module_events..events)  
<a name="module_events..events.pageResized"></a>

### events.pageResized()
Event called when page is resized

**Kind**: static method of [<code>events</code>](#module_events..events)  
<a name="module_events..events.beforePrint"></a>

### events.beforePrint()
Event dispatched before page print begins (teardown/restructure/hide things)

**Kind**: static method of [<code>events</code>](#module_events..events)  
<a name="module_events..events.afterPrint"></a>

### events.afterPrint()
Event dispatched after page print (cleanup)

**Kind**: static method of [<code>events</code>](#module_events..events)  
<a name="module_events..initResize"></a>

## events~initResize()
Setup resize handler/dispatch

**Kind**: inner method of [<code>events</code>](#module_events)  
<a name="module_events..initPrint"></a>

## events~initPrint()
Setup print listeners
- Note: Tested with matchMedia but these events are more consistent
        Experimented with normalizing both events but they fired
        strangely, using any delay won't work (ie setTimeout / RAF)
        chrome pauses immediately javascript after the initial event.
        Reverting to a straightforward method for now. If this ends up
        needing something more robust we can work that out on this side
        and it won't change how the custom events file.

**Kind**: inner method of [<code>events</code>](#module_events)  

  