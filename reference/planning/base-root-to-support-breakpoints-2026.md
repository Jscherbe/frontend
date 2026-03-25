# Planning how to support breakpoints in base/root user cssvars

Need to setup cssvars in root, should we either add another map $cssvars-breakpoints or support breakpoints in the $cssvars map (ie. if it's a map its a breakpoint or has options for future scaling)

```scss
@include ulu.base-root-set-cssvars((
  "non-breakpoint-example" : 200px,
  "example-with-breakpoint-options" : (
    "value" : 200px,
    "breakpoints" : (
      "medium" : (
        "direction" : "up",
        "value" : 400px
      )
    )
  )
));
```
