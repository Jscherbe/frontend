---
title: Tabs
intro: Tabs are a user interface (UI) element that helps users switch between different sections of content within a single window or page. They are essentially digital file folders, allowing users to categorize and access related information efficiently

---

<h2 class="h2">Default</h2>

<div class="tabs tabs--print">
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
    <button type="button" id="tabs-1-4">
      Tab Label 4
    </button>
    <button type="button" id="tabs-1-5">
      Tab Label 5
    </button>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-1-1">
    {{ placeholder.paragraph }}
    <div class="tabs__tabpanel-content-fill">
      <img class="image-full-width" src="https://picsum.photos/400/300" alt="" width="400" height="300"> 
    </div>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-1-2">
    <div class="tabs__tabpanel-content-fill">
      <img class="image-full-width" src="https://picsum.photos/400/300" alt="" width="400" height="300"> 
    </div>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-1-3">
    {{ placeholder.paragraph }}
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-1-4">
    {{ placeholder.paragraph }}
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-1-5">
    {{ placeholder.paragraph }}
  </div>
</div>

<h2 class="h2">Full Width</h2>

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
      {{ placeholder.paragraph }}
    </div>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-2-2">
    <div class="tabs__tabpanel-container">
      {{ placeholder.paragraph }}
    </div>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-2-3">
    <div class="tabs__tabpanel-container">
      {{ placeholder.paragraph }}
    </div>
  </div>
</div>

<h2 class="h2">Vertical</h2>

<div class="tabs tabs--vertical">
  <div class="tabs__tablist" data-ulu-tablist='{ 
    "equalHeights" : true,
    "vertical" : true
  }'>
    <button type="button" id="tabs-3-1">
      Tab Label 1
    </button>
    <button type="button" id="tabs-3-2">
      Tab Label 2
    </button>
    <button type="button" id="tabs-3-3">
      Tab Label 3
    </button>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-3-1">
    <div class="tabs__tabpanel-container">
      {{ placeholder.paragraph }}
    </div>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-3-2">
    <div class="tabs__tabpanel-container">
      {{ placeholder.paragraph }}
    </div>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-3-3">
    <div class="tabs__tabpanel-container">
      {{ placeholder.paragraph }}
      {{ placeholder.paragraph }}
    </div>
  </div>
</div>


<h2 class="h2">Open URL Hash Test</h2>

<div class="tabs">
  <div class="tabs__tablist" data-ulu-tablist='{ 
    "equalHeights" : true,
    "openByUrlHash" : true
  }'>
    <button type="button" id="tabs-4-1">
      Tab Label 1
    </button>
    <button type="button" id="tabs-4-2">
      Tab Label 2
    </button>
    <button type="button" id="tabs-4-3">
      Tab Label 3
    </button>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-4-1">
    <div class="tabs__tabpanel-container">
      <p>1</p>
      {{ placeholder.paragraph }}
    </div>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-4-2">
    <div class="tabs__tabpanel-container">
      <p>2</p>
      {{ placeholder.paragraph }}
    </div>
  </div>
  <div class="tabs__tabpanel" aria-labelledby="tabs-4-3">
    <div class="tabs__tabpanel-container">
      <p>3</p>
      {{ placeholder.paragraph }}
      {{ placeholder.paragraph }}
    </div>
  </div>
</div>