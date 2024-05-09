---
title: Data grid
intro: Flexbox based grid that uses a JSON like attribute for options
todos: 
  - Add more examples, bring in example css so that it's visualized
  
---

The grid is for page layout, it provides different column sizes at each of the configured breakpoints.
On the smallest size the grid columns will span 100%. The grid is setup using two attributes, data-grid="" for the parent grid container and data-grid-item="" for each grid column. The grid uses a script to set position classes, which are used for rule placement since the grid and reflow at different breakpoints.

## Basic Example

<div data-grid="columns: 12">
  <div data-grid-item="width: 6">Width of 6</div>
  <div data-grid-item="width: 3">Width of 3</div>
  <div data-grid-item="width: 3">Width of 3</div>
</div> 

## Options


{{ gridAttr | optionsTable: "Options for 'data-grid'" }}
{{ gridItemAttr | optionsTable: "Options for 'data-grid-item'" }}