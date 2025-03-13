---
title: ui/theme-toggle
---

<a name="module_ui/theme-toggle"></a>

# ui/theme-toggle

* [ui/theme-toggle](#module_ui/theme-toggle)
    * _static_
        * [.attrs](#module_ui/theme-toggle.attrs)
        * [.defaults](#module_ui/theme-toggle.defaults)
        * [.setDefaults(options)](#module_ui/theme-toggle.setDefaults)
        * [.init()](#module_ui/theme-toggle.init)
        * [.setup()](#module_ui/theme-toggle.setup)
        * [.setupToggle(toggle)](#module_ui/theme-toggle.setupToggle)
            * [~toggleState()](#module_ui/theme-toggle.setupToggle..toggleState)
            * [~onToggleClick()](#module_ui/theme-toggle.setupToggle..onToggleClick)
            * [~attachRemotes()](#module_ui/theme-toggle.setupToggle..attachRemotes)
            * [~cleanupRemotes()](#module_ui/theme-toggle.setupToggle..cleanupRemotes)
            * [~destroy()](#module_ui/theme-toggle.setupToggle..destroy)
    * _inner_
        * [~setState()](#module_ui/theme-toggle..setState)
        * [~resolveInitial()](#module_ui/theme-toggle..resolveInitial) ⇒ <code>String</code>
        * [~getMatchingThemeQuery()](#module_ui/theme-toggle..getMatchingThemeQuery) ⇒ <code>String</code>
        * [~getNextThemeKey()](#module_ui/theme-toggle..getNextThemeKey)
        * [~getOtherThemes()](#module_ui/theme-toggle..getOtherThemes)
        * [~concatThemeClasses()](#module_ui/theme-toggle..concatThemeClasses)
        * [~getStorageKey()](#module_ui/theme-toggle..getStorageKey)

<a name="module_ui/theme-toggle.attrs"></a>

## ui/theme-toggle.attrs
Default data attributes

**Kind**: static constant of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  
<a name="module_ui/theme-toggle.defaults"></a>

## ui/theme-toggle.defaults
Default Options 
- Can be overridden using data-attributes

**Kind**: static constant of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  
<a name="module_ui/theme-toggle.setDefaults"></a>

## ui/theme-toggle.setDefaults(options)
**Kind**: static method of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Change options used as default for dialogs, can then be overridden by data attribute settings on element |

<a name="module_ui/theme-toggle.init"></a>

## ui/theme-toggle.init()
Initialize everything in document
- This will only initialize elements once, it is safe to call on page changes

**Kind**: static method of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  
<a name="module_ui/theme-toggle.setup"></a>

## ui/theme-toggle.setup()
Query and setup all

**Kind**: static method of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  
<a name="module_ui/theme-toggle.setupToggle"></a>

## ui/theme-toggle.setupToggle(toggle)
Sets up a single toggle

**Kind**: static method of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  

| Param | Type | Description |
| --- | --- | --- |
| toggle | <code>HTMLElement</code> | A toggle to be setup |


* [.setupToggle(toggle)](#module_ui/theme-toggle.setupToggle)
    * [~toggleState()](#module_ui/theme-toggle.setupToggle..toggleState)
    * [~onToggleClick()](#module_ui/theme-toggle.setupToggle..onToggleClick)
    * [~attachRemotes()](#module_ui/theme-toggle.setupToggle..attachRemotes)
    * [~cleanupRemotes()](#module_ui/theme-toggle.setupToggle..cleanupRemotes)
    * [~destroy()](#module_ui/theme-toggle.setupToggle..destroy)

<a name="module_ui/theme-toggle.setupToggle..toggleState"></a>

### setupToggle~toggleState()
Instance function to get the next theme in cycle

**Kind**: inner method of [<code>setupToggle</code>](#module_ui/theme-toggle.setupToggle)  
<a name="module_ui/theme-toggle.setupToggle..onToggleClick"></a>

### setupToggle~onToggleClick()
Handler for click for both toggle and remote toggles

**Kind**: inner method of [<code>setupToggle</code>](#module_ui/theme-toggle.setupToggle)  
<a name="module_ui/theme-toggle.setupToggle..attachRemotes"></a>

### setupToggle~attachRemotes()
Utility to attach remote handlers
- Used initially and when page is modified

**Kind**: inner method of [<code>setupToggle</code>](#module_ui/theme-toggle.setupToggle)  
<a name="module_ui/theme-toggle.setupToggle..cleanupRemotes"></a>

### setupToggle~cleanupRemotes()
This only cleans up remotes that are still in DOM
- For ones that have been removed we don't store any references to them

**Kind**: inner method of [<code>setupToggle</code>](#module_ui/theme-toggle.setupToggle)  
<a name="module_ui/theme-toggle.setupToggle..destroy"></a>

### setupToggle~destroy()
Function to cleanup listeners and remove init attributes

**Kind**: inner method of [<code>setupToggle</code>](#module_ui/theme-toggle.setupToggle)  
<a name="module_ui/theme-toggle..setState"></a>

## ui/theme-toggle~setState()
Change the state of target/toggle

**Kind**: inner method of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  
<a name="module_ui/theme-toggle..resolveInitial"></a>

## ui/theme-toggle~resolveInitial() ⇒ <code>String</code>
Function determines what the initial state is
- Check OS preference, saved preference, or initialState depending on options

**Kind**: inner method of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  
**Returns**: <code>String</code> - The resolved initial theme's key  
<a name="module_ui/theme-toggle..getMatchingThemeQuery"></a>

## ui/theme-toggle~getMatchingThemeQuery() ⇒ <code>String</code>
Check each theme for a matching media query

**Kind**: inner method of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  
**Returns**: <code>String</code> - Matching theme key  
<a name="module_ui/theme-toggle..getNextThemeKey"></a>

## ui/theme-toggle~getNextThemeKey()
Get the next key in the themes based on the currentKey

**Kind**: inner method of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  
<a name="module_ui/theme-toggle..getOtherThemes"></a>

## ui/theme-toggle~getOtherThemes()
Get all other theme object except the current

**Kind**: inner method of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  
<a name="module_ui/theme-toggle..concatThemeClasses"></a>

## ui/theme-toggle~concatThemeClasses()
Concatenates multiple class properties into one array

**Kind**: inner method of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  
<a name="module_ui/theme-toggle..getStorageKey"></a>

## ui/theme-toggle~getStorageKey()
Creates the storage key (either prefix or prefix with group name)

**Kind**: inner method of [<code>ui/theme-toggle</code>](#module_ui/theme-toggle)  

  