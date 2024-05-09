---
title: ui/resizer
---

<a name="module_ui/resizer"></a>

## ui/resizer

* [ui/resizer](#module_ui/resizer)
    * [module.exports](#exp_module_ui/resizer--module.exports) ⏏
        * [new module.exports(container, control, options)](#new_module_ui/resizer--module.exports_new)

<a name="exp_module_ui/resizer--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_ui/resizer--module.exports_new"></a>

#### new module.exports(container, control, options)

| Param | Type | Description |
| --- | --- | --- |
| container | <code>Node</code> | Container to be resize |
| control | <code>Node</code> | Resize handle element |
| options | <code>Object</code> | Defualt can be changed on class |
| options.debug | <code>Boolean</code> | Enable non-essential debugging logs |
| options.overrideMaxWidth | <code>Boolean</code> | When script is activated by handle remove the elements max-width and allow the width of the resize to exceed the max (default false) |
| options.fromLeft | <code>Boolean</code> | The script should assume the handle is on the left side of the element |


  