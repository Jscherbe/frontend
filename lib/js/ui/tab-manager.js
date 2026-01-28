/**
 * @module ui/tab-manager
 */

import { ensureId } from "../utils/id.js";

/**
 * Class for managing  Aria tabs
 * - Designed to be minimal and lightweight but cover all traditional needs
 * - Designed for static / traditional webpages (not SPA)
 * - Separated from tabs.js so it can be used by itself as needed (tree-shaking)
 */
export class TabManager {
  /**
   * @param {HTMLElement} tablistElement - The element with role="tablist"
   * @param {object} [options] - Configuration options
   * @param {string} [options.orientation] - "horizontal"|"vertical", auto-detected if omitted.
   * @param {number} [options.initialIndex=0] - Index to activate on load.
   * @param {boolean} [options.allArrows=false] - Allow all arrow keys to navigate regardless of orientation.
   * @param {boolean} [options.openByUrlHash=false] - Activate tab based on URL hash on initialization.
   * @param {boolean} [options.setUrlHash=false] - Update URL hash when a new tab is activated.
   * @param {boolean} [options.equalHeights=false] - Automatically match the height of all panels.
   * @param {function} [options.onReady] - Callback fired after initialization: (instance) => {}
   * @param {function} [options.onChange] - Callback fired when tab changes: (active, previous) => {}
   */
  constructor(tablistElement, options = {}) {
    // 1. Setup Properties
    this.tablist = tablistElement;
    this.options = options;
    this.tabs = Array.from(this.tablist.children);
    
    // Discover panels via `aria-controls`
    this.panels = this.tabs.map(tab => {
      const controlsId = tab.getAttribute('aria-controls');
      return controlsId ? document.getElementById(controlsId) : null;
    }).filter(Boolean); // Ensure no nulls in panels array
    
    this.currentIndex = -1; 
    
    // Bind methods
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // Bind the new height update method for the event listener
    this.updatePanelHeights = this.updatePanelHeights.bind(this);

    // 2. Validate
    if (this.tabs.length === 0 || this.tabs.length !== this.panels.length) {
      console.warn("TabManager: Mismatch between tabs and discovered panels, or tabs are empty. Check for valid `aria-controls` attributes.", { tabs: this.tabs, panels: this.panels });
      return;
    }

    // 3. Determine Orientation
    this.orientation = this.options.orientation || this.tablist.getAttribute("aria-orientation") || "horizontal";

    // 4. Initialize
    this.setupAttributes();
    this.attachListeners();
    
    // Handle initial state from URL hash if configured
    let startingIndex = this.options.initialIndex || 0;
    if (this.options.openByUrlHash) {
      const hash = window.location.hash.substring(1);
      const hashIndex = this.tabs.findIndex(tab => tab.id === hash);
      if (hashIndex > -1) {
        startingIndex = hashIndex;
      }
    }

    this.activate(startingIndex, false); 

    // Handle equal heights on init and on resize
    if (this.options.equalHeights) {
      this.updatePanelHeights();
      document.addEventListener('pageResized', this.updatePanelHeights);
    }

    if (this.options.onReady) {
      this.options.onReady(this);
    }
  }

  setupAttributes() {
    this.tablist.setAttribute("role", "tablist");

    this.tabs.forEach((tab, index) => {
      const panel = this.panels[index];
      
      // Ensure elements have IDs for ARIA attributes
      ensureId(tab);
      ensureId(panel);

      // Set ARIA Roles & Relationships
      tab.setAttribute("role", "tab");
      // This is now the primary link, but we still ensure it's set.
      if (!tab.hasAttribute('aria-controls')) {
        tab.setAttribute("aria-controls", panel.id);
      }
      
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      
      // Initial hidden state
      panel.hidden = true;
      tab.setAttribute("tabindex", "-1");
      tab.setAttribute("aria-selected", "false");
    });
  }

  attachListeners() {
    this.tabs.forEach(tab => {
      tab.addEventListener("click", this.handleClick);
      tab.addEventListener("keydown", this.handleKeydown);
    });
  }

  handleClick(e) {
    const index = this.tabs.indexOf(e.currentTarget);
    this.activate(index);
  }

  handleKeydown(e) {
    const index = this.tabs.indexOf(e.currentTarget);
    let nextIndex = null;
    const isVert = this.orientation === "vertical";
    const allArrows = this.options.allArrows;
    const isRtl = (this.tablist.dir === 'rtl' || document.dir === 'rtl') && this.tablist.dir !== 'ltr';

    const keyNext = isRtl ? 'ArrowLeft' : 'ArrowRight';
    const keyPrev = isRtl ? 'ArrowRight' : 'ArrowLeft';

    // Vertical movement
    if (e.key === "ArrowDown") {
      if (isVert || allArrows) nextIndex = (index + 1) % this.tabs.length;
    } else if (e.key === "ArrowUp") {
      if (isVert || allArrows) nextIndex = (index - 1 + this.tabs.length) % this.tabs.length;
    // Horizontal movement
    } else if (e.key === keyNext) {
      if (!isVert || allArrows) nextIndex = (index + 1) % this.tabs.length;
    } else if (e.key === keyPrev) {
      if (!isVert || allArrows) nextIndex = (index - 1 + this.tabs.length) % this.tabs.length;
    // Other keys
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = this.tabs.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      this.activate(nextIndex);
      this.tabs[nextIndex].focus();
    }
  }

  /**
   * Activates a tab. Can be called with an index or a tab ID string.
   * @param {number|string} indexOrId - The index or ID of the tab to activate.
   * @param {boolean} [triggerActions=true] - If false, will not fire onChange or set URL hash.
   */
  activate(indexOrId, triggerActions = true) {
    let index = -1;
    if (typeof indexOrId === "string") {
      index = this.tabs.findIndex(tab => tab.id === indexOrId);
    } else {
      index = indexOrId;
    }

    if (index < 0 || index >= this.tabs.length) return;
    if (this.currentIndex === index) return;

    const prevIndex = this.currentIndex;
    const prevTab = prevIndex > -1 ? this.tabs[prevIndex] : null;
    const prevPanel = prevIndex > -1 ? this.panels[prevIndex] : null;

    // Deactivate Current
    if (prevTab) {
      prevTab.setAttribute("aria-selected", "false");
      prevTab.setAttribute("tabindex", "-1");
      prevPanel.hidden = true;
    }

    // Activate New
    const tab = this.tabs[index];
    const panel = this.panels[index];

    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    panel.hidden = false;

    this.currentIndex = index;

    // Update URL hash if configured and not the initial silent activation
    if (triggerActions && this.options.setUrlHash && window.history) {
      window.history.replaceState(null, "", `#${tab.id}`);
    }

    // Fire onChange callback
    if (triggerActions && this.options.onChange) {
      this.options.onChange(
        { index, tab, panel },
        { index: prevIndex, tab: prevTab, panel: prevPanel }
      );
    }
  }

  activateById(id) {
    this.activate(id, true);
  }

  /**
   * Calculates and applies equal heights to all panels.
   * Waits for images within panels to load before calculating.
   */
  updatePanelHeights() {
    if (!this.panels || this.panels.length === 0) return;

    const parent = this.panels[0].parentElement;
    if (!parent) return;
    const images = [ ...parent.querySelectorAll("img") ];

    const imagePromise = (image) => new Promise((resolve) => {
      if (image.complete) return resolve(image);
      image.onload = () => resolve(image);
      image.onerror = () => resolve(image); // Resolve on error so it doesn't block
    });

    const imagePromises = images.map(imagePromise);

    Promise.all(imagePromises).then(() => {
      // Reset heights to auto before measuring to get natural height
      this.panels.forEach(panel => {
        panel.style.minHeight = '';
      });

      const heights = this.panels.map(panel => {
        const wasHidden = panel.hidden;
        panel.hidden = false;
        const panelHeight = panel.offsetHeight;
        panel.hidden = wasHidden;
        return panelHeight;
      });

      const max = Math.max(...heights);
      if (max > 0) {
        this.panels.forEach(panel => {
          panel.style.minHeight = `${ max }px`;
        });
      }
    });
  }

  destroy() {
    this.tabs.forEach(tab => {
      tab.removeEventListener("click", this.handleClick);
      tab.removeEventListener("keydown", this.handleKeydown);
    });

    // Clean up event listener
    if (this.options.equalHeights) {
      document.removeEventListener('pageResized', this.updatePanelHeights);
    }

    this.tabs = [];
    this.panels = [];
  }
}
