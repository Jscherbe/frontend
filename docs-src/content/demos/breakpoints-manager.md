---
title: Breakpoint Manager
layout: default
intro: Test javascript breakpoint manager class
---

## General Test

The box below should change color to green when above min("medium"). It should also update it's text to match the sites current breakpoint. Resize the browser to test (between small and medium).

```js
addEventListener("DOMContentLoaded", () => {
  const { BreakpointManager } = Ulu.ui.breakpoints;
  const breakpoint = new BreakpointManager();
  const element = document.getElementById("breakpoint-test");

  // Switch the color between these two breakpoints
  breakpoint.at("medium").min(() => {
    element.style.backgroundColor = "green";
  });
  breakpoint.at("small").max(() => {
    element.style.backgroundColor = "red";
  });

  // Update the text content in the text to match the current breakpoint
  breakpoint.onChange(() => {
    element.textContent = breakpoint.active;
  });
});
```

<p><strong>Test Box Below</strong></p>

<div id="breakpoint-test" style="background-color: red; height: 100px;"></div>

<script>
  addEventListener("DOMContentLoaded", () => {
    const { BreakpointManager } = Ulu.ui.breakpoints;
    const breakpoint = new BreakpointManager();
    const element = document.getElementById("breakpoint-test");

    // Switch the color between these two breakpoints
    breakpoint.at("medium").min(() => {
      element.style.backgroundColor = "green";
    });
    breakpoint.at("small").max(() => {
      element.style.backgroundColor = "red";
    });

    // Update the text content in the text to match the current breakpoint
    breakpoint.onChange(() => {
      element.textContent = breakpoint.active;
    });
  });
</script>