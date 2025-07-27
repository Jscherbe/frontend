---
title: utils/class-logger
---

<a name="module_utils/class-logger"></a>

# utils/class-logger

* [utils/class-logger](#module_utils/class-logger)
    * _static_
        * [.set(changes)](#module_utils/class-logger.set)
        * [.log(context, ...messages)](#module_utils/class-logger.log)
        * [.logWarning(context, ...messages)](#module_utils/class-logger.logWarning)
        * [.logError(context, ...messages)](#module_utils/class-logger.logError)
    * _inner_
        * [~config](#module_utils/class-logger..config)

<a name="module_utils/class-logger.set"></a>

## utils/class-logger.set(changes)
Changes to make to configuration

**Kind**: static method of [<code>utils/class-logger</code>](#module_utils/class-logger)  

| Param | Type |
| --- | --- |
| changes | <code>Object</code> | 

<a name="module_utils/class-logger.log"></a>

## utils/class-logger.log(context, ...messages)
Proxy Console.log

**Kind**: static method of [<code>utils/class-logger</code>](#module_utils/class-logger)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | Class instance (optional), will rely on classes (debug) property for output |
| ...messages | <code>any</code> |  |

<a name="module_utils/class-logger.logWarning"></a>

## utils/class-logger.logWarning(context, ...messages)
Proxy Console.warn

**Kind**: static method of [<code>utils/class-logger</code>](#module_utils/class-logger)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | Class instance (optional), will rely on classes (debug) property for output |
| ...messages | <code>any</code> |  |

<a name="module_utils/class-logger.logError"></a>

## utils/class-logger.logError(context, ...messages)
Proxy Console.error

**Kind**: static method of [<code>utils/class-logger</code>](#module_utils/class-logger)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | Class instance (optional), will rely on classes (debug) property for output |
| ...messages | <code>any</code> |  |

<a name="module_utils/class-logger..config"></a>

## utils/class-logger~config
Global Configuration Object

**Kind**: inner constant of [<code>utils/class-logger</code>](#module_utils/class-logger)  

  