---
title: utils/logger
---

<a name="module_utils/logger"></a>

## utils/logger

* [utils/logger](#module_utils/logger)
    * _static_
        * [.set(changes)](#module_utils/logger.set)
        * [.log(context, ...messages)](#module_utils/logger.log)
        * [.logWarning(context, ...messages)](#module_utils/logger.logWarning)
        * [.logError(context, ...messages)](#module_utils/logger.logError)
    * _inner_
        * [~config](#module_utils/logger..config)

<a name="module_utils/logger.set"></a>

### utils/logger.set(changes)
Changes to make to configuration

**Kind**: static method of [<code>utils/logger</code>](#module_utils/logger)  

| Param | Type |
| --- | --- |
| changes | <code>Object</code> | 

<a name="module_utils/logger.log"></a>

### utils/logger.log(context, ...messages)
Proxy Console.log

**Kind**: static method of [<code>utils/logger</code>](#module_utils/logger)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | Class instance (optional), will rely on classes (debug) property for output |
| ...messages | <code>any</code> |  |

<a name="module_utils/logger.logWarning"></a>

### utils/logger.logWarning(context, ...messages)
Proxy Console.warn

**Kind**: static method of [<code>utils/logger</code>](#module_utils/logger)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | Class instance (optional), will rely on classes (debug) property for output |
| ...messages | <code>any</code> |  |

<a name="module_utils/logger.logError"></a>

### utils/logger.logError(context, ...messages)
Proxy Console.error

**Kind**: static method of [<code>utils/logger</code>](#module_utils/logger)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | Class instance (optional), will rely on classes (debug) property for output |
| ...messages | <code>any</code> |  |

<a name="module_utils/logger..config"></a>

### utils/logger~config
Configuration Object

**Kind**: inner constant of [<code>utils/logger</code>](#module_utils/logger)  

  