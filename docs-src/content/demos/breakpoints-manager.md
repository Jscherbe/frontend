---
title: Breakpoint Manager
layout: default
intro: Test javascript breakpoint manager class
---

## Demo

This demo showcases the features of the `BreakpointManager`. Resize your browser to see the effects.

<div id="info" style="padding: 1rem; background-color: #eee; margin-bottom: 1rem;">
  Current Breakpoint: <strong id="current-breakpoint"></strong><br>
  Resize Direction: <strong id="resize-direction"></strong>
</div>

### 1. `min` and `max` handlers

This box demonstrates using `min()` and `max()` on the same breakpoint. It will be **red** when the breakpoint is *below* "medium" (testing `medium.max()`) and **green** when it is "medium" *or larger* (testing `medium.min()`). This creates a single, clean switch at the "medium" breakpoint.

<div id="test-box-1" class="breakpoint-manager-box"></div>

### 2. `only` handler

This box will be blue only when the breakpoint is "medium".

<div id="test-box-2" class="breakpoint-manager-box"></div>

### 3. `on` and `off` handlers

This box will turn purple when the "large" breakpoint is active, and revert to grey when it is not. This demonstrates the `{ on: ..., off: ... }` handler syntax.

<div id="test-box-3" style="height: 100px; padding: 1rem; background-color: #eee;"></div>

### 4. Removing a handler

The box below will initially turn yellow on the "medium" breakpoint. Clicking the button will remove the handler, and the box will no longer turn yellow.

<div id="test-box-4" class="breakpoint-manager-box"></div>
<button id="remove-handler-btn" class="button">Remove 'medium.only' handler for Box 4</button>

### 5. Test that SCSS system and JS System Match

The test below uses a div that has breakpoints in SCSS to change it's color. And the adjacent box is using javascript to change it's color with the same methods for min/max. So if this is working you should see:

1. Blue: When the viewport is smaller than the "small" breakpoint (the none range). The @include ulu.breakpoint-max("small") rule is active.
2. Red: When the viewport is between the "small" and "medium" breakpoints. In this range, neither of your media queries (max("small") or min("medium")) are active, so the color will fall back to the default red.
3. Green: When the viewport is at the "medium" breakpoint or larger. The @include ulu.breakpoint-min("medium") rule becomes active and will remain active for all larger sizes.

<div class="breakpoint-manager-box breakpoint-manager-box--css-test"></div>
<div id="test-box-5" class="breakpoint-manager-box"></div>

## Demo Code

Below is the code used to create this demo, note it is accessing ulu and the underlying BreakpointManager class from a global variable "Ulu" which is just something we setup for this docs site. The library doesn't expose itself globally by default. Normally you would be importing the "@ulu/frontend/js/breakpoints" module directly

{% capture scriptContent %}

<script>

  addEventListener("DOMContentLoaded", () => {
    const { BreakpointManager } = Ulu.ui.breakpoints;
    const breakpoint = new BreakpointManager({
      order: ["none", "small", "medium", "large"], // Add more for testing
      debug: true
    });

    const infoBreakpoint = document.getElementById("current-breakpoint");
    const infoDirection = document.getElementById("resize-direction");

    const box1 = document.getElementById("test-box-1");
    const box2 = document.getElementById("test-box-2");
    const box3 = document.getElementById("test-box-3");
    const box4 = document.getElementById("test-box-4");
    const box5 = document.getElementById("test-box-5");
    const removeBtn = document.getElementById("remove-handler-btn");

    // --- Initialize text ---
    infoDirection.textContent = '...';
    box2.textContent = 'I am not "medium"';
    box3.textContent = '"large.only" is OFF';
    box4.textContent = 'I will turn yellow on "medium"';


    // --- General Info ---
    const updateGeneralInfo = () => {
      const activeName = breakpoint.active;
      const activeIndex = breakpoint.activeIndex;
      const nextName = breakpoint.order[activeIndex + 1];

      let rangeText = "";
      if (activeName === 'none') {
        rangeText = `(up to ${nextName})`;
      } else if (nextName) {
        rangeText = `(from ${activeName} up to ${nextName})`;
      } else {
        rangeText = `(${activeName} and up)`;
      }

      infoBreakpoint.innerHTML = `${activeName} <span style="font-weight: normal; color: #555;">${rangeText}</span>`;
      infoDirection.textContent = breakpoint.resizeDirection || '...';
    };

    breakpoint.onChange(updateGeneralInfo);
    updateGeneralInfo(); // Set initial state

    // --- Test 1: min/max ---
    // Using 'medium' for both handlers creates a clean switch.
    breakpoint.at("medium").max({
      on: () => {
        box1.style.backgroundColor = "red";
        box1.textContent = 'Breakpoint is below "medium".';
      }
    });
    breakpoint.at("medium").min({
      on: () => {
        box1.style.backgroundColor = "green";
        box1.textContent = 'Breakpoint is "medium" or larger.';
      }
    });

    // --- Test 2: only ---
    breakpoint.at("medium").only({
      on: () => {
        box2.style.backgroundColor = "blue";
        box2.textContent = 'I am "medium"';
      },
      off: () => {
        box2.style.backgroundColor = "#eee";
        box2.textContent = 'I am not "medium"';
      }
    });

    // --- Test 3: on/off ---
    breakpoint.at("large").only({
      on: () => {
        box3.style.backgroundColor = "purple";
        box3.textContent = '"large.only" is ON';
      },
      off: () => {
        box3.style.backgroundColor = "#eee";
        box3.textContent = '"large.only" is OFF';
      }
    });

    // --- Test 4: remove handler ---
    const handlerForBox4 = {
      on: () => {
        box4.style.backgroundColor = "yellow";
        box4.textContent = 'I am "medium"';
      },
      off: () => {
        box4.style.backgroundColor = "#eee";
        box4.textContent = 'I am not "medium"';
      }
    };
    breakpoint.at("medium").only(handlerForBox4);

    removeBtn.addEventListener("click", () => {
      // Using the newly fixed remove method
      breakpoint.at("medium").remove(handlerForBox4, 'only');
      box4.textContent = "Handler removed. I won't turn yellow anymore.";
      box4.style.backgroundColor = '#eee';
      removeBtn.disabled = true;
    }, { once: true });

    // --- Test 5: SCSS/JS Parity ---
    // Set the default state, which applies to the 'small' breakpoint
    box5.style.backgroundColor = 'red';
    box5.textContent = 'JS: small';

    // Handle the 'none' state by matching the SCSS `max("small")`
    breakpoint.at("small").max({
      on: () => {
        box5.style.backgroundColor = 'blue';
        box5.textContent = 'JS: none';
      },
      off: () => {
        box5.style.backgroundColor = 'red';
        box5.textContent = 'JS: small';
      }
    });

    // Handle the 'medium' and up state by matching the SCSS `min("medium")`
    breakpoint.at("medium").min({
      on: () => {
        box5.style.backgroundColor = 'green';
        box5.textContent = 'JS: medium+';
      },
      off: () => {
        // When turning off, the color should revert to red, as 'small' is the next state down.
        box5.style.backgroundColor = 'red';
        box5.textContent = 'JS: small';
      }
    });
  });

</script>

{% endcapture %}

```html

{{ scriptContent }}

```

{{ scriptContent }}