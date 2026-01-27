/**
 * @module TabManager
 * - New class for managing tabs
 * - Pretty small (1.2kb)
 * - Once tested can replace aria-tablist
 */
class TabManager {
  /**
   * @param {Object} config
   * @param {HTMLElement[]} config.tabs - Array or NodeList of tab buttons
   * @param {HTMLElement[]} config.panels - Array or NodeList of content panels
   * @param {string} [config.orientation] - Optional override ("horizontal"|"vertical")
   * @param {number} [config.initialIndex=0] - Index to activate on load
   * @param {function} [config.onReady] - Callback fired after initialization
   * @param {function} [config.onChange] - Callback fired when tab changes: (index, tab, panel) => {}
   */
  constructor({ 
    tabs, 
    panels, 
    orientation, // Now optional, auto-detected if omitted
    initialIndex = 0,
    onReady,
    onChange 
  }) {
    // 1. Setup Properties
    this.tabs = Array.from(tabs);
    this.panels = Array.from(panels);
    this.onChange = onChange;
    this.currentIndex = -1; 
    
    // Bind methods
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // 2. Validate
    if (this.tabs.length === 0 || this.tabs.length !== this.panels.length) {
      console.warn("TabManager: Tabs/Panels mismatch or empty.");
      return;
    }

    // 3. Determine Orientation
    // Priority: Config Argument -> HTML Attribute -> Default "horizontal"
    if (orientation) {
      this.orientation = orientation;
    } else {
      // Check the parent of the first tab for aria-orientation
      const tabList = this.tabs[0].closest('[role="tablist"]') || this.tabs[0].parentElement;
      const attr = tabList.getAttribute("aria-orientation");
      this.orientation = attr === "vertical" ? "vertical" : "horizontal";
    }

    // 4. Initialize
    this.setupAttributes();
    this.attachListeners();
    this.activate(initialIndex, false); 

    if (onReady) {
      onReady(this);
    }
  }

  setupAttributes() {
    // Unique ID for this instance to prevent collisions
    const baseId = `tab-mgr-${Math.random().toString(36).substr(2, 9)}`;

    this.tabs.forEach((tab, index) => {
      const panel = this.panels[index];
      
      // Auto-generate IDs if missing
      if (!tab.id) tab.id = `${baseId}-tab-${index}`;
      if (!panel.id) panel.id = `${baseId}-panel-${index}`;

      // Set ARIA Roles & Relationships
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", panel.id);
      
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

    // Standard WAI-ARIA Keyboard Patterns
    // Vertical: Up/Down | Horizontal: Left/Right
    if ((!isVert && e.key === "ArrowRight") || (isVert && e.key === "ArrowDown")) {
      nextIndex = (index + 1) % this.tabs.length;
    } else if ((!isVert && e.key === "ArrowLeft") || (isVert && e.key === "ArrowUp")) {
      nextIndex = (index - 1 + this.tabs.length) % this.tabs.length;
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

  activate(index, triggerCallback = true) {
    if (index < 0 || index >= this.tabs.length) return;
    if (this.currentIndex === index) return;

    // Deactivate Current
    if (this.currentIndex > -1) {
      const prevTab = this.tabs[this.currentIndex];
      const prevPanel = this.panels[this.currentIndex];
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

    if (triggerCallback && this.onChange) {
      this.onChange(index, tab, panel);
    }
  }

  destroy() {
    this.tabs.forEach(tab => {
      tab.removeEventListener("click", this.handleClick);
      tab.removeEventListener("keydown", this.handleKeydown);
    });
    this.tabs = [];
    this.panels = [];
  }
}