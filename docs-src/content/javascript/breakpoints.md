---
title: breakpoints
---

<a name="module_breakpoints"></a>

## breakpoints

* [breakpoints](#module_breakpoints)
    * _static_
        * [.BreakpointManager](#module_breakpoints.BreakpointManager)
            * [new exports.BreakpointManager(config)](#new_module_breakpoints.BreakpointManager_new)
            * [.onChange(callback)](#module_breakpoints.BreakpointManager+onChange)
            * [.removeOnChange(callback)](#module_breakpoints.BreakpointManager+removeOnChange)
            * [.getBreakpointInPsuedo()](#module_breakpoints.BreakpointManager+getBreakpointInPsuedo)
            * [.getBreakpointInProperty()](#module_breakpoints.BreakpointManager+getBreakpointInProperty)
            * [.getBreakpoint()](#module_breakpoints.BreakpointManager+getBreakpoint)
            * [.update()](#module_breakpoints.BreakpointManager+update)
            * [.at(name)](#module_breakpoints.BreakpointManager+at) ⇒ <code>Breakpoint</code>
    * _inner_
        * [~BreakpointDirection](#module_breakpoints..BreakpointDirection)
            * [.change()](#module_breakpoints..BreakpointDirection+change)
            * [._call()](#module_breakpoints..BreakpointDirection+_call)
            * [.getHandlers()](#module_breakpoints..BreakpointDirection+getHandlers)
            * [.add(handler)](#module_breakpoints..BreakpointDirection+add)
            * [.remove()](#module_breakpoints..BreakpointDirection+remove)
        * [~Breakpoint](#module_breakpoints..Breakpoint)
            * [._setDirection(direction, active)](#module_breakpoints..Breakpoint+_setDirection)
            * [.max(handler)](#module_breakpoints..Breakpoint+max)
            * [.min(handler)](#module_breakpoints..Breakpoint+min)
            * [.only(handler)](#module_breakpoints..Breakpoint+only)
            * [.remove(handler, direction)](#module_breakpoints..Breakpoint+remove)

<a name="module_breakpoints.BreakpointManager"></a>

### breakpoints.BreakpointManager
Class that provides method for retrieving and acting on breakpoints passed
from CSS (using element psuedo content prop)

**Kind**: static class of [<code>breakpoints</code>](#module_breakpoints)  

* [.BreakpointManager](#module_breakpoints.BreakpointManager)
    * [new exports.BreakpointManager(config)](#new_module_breakpoints.BreakpointManager_new)
    * [.onChange(callback)](#module_breakpoints.BreakpointManager+onChange)
    * [.removeOnChange(callback)](#module_breakpoints.BreakpointManager+removeOnChange)
    * [.getBreakpointInPsuedo()](#module_breakpoints.BreakpointManager+getBreakpointInPsuedo)
    * [.getBreakpointInProperty()](#module_breakpoints.BreakpointManager+getBreakpointInProperty)
    * [.getBreakpoint()](#module_breakpoints.BreakpointManager+getBreakpoint)
    * [.update()](#module_breakpoints.BreakpointManager+update)
    * [.at(name)](#module_breakpoints.BreakpointManager+at) ⇒ <code>Breakpoint</code>

<a name="new_module_breakpoints.BreakpointManager_new"></a>

#### new exports.BreakpointManager(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | Configruation object |
| config.order | <code>Array</code> | Array of strings that correspond to the breakpoints setup in the styles, Breakpoints from smallest to largest, defaults to [small, medium, large] |
| config.customProperty | <code>Array</code> | Property to grab breakpoint from (default is --breakpoint) |
| config.valueFromPsuedo | <code>Array</code> | Use the legacy method of grabbing breakpoint from psuedo element, default uses custom property |
| config.element | <code>Node</code> | The element to retrieve active breakpoint from stylesheet. (default is html) For using the old psuedo method, adjust this to document.body |
| config.psuedoSelector | <code>String</code> | Change psuedo selector used to get the breakpoint from the psuedo's content property |

<a name="module_breakpoints.BreakpointManager+onChange"></a>

#### breakpointManager.onChange(callback)
Add a callback for everytime a breakpoint changes
- Not recommended, possibly use to watch for changes, etc
- For more control use intance.at(name) with breakpoint methods

**Kind**: instance method of [<code>BreakpointManager</code>](#module_breakpoints.BreakpointManager)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function to call, passed one argument current instance which can be used to get information about breakpoints |

<a name="module_breakpoints.BreakpointManager+removeOnChange"></a>

#### breakpointManager.removeOnChange(callback)
Remove change callback

**Kind**: instance method of [<code>BreakpointManager</code>](#module_breakpoints.BreakpointManager)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function to remove |

<a name="module_breakpoints.BreakpointManager+getBreakpointInPsuedo"></a>

#### breakpointManager.getBreakpointInPsuedo()
Get breakpoint from a psuedo element

**Kind**: instance method of [<code>BreakpointManager</code>](#module_breakpoints.BreakpointManager)  
<a name="module_breakpoints.BreakpointManager+getBreakpointInProperty"></a>

#### breakpointManager.getBreakpointInProperty()
Get breakpoint from a custom property

**Kind**: instance method of [<code>BreakpointManager</code>](#module_breakpoints.BreakpointManager)  
<a name="module_breakpoints.BreakpointManager+getBreakpoint"></a>

#### breakpointManager.getBreakpoint()
Get breakpoint from element (design note: user could override prototype)

**Kind**: instance method of [<code>BreakpointManager</code>](#module_breakpoints.BreakpointManager)  
<a name="module_breakpoints.BreakpointManager+update"></a>

#### breakpointManager.update()
Updates the active breakpoint by checking the element and executes handlers on change

**Kind**: instance method of [<code>BreakpointManager</code>](#module_breakpoints.BreakpointManager)  
<a name="module_breakpoints.BreakpointManager+at"></a>

#### breakpointManager.at(name) ⇒ <code>Breakpoint</code>
Get a breakpoint by key

**Kind**: instance method of [<code>BreakpointManager</code>](#module_breakpoints.BreakpointManager)  
**Returns**: <code>Breakpoint</code> - Breakpoint to act on (see Breakpoint class)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the breakpoint to get |

<a name="module_breakpoints..BreakpointDirection"></a>

### breakpoints~BreakpointDirection
Used to handle a breakpoints direction's handler and state

**Kind**: inner class of [<code>breakpoints</code>](#module_breakpoints)  

* [~BreakpointDirection](#module_breakpoints..BreakpointDirection)
    * [.change()](#module_breakpoints..BreakpointDirection+change)
    * [._call()](#module_breakpoints..BreakpointDirection+_call)
    * [.getHandlers()](#module_breakpoints..BreakpointDirection+getHandlers)
    * [.add(handler)](#module_breakpoints..BreakpointDirection+add)
    * [.remove()](#module_breakpoints..BreakpointDirection+remove)

<a name="module_breakpoints..BreakpointDirection+change"></a>

#### breakpointDirection.change()
Change the state of the direction

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_breakpoints..BreakpointDirection)  
<a name="module_breakpoints..BreakpointDirection+_call"></a>

#### breakpointDirection.\_call()
Calls all functions in handlers or

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_breakpoints..BreakpointDirection)  
<a name="module_breakpoints..BreakpointDirection+getHandlers"></a>

#### breakpointDirection.getHandlers()
Returns handlers in normalized object format on/off

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_breakpoints..BreakpointDirection)  
<a name="module_breakpoints..BreakpointDirection+add"></a>

#### breakpointDirection.add(handler)
Adds a handler for the direction, optionally use object to add off state handler

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_breakpoints..BreakpointDirection)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> \| <code>Object</code> | Function to be executed when direction is active, read object description for on/off |
| handler.on | <code>function</code> \| <code>Object</code> | Function to be executed when direction is active |
| handler.off | <code>function</code> \| <code>Object</code> | Function to be executed when direction was active and is now changed to inactive |

<a name="module_breakpoints..BreakpointDirection+remove"></a>

#### breakpointDirection.remove()
Removes a handler

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_breakpoints..BreakpointDirection)  
<a name="module_breakpoints..Breakpoint"></a>

### breakpoints~Breakpoint
Single breakpoint management

**Kind**: inner class of [<code>breakpoints</code>](#module_breakpoints)  

* [~Breakpoint](#module_breakpoints..Breakpoint)
    * [._setDirection(direction, active)](#module_breakpoints..Breakpoint+_setDirection)
    * [.max(handler)](#module_breakpoints..Breakpoint+max)
    * [.min(handler)](#module_breakpoints..Breakpoint+min)
    * [.only(handler)](#module_breakpoints..Breakpoint+only)
    * [.remove(handler, direction)](#module_breakpoints..Breakpoint+remove)

<a name="module_breakpoints..Breakpoint+_setDirection"></a>

#### breakpoint.\_setDirection(direction, active)
Private method used inrternally for managing direction activation
- Each direction manages it's own state and handlers

**Kind**: instance method of [<code>Breakpoint</code>](#module_breakpoints..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| direction | <code>String</code> | The directional key |
| active | <code>Boolean</code> | State of that direction to set |

<a name="module_breakpoints..Breakpoint+max"></a>

#### breakpoint.max(handler)
Attach handler to be executed from the breakpoint and to all breakpoints below.
- If the browser resizes from a breakpoint below this breakpoint, 
  and above the breakpoint name specified, this handler will fire

**Kind**: instance method of [<code>Breakpoint</code>](#module_breakpoints..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Handler to be executed |

<a name="module_breakpoints..Breakpoint+min"></a>

#### breakpoint.min(handler)
Attach handler to be executed from the breakpoint and to all breakpoints below.
- If the browser resizes from a breakpoint above this breakpoint, 
  and below the breakpoint name specified, this handler will fire

**Kind**: instance method of [<code>Breakpoint</code>](#module_breakpoints..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Handler to be executed |

<a name="module_breakpoints..Breakpoint+only"></a>

#### breakpoint.only(handler)
Attach a handler to fire when the breakpoint is within the key

**Kind**: instance method of [<code>Breakpoint</code>](#module_breakpoints..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Handler to be executed |

<a name="module_breakpoints..Breakpoint+remove"></a>

#### breakpoint.remove(handler, direction)
Remove handler

**Kind**: instance method of [<code>Breakpoint</code>](#module_breakpoints..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Handler to be removed, extended on/off object style can be used |
| direction | <code>String</code> | Remove handler only from specified direction, else search all directions |


  