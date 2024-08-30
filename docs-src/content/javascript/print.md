---
title: print
---

<a name="module_print"></a>

## print

* [print](#module_print)
    * _static_
        * [.init()](#module_print.init)
    * _inner_
        * [~defaults](#module_print..defaults)
            * [.element](#module_print..defaults.element)
        * [~setup()](#module_print..setup)
        * [~setupTrigger()](#module_print..setupTrigger)

<a name="module_print.init"></a>

### print.init()
Initialize everything in document
- This will only initialize elements once, it is safe to call on page changes

**Kind**: static method of [<code>print</code>](#module_print)  
<a name="module_print..defaults"></a>

### print~defaults
Default options

**Kind**: inner constant of [<code>print</code>](#module_print)  
<a name="module_print..defaults.element"></a>

#### defaults.element
Print element/selector

**Kind**: static property of [<code>defaults</code>](#module_print..defaults)  
<a name="module_print..setup"></a>

### print~setup()
Setup all triggers currently on the page

**Kind**: inner method of [<code>print</code>](#module_print)  
<a name="module_print..setupTrigger"></a>

### print~setupTrigger()
Setup a single trigger (can be used manually without attr if needed)

**Kind**: inner method of [<code>print</code>](#module_print)  

  