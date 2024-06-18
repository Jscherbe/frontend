---
title: resizer
---

<a name="module_resizer"></a>

## resizer

* [resizer](#module_resizer)
    * [.Resizer](#module_resizer.Resizer)
        * [new exports.Resizer(container, control, options)](#new_module_resizer.Resizer_new)

<a name="module_resizer.Resizer"></a>

### resizer.Resizer
**Kind**: static class of [<code>resizer</code>](#module_resizer)  
<a name="new_module_resizer.Resizer_new"></a>

#### new exports.Resizer(container, control, options)

| Param | Type | Description |
| --- | --- | --- |
| container | <code>Node</code> | Container to be resize |
| control | <code>Node</code> | Resize handle element |
| options | <code>Object</code> | Defualt can be changed on class |
| options.debug | <code>Boolean</code> | Enable non-essential debugging logs |
| options.overrideMaxWidth | <code>Boolean</code> | When script is activated by handle remove the elements max-width and allow the width of the resize to exceed the max (default false) |
| options.fromLeft | <code>Boolean</code> | The script should assume the handle is on the left side of the element |


  