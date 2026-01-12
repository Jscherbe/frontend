---
title: ui/proxy-click
---

<a name="module_ui/proxy-click"></a>

# ui/proxy-click
Used for cards and things that look like they should be clickable 
even though the link in their content is the only clickable element. This way 
the entire cards content doesn't need to be in a link (which isn't accessible). 

The script allows only for clicks with a duration of 250ms to avoid conflict 
with a user selecting text. Works with either links or buttons because it just 
uses the elements .click(). Uses data-attributes for selection by default.


* [ui/proxy-click](#module_ui/proxy-click)
    * [.initializer](#module_ui/proxy-click.initializer)
    * [.defaults](#module_ui/proxy-click.defaults)
    * [.setDefaults(options)](#module_ui/proxy-click.setDefaults)
    * [.init()](#module_ui/proxy-click.init)
    * [.setupProxy(proxy, userOptions)](#module_ui/proxy-click.setupProxy)
    * [.attachHandlers(proxy, child, config)](#module_ui/proxy-click.attachHandlers)

<a name="module_ui/proxy-click.initializer"></a>

## ui/proxy-click.initializer
Proxy Click Component Initializer

**Kind**: static constant of [<code>ui/proxy-click</code>](#module_ui/proxy-click)  
<a name="module_ui/proxy-click.defaults"></a>

## ui/proxy-click.defaults
Default options

**Kind**: static constant of [<code>ui/proxy-click</code>](#module_ui/proxy-click)  
<a name="module_ui/proxy-click.setDefaults"></a>

## ui/proxy-click.setDefaults(options)
**Kind**: static method of [<code>ui/proxy-click</code>](#module_ui/proxy-click)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Change options used as default for dialogs, can then be overridden by data attribute settings on element |

<a name="module_ui/proxy-click.init"></a>

## ui/proxy-click.init()
Initialize everything in document
- This will only initialize elements once, it is safe to call on page changes

**Kind**: static method of [<code>ui/proxy-click</code>](#module_ui/proxy-click)  
<a name="module_ui/proxy-click.setupProxy"></a>

## ui/proxy-click.setupProxy(proxy, userOptions)
Setup a single proxy click

**Kind**: static method of [<code>ui/proxy-click</code>](#module_ui/proxy-click)  

| Param | Type | Description |
| --- | --- | --- |
| proxy | <code>Node</code> | The container who's click should proxy the click of inner element with options.selector (defaults to [data-ulu-proxy-click-source]) |
| userOptions | <code>Object</code> | Options to override defaults |

<a name="module_ui/proxy-click.attachHandlers"></a>

## ui/proxy-click.attachHandlers(proxy, child, config)
Main function for attaching behaviors that enable proxy click

**Kind**: static method of [<code>ui/proxy-click</code>](#module_ui/proxy-click)  

| Param | Type | Description |
| --- | --- | --- |
| proxy | <code>Node</code> | The container who's click should proxy the click of inner element with options.selector (defaults to [data-ulu-proxy-click-source]) |
| child | <code>Node</code> | The element who is being proxied and will get clicked if the proxy is clicked (as long as not an interactive element within proxy) |
| config | <code>Object</code> | Merged/final options object |


  