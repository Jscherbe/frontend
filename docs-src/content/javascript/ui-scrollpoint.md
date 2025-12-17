---
title: ui/scrollpoint
---

<a name="module_ui/scrollpoint"></a>

# ui/scrollpoint
Module that uses intersection observer to add scrollpoint like behavior.


* [ui/scrollpoint](#module_ui/scrollpoint)
    * _static_
        * [.Scrollpoint](#module_ui/scrollpoint.Scrollpoint)
            * [new exports.Scrollpoint(element, config)](#new_module_ui/scrollpoint.Scrollpoint_new)
            * [.onObserve()](#module_ui/scrollpoint.Scrollpoint+onObserve)
        * [.initializer](#module_ui/scrollpoint.initializer)
        * [.init()](#module_ui/scrollpoint.init)
    * _inner_
        * [~root](#module_ui/scrollpoint..root)
        * [~rootSelector](#module_ui/scrollpoint..rootSelector)
        * [~debug](#module_ui/scrollpoint..debug)
        * [~horizontal](#module_ui/scrollpoint..horizontal)
        * [~marginStart](#module_ui/scrollpoint..marginStart)
        * [~marginEnd](#module_ui/scrollpoint..marginEnd)
        * [~threshold](#module_ui/scrollpoint..threshold)
        * [~exit](#module_ui/scrollpoint..exit)
        * [~exitForward](#module_ui/scrollpoint..exitForward)
        * [~exitReverse](#module_ui/scrollpoint..exitReverse)
        * [~setClasses](#module_ui/scrollpoint..setClasses)
        * [~classPrefix](#module_ui/scrollpoint..classPrefix)
        * [~setAttribute](#module_ui/scrollpoint..setAttribute)
        * [~attributeName](#module_ui/scrollpoint..attributeName)
        * [~syncElements](#module_ui/scrollpoint..syncElements)
        * [~onChange()](#module_ui/scrollpoint..onChange)

<a name="module_ui/scrollpoint.Scrollpoint"></a>

## ui/scrollpoint.Scrollpoint
Single scrollpoint
- Note "forward" and "reverse" refer to scroll directions
  - forward = vertical below / horizontal right
  - reverse = vertical above / horizontal left

**Kind**: static class of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
**Todo**

- [ ] Convert margin to offset
- [ ] This only goes one direction


* [.Scrollpoint](#module_ui/scrollpoint.Scrollpoint)
    * [new exports.Scrollpoint(element, config)](#new_module_ui/scrollpoint.Scrollpoint_new)
    * [.onObserve()](#module_ui/scrollpoint.Scrollpoint+onObserve)

<a name="new_module_ui/scrollpoint.Scrollpoint_new"></a>

### new exports.Scrollpoint(element, config)
Setup a new scrollpoint


| Param | Type | Description |
| --- | --- | --- |
| element | <code>Node</code> | The element to create the scrollpoint for |
| config | <code>Object</code> | Options to configure the scrollpoint see Scrollpoint.defaults for more information on settings |

<a name="module_ui/scrollpoint.Scrollpoint+onObserve"></a>

### scrollpoint.onObserve()
IntersectionObserver Callback
- Should set the state

**Kind**: instance method of [<code>Scrollpoint</code>](#module_ui/scrollpoint.Scrollpoint)  
<a name="module_ui/scrollpoint.initializer"></a>

## ui/scrollpoint.initializer
Scrollpoint Component Initializer

**Kind**: static constant of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint.init"></a>

## ui/scrollpoint.init()
Initialize everything in document
- This will only initialize elements once, it is safe to call on page changes

**Kind**: static method of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..root"></a>

## ui/scrollpoint~root
Default observer root element

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..rootSelector"></a>

## ui/scrollpoint~rootSelector
Use a selector to select the observer root element

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..debug"></a>

## ui/scrollpoint~debug
Log debug info to console

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..horizontal"></a>

## ui/scrollpoint~horizontal
Change scroll orientation to horizontal

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..marginStart"></a>

## ui/scrollpoint~marginStart
Margin for observer top or left (depending on orientation)

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..marginEnd"></a>

## ui/scrollpoint~marginEnd
Margin for observer bottom or right (depending on orientation)

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..threshold"></a>

## ui/scrollpoint~threshold
Threshold for observer

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..exit"></a>

## ui/scrollpoint~exit
The point can exited (else persists)

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..exitForward"></a>

## ui/scrollpoint~exitForward
The point can exit from the end

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..exitReverse"></a>

## ui/scrollpoint~exitReverse
The point can exit from the start

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..setClasses"></a>

## ui/scrollpoint~setClasses
Set state classes

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..classPrefix"></a>

## ui/scrollpoint~classPrefix
Prefix for classes

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..setAttribute"></a>

## ui/scrollpoint~setAttribute
Set attribute for state (less verbose same info as classes)

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..attributeName"></a>

## ui/scrollpoint~attributeName
Attribute name to set state info in

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..syncElements"></a>

## ui/scrollpoint~syncElements
Elements that should also get active state info (classes or attributes)

**Kind**: inner property of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  
<a name="module_ui/scrollpoint..onChange"></a>

## ui/scrollpoint~onChange()
Callback called when state changes

**Kind**: inner method of [<code>ui/scrollpoint</code>](#module_ui/scrollpoint)  

  