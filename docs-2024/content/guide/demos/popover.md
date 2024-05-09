---
title: Popovers
intro: Popovers are clickable elements that show content relative to the toggle
---


## Examples

<div>
  <button class="button" type="button" data-ulu-popover-trigger='{"popoverPlacement" : "top"}'>
    <span>Show Popover</span>
    <span class="button__icon">
      <span data-feather="chevron-down"></span>
    </span>
  </button> 
  <div class="popover" data-ulu-popover-content>
    <div class="popover__inner">
      This is the popover body area
    </div>
    <span class="popover__arrow" data-ulu-popover-arrow></span>
  </div>
</div>