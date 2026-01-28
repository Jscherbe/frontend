---
title: Tab Manager
layout: default
intro: A demonstration and test page for the core TabManager JavaScript class.
---

<style>
  .test-tm-wrapper {
    display: flex;
    gap: 1rem;
  }
  .test-tm-wrapper > div {
    flex: 1;
  }
  .test-tm-case {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #ddd;
  }
  .test-tm-case h3 {
    margin-top: 0;
  }
  .test-tm__tablist {
    display: flex;
    margin-bottom: -1px;
  }
  .test-tm__tablist[aria-orientation="vertical"] {
    flex-direction: column;
    margin-right: -1px;
    margin-bottom: 0;
  }
  .test-tm__tab {
    padding: 0.5em 1em;
    border: 1px solid #ccc;
    background: #f9f9f9;
    cursor: pointer;
    margin-right: 0.25rem;
  }
  .test-tm__tab[aria-selected="true"] {
    background: #fff;
    border-bottom-color: #fff;
  }
  .test-tm__tablist[aria-orientation="vertical"] .test-tm__tab {
    margin-right: 0;
    margin-bottom: 0.25rem;
  }
  .test-tm__tablist[aria-orientation="vertical"] .test-tm__tab[aria-selected="true"] {
    border-right-color: #fff;
  }
  .test-tm__panel {
    border: 1px solid #ccc;
    padding: 1rem;
  }
  .test-tm__panel[hidden] {
    display: none;
  }
  .test-tm-status {
    padding: 0.5rem;
    background-color: #eee;
    margin-top: 1rem;
    font-family: monospace;
    font-size: 0.9em;
  }
</style>

## Disclaimer

This page is for testing the behavior of the **`TabManager` JavaScript class** directly. It does not demonstrate the fully-styled `tabs` SCSS component. The styles here are minimal and utilitarian, designed only to make the underlying class's functionality visible.

<!-- Test Case 1: Basic Functionality -->
<div class="test-tm-case" id="test-case-1">
  <h3>1. Basic Functionality & Keyboard Navigation</h3>
  <p>Standard horizontal tabs. Test with Arrow Keys, Home, and End.</p>
  <div id="basic-tablist" class="test-tm__tablist">
    <button class="test-tm__tab" id="basic-tab-1">Tab 1</button>
    <button class="test-tm__tab" id="basic-tab-2">Tab 2</button>
    <button class="test-tm__tab" id="basic-tab-3">Tab 3</button>
  </div>
  <div id="basic-panel-1" class="test-tm__panel">Panel 1 Content</div>
  <div id="basic-panel-2" class="test-tm__panel">Panel 2 Content</div>
  <div id="basic-panel-3" class="test-tm__panel">Panel 3 Content</div>
</div>

<!-- Test Case 2: Options (initialIndex, orientation, allArrows) -->
<div class="test-tm-case test-tm-wrapper" id="test-case-2">
  <div>
    <h3>2a. `orientation: 'vertical'`</h3>
    <p>Test with Up/Down arrows.</p>
    <div class="test-tm-wrapper">
      <div id="vertical-tablist" class="test-tm__tablist">
        <button class="test-tm__tab" id="vert-tab-1">Vertical 1</button>
        <button class="test-tm__tab" id="vert-tab-2">Vertical 2</button>
      </div>
      <div>
        <div id="vert-panel-1" class="test-tm__panel">Vertical Panel 1</div>
        <div id="vert-panel-2" class="test-tm__panel">Vertical Panel 2</div>
      </div>
    </div>
  </div>
  <div>
    <h3>2b. `initialIndex: 1`, `allArrows: true`</h3>
    <p>Should start on Tab B. All arrow keys should work.</p>
    <div id="options-tablist" class="test-tm__tablist">
      <button class="test-tm__tab" id="opts-tab-1">Tab A</button>
      <button class="test-tm__tab" id="opts-tab-2">Tab B</button>
      <button class="test-tm__tab" id="opts-tab-3">Tab C</button>
    </div>
    <div id="opts-panel-1" class="test-tm__panel">Panel A</div>
    <div id="opts-panel-2" class="test-tm__panel">Panel B</div>
    <div id="opts-panel-3" class="test-tm__panel">Panel C</div>
  </div>
</div>

<!-- Test Case 3: URL Hash Options -->
<div class="test-tm-case" id="test-case-3">
  <h3>3. URL Hash Options</h3>
  <p>This instance uses <code>{ openByUrlHash: true, setUrlHash: true }</code>. Clicking a tab will update the URL. Refreshing the page with a hash (e.g., <code>#url-tab-2</code>) should open the correct tab.</p>
  <div id="url-tablist" class="test-tm__tablist">
    <button class="test-tm__tab" id="url-tab-1">URL Tab 1</button>
    <button class="test-tm__tab" id="url-tab-2">URL Tab 2</button>
    <button class="test-tm__tab" id="url-tab-3">URL Tab 3</button>
  </div>
  <div id="url-panel-1" class="test-tm__panel">URL Panel 1</div>
  <div id="url-panel-2" class="test-tm__panel">URL Panel 2</div>
  <div id="url-panel-3" class="test-tm__panel">URL Panel 3</div>
</div>

<!-- Test Case 4: API Methods & Callbacks -->
<div class="test-tm-case" id="test-case-4">
  <h3>4. API Methods & Callbacks</h3>
  <p>This instance tests programmatic control and callbacks.</p>
  <div id="api-tablist" class="test-tm__tablist">
    <button class="test-tm__tab" id="api-tab-1">API 1</button>
    <button class="test-tm__tab" id="api-tab-2">API 2</button>
    <button class="test-tm__tab" id="api-tab-3">API 3</button>
  </div>
  <div id="api-panel-1" class="test-tm__panel">
    <p>API Panel 1</p>
    <p>This panel has extra content to test `equalHeights`.</p>
  </div>
  <div id="api-panel-2" class="test-tm__panel">API Panel 2</div>
  <div id="api-panel-3" class="test-tm__panel">
    <p>API Panel 3</p>
    <p>This panel also has extra content to test `equalHeights`.</p>
    <p>Some more content.</p>
  </div>
  <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <button class="button" id="api-btn-activate-2">activate(2)</button>
    <button class="button" id="api-btn-activate-1-id">activateById('api-tab-1')</button>
    <button class="button" id="api-btn-destroy">destroy()</button>
    <button class="button" id="api-btn-reinit">Re-Initialize</button>
  </div>
  <div id="api-status" class="test-tm-status">Status: Waiting for events...</div>
</div>

{% capture scriptContent %}
<script>
  document.addEventListener("DOMContentLoaded", () => {
    const { TabManager } = Ulu;

    // --- Test 1: Basic ---
    const basicTablistEl = document.getElementById('basic-tablist');
    const basicTabs = [
      { tab: document.getElementById('basic-tab-1'), panel: document.getElementById('basic-panel-1') },
      { tab: document.getElementById('basic-tab-2'), panel: document.getElementById('basic-panel-2') },
      { tab: document.getElementById('basic-tab-3'), panel: document.getElementById('basic-panel-3') },
    ];
    basicTabs.forEach(item => item.tab.setAttribute('aria-controls', item.panel.id));
    new TabManager(basicTablistEl);

    // --- Test 2a: Vertical ---
    const verticalTablistEl = document.getElementById('vertical-tablist');
    const verticalTabs = [
      { tab: document.getElementById('vert-tab-1'), panel: document.getElementById('vert-panel-1') },
      { tab: document.getElementById('vert-tab-2'), panel: document.getElementById('vert-panel-2') },
    ];
    verticalTabs.forEach(item => item.tab.setAttribute('aria-controls', item.panel.id));
    new TabManager(verticalTablistEl, { orientation: 'vertical' });

    // --- Test 2b: Options ---
    const optionsTablistEl = document.getElementById('options-tablist');
    const optionsTabs = [
      { tab: document.getElementById('opts-tab-1'), panel: document.getElementById('opts-panel-1') },
      { tab: document.getElementById('opts-tab-2'), panel: document.getElementById('opts-panel-2') },
      { tab: document.getElementById('opts-tab-3'), panel: document.getElementById('opts-panel-3') },
    ];
    optionsTabs.forEach(item => item.tab.setAttribute('aria-controls', item.panel.id));
    new TabManager(optionsTablistEl, { initialIndex: 1, allArrows: true });

    // --- Test 3: URL Hash ---
    const urlTablistEl = document.getElementById('url-tablist');
    const urlTabs = [
      { tab: document.getElementById('url-tab-1'), panel: document.getElementById('url-panel-1') },
      { tab: document.getElementById('url-tab-2'), panel: document.getElementById('url-panel-2') },
      { tab: document.getElementById('url-tab-3'), panel: document.getElementById('url-panel-3') },
    ];
    urlTabs.forEach(item => item.tab.setAttribute('aria-controls', item.panel.id));
    new TabManager(urlTablistEl, { openByUrlHash: true, setUrlHash: true });

    // --- Test 4: API & Callbacks ---
    const apiTablistEl = document.getElementById('api-tablist');
    const apiStatusEl = document.getElementById('api-status');
    const apiTabs = [
      { tab: document.getElementById('api-tab-1'), panel: document.getElementById('api-panel-1') },
      { tab: document.getElementById('api-tab-2'), panel: document.getElementById('api-panel-2') },
      { tab: document.getElementById('api-tab-3'), panel: document.getElementById('api-panel-3') },
    ];
    let apiManager;

    const initApiManager = () => {
      apiStatusEl.innerHTML = "Status: Initializing...";
      // Manually add aria-controls to demonstrate class discovering them
      apiTabs.forEach(item => item.tab.setAttribute('aria-controls', item.panel.id));
      
      apiManager = new TabManager(apiTablistEl, {
        equalHeights: true,
        onReady: (instance) => {
          console.log("TabManager Ready:", instance);
          apiStatusEl.innerHTML += "<br>Event: onReady fired. Instance created.";
        },
        onChange: (active, previous) => {
          console.log("TabManager Change:", { active, previous });
          const prevIndex = previous.index > -1 ? previous.index : 'null';
          apiStatusEl.innerHTML += `<br>Event: onChange fired. Active: ${ active.index }, Previous: ${ prevIndex }`;
        }
      });
    };

    initApiManager();

    document.getElementById('api-btn-activate-2').addEventListener('click', () => {
      apiStatusEl.innerHTML = "Action: activate(2)";
      apiManager.activate(2);
    });
    document.getElementById('api-btn-activate-1-id').addEventListener('click', () => {
      apiStatusEl.innerHTML = "Action: activateById('api-tab-1')";
      apiManager.activateById('api-tab-1');
    });
    document.getElementById('api-btn-destroy').addEventListener('click', () => {
      apiStatusEl.innerHTML = "Action: destroy()";
      apiManager.destroy();
      apiStatusEl.innerHTML += "<br>Instance destroyed. Listeners and attributes should be removed.";
    });
    document.getElementById('api-btn-reinit').addEventListener('click', () => {
      initApiManager();
    });
  });
</script>
{% endcapture %}

{{ scriptContent }}

```html
{{ scriptContent }}
```