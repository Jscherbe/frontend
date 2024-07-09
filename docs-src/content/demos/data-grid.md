---
title: Data grid
intro: Flexbox based grid that uses a JSON like attribute for options
todos: 
  - Add more examples, bring in example css so that it's visualized
  
---

The grid is for page layout, it provides different column sizes at each of the configured breakpoints.
On the smallest size the grid columns will span 100%. The grid is setup using two attributes, data-grid="" for the parent grid container and data-grid-item="" for each grid column. The grid uses a script to set position classes, which are used for rule placement since the grid and reflow at different breakpoints.

## Examples

<p>Dotted Line is the container holding the data-grid</p>
<p>Solid Line is the individual cells including gutters</p>
<p>Purple Background is the cell's content</p>
<p>Solid Black Line is the grid's rules</p>

### Default Grid
<div class="demo-grid__container">
  <div data-grid="columns: 12" class="demo-grid">
    {{ gridTemplate }}
  </div>
</div>

### Justify Content
<p>Allows you to justify the columns (horizontal alignment). The default is start (left aligned)</p>

#### default (justify start)
<div class="demo-grid__container">
  <div data-grid="columns: 12" class="demo-grid">
    {{ gridTemplate }}
    {{ gridTemplateShort }}
  </div>
</div>

#### justify: center

<div class="demo-grid__container">
  <div data-grid="columns: 12, justify: center" class="demo-grid">
    {{ gridTemplate }}
    {{ gridTemplateShort }}
  </div>
</div>

#### justify: end

<div class="demo-grid__container">
  <div data-grid="columns: 12, justify: end" class="demo-grid">
    {{ gridTemplate }}
    {{ gridTemplateShort }}
  </div>
</div>

### Align

<p>Allows you to align the columns (vertical alignment within row). The default is stretch start. Note using stretch-end or stretch-center will stretch all columns to be the same height but will align the columns content to the end or center.</p>

#### Default (stretch start)

<div class="demo-grid__container">
  <div data-grid="columns: 12" class="demo-grid">
    {{ gridTemplate }}
  </div>
</div> 

#### align: center

<div class="demo-grid__container">
  <div data-grid="columns: 12, align: center" class="demo-grid">
    {{ gridTemplate }}
  </div>
</div> 

### gutters

<p>	
You can remove the gutters between columns by adding this setting. The grid shows the default gutters size by default.</p>

#### default

<div class="demo-sandwich">Element directly before grid</div>
<div class="demo-grid__container">
  <div data-grid="columns: 12" class="demo-grid">
    {{ gridTemplate }}
  </div>
</div> 
<div class="demo-sandwich">Element directly after grid</div>

#### gutters: false

<div class="demo-sandwich">Element directly before grid</div>
<div class="demo-grid__container">
  <div data-grid="columns: 12, gutters: false" class="demo-grid">
    {{ gridTemplate }}
  </div>
</div> 
<div class="demo-sandwich">Element directly after grid</div>

### gutters-row

<p>If set to 'top' gutters will be between items starting at the top including the first row (so it makes space above the first grid row. Bottom works the same way but on the bottom. True adds gutters between rows and to the top and bottom of the first/last grid row. Fit will only put gutters between the rows.</p>

#### gutters-row: true

<div class="demo-sandwich">Element directly before grid</div>
<div class="demo-grid__container">
  <div data-grid="columns: 12, gutters-row: true" class="demo-grid">
    {{ gridTemplate }}
    {{ gridTemplateShort }}
  </div>
</div> 
<div class="demo-sandwich">Element directly after grid</div>

#### gutters-row: top

<div class="demo-sandwich">Element directly before grid</div>
<div class="demo-grid__container">
  <div data-grid="columns: 12, gutters-row: top" class="demo-grid">
    {{ gridTemplate }}
    {{ gridTemplateShort }}
  </div>
</div> 
<div class="demo-sandwich">Element directly after grid</div>

#### gutters-row: bottom

<div class="demo-sandwich">Element directly before grid</div>
<div class="demo-grid__container">
  <div data-grid="columns: 12, gutters-row: bottom" class="demo-grid">
    {{ gridTemplate }}
    {{ gridTemplateShort }}
  </div>
</div> 
<div class="demo-sandwich">Element directly after grid</div>

#### gutters-row: fit

<div class="demo-sandwich">Element directly before grid</div>
<div class="demo-grid__container">
  <div data-grid="columns: 12, gutters-row: fit" class="demo-grid">
    {{ gridTemplate }}
    {{ gridTemplateShort }}
  </div>
</div> 
<div class="demo-sandwich">Element directly after grid</div>


### gutter-scale

<p>
  No alternated scales are configured for this site. Allows for different gutter scales to be used with grid. Requires setting up the scales when you configure/create the grid.
</p>

### rules-row

<p>	
  Sets rules (dividers) between rows. Top adds rules to the rows top edge. Bottom adds rules to the rows bottom edge. Between adds rules between rows but not on top or bottom.
</p>
<p>	
  For demo purposes, the rules are set to 2px to aid in the visualization. Default is 1px
</p>

#### rules-row: top

<div class="demo-grid__container">
  <div data-grid="columns: 12, rules-row: top" class="demo-grid">
    {{ gridTemplate }}
    {{ gridTemplateShort }}
  </div>
</div> 

#### rules-row: bottom

<div class="demo-grid__container">
  <div data-grid="columns: 12, rules-row: bottom" class="demo-grid">
    {{ gridTemplate }}
    {{ gridTemplateShort }}
  </div>
</div> 

#### rules-row: between

<div class="demo-grid__container">
  <div data-grid="columns: 12, rules-row: between" class="demo-grid">
    {{ gridTemplate }}
    {{ gridTemplateShort }}
  </div>
</div> 

### rules-row-align

<p>
  The default (without this set), will align to the outer edge of the grid item. If this is set to 'gutter' it will align to the grid columns gutters instead of extending to the edge.
</p>

#### rules-row-align: gutter

<div class="demo-grid__container">
  <div data-grid="columns: 12, rules-row: top, rules-row-align: gutter" class="demo-grid">
    {{ gridTemplate }}
  </div>
</div>

### rules-column

<p>Sets rules (dividers) between columns. Left adds rules between columns using the left side of the column. Right adds rules between columns using the left side of the column</p>

#### rules-column: right

<div class="demo-grid__container">
  <div data-grid="columns: 12, rules-column: right" class="demo-grid">
    {{ gridTemplate }}
    {{ gridTemplateShort }}
  </div>
</div>

### item width

<p>	
  Number of columns for grid, must match grids that are setup in site. For most projects this is just '12'. This is set up this way to allow mutliple grids. All examples specify the item's width
</p>

### item offset

<p>	Offsets the column by a certain number of columns</p>

<div class="demo-grid__container">
  <div data-grid="columns: 12" class="demo-grid">
    <div data-grid-item="width: 3" class="demo-grid__cell">
    <div class="demo-grid__content">
      Width of 6
    </div>
  </div>
  <div data-grid-item="width: 3, offset: 1" class="demo-grid__cell">
    <div class="demo-grid__content">
      Width of 3. Offset of 1
    </div>
  </div>
  <div data-grid-item="width: 3, offset: 2" class="demo-grid__cell">
    <div class="demo-grid__content">
      Width of 3. Offset of 2
    </div>
  </div>
  </div>
</div>

## Options


{{ gridAttr | optionsTable: "Options for 'data-grid'" }}
{{ gridItemAttr | optionsTable: "Options for 'data-grid-item'" }}
