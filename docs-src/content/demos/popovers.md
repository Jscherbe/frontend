---
title: Popovers
intro: Popovers are clickable elements that show content relative to the toggle
---


## Examples

<div>
  <button class="button" type="button" data-ulu-popover-trigger='{"popoverPlacement" : "top"}'>
    <span>Show Popover</span>
    <span class="button__icon">
      <span data-feather="fas fa-chevron-down"></span>
    </span>
  </button> 
  <div class="popover" data-ulu-popover-content>
    <div class="popover__inner">
      This is the popover body area <a href="#">test link</a>
    </div>
    <span class="popover__arrow" data-ulu-popover-arrow></span>
    <div class="popover__footer">Popover Footer</div>
  </div>
</div>