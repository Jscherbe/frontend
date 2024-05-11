---
title: ui/grid
---

<a name="module_ui/grid"></a>

## ui/grid

* [ui/grid](#module_ui/grid)
    * [.init(selector, classes)](#module_ui/grid.init)
    * [.setup(selector, classes)](#module_ui/grid.setup)
    * [.setPositionClasses(parent, classes)](#module_ui/grid.setPositionClasses)

<a name="module_ui/grid.init"></a>

### ui/grid.init(selector, classes)
Sets up document for grid position classes

**Kind**: static method of [<code>ui/grid</code>](#module_ui/grid)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | The selector for the parent element |
| classes | <code>Object</code> | Classes (optional) @see setPositionClasses |

<a name="module_ui/grid.setup"></a>

### ui/grid.setup(selector, classes)
Goes through document and finds elements that need to have positioning classes

**Kind**: static method of [<code>ui/grid</code>](#module_ui/grid)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | The selector for the parent element |
| classes | <code>Object</code> | Classes (optional) @see setPositionClasses |

<a name="module_ui/grid.setPositionClasses"></a>

### ui/grid.setPositionClasses(parent, classes)
Sets up the positonal classes that would come from the equal
  height module. Needs to be rerun by user when layout changes
  or new instances are added to the screen
  - Used for gutter crops
  - Used for rule placement
  - **Devs** Remember that default classes should match sass defaults

**Kind**: static method of [<code>ui/grid</code>](#module_ui/grid)  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>Node</code> | The grid parent <data-grid=""> |
| classes | <code>Object</code> | Override the default equal heights classes |


  