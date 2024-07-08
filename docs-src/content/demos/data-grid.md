---
title: Data grid
intro: Flexbox based grid that uses a JSON like attribute for options
todos: 
  - Add more examples, bring in example css so that it's visualized
  
---

The grid is for page layout, it provides different column sizes at each of the configured breakpoints.
On the smallest size the grid columns will span 100%. The grid is setup using two attributes, data-grid="" for the parent grid container and data-grid-item="" for each grid column. The grid uses a script to set position classes, which are used for rule placement since the grid and reflow at different breakpoints.

## Examples


### Default Grid
<div class="demo-grid__container">
  <div data-grid="columns: 12" class="demo-grid">
<div data-grid-item="width: 6" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 6
        </div>
      </div>
      <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3.
        </div>
      </div>
      <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3
        </div>
      </div>
  </div>
</div>

### Justify Content
<p>Allows you to justify the columns (horizontal alignment). The default is start (left aligned)</p>

#### default (justify start)
<div class="demo-grid__container">
  <div data-grid="columns: 12" class="demo-grid">
    <div data-grid-item="width: 6" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 6
        </div>
      </div>
      <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3.
        </div>
      </div>
      <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3
        </div>
      </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3
        </div>
      </div>
      <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3.
        </div>
      </div>
      <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3
        </div>
      </div>
  </div>
</div>

#### justify: center

<div class="demo-grid__container">
  <div data-grid="columns: 12, justify: center" class="demo-grid">
    <div data-grid-item="width: 6" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 6
        </div>
      </div>
      <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3.
        </div>
      </div>
      <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3
        </div>
      </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3
        </div>
      </div>
      <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3.
        </div>
      </div>
      <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3
        </div>
      </div>
  </div>
</div>

#### justify: end

<div class="demo-grid__container">
  <div data-grid="columns: 12, justify: end" class="demo-grid">
    <div data-grid-item="width: 6" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 6
      </div>
    </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 3. But there is alot of text here.
      </div>
    </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 3
      </div>
    </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3
        </div>
      </div>
      <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3.
        </div>
      </div>
      <div data-grid-item="width: 3" class="demo-grid__cell">
        <div class="demo-grid__content">
          Width of 3
        </div>
      </div>
  </div>
</div>

### Align

<p>Allows you to align the columns (vertical alignment within row). The default is stretch start. Note using stretch-end or stretch-center will stretch all columns to be the same height but will align the columns content to the end or center.</p>

#### Default (stretch start)

<div class="demo-grid__container">
  <div data-grid="columns: 12" class="demo-grid">
    <div data-grid-item="width: 6" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 6
      </div>
    </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 3. This will cause the other cells to either stretch or align depending on how you set the "align" option.
      </div>
    </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 3
      </div>
    </div>
  </div>
</div> 

#### align: center

<div class="demo-grid__container">
  <div data-grid="columns: 12, align: center" class="demo-grid">
    <div data-grid-item="width: 6" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 6
      </div>
    </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 3. This will cause the other cells to either stretch or align depending on how you set the "align" option.
      </div>
    </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 3
      </div>
    </div>
  </div>
</div> 

### gutters

<p>	
You can remove the gutters between columns by adding this setting. The grid shows the default gutters size by default.</p>

#### default

<div class="demo-grid__container">
  <div data-grid="columns: 12" class="demo-grid">
    <div data-grid-item="width: 6" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 6
      </div>
    </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 3.
      </div>
    </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 3
      </div>
    </div>
  </div>
</div> 

#### gutters: false

<div class="demo-grid__container">
  <div data-grid="columns: 12, gutters: false" class="demo-grid">
    <div data-grid-item="width: 6" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 6
      </div>
    </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 3.
      </div>
    </div>
    <div data-grid-item="width: 3" class="demo-grid__cell">
      <div class="demo-grid__content">
        Width of 3
      </div>
    </div>
  </div>
</div> 

## Options


{{ gridAttr | optionsTable: "Options for 'data-grid'" }}
{{ gridItemAttr | optionsTable: "Options for 'data-grid-item'" }}
