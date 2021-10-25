
# Javascript Documentation



## Table of Contents

- [createOptions](#createoptions)
  * [Parameters](#parameters)
- [popperPositioning](#popperpositioning)
  * [Parameters](#parameters-1)
- [init](#init)
  * [Parameters](#parameters-2)
- [init](#init-1)
- [init](#init-2)
  * [Parameters](#parameters-3)
- [init](#init-3)
- [setTrapFocus](#settrapfocus)
  * [Parameters](#parameters-4)
- [setEscapeClose](#setescapeclose)
  * [Parameters](#parameters-5)
- [events](#events)
- [dispatch](#dispatch)
  * [Parameters](#parameters-6)
  * [Examples](#examples)
- [getName](#getname)
  * [Parameters](#parameters-7)
- [addEventListener](#addeventlistener)
- [CssBreakpoints](#cssbreakpoints)
  * [Parameters](#parameters-8)
  * [getBreakpoint](#getbreakpoint)
  * [update](#update)
  * [at](#at)
    + [Parameters](#parameters-9)
- [BreakpointDirection](#breakpointdirection)
  * [Parameters](#parameters-10)
  * [change](#change)
    + [Parameters](#parameters-11)
  * [\_call](#_call)
    + [Parameters](#parameters-12)
  * [getHandlers](#gethandlers)
    + [Parameters](#parameters-13)
  * [add](#add)
    + [Parameters](#parameters-14)
  * [remove](#remove)
    + [Parameters](#parameters-15)
- [Breakpoint](#breakpoint)
  * [Parameters](#parameters-16)
  * [\_setDirection](#_setdirection)
    + [Parameters](#parameters-17)
  * [max](#max)
    + [Parameters](#parameters-18)
  * [min](#min)
    + [Parameters](#parameters-19)
  * [only](#only)
    + [Parameters](#parameters-20)
  * [remove](#remove-1)
    + [Parameters](#parameters-21)
- [setup](#setup)
  * [Parameters](#parameters-22)
- [setPositionClasses](#setpositionclasses)
  * [Parameters](#parameters-23)
- [NodeDataManager](#nodedatamanager)
  * [get](#get)
    + [Parameters](#parameters-24)
  * [set](#set)
    + [Parameters](#parameters-25)
  * [find](#find)
    + [Parameters](#parameters-26)
  * [destroy](#destroy)
- [NodeDataStore](#nodedatastore)
  * [Parameters](#parameters-27)
- [onProxyClick](#onproxyclick)
  * [Parameters](#parameters-28)
  * [Examples](#examples-1)
- [setupModal](#setupmodal)
  * [Parameters](#parameters-29)
- [show](#show)
  * [Parameters](#parameters-30)
- [close](#close)
  * [Parameters](#parameters-31)
- [newModal](#newmodal)
  * [Parameters](#parameters-32)
- [setModalId](#setmodalid)
  * [Parameters](#parameters-33)
- [newContainer](#newcontainer)
- [cacheTrigger](#cachetrigger)
  * [Parameters](#parameters-34)
- [constructor](#constructor)
  * [Parameters](#parameters-35)
- [handleResize](#handleresize)
- [previous](#previous)
  * [Parameters](#parameters-36)
- [next](#next)
  * [Parameters](#parameters-37)
- [ensureTranstionEnds](#ensuretranstionends)
  * [Parameters](#parameters-38)
- [translateTo](#translateto)
  * [Parameters](#parameters-39)
- [setVisibility](#setvisibility)
  * [Parameters](#parameters-40)
- [fadeSlide](#fadeslide)
  * [Parameters](#parameters-41)
- [slideTransition](#slidetransition)
  * [Parameters](#parameters-42)
- [fadeTransition](#fadetransition)
  * [Parameters](#parameters-43)
- [noTransition](#notransition)
  * [Parameters](#parameters-44)
- [removeArrayElement](#removearrayelement)
  * [Parameters](#parameters-45)
- [offsetFindIndexOf](#offsetfindindexof)
  * [Parameters](#parameters-46)
- [getDirectDescandants](#getdirectdescandants)
  * [Parameters](#parameters-47)
- [isOverflownY](#isoverflowny)
  * [Parameters](#parameters-48)
- [isOverflown](#isoverflown)
  * [Parameters](#parameters-49)
- [getScrollParent](#getscrollparent)
  * [Parameters](#parameters-50)
  * [Examples](#examples-2)
- [documentHeight](#documentheight)
- [windowHeight](#windowheight)
- [windowWidth](#windowwidth)
- [browserWithPositionSticky](#browserwithpositionsticky)
- [createElementFromHtml](#createelementfromhtml)
  * [Parameters](#parameters-51)
- [composeElement](#composeelement)
  * [Parameters](#parameters-52)
- [config](#config)
- [set](#set-1)
  * [Parameters](#parameters-53)
- [log](#log)
  * [Parameters](#parameters-54)
- [logWarning](#logwarning)
  * [Parameters](#parameters-55)
- [logError](#logerror)
  * [Parameters](#parameters-56)
- [hasRequiredProps](#hasrequiredprops)
  * [Parameters](#parameters-57)
  * [Examples](#examples-3)
- [object](#object)
  * [Parameters](#parameters-58)
- [debounce](#debounce)
  * [Parameters](#parameters-59)
- [debounceAnimationFrame](#debounceanimationframe)
  * [Parameters](#parameters-60)
- [patterns](#patterns)
- [separateCssUnit](#separatecssunit)
  * [Parameters](#parameters-61)
- [stripTags](#striptags)
  * [Parameters](#parameters-62)
- [trimDoubleSpaces](#trimdoublespaces)
  * [Parameters](#parameters-63)
- [trimLineBreaks](#trimlinebreaks)
  * [Parameters](#parameters-64)
- [trimWhitespace](#trimwhitespace)
  * [Parameters](#parameters-65)
- [truncate](#truncate)
  * [Parameters](#parameters-66)
- [urlize](#urlize)
  * [Parameters](#parameters-67)
- [prettyDate](#prettydate)
  * [Parameters](#parameters-68)
- [randomString](#randomstring)
  * [Parameters](#parameters-69)
- [ElementWaypoint](#elementwaypoint)
  * [destroy](#destroy-1)
- [ElementWaypoint](#elementwaypoint-1)
  * [Parameters](#parameters-70)
  * [destroy](#destroy-2)

---

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## createOptions

Creates a new set of options, pass modifiers array seperately

*   Used to reduce complexity of mergining array's of reference object
*   Instead this function (factory) will create a new object for each modifiers
    so there is no possible issues upstream with duplicated references (ie. eventListeners)

### Parameters

*   `options` **[Object][1]** Popper options

## popperPositioning

Creates a popup position mechanism for a collapsible set

*   Note: if you are adding additional collapsibles to the page you
    will need to select them and pass their collaspible elements set to the
    init method provided in this functions return.

### Parameters

*   `cc` **[Object][1]** Collapsibles Instance
*   `options`  
*   `userOptions` **[Object][1]** Options object

    *   `userOptions.arrowEnabled` **[Boolean][2]** Enable arrow (creates arrow element automatically)
    *   `userOptions.arrowSize` **[Number][3]** Options object
    *   `userOptions.arrowClasses` **[String][4]** Classes to be added to the arrow for styling
    *   `userOptions.placementDataKey` **[String][4]** Data attribute to be selected without "data-", defualts to 'dropdown-placement'

Returns **[Object][1]** Interface to init new instances added to page, possibly more in the future

## init

Initialize a single popper/CC instance

### Parameters

*   `elements` **[Object][1]** Collapsible elements object

    *   `elements.toggle`  
    *   `elements.content`  
    *   `elements.container`  

## init

Minimal user interface is returned

## init

Sets up document for grid position classes

### Parameters

*   `selector` **[String][4]** The selector for the parent element (optional, default `"[data-grid]"`)
*   `classes` **[Object][1]** Classes (optional) @see setPositionClasses

## init

Intialize all modals on the page

*   can be used after AJAX adds content

## setTrapFocus

Attaches temporary ally handler for disabling
focus outside of the collapsible instance

### Parameters

*   `elements` **[Object][1]** 
*   `state` **[String][4]** 

## setEscapeClose

Attaches temporary handler for the escape key
while the collapsible is open. Removing it when
it closes.

### Parameters

*   `elements` **[Object][1]** 
*   `state` **[String][4]** 

## events

Event object - called on dispatch

## dispatch

Triggers one of our custom events

### Parameters

*   `type` **[String][4]** Type of event to dispatch
*   `context` **[Node][5]** Element to trigger the event from

### Examples

```javascript
if (updatedMarkup) {
    dispatch("pageModified", modalElement);
  }
```

## getName

Handles the actual event names being used (future could namespace)

### Parameters

*   `type` **[String][4]** Type of event to get the actual event name for

Returns **[String][4]** 

## addEventListener

Resize Handler to update breakpoints for all instances (Called after resize finished)

## CssBreakpoints

Class that provides method for retrieving and acting on breakpoints passed
from CSS (using element psuedo content prop)

### Parameters

*   `config` **[Object][1]** Configruation object

### getBreakpoint

Get breakpoint from element (design note: user could override prototype)

### update

Updates the active breakpoint by checking the element and executes handlers on change

### at

Get a breakpoint by key

#### Parameters

*   `name` **[String][4]** The name of the breakpoint to get

## BreakpointDirection

Used to handle a breakpoints direction's handler and state

### Parameters

*   `direction`  
*   `breakpoint`  

### change

Change the state of the direction

#### Parameters

*   `to`  

### \_call

Calls all functions in handlers or

#### Parameters

*   `forActive`  

### getHandlers

Returns handlers in normalized object format on/off

#### Parameters

*   `handler`  

### add

Adds a handler for the direction, optionally use object to add off state handler

#### Parameters

*   `handler` **([Function][6] | [Object][1])** Function to be executed when direction is active, read object description for on/off

    *   `handler.on` **([Function][6] | [Object][1])** Function to be executed when direction is active
    *   `handler.off` **([Function][6] | [Object][1])** Function to be executed when direction was active and is now changed to inactive

### remove

Removes a handler

#### Parameters

*   `handler`  

## Breakpoint

Single breakpoint management

### Parameters

*   `name`  
*   `manager`  

### \_setDirection

Private method used inrternally for managing direction activation

*   Each direction manages it's own state and handlers

#### Parameters

*   `direction` **[String][4]** The directional key
*   `active` **[Boolean][2]** State of that direction to set

### max

Attach handler to be executed from the breakpoint and to all breakpoints below.

*   If the browser resizes from a breakpoint below this breakpoint,
    and above the breakpoint name specified, this handler will fire

#### Parameters

*   `handler` **[Function][6]** Handler to be executed

### min

Attach handler to be executed from the breakpoint and to all breakpoints below.

*   If the browser resizes from a breakpoint above this breakpoint,
    and below the breakpoint name specified, this handler will fire

#### Parameters

*   `handler` **[Function][6]** Handler to be executed

### only

Attach a handler to fire when the breakpoint is within the key

#### Parameters

*   `handler` **[Function][6]** Handler to be executed

### remove

Remove handler

#### Parameters

*   `handler` **[Function][6]** Handler to be removed, extended on/off object style can be used
*   `direction` **[String][4]** Remove handler only from specified direction, else search all directions

## setup

Goes through document and finds elements that need to have positioning classes

### Parameters

*   `selector` **[String][4]** The selector for the parent element
*   `classes` **[Object][1]** Classes (optional) @see setPositionClasses

## setPositionClasses

Sets up the positonal classes that would come from the equal
height module. Needs to be rerun by user when layout changes
or new instances are added to the screen

### Parameters

*   `parent` **[Node][5]** The grid parent \<data-grid="">
*   `classes` **[Object][1]** Override the default equal heights classes (optional, default `{columnFirst:'position--column-first',columnLast:'position--column-last',rowFirst:'position--row-first',rowLast:'position--row-last'}`)

## NodeDataManager

Class that provides a method to store data based on node/element

### get

Get data for an element/node

#### Parameters

*   `node` **[Node][5]** Html Node/Element to get data for
*   `key` **([String][4] | [Boolean][2])** If key is passed, return that key's data for the element, if falsey return elements complete dataset (optional, default `false`)

### set

Bind data to a specific Node/Element

#### Parameters

*   `node` **[Node][5]** Html Node/Element to get data for
*   `key` **[String][4]** Key to save the data under
*   `value` **any** Value to save

### find

Return an elements store object

#### Parameters

*   `node`  

### destroy

Destroy all references to data and nodes/elements

## NodeDataStore

Child class that provides a store for one specific node/element

### Parameters

*   `node`  
*   `data`  

## onProxyClick

Click handler on everything on container

*   Determines if click was something that should be ignored (link, etc)

### Parameters

*   `$0` **[Object][1]** 

    *   `$0.target`  

##

Preliminary Notes:
Considerations for Accessiblity:

*   [https://webaim.org/standards/wcag/checklist][7]
*   [https://www.w3.org/TR/WCAG21/#on-focus][8]
*   [https://a11y-style-guide.com/style-guide/section-cards.html][9]
*   Reduced Motion
*   Percievable (interactive)
*   Final Descision
    *   Use a buttons
    *   Why?
        *   Can't use whole card surface as click
            *   Selections
            *   Other interactions
            *   How to make that make sense to SR
            *   Keyboard focuses and then clicks
            *   Accidental flipping on zoom
        *   Can't use hover
*   BRAINSTORM START:
    *   Don't use hover or focus (motor control issues)
        *   Needs to use click
    *   Run through screenreader expierence
        *   Hits button (reads title, click to reveal)
        *   Focuses the content button (reads content, backside, click to unreveal)
        *   NO BUTTONS CAN"T HAVE CONTENT, BUTTONS NEED TO STATE THEIR INTENT
    *   Try Again, Run through screenreader expierence
        *   Screen reader encounters flipcard
        *   Headline is read
        *   Button is read (reveal description)
        *   Button is clicked
        *   Content is shown and focused
        *   Button to flip back
    *   For Keybaord users
        *   The accessible buttons can be used or a click handler can be attached to the
            flipcard and given
    *   Why not always show the content to screenreaders?
        *   How to hide controls from them? (controls can't be hidden)
        *   How to not have events interfere click
        *   Maybe use a single control and make it say "jumpto definition"
            *   Kind of lame
        *   What about going back to focus and then attaching a click handler?
            *   Visual users will see the content on keyboard or mouse or touch
            *   We can reduce the motion with query
            *   Note: WCAG AAA - 1.4.13 Content on Hover or Focus
                *   Need to bind escape
            *   Mouse users and touch will need to click
            *   How does it focus and work on a screenreader?
        *   Cannot use FOCUS!
            *   [https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html][10]
            *   What if the user was zoomed? They may never see the title/front
    *   I think it MUST use buttons or a button to flip
        *   Because users need to be able to scroll, interact and select text in a back

### Examples

```javascript
html
       <div class="flipcard">
         <h3 class="flipcard__front">
           Term Name
           <button class="flipcard__toggle">
             <span class="hidden-visually">Show Definition</span>
           </button>
         </h3>
         <div class="flipcard__back">
           Some definiton example lorem ipsum et depsi anu olor.
           <button class="flipcard__toggle">
             <span class="hidden-visually">Hide Definition</span>
           </button>
         </div>
       </div>
```

## setupModal

Function to setup each modal

*   Creates structure
*   Gets settings from elements data attrite
*   Moves it to the end of the document
*   Adds resizer if position (left || right)

### Parameters

*   `modal` **[Node][5]** Modal element ie. `[data-site-modal]`
*   `settings` **[Object][1]** Custom settings object to merge, same interface as `[data-site-modal]` settings

## show

Open a modal

### Parameters

*   `id` **[String][4]** The id of the modal to open
*   `config`  

## close

Close a modal

### Parameters

*   `id` **[String][4]** The id of the modal to open

## newModal

Sets up a new ajax triggered modal and opens it

### Parameters

*   `args` **[String][4]** Arguments provided from Drupal (JSON format)

## setModalId

Sets and returns the modal's id

### Parameters

*   `element`  
*   `id`  

## newContainer

Once we remove the placeholder containers id (above)
we create another programmatic placeholder container
for the next programmitic container

## cacheTrigger

Document click handler, will cache the trigger that caused the modal to open

### Parameters

*   `event`  

## constructor

### Parameters

*   `container` **[Node][5]** Container to be resize
*   `control` **[Node][5]** Resize handle element
*   `options` **[Object][1]** Defualt can be changed on class

    *   `options.debug` **[Boolean][2]** Enable non-essential debugging logs
    *   `options.overrideMaxWidth` **[Boolean][2]** When script is activated by handle remove the elements max-width and allow the width of the resize to exceed the max (default false)
    *   `options.fromLeft` **[Boolean][2]** The script should assume the handle is on the left side of the element

## handleResize

Sliding mechanism needs translate updated on resize

## previous

Goto to the previous slide

### Parameters

*   `event`  

## next

Goto to the next slide

### Parameters

*   `event`  

## ensureTranstionEnds

Makes sure that no matter what the callback is called if transition event
doesn't start or fails to finish/cancel

### Parameters

*   `element` **[number][3]** 
*   `duration` **[number][3]** Duration to wait for complete
*   `beginTransition` **[Function][6]** Css changes to begin/start transtion

## translateTo

Translate the track to X

### Parameters

*   `x`  
*   `duration`  

## setVisibility

Show's a specifc slide and hides others, except when passing true to show all
then all slides will visible

### Parameters

*   `activeSlide`  
*   `showAll`  

## fadeSlide

Perform a fade on a single slide

### Parameters

*   `slide`  
*   `visible`  

## slideTransition

Handler for the entire slide transtion

### Parameters

*   `$0` **[Object][1]** 

    *   `$0.slide`  
    *   `$0.index`  
    *   `$0.old`  
    *   `$0.oldIndex`  

## fadeTransition

Handler for the entire fade transtion

### Parameters

*   `$0` **[Object][1]** 

    *   `$0.slide`  
    *   `$0.old`  

## noTransition

Handler for the entire NO transtion

### Parameters

*   `$0` **[Object][1]** 

    *   `$0.slide`  
    *   `$0.old`  

## removeArrayElement

Removes an array element (modifies array)

### Parameters

*   `array` **[Array][11]** Array to remove element from
*   `element` **[Element][12]** Array element to remove

## offsetFindIndexOf

Searches array for first item matching test, beginning at a start index but searching the entire array

### Parameters

*   `array` **[Array][11]** Array to search
*   `start` **[Number][3]** The index in the array to start the search from (optional, default `0`)
*   `callback` **[Function][6]** A test function that is passed array item and index*   Credit: (James Waddington) [https://stackoverflow.com/questions/28430348/how-to-loop-through-arrays-starting-at-different-index-while-still-looping-throu][13]

## getDirectDescandants

Returns an array of direct descendants

### Parameters

*   `element` **[Node][5]** 
*   `selector` **[String][4]** 

Returns **[Array][11]** 

## isOverflownY

Checks if element is overflown vertically

### Parameters

*   `element` **[Node][5]** 

Returns **[Boolean][2]** 

## isOverflown

Checks if element is overflown both vertically and horizontally

### Parameters

*   `element` **[Node][5]** 

Returns **[Boolean][2]** 

## getScrollParent

For a given element return the first parent that has scrollable overflow

*   Helpful for debugging position sticky

### Parameters

*   `node` **[Node][5]** Node to start search for first scrollable parent

### Examples

```javascript
const $navcontent = document.querySelector('.nav__content');
  if ($navcontent) {
    console.log(getScrollParent($navcontent));
  }
```

Returns **[Node][5]** 

## documentHeight

Returns reliable document height

Returns **[number][3]** 

## windowHeight

Returns reliable window height

Returns **[number][3]** 

## windowWidth

Returns reliable window width

Returns **[number][3]** 

## browserWithPositionSticky

Check browser support for position: sticky

*   [https://stackoverflow.com/questions/60214332/dynamically-detect-if-positionsticky-is-supported-by-the-browser][14]

Returns **[Boolean][2]** 

## createElementFromHtml

Returns Node List from HTML markup string

### Parameters

*   `markup` **[String][4]** HTML markup to create into an element

## composeElement

Creates a new element with attributes and children

### Parameters

*   `config` **[Object][1]** Configuration object

    *   `config.tag` **[String][4]** Node type (ie 'div')
    *   `config.attributes` **[Object][1]** Attributes to add to the new element
    *   `config.children` **[Array][11]** Array of children to append into the new element

## config

Configuration Object

## set

Changes to make to configuration

### Parameters

*   `changes` **[Object][1]** 

## log

Proxy Console.log

### Parameters

*   `context` **[Object][1]** Class instance (optional), will rely on classes (debug) property for output
*   `messages` **...any** 

## logWarning

Proxy Console.warn

### Parameters

*   `context` **[Object][1]** Class instance (optional), will rely on classes (debug) property for output
*   `messages` **...any** 

## logError

Proxy Console.error

### Parameters

*   `context` **[Object][1]** Class instance (optional), will rely on classes (debug) property for output
*   `messages` **...any** 

## hasRequiredProps

Checks object has required properties

### Parameters

*   `required` **array.string** Array of properties to check for

### Examples

```javascript
const testProps = hasRequiredProps(["name", "date"]);
    if (testProps(userConfiguration)) {
      // Stuff
    }
```

Returns **[function][6]** Function for user to use to test for props passed on objects

## object

Function used for testing on user end

### Parameters

*   `testObject` **[object][15]** Object to test on

Returns **[Boolean][2]** 

## debounce

Returns a function, that, as long as it continues to be invoked, will not be triggered

### Parameters

*   `callback` **[Function][6]** Function to invoke
*   `wait` **[Number][3]** Amount of time after (milliseconds)
*   `immediate` **[Boolean][2]** trigger the function on the leading edge, instead of the trailing.
*   `valueThis` **[Object][1]** Context for function

**Meta**

*   **author**: David Walsh  
      \- https://davidwalsh.name/javascript-debounce-function

## debounceAnimationFrame

Debounces function using requestAnimationFrame()

### Parameters

*   `callback` **[Function][6]** Function to invoke, cancelled if called faster than RAF
*   `context` **[Object][1]** Optional context to bind to callback (optional, default `null`)

## patterns

Common Regular Expression Patterns

## separateCssUnit

Will return an object with the separation details

### Parameters

*   `original`  
*   `string` **\[type]** \[description]

Returns **[object][15]** keys: value, original, unit

## stripTags

Removes HTML tags from string

*   Note you can use document.createElement and grab textContent (but this could execute code in browser)
*   The method below will just use regex without creating Nodes

### Parameters

*   `html` **[String][4]** HTML string to find/replace

## trimDoubleSpaces

### Parameters

*   `string` **[String][4]** String to trim

## trimLineBreaks

Remove line breaks

### Parameters

*   `string` **[String][4]** String to trim

Returns **[String][4]** 

## trimWhitespace

Designed originally to flatten style definitions

### Parameters

*   `string` **[String][4]** String to trim

Returns **[String][4]** 

## truncate

Truncates string with ellipsis if over the max, note use framework function
if you need to know the effects of the truncate process (returns an object
with info instead) this function only modifies the string

### Parameters

*   `string` **[string][4]** String to possibly truncate
*   `max` **[number][3]** How many characters max?
*   `overflowChar`   (optional, default `'…'`)

Returns **[string][4]** 

## urlize

Replaces non safe characters with "-"

*   Does not escape characters
*   Used for id's and classnames or things that can't  have anything but normal a-z 0-9

### Parameters

*   `string`  

## prettyDate

Converts date to abbreviated month date ie "Mar 7, 2018"

### Parameters

*   `str` **([String][4] | [Date][16])** Date or date string (passed through date constructor)

Returns **[String][4]** Pretty date string

## randomString

Generates a random string of defined length based on
a string of allowed characters.

### Parameters

*   `length` **[number][3]** How many random characters will be in the returned string. Defaults to 10 (optional, default `10`)
*   `allowed` **[string][4]** Which characters can be used when creating the random string. Defaults to A-Z,a-z,0-9 (optional, default `'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'`)

Returns **[string][4]** A string of random characters

## ElementWaypoint

### destroy

Destroys the waypoints

## ElementWaypoint

Reusable waypoint class that adds two waypoints in order to call user
handler when the element is in view or out of view.

### Parameters

*   `options` **[Object][1]** Options to merge with defaults

### destroy

Destroys the waypoints

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[5]: https://developer.mozilla.org/docs/Web/API/Node/nextSibling

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[7]: https://webaim.org/standards/wcag/checklist

[8]: https://www.w3.org/TR/WCAG21/#on-focus

[9]: https://a11y-style-guide.com/style-guide/section-cards.html

[10]: https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html

[11]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[12]: https://developer.mozilla.org/docs/Web/API/Element

[13]: https://stackoverflow.com/questions/28430348/how-to-loop-through-arrays-starting-at-different-index-while-still-looping-throu

[14]: https://stackoverflow.com/questions/60214332/dynamically-detect-if-positionsticky-is-supported-by-the-browser

[15]: #object

[16]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date
