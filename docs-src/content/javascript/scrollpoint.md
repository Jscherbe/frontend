---
title: scrollpoint
---

<a name="module_scrollpoint"></a>

# scrollpoint

* [scrollpoint](#module_scrollpoint)
    * _static_
        * [.Scrollpoint](#module_scrollpoint.Scrollpoint)
            * [new exports.Scrollpoint(element, config)](#new_module_scrollpoint.Scrollpoint_new)
            * [.onObserve()](#module_scrollpoint.Scrollpoint+onObserve)
        * [.attrs](#module_scrollpoint.attrs)
        * [.init()](#module_scrollpoint.init)
        * [.setup()](#module_scrollpoint.setup)
    * _inner_
        * [~root](#module_scrollpoint..root)
        * [~rootSelector](#module_scrollpoint..rootSelector)
        * [~debug](#module_scrollpoint..debug)
        * [~horizontal](#module_scrollpoint..horizontal)
        * [~marginStart](#module_scrollpoint..marginStart)
        * [~marginEnd](#module_scrollpoint..marginEnd)
        * [~threshold](#module_scrollpoint..threshold)
        * [~exit](#module_scrollpoint..exit)
        * [~exitForward](#module_scrollpoint..exitForward)
        * [~exitReverse](#module_scrollpoint..exitReverse)
        * [~setClasses](#module_scrollpoint..setClasses)
        * [~classPrefix](#module_scrollpoint..classPrefix)
        * [~setAttribute](#module_scrollpoint..setAttribute)
        * [~attributeName](#module_scrollpoint..attributeName)
        * [~syncElements](#module_scrollpoint..syncElements)
        * [~onChange()](#module_scrollpoint..onChange)

<a name="module_scrollpoint.Scrollpoint"></a>

## scrollpoint.Scrollpoint
Single scrollpoint
- Note "forward" and "reverse" refer to scroll directions
  - forward = vertical below / horizontal right
  - reverse = vertical above / horizontal left

**Kind**: static class of [<code>scrollpoint</code>](#module_scrollpoint)  
**Todo**

- [ ] Convert margin to offset
- [ ] This only goes one direction


* [.Scrollpoint](#module_scrollpoint.Scrollpoint)
    * [new exports.Scrollpoint(element, config)](#new_module_scrollpoint.Scrollpoint_new)
    * [.onObserve()](#module_scrollpoint.Scrollpoint+onObserve)

<a name="new_module_scrollpoint.Scrollpoint_new"></a>

### new exports.Scrollpoint(element, config)
Setup a new scrollpoint


| Param | Type | Description |
| --- | --- | --- |
| element | <code>Node</code> | The element to create the scrollpoint for |
| config | <code>Object</code> | Options to configure the scrollpoint see Scrollpoint.defaults for more information on settings |

<a name="module_scrollpoint.Scrollpoint+onObserve"></a>

### scrollpoint.onObserve()
IntersectionObserver Callback
- Should set the state

**Kind**: instance method of [<code>Scrollpoint</code>](#module_scrollpoint.Scrollpoint)  
<a name="module_scrollpoint.attrs"></a>

## scrollpoint.attrs
Default data attributes

**Kind**: static constant of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint.init"></a>

## scrollpoint.init()
Initialize everything in document
- This will only initialize elements once, it is safe to call on page changes

**Kind**: static method of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint.setup"></a>

## scrollpoint.setup()
Setup all points and groups

**Kind**: static method of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..root"></a>

## scrollpoint~root
Default observer root element

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..rootSelector"></a>

## scrollpoint~rootSelector
Use a selector to select the observer root element

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..debug"></a>

## scrollpoint~debug
Log debug info to console

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..horizontal"></a>

## scrollpoint~horizontal
Change scroll orientation to horizontal

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..marginStart"></a>

## scrollpoint~marginStart
Margin for observer top or left (depending on orientation)

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..marginEnd"></a>

## scrollpoint~marginEnd
Margin for observer bottom or right (depending on orientation)

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..threshold"></a>

## scrollpoint~threshold
Threshold for observer

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..exit"></a>

## scrollpoint~exit
The point can exited (else persists)

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..exitForward"></a>

## scrollpoint~exitForward
The point can exit from the end

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..exitReverse"></a>

## scrollpoint~exitReverse
The point can exit from the start

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..setClasses"></a>

## scrollpoint~setClasses
Set state classes

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..classPrefix"></a>

## scrollpoint~classPrefix
Prefix for classes

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..setAttribute"></a>

## scrollpoint~setAttribute
Set attribute for state (less verbose same info as classes)

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..attributeName"></a>

## scrollpoint~attributeName
Attribute name to set state info in

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..syncElements"></a>

## scrollpoint~syncElements
Elements that should also get active state info (classes or attributes)

**Kind**: inner property of [<code>scrollpoint</code>](#module_scrollpoint)  
<a name="module_scrollpoint..onChange"></a>

## scrollpoint~onChange()
Callback called when state changes

**Kind**: inner method of [<code>scrollpoint</code>](#module_scrollpoint)  

  