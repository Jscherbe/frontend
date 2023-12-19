---
title: helpers/css-breakpoint
---

<a name="module_helpers/css-breakpoint"></a>

## helpers/css-breakpoint

* [helpers/css-breakpoint](#module_helpers/css-breakpoint)
    * _static_
        * [.CssBreakpoints](#module_helpers/css-breakpoint.CssBreakpoints)
            * [new exports.CssBreakpoints(config)](#new_module_helpers/css-breakpoint.CssBreakpoints_new)
            * [.getBreakpoint()](#module_helpers/css-breakpoint.CssBreakpoints+getBreakpoint)
            * [.update()](#module_helpers/css-breakpoint.CssBreakpoints+update)
            * [.at(name)](#module_helpers/css-breakpoint.CssBreakpoints+at)
    * _inner_
        * [~BreakpointDirection](#module_helpers/css-breakpoint..BreakpointDirection)
            * [.change()](#module_helpers/css-breakpoint..BreakpointDirection+change)
            * [._call()](#module_helpers/css-breakpoint..BreakpointDirection+_call)
            * [.getHandlers()](#module_helpers/css-breakpoint..BreakpointDirection+getHandlers)
            * [.add(handler)](#module_helpers/css-breakpoint..BreakpointDirection+add)
            * [.remove()](#module_helpers/css-breakpoint..BreakpointDirection+remove)
        * [~Breakpoint](#module_helpers/css-breakpoint..Breakpoint)
            * [._setDirection(direction, active)](#module_helpers/css-breakpoint..Breakpoint+_setDirection)
            * [.max(handler)](#module_helpers/css-breakpoint..Breakpoint+max)
            * [.min(handler)](#module_helpers/css-breakpoint..Breakpoint+min)
            * [.only(handler)](#module_helpers/css-breakpoint..Breakpoint+only)
            * [.remove(handler, direction)](#module_helpers/css-breakpoint..Breakpoint+remove)

<a name="module_helpers/css-breakpoint.CssBreakpoints"></a>

### helpers/css-breakpoint.CssBreakpoints
Class that provides method for retrieving and acting on breakpoints passed
from CSS (using element psuedo content prop)

**Kind**: static class of [<code>helpers/css-breakpoint</code>](#module_helpers/css-breakpoint)  

* [.CssBreakpoints](#module_helpers/css-breakpoint.CssBreakpoints)
    * [new exports.CssBreakpoints(config)](#new_module_helpers/css-breakpoint.CssBreakpoints_new)
    * [.getBreakpoint()](#module_helpers/css-breakpoint.CssBreakpoints+getBreakpoint)
    * [.update()](#module_helpers/css-breakpoint.CssBreakpoints+update)
    * [.at(name)](#module_helpers/css-breakpoint.CssBreakpoints+at)

<a name="new_module_helpers/css-breakpoint.CssBreakpoints_new"></a>

#### new exports.CssBreakpoints(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | Configruation object |
| config.order | <code>Array</code> | Required, Array of strings that correspond to the breakpoints setup in the styles, Breakpoints from smallest to largest |
| config.element | <code>Node</code> | The element to retrieve active breakpoint from stylesheet  (default is body) |
| config.psuedoSelector | <code>String</code> | Change psuedo selector used to get the breakpoint from the psuedo's content property |

<a name="module_helpers/css-breakpoint.CssBreakpoints+getBreakpoint"></a>

#### cssBreakpoints.getBreakpoint()
Get breakpoint from element (design note: user could override prototype)

**Kind**: instance method of [<code>CssBreakpoints</code>](#module_helpers/css-breakpoint.CssBreakpoints)  
<a name="module_helpers/css-breakpoint.CssBreakpoints+update"></a>

#### cssBreakpoints.update()
Updates the active breakpoint by checking the element and executes handlers on change

**Kind**: instance method of [<code>CssBreakpoints</code>](#module_helpers/css-breakpoint.CssBreakpoints)  
<a name="module_helpers/css-breakpoint.CssBreakpoints+at"></a>

#### cssBreakpoints.at(name)
Get a breakpoint by key

**Kind**: instance method of [<code>CssBreakpoints</code>](#module_helpers/css-breakpoint.CssBreakpoints)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the breakpoint to get |

<a name="module_helpers/css-breakpoint..BreakpointDirection"></a>

### helpers/css-breakpoint~BreakpointDirection
Used to handle a breakpoints direction's handler and state

**Kind**: inner class of [<code>helpers/css-breakpoint</code>](#module_helpers/css-breakpoint)  

* [~BreakpointDirection](#module_helpers/css-breakpoint..BreakpointDirection)
    * [.change()](#module_helpers/css-breakpoint..BreakpointDirection+change)
    * [._call()](#module_helpers/css-breakpoint..BreakpointDirection+_call)
    * [.getHandlers()](#module_helpers/css-breakpoint..BreakpointDirection+getHandlers)
    * [.add(handler)](#module_helpers/css-breakpoint..BreakpointDirection+add)
    * [.remove()](#module_helpers/css-breakpoint..BreakpointDirection+remove)

<a name="module_helpers/css-breakpoint..BreakpointDirection+change"></a>

#### breakpointDirection.change()
Change the state of the direction

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_helpers/css-breakpoint..BreakpointDirection)  
<a name="module_helpers/css-breakpoint..BreakpointDirection+_call"></a>

#### breakpointDirection.\_call()
Calls all functions in handlers or

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_helpers/css-breakpoint..BreakpointDirection)  
<a name="module_helpers/css-breakpoint..BreakpointDirection+getHandlers"></a>

#### breakpointDirection.getHandlers()
Returns handlers in normalized object format on/off

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_helpers/css-breakpoint..BreakpointDirection)  
<a name="module_helpers/css-breakpoint..BreakpointDirection+add"></a>

#### breakpointDirection.add(handler)
Adds a handler for the direction, optionally use object to add off state handler

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_helpers/css-breakpoint..BreakpointDirection)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> \| <code>Object</code> | Function to be executed when direction is active, read object description for on/off |
| handler.on | <code>function</code> \| <code>Object</code> | Function to be executed when direction is active |
| handler.off | <code>function</code> \| <code>Object</code> | Function to be executed when direction was active and is now changed to inactive |

<a name="module_helpers/css-breakpoint..BreakpointDirection+remove"></a>

#### breakpointDirection.remove()
Removes a handler

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_helpers/css-breakpoint..BreakpointDirection)  
<a name="module_helpers/css-breakpoint..Breakpoint"></a>

### helpers/css-breakpoint~Breakpoint
Single breakpoint management

**Kind**: inner class of [<code>helpers/css-breakpoint</code>](#module_helpers/css-breakpoint)  

* [~Breakpoint](#module_helpers/css-breakpoint..Breakpoint)
    * [._setDirection(direction, active)](#module_helpers/css-breakpoint..Breakpoint+_setDirection)
    * [.max(handler)](#module_helpers/css-breakpoint..Breakpoint+max)
    * [.min(handler)](#module_helpers/css-breakpoint..Breakpoint+min)
    * [.only(handler)](#module_helpers/css-breakpoint..Breakpoint+only)
    * [.remove(handler, direction)](#module_helpers/css-breakpoint..Breakpoint+remove)

<a name="module_helpers/css-breakpoint..Breakpoint+_setDirection"></a>

#### breakpoint.\_setDirection(direction, active)
Private method used inrternally for managing direction activation
- Each direction manages it's own state and handlers

**Kind**: instance method of [<code>Breakpoint</code>](#module_helpers/css-breakpoint..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| direction | <code>String</code> | The directional key |
| active | <code>Boolean</code> | State of that direction to set |

<a name="module_helpers/css-breakpoint..Breakpoint+max"></a>

#### breakpoint.max(handler)
Attach handler to be executed from the breakpoint and to all breakpoints below.
- If the browser resizes from a breakpoint below this breakpoint, 
  and above the breakpoint name specified, this handler will fire

**Kind**: instance method of [<code>Breakpoint</code>](#module_helpers/css-breakpoint..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Handler to be executed |

<a name="module_helpers/css-breakpoint..Breakpoint+min"></a>

#### breakpoint.min(handler)
Attach handler to be executed from the breakpoint and to all breakpoints below.
- If the browser resizes from a breakpoint above this breakpoint, 
  and below the breakpoint name specified, this handler will fire

**Kind**: instance method of [<code>Breakpoint</code>](#module_helpers/css-breakpoint..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Handler to be executed |

<a name="module_helpers/css-breakpoint..Breakpoint+only"></a>

#### breakpoint.only(handler)
Attach a handler to fire when the breakpoint is within the key

**Kind**: instance method of [<code>Breakpoint</code>](#module_helpers/css-breakpoint..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Handler to be executed |

<a name="module_helpers/css-breakpoint..Breakpoint+remove"></a>

#### breakpoint.remove(handler, direction)
Remove handler

**Kind**: instance method of [<code>Breakpoint</code>](#module_helpers/css-breakpoint..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Handler to be removed, extended on/off object style can be used |
| direction | <code>String</code> | Remove handler only from specified direction, else search all directions |


  