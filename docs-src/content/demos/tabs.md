---
title: Tabs
intro: Tabs are a user interface (UI) element that helps users switch between different sections of content within a single window or page. They are essentially digital file folders, allowing users to categorize and access related information efficiently

---

## Examples

### Default


<div class="tabs">
  <div class="tabs__tablist" data-ulu-tablist='{ "equalHeights" : true }'>
    <button type="button" id="tabs-1-1">
      Tab Label 1
    </button>
    <button type="button" id="tabs-1-2">
      Tab Label 2
    </button>
    <button type="button" id="tabs-1-3">
      Tab Label 3
    </button>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-1-1">
    Content goes here 1
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-1-2">
    Content goes here 2
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-1-3">
    Content goes here 3
  </div>
</div>

### Full Width

<div class="tabs tabs--full-width">
  <div class="tabs__tablist" data-ulu-tablist='{ "equalHeights" : true }'>
    <button type="button" id="tabs-2-1">
      Tab Label 1
    </button>
    <button type="button" id="tabs-2-2">
      Tab Label 2
    </button>
    <button type="button" id="tabs-2-3">
      Tab Label 3
    </button>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-2-1">
    <div class="tabs__tabpanel-container">
      Content goes here 1
    </div>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-2-2">
    <div class="tabs__tabpanel-container">
      Content goes here 2
    </div>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-2-3">
    <div class="tabs__tabpanel-container">
      Content goes here 3
    </div>
  </div>
</div>