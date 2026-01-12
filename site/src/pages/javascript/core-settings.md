---
title: core/settings
---

<a name="module_core/settings"></a>

# core/settings
Internal implementation for managing shared configuration.


* [core/settings](#module_core/settings)
    * _static_
        * [.getDefaultSettings()](#module_core/settings.getDefaultSettings) ⇒ <code>object</code>
        * [.updateSettings(changes)](#module_core/settings.updateSettings)
        * [.getSettings()](#module_core/settings.getSettings) ⇒ <code>object</code>
        * [.getSetting(key)](#module_core/settings.getSetting) ⇒ <code>\*</code>
        * [.updateSetting(key, value)](#module_core/settings.updateSetting)
        * [.wrapSettingString(key, transform)](#module_core/settings.wrapSettingString) ⇒ <code>Object</code>
    * _inner_
        * [~defaults](#module_core/settings..defaults) : <code>Defaults</code>
        * [~Defaults](#module_core/settings..Defaults) : <code>object</code>

<a name="module_core/settings.getDefaultSettings"></a>

## core/settings.getDefaultSettings() ⇒ <code>object</code>
Retrieves a copy of the default settings.

**Kind**: static method of [<code>core/settings</code>](#module_core/settings)  
**Returns**: <code>object</code> - A copy of the default settings object.  
<a name="module_core/settings.updateSettings"></a>

## core/settings.updateSettings(changes)
Updates multiple configuration settings.

**Kind**: static method of [<code>core/settings</code>](#module_core/settings)  

| Param | Type | Description |
| --- | --- | --- |
| changes | <code>object</code> | An object containing the settings to update. |

<a name="module_core/settings.getSettings"></a>

## core/settings.getSettings() ⇒ <code>object</code>
Retrieves a copy of the current configuration settings.

**Kind**: static method of [<code>core/settings</code>](#module_core/settings)  
**Returns**: <code>object</code> - A copy of the current settings object.  
<a name="module_core/settings.getSetting"></a>

## core/settings.getSetting(key) ⇒ <code>\*</code>
Retrieves a specific configuration setting by key.

**Kind**: static method of [<code>core/settings</code>](#module_core/settings)  
**Returns**: <code>\*</code> - The value of the setting, or undefined if not found.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key of the setting to retrieve. |

<a name="module_core/settings.updateSetting"></a>

## core/settings.updateSetting(key, value)
Updates a specific configuration setting.

**Kind**: static method of [<code>core/settings</code>](#module_core/settings)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key of the setting to update. |
| value | <code>\*</code> | The new value for the setting. |

<a name="module_core/settings.wrapSettingString"></a>

## core/settings.wrapSettingString(key, transform) ⇒ <code>Object</code>
Creates a wrapped string representation of a configuration setting.
This function returns an object with a `toString()` method that, when called,
retrieves the current value of the specified setting. This allows the setting
to be used as a string literal, dynamically retrieving its value.

**Kind**: static method of [<code>core/settings</code>](#module_core/settings)  
**Returns**: <code>Object</code> - An object with a `toString()` method that returns the
(optionally transformed) setting value as a string.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The key of the setting to wrap. |
| transform | <code>function</code> | Optional function to transform the setting's value when its string representation is requested. |

<a name="module_core/settings..defaults"></a>

## core/settings~defaults : <code>Defaults</code>
**Kind**: inner constant of [<code>core/settings</code>](#module_core/settings)  
<a name="module_core/settings..Defaults"></a>

## core/settings~Defaults : <code>object</code>
Default settings

**Kind**: inner typedef of [<code>core/settings</code>](#module_core/settings)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| iconClassClose | <code>string</code> | The CSS class string for the close icon |
| iconClassDragX | <code>string</code> | The CSS class string for the drag X icon |
| iconClassDragBoth | <code>string</code> | The CSS class string for the dragging in both directions |
| iconClassPrevious | <code>string</code> | The CSS class string for the previous icon |
| iconClassNext | <code>string</code> | The CSS class string for the next icon |
| cssvarPrefix | <code>string</code> | The prefix to use for CSS custom properties |


  