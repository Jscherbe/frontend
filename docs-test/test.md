## Modules

<dl>
<dt><a href="#module_events">events</a></dt>
<dd></dd>
<dt><a href="#module_css-breakpoint">css-breakpoint</a></dt>
<dd></dd>
<dt><a href="#module_file-save">file-save</a></dt>
<dd></dd>
<dt><a href="#module_node-data-manager">node-data-manager</a></dt>
<dd></dd>
<dt><a href="#module_pause-youtube-video">pause-youtube-video</a></dt>
<dd></dd>
<dt><a href="#module_scrollbar-width-property">scrollbar-width-property</a></dt>
<dd></dd>
<dt><a href="#module_flipcard">flipcard</a></dt>
<dd></dd>
<dt><a href="#module_grid">grid</a></dt>
<dd></dd>
<dt><a href="#module_modals">modals</a></dt>
<dd></dd>
<dt><a href="#module_overflow-scroller-pager">overflow-scroller-pager</a></dt>
<dd></dd>
<dt><a href="#module_overflow-scroller">overflow-scroller</a></dt>
<dd></dd>
<dt><a href="#module_programmatic-modal">programmatic-modal</a></dt>
<dd></dd>
<dt><a href="#module_resizer">resizer</a></dt>
<dd></dd>
<dt><a href="#module_slider">slider</a></dt>
<dd></dd>
<dt><a href="#module_tabs">tabs</a></dt>
<dd></dd>
<dt><a href="#module_tooltip">tooltip</a></dt>
<dd></dd>
<dt><a href="#module_logger">logger</a></dt>
<dd></dd>
</dl>

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
Handles the actual event names being used (future could namespace)

**Kind**: static method of [<code>events</code>](#module_events)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Type of event to get the actual event name for |

<a name="module_events..events"></a>

### events~events
Event object - called on dispatch

**Kind**: inner constant of [<code>events</code>](#module_events)  
<a name="module_css-breakpoint"></a>

## css-breakpoint

* [css-breakpoint](#module_css-breakpoint)
    * _static_
        * [.CssBreakpoints](#module_css-breakpoint.CssBreakpoints)
            * [new exports.CssBreakpoints(config)](#new_module_css-breakpoint.CssBreakpoints_new)
            * [.getBreakpoint()](#module_css-breakpoint.CssBreakpoints+getBreakpoint)
            * [.update()](#module_css-breakpoint.CssBreakpoints+update)
            * [.at(name)](#module_css-breakpoint.CssBreakpoints+at)
    * _inner_
        * [~BreakpointDirection](#module_css-breakpoint..BreakpointDirection)
            * [.change()](#module_css-breakpoint..BreakpointDirection+change)
            * [._call()](#module_css-breakpoint..BreakpointDirection+_call)
            * [.getHandlers()](#module_css-breakpoint..BreakpointDirection+getHandlers)
            * [.add(handler)](#module_css-breakpoint..BreakpointDirection+add)
            * [.remove()](#module_css-breakpoint..BreakpointDirection+remove)
        * [~Breakpoint](#module_css-breakpoint..Breakpoint)
            * [._setDirection(direction, active)](#module_css-breakpoint..Breakpoint+_setDirection)
            * [.max(handler)](#module_css-breakpoint..Breakpoint+max)
            * [.min(handler)](#module_css-breakpoint..Breakpoint+min)
            * [.only(handler)](#module_css-breakpoint..Breakpoint+only)
            * [.remove(handler, direction)](#module_css-breakpoint..Breakpoint+remove)

<a name="module_css-breakpoint.CssBreakpoints"></a>

### css-breakpoint.CssBreakpoints
Class that provides method for retrieving and acting on breakpoints passed
from CSS (using element psuedo content prop)

**Kind**: static class of [<code>css-breakpoint</code>](#module_css-breakpoint)  

* [.CssBreakpoints](#module_css-breakpoint.CssBreakpoints)
    * [new exports.CssBreakpoints(config)](#new_module_css-breakpoint.CssBreakpoints_new)
    * [.getBreakpoint()](#module_css-breakpoint.CssBreakpoints+getBreakpoint)
    * [.update()](#module_css-breakpoint.CssBreakpoints+update)
    * [.at(name)](#module_css-breakpoint.CssBreakpoints+at)

<a name="new_module_css-breakpoint.CssBreakpoints_new"></a>

#### new exports.CssBreakpoints(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | Configruation object |
| config.order | <code>Array</code> | Required, Array of strings that correspond to the breakpoints setup in the styles, Breakpoints from smallest to largest |
| config.element | <code>Node</code> | The element to retrieve active breakpoint from stylesheet  (default is body) |
| config.psuedoSelector | <code>String</code> | Change psuedo selector used to get the breakpoint from the psuedo's content property |

<a name="module_css-breakpoint.CssBreakpoints+getBreakpoint"></a>

#### cssBreakpoints.getBreakpoint()
Get breakpoint from element (design note: user could override prototype)

**Kind**: instance method of [<code>CssBreakpoints</code>](#module_css-breakpoint.CssBreakpoints)  
<a name="module_css-breakpoint.CssBreakpoints+update"></a>

#### cssBreakpoints.update()
Updates the active breakpoint by checking the element and executes handlers on change

**Kind**: instance method of [<code>CssBreakpoints</code>](#module_css-breakpoint.CssBreakpoints)  
<a name="module_css-breakpoint.CssBreakpoints+at"></a>

#### cssBreakpoints.at(name)
Get a breakpoint by key

**Kind**: instance method of [<code>CssBreakpoints</code>](#module_css-breakpoint.CssBreakpoints)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the breakpoint to get |

<a name="module_css-breakpoint..BreakpointDirection"></a>

### css-breakpoint~BreakpointDirection
Used to handle a breakpoints direction's handler and state

**Kind**: inner class of [<code>css-breakpoint</code>](#module_css-breakpoint)  

* [~BreakpointDirection](#module_css-breakpoint..BreakpointDirection)
    * [.change()](#module_css-breakpoint..BreakpointDirection+change)
    * [._call()](#module_css-breakpoint..BreakpointDirection+_call)
    * [.getHandlers()](#module_css-breakpoint..BreakpointDirection+getHandlers)
    * [.add(handler)](#module_css-breakpoint..BreakpointDirection+add)
    * [.remove()](#module_css-breakpoint..BreakpointDirection+remove)

<a name="module_css-breakpoint..BreakpointDirection+change"></a>

#### breakpointDirection.change()
Change the state of the direction

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_css-breakpoint..BreakpointDirection)  
<a name="module_css-breakpoint..BreakpointDirection+_call"></a>

#### breakpointDirection.\_call()
Calls all functions in handlers or

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_css-breakpoint..BreakpointDirection)  
<a name="module_css-breakpoint..BreakpointDirection+getHandlers"></a>

#### breakpointDirection.getHandlers()
Returns handlers in normalized object format on/off

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_css-breakpoint..BreakpointDirection)  
<a name="module_css-breakpoint..BreakpointDirection+add"></a>

#### breakpointDirection.add(handler)
Adds a handler for the direction, optionally use object to add off state handler

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_css-breakpoint..BreakpointDirection)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> \| <code>Object</code> | Function to be executed when direction is active, read object description for on/off |
| handler.on | <code>function</code> \| <code>Object</code> | Function to be executed when direction is active |
| handler.off | <code>function</code> \| <code>Object</code> | Function to be executed when direction was active and is now changed to inactive |

<a name="module_css-breakpoint..BreakpointDirection+remove"></a>

#### breakpointDirection.remove()
Removes a handler

**Kind**: instance method of [<code>BreakpointDirection</code>](#module_css-breakpoint..BreakpointDirection)  
<a name="module_css-breakpoint..Breakpoint"></a>

### css-breakpoint~Breakpoint
Single breakpoint management

**Kind**: inner class of [<code>css-breakpoint</code>](#module_css-breakpoint)  

* [~Breakpoint](#module_css-breakpoint..Breakpoint)
    * [._setDirection(direction, active)](#module_css-breakpoint..Breakpoint+_setDirection)
    * [.max(handler)](#module_css-breakpoint..Breakpoint+max)
    * [.min(handler)](#module_css-breakpoint..Breakpoint+min)
    * [.only(handler)](#module_css-breakpoint..Breakpoint+only)
    * [.remove(handler, direction)](#module_css-breakpoint..Breakpoint+remove)

<a name="module_css-breakpoint..Breakpoint+_setDirection"></a>

#### breakpoint.\_setDirection(direction, active)
Private method used inrternally for managing direction activation
- Each direction manages it's own state and handlers

**Kind**: instance method of [<code>Breakpoint</code>](#module_css-breakpoint..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| direction | <code>String</code> | The directional key |
| active | <code>Boolean</code> | State of that direction to set |

<a name="module_css-breakpoint..Breakpoint+max"></a>

#### breakpoint.max(handler)
Attach handler to be executed from the breakpoint and to all breakpoints below.
- If the browser resizes from a breakpoint below this breakpoint, 
  and above the breakpoint name specified, this handler will fire

**Kind**: instance method of [<code>Breakpoint</code>](#module_css-breakpoint..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Handler to be executed |

<a name="module_css-breakpoint..Breakpoint+min"></a>

#### breakpoint.min(handler)
Attach handler to be executed from the breakpoint and to all breakpoints below.
- If the browser resizes from a breakpoint above this breakpoint, 
  and below the breakpoint name specified, this handler will fire

**Kind**: instance method of [<code>Breakpoint</code>](#module_css-breakpoint..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Handler to be executed |

<a name="module_css-breakpoint..Breakpoint+only"></a>

#### breakpoint.only(handler)
Attach a handler to fire when the breakpoint is within the key

**Kind**: instance method of [<code>Breakpoint</code>](#module_css-breakpoint..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Handler to be executed |

<a name="module_css-breakpoint..Breakpoint+remove"></a>

#### breakpoint.remove(handler, direction)
Remove handler

**Kind**: instance method of [<code>Breakpoint</code>](#module_css-breakpoint..Breakpoint)  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | Handler to be removed, extended on/off object style can be used |
| direction | <code>String</code> | Remove handler only from specified direction, else search all directions |

<a name="module_file-save"></a>

## file-save
<a name="module_node-data-manager"></a>

## node-data-manager

* [node-data-manager](#module_node-data-manager)
    * [module.exports](#exp_module_node-data-manager--module.exports) ⏏
        * _instance_
            * [.get(node, key)](#module_node-data-manager--module.exports+get)
            * [.set(node, key, value)](#module_node-data-manager--module.exports+set)
            * [.find()](#module_node-data-manager--module.exports+find)
            * [.destroy()](#module_node-data-manager--module.exports+destroy)
        * _static_
            * [.NodeDataStore](#module_node-data-manager--module.exports.NodeDataStore)

<a name="exp_module_node-data-manager--module.exports"></a>

### module.exports ⏏
Class that provides a method to store data based on node/element

**Kind**: Exported class  
<a name="module_node-data-manager--module.exports+get"></a>

#### module.exports.get(node, key)
Get data for an element/node

**Kind**: instance method of [<code>module.exports</code>](#exp_module_node-data-manager--module.exports)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>Node</code> |  | Html Node/Element to get data for |
| key | <code>String</code> \| <code>Boolean</code> | <code>false</code> | If key is passed, return that key's data for the element, if falsey return elements complete dataset |

<a name="module_node-data-manager--module.exports+set"></a>

#### module.exports.set(node, key, value)
Bind data to a specific Node/Element

**Kind**: instance method of [<code>module.exports</code>](#exp_module_node-data-manager--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node</code> | Html Node/Element to get data for |
| key | <code>String</code> | Key to save the data under |
| value | <code>\*</code> | Value to save |

<a name="module_node-data-manager--module.exports+find"></a>

#### module.exports.find()
Return an elements store object

**Kind**: instance method of [<code>module.exports</code>](#exp_module_node-data-manager--module.exports)  
<a name="module_node-data-manager--module.exports+destroy"></a>

#### module.exports.destroy()
Destroy all references to data and nodes/elements

**Kind**: instance method of [<code>module.exports</code>](#exp_module_node-data-manager--module.exports)  
<a name="module_node-data-manager--module.exports.NodeDataStore"></a>

#### module.exports.NodeDataStore
Child class that provides a store for one specific node/element

**Kind**: static class of [<code>module.exports</code>](#exp_module_node-data-manager--module.exports)  
<a name="module_pause-youtube-video"></a>

## pause-youtube-video

* [pause-youtube-video](#module_pause-youtube-video)
    * [.pauseVideos(context)](#module_pause-youtube-video.pauseVideos)
    * [.prepVideos()](#module_pause-youtube-video.prepVideos)

<a name="module_pause-youtube-video.pauseVideos"></a>

### pause-youtube-video.pauseVideos(context)
Somewhat hacky way to pause the video
- https://www.digitalredpanther.com/blog/play-pause-stop-youtube-embed
- Actual JS API documentation (Didn't follow this for now) (https://developers.google.com/youtube/iframe_api_reference)

**Kind**: static method of [<code>pause-youtube-video</code>](#module_pause-youtube-video)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Element</code> \| <code>Node</code> | The DOM element to search for and pause videos within |

<a name="module_pause-youtube-video.prepVideos"></a>

### pause-youtube-video.prepVideos()
Prep videos to be paused
- Add query parameters for js API
- Removes all other query parameters from iframe.src

**Kind**: static method of [<code>pause-youtube-video</code>](#module_pause-youtube-video)  
<a name="module_scrollbar-width-property"></a>

## scrollbar-width-property
<a name="exp_module_scrollbar-width-property--module.exports"></a>

### module.exports(element, container, propName) ⏏
Sets a CSS custom property equal to the scrollbar width

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Node</code> | The element that is the child of a scrollabel container |
| container | <code>Node</code> | The container that can be scrolled |
| propName | <code>Stirng</code> | Custom property to set |

<a name="module_flipcard"></a>

## flipcard
<a name="module_grid"></a>

## grid

* [grid](#module_grid)
    * [.init(selector, classes)](#module_grid.init)
    * [.setup(selector, classes)](#module_grid.setup)
    * [.setPositionClasses(parent, classes)](#module_grid.setPositionClasses)

<a name="module_grid.init"></a>

### grid.init(selector, classes)
Sets up document for grid position classes

**Kind**: static method of [<code>grid</code>](#module_grid)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | The selector for the parent element |
| classes | <code>Object</code> | Classes (optional) @see setPositionClasses |

<a name="module_grid.setup"></a>

### grid.setup(selector, classes)
Goes through document and finds elements that need to have positioning classes

**Kind**: static method of [<code>grid</code>](#module_grid)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | The selector for the parent element |
| classes | <code>Object</code> | Classes (optional) @see setPositionClasses |

<a name="module_grid.setPositionClasses"></a>

### grid.setPositionClasses(parent, classes)
Sets up the positonal classes that would come from the equal
  height module. Needs to be rerun by user when layout changes
  or new instances are added to the screen
  - Used for gutter crops
  - Used for rule placement
  - **Devs** Remember that default classes should match sass defaults

**Kind**: static method of [<code>grid</code>](#module_grid)  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>Node</code> | The grid parent <data-grid=""> |
| classes | <code>Object</code> | Override the default equal heights classes |

<a name="module_modals"></a>

## modals

* [modals](#module_modals)
    * [.setupModal(modal, settings)](#module_modals.setupModal)
    * [.show(id)](#module_modals.show)
    * [.close(id)](#module_modals.close)

<a name="module_modals.setupModal"></a>

### modals.setupModal(modal, settings)
Function to setup each modal
- Creates structure
- Gets settings from elements data attrite
- Moves it to the end of the document
- Adds resizer if position (left || right)

**Kind**: static method of [<code>modals</code>](#module_modals)  

| Param | Type | Description |
| --- | --- | --- |
| modal | <code>Node</code> | Modal element ie. `[data-site-modal]` |
| settings | <code>Object</code> | Custom settings object to merge, same interface as `[data-site-modal]` settings |

<a name="module_modals.show"></a>

### modals.show(id)
Open a modal

**Kind**: static method of [<code>modals</code>](#module_modals)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the modal to open |

<a name="module_modals.close"></a>

### modals.close(id)
Close a modal

**Kind**: static method of [<code>modals</code>](#module_modals)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The id of the modal to open |

<a name="module_overflow-scroller-pager"></a>

## overflow-scroller-pager
<a name="exp_module_overflow-scroller-pager--module.exports"></a>

### module.exports() ⇒ <code>function</code> ⏏
Function to be used in overflow scrollers "amount" option. This function will
determine how many items can fit in the viewport, taking into account scroll padding left, 
and will set the scroll amount to paginate between items. Items size can be anything 
(ie. one per screen vs 3.5 per screen will both work). This seperated from the plugin 
for tree shaking incase it's unneeded. Currently this is only setup for horizontal scrolling

Note: This is setup to return the function, incase configuration is needed in the future 
it can be passed to the create function

**Kind**: Exported function  
**Returns**: <code>function</code> - A function to be used in overflow scrollers "amount" configuration property  
<a name="module_overflow-scroller"></a>

## overflow-scroller
<a name="module_programmatic-modal"></a>

## programmatic-modal

* [programmatic-modal](#module_programmatic-modal)
    * [~newModal(args)](#module_programmatic-modal..newModal)
    * [~setModalId()](#module_programmatic-modal..setModalId)
    * [~newContainer()](#module_programmatic-modal..newContainer)
    * [~cacheTrigger()](#module_programmatic-modal..cacheTrigger)

<a name="module_programmatic-modal..newModal"></a>

### programmatic-modal~newModal(args)
Sets up a new ajax triggered modal and opens it

**Kind**: inner method of [<code>programmatic-modal</code>](#module_programmatic-modal)  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>String</code> | Arguments provided from Drupal (JSON format) |

<a name="module_programmatic-modal..setModalId"></a>

### programmatic-modal~setModalId()
Sets and returns the modal's id

**Kind**: inner method of [<code>programmatic-modal</code>](#module_programmatic-modal)  
<a name="module_programmatic-modal..newContainer"></a>

### programmatic-modal~newContainer()
Once we remove the placeholder containers id (above)
we create another programmatic placeholder container
for the next programmitic container

**Kind**: inner method of [<code>programmatic-modal</code>](#module_programmatic-modal)  
<a name="module_programmatic-modal..cacheTrigger"></a>

### programmatic-modal~cacheTrigger()
Document click handler, will cache the trigger that caused the modal to open

**Kind**: inner method of [<code>programmatic-modal</code>](#module_programmatic-modal)  
<a name="module_resizer"></a>

## resizer

* [resizer](#module_resizer)
    * [module.exports](#exp_module_resizer--module.exports) ⏏
        * [new module.exports(container, control, options)](#new_module_resizer--module.exports_new)

<a name="exp_module_resizer--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_resizer--module.exports_new"></a>

#### new module.exports(container, control, options)

| Param | Type | Description |
| --- | --- | --- |
| container | <code>Node</code> | Container to be resize |
| control | <code>Node</code> | Resize handle element |
| options | <code>Object</code> | Defualt can be changed on class |
| options.debug | <code>Boolean</code> | Enable non-essential debugging logs |
| options.overrideMaxWidth | <code>Boolean</code> | When script is activated by handle remove the elements max-width and allow the width of the resize to exceed the max (default false) |
| options.fromLeft | <code>Boolean</code> | The script should assume the handle is on the left side of the element |

<a name="module_slider"></a>

## slider
<a name="module_tabs"></a>

## tabs
<a name="module_tooltip"></a>

## tooltip
<a name="module_logger"></a>

## logger

* [logger](#module_logger)
    * _static_
        * [.set(changes)](#module_logger.set)
        * [.log(context, ...messages)](#module_logger.log)
        * [.logWarning(context, ...messages)](#module_logger.logWarning)
        * [.logError(context, ...messages)](#module_logger.logError)
    * _inner_
        * [~config](#module_logger..config)

<a name="module_logger.set"></a>

### logger.set(changes)
Changes to make to configuration

**Kind**: static method of [<code>logger</code>](#module_logger)  

| Param | Type |
| --- | --- |
| changes | <code>Object</code> | 

<a name="module_logger.log"></a>

### logger.log(context, ...messages)
Proxy Console.log

**Kind**: static method of [<code>logger</code>](#module_logger)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | Class instance (optional), will rely on classes (debug) property for output |
| ...messages | <code>any</code> |  |

<a name="module_logger.logWarning"></a>

### logger.logWarning(context, ...messages)
Proxy Console.warn

**Kind**: static method of [<code>logger</code>](#module_logger)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | Class instance (optional), will rely on classes (debug) property for output |
| ...messages | <code>any</code> |  |

<a name="module_logger.logError"></a>

### logger.logError(context, ...messages)
Proxy Console.error

**Kind**: static method of [<code>logger</code>](#module_logger)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | Class instance (optional), will rely on classes (debug) property for output |
| ...messages | <code>any</code> |  |

<a name="module_logger..config"></a>

### logger~config
Configuration Object

**Kind**: inner constant of [<code>logger</code>](#module_logger)  
