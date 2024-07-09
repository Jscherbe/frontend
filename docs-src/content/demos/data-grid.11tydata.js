
const gridTemplate =[
  {
    value: `
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
    `
  }
]
const gridTemplateShort =`
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
`

export default {
  gridTemplateValue: gridTemplate[0].value,
  gridTemplateShort,
  gridAttr: [
    {
      name: "columns",
      values: "12",
      description: "Number of columns for grid, must match grids that are setup in site. For most projects this is just '12'. This is set up this way to allow mutliple grids.",
      example: '<div data-grid="columns: 12">...'
    },
    {
      name: "justify",
      values: "(center|end)",
      description: "Allows you to justify the columns (horizontal alignment). The defualt is start (left aligned)",
      example: '<div data-grid="..., justify: center">...'
    },
    {
      name: "align",
      values: "(center|start|end|stretch-end|stretch-center)",
      description: "Allows you to align the columns (vertical alignment within row). The defualt is stretch start. Note using stretch-end or stretch-center will stretch all columns to be the same height but will align the columns content to the end or center.",
      example: '<div data-grid="..., align: center">...'
    },
    {
      name: "gutters",
      values: "false",
      description: "You can remove the gutters between columns by adding this setting. The grid shows the default gutters size by default.",
      example: '<div data-grid="..., gutters: false">...'
    },
    {
      name: "gutters-row",
      values: "(true|top|bottom|fit)",
      description: "If set to 'top' gutters will be between items starting at the top including the first row (so it makes space above the first grid row. Bottom works the same way but on the bottom. True adds gutters between rows and to the top and bottom of the first/last grid row. Fit will only put gutters between the rows.",
      example: '<div data-grid="..., gutters-row: true">...'
    },
    {
      name: "gutter-scale",
      values: "[scale key]",
      description: "No alternated scales are configured for this site. Allows for different gutter scales to be used with grid. Requires setting up the scales when you configure/create the grid.",
      example: '<div data-grid="..., gutter-scale: large">...'
    },
    {
      name: "rules-row",
      values: "(top|bottom|between)",
      description: "Sets rules (dividers) between rows. Top adds rules to the rows top edge. Bottom adds rules to the rows bottom edge. Between adds rules between rows but not on top or bottom.",
      example: '<div data-grid="..., rules-row: true">...'
    },
    {
      name: "rules-row-style",
      values: "[style key]",
      description: "If alternate rule styles are configured, applies them by the key that was used to configure the alternate style when initializing the grid in SCSS.",
      example: '<div data-grid="..., rules-row-style: light">...'
    },
    {
      name: "rules-row-align",
      values: "(gutter)",
      description: "The default (without this set), will align to the outer edge of the grid item. If this is set to 'gutter' it will align to the grid columns gutters instead of extending to the edge.",
      example: '<div data-grid="..., rules-row-align: gutter">...'
    },
    {
      name: "rules-row-persist",
      values: "true",
      description: "If set the rules between rows will persist when the grid is no longer in use (ie. mobile, smallest breakpoint before columns start to show. Useful to retain divider between rows on mobile.",
      example: '<div data-grid="..., rules-row-persist: true">...'
    },
    {
      name: "rules-row-stacked-only",
      values: "true",
      description: "Same as persist adds rules to row before grid is being used (ie. mobile/small), except there will only be rules during this smallest breakpoint (mobile). Useful for when dividers don't make sense when the grid is displaying in columns but do make sense when columns are stacked on mobile.",
      example: '<div data-grid="..., rules-row-stacked-only: true">...'
    },
    {
      name: "rules-column",
      values: "(left|right)",
      description: "Sets rules (dividers) between columns. Left adds rules between columns using the left side of the column. Right adds rules between columns using the left side of the column",
      example: '<div data-grid="..., rules-column: left">...'
    },
    {
      name: "rules-column-style",
      values: "[style key]",
      description: "If alternate rule styles are configured, applies them by the key that was used to configure the alternate style when initializing the grid in SCSS.",
      example: '<div data-grid="..., rules-row-style: light">...'
    },
    {
      name: "rules-column-ends",
      values: "true",
      description: "Specify that the rules should not be removed at the beginning or end of rows. Which happens by default depending on if the rules are on the left or right of the element.",
      example: '<div data-grid="..., rules-column-ends: true">...'
    },
    {
      name: "rules-column-align",
      values: "true",
      description: "Sets rules (dividers) between columns",
      example: '<div data-grid="..., rules-column: true">...'
    }
  ],
  gridItemAttr: [
    {
      name: "width",
      values: "[# of columns]",
      description: "Number of columns for grid, must match grids that are setup in site. For most projects this is just '12'. This is set up this way to allow mutliple grids.",
      example: '<div data-grid-item="width: 4">...'
    },
    {
      name: "width-[breakpoint]",
      values: "[# of columns]",
      description: "Sets the width at a given breakpoint. Breakpoints are configured when initializing the grid in SCSS. Note this can be combined or used independently with the 'width' setting (above). For example if you only wanted the grid to start at the medium breakpoint you would just set 'width-medium'",
      example: '<div data-grid-item="width-medium: 2">...'
    },
    {
      name: "offset",
      values: "[# of columns]",
      description: "Offsets the column by a certain number of columns",
      example: '<div data-grid-item="..., offset: 2">...'
    },
    {
      name: "offset-[breakpoint]",
      values: "[# of columns]",
      description: "Same as width-[breakpoint] except for offset instead of width",
      example: '<div data-grid-item="..., offset: 2">...'
    },
  ]
}