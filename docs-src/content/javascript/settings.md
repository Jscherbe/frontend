---
title: settings
---

<a name="module_settings"></a>

# settings
Manages shared configuration for the library.


* [settings](#module_settings)
    * _static_
        * [.getDefaultSettings()](#module_settings.getDefaultSettings) ⇒ <code>object</code>
        * [.updateSettings(changes)](#module_settings.updateSettings)
        * [.getSettings()](#module_settings.getSettings) ⇒ <code>object</code>
        * [.getSetting(key)](#module_settings.getSetting) ⇒ <code>\*</code>
        * [.updateSetting(key, value)](#module_settings.updateSetting)
        * [.wrapSettingString(key, transform)](#module_settings.wrapSettingString) ⇒ <code>Object</code>
        * [.configureIcons()](#module_settings.configureIcons)
    * _inner_
        * [~defaults](#module_settings..defaults) : <code>Defaults</code>
        * [~Defaults](#module_settings..Defaults) : <code>object</code>

<a name="module_settings.getDefaultSettings"></a>

## settings.getDefaultSettings() ⇒ <code>object</code>
Retrieves a copy of the default settings.

**Kind**: static method of [<code>settings</code>](#module_settings)  
**Returns**: <code>object</code> - A copy of the default settings object.  
<a name="module_settings.updateSettings"></a>

## settings.updateSettings(changes)
Updates multiple configuration settings.

**Kind**: static method of [<code>settings</code>](#module_settings)  

| Param | Type | Description |
| --- | --- | --- |
| changes | <code>object</code> | An object containing the settings to update. |

<a name="module_settings.getSettings"></a>

## settings.getSettings() ⇒ <code>object</code>
Retrieves a copy of the current configuration settings.

**Kind**: static method of [<code>settings</code>](#module_settings)  
**Returns**: <code>object</code> - A copy of the current settings object.  
<a name="module_settings.getSetting"></a>

## settings.getSetting(key) ⇒ <code>\*</code>
Retrieves a specific configuration setting by key.

**Kind**: static method of [<code>settings</code>](#module_settings)  
**Returns**: <code>\*</code> - The value of the setting, or undefined if not found.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key of the setting to retrieve. |

<a name="module_settings.updateSetting"></a>

## settings.updateSetting(key, value)
Updates a specific configuration setting.

**Kind**: static method of [<code>settings</code>](#module_settings)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key of the setting to update. |
| value | <code>\*</code> | The new value for the setting. |

<a name="module_settings.wrapSettingString"></a>

## settings.wrapSettingString(key, transform) ⇒ <code>Object</code>
Creates a wrapped string representation of a configuration setting.
This function returns an object with a `toString()` method that, when called,
retrieves the current value of the specified setting. This allows the setting
to be used as a string literal, dynamically retrieving its value.

**Kind**: static method of [<code>settings</code>](#module_settings)  
**Returns**: <code>Object</code> - An object with a `toString()` method that returns the
(optionally transformed) setting value as a string.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The key of the setting to wrap. |
| transform | <code>function</code> | Optional function to transform the setting's value when its string representation is requested. |

<a name="module_settings.configureIcons"></a>

## settings.configureIcons()
Sets icon settings to Font Awesome icons

**Kind**: static method of [<code>settings</code>](#module_settings)  
<a name="module_settings..defaults"></a>

## settings~defaults : <code>Defaults</code>
**Kind**: inner constant of [<code>settings</code>](#module_settings)  
<a name="module_settings..Defaults"></a>

## settings~Defaults : <code>object</code>
Default settings

**Kind**: inner typedef of [<code>settings</code>](#module_settings)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| iconClassClose | <code>string</code> | The CSS class string for the close icon |
| iconClassDragX | <code>string</code> | The CSS class string for the drag X icon |
| iconClassDragBoth | <code>string</code> | The CSS class string for the dragging in both directions |
| iconClassPrevious | <code>string</code> | The CSS class string for the previous icon |
| iconClassNext | <code>string</code> | The CSS class string for the next icon |
| cssvarPrefix | <code>string</code> | The prefix to use for CSS custom properties |


  