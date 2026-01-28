var y = Object.defineProperty;
var b = Object.getOwnPropertySymbols;
var A = Object.prototype.hasOwnProperty, x = Object.prototype.propertyIsEnumerable;
var c = (h, t, i) => t in h ? y(h, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : h[t] = i, u = (h, t) => {
  for (var i in t || (t = {}))
    A.call(t, i) && c(h, i, t[i]);
  if (b)
    for (var i of b(t))
      x.call(t, i) && c(h, i, t[i]);
  return h;
};
var f = (h, t, i) => c(h, typeof t != "symbol" ? t + "" : t, i);
import { ensureId as p } from "../utils/id.js";
import { getCoreEventName as g } from "../core/events.js";
const o = class o {
  /**
   * @param {HTMLElement} tablistElement - The element with role="tablist"
   * @param {Partial<TabManagerOptions>} [options] - Configuration options.
   */
  constructor(t, i = {}) {
    if (this.tablist = t, this.options = u(u({}, o.defaults), i), this.tabs = Array.from(this.tablist.children), this.panels = this.tabs.map((n) => {
      const s = n.getAttribute("aria-controls");
      return s ? document.getElementById(s) : null;
    }).filter(Boolean), this.currentIndex = -1, this.handleKeydown = this.handleKeydown.bind(this), this.handleClick = this.handleClick.bind(this), this.updatePanelHeights = this.updatePanelHeights.bind(this), this.tabs.length === 0 || this.tabs.length !== this.panels.length) {
      console.warn("TabManager: Tab/Panel count mismatch. Check aria-controls.", { tabs: this.tabs, panels: this.panels });
      return;
    }
    this.orientation = this.options.orientation || this.tablist.getAttribute("aria-orientation") || "horizontal", this.setupAttributes(), this.attachListeners();
    let e = this.options.initialIndex;
    if (this.options.openByUrlHash) {
      const n = window.location.hash.substring(1), s = this.tabs.findIndex((r) => r.id === n);
      s > -1 && (e = s);
    }
    this.activate(e, !1), this.options.equalHeights && (this.updatePanelHeights(), document.addEventListener(g("pageResized"), this.updatePanelHeights)), this.options.onReady && this.options.onReady(this);
  }
  /**
   * Sets the necessary ARIA attributes and initial states for tabs and panels.
   * @private
   */
  setupAttributes() {
    this.tablist.setAttribute("role", "tablist"), this.tabs.forEach((t, i) => {
      const e = this.panels[i];
      p(t), p(e), t.setAttribute("role", "tab"), t.hasAttribute("aria-controls") || t.setAttribute("aria-controls", e.id), e.setAttribute("role", "tabpanel"), e.setAttribute("aria-labelledby", t.id), e.hidden = !0, t.setAttribute("tabindex", "-1"), t.setAttribute("aria-selected", "false");
    });
  }
  /**
   * Attaches click and keydown event listeners to each tab.
   * @private
   */
  attachListeners() {
    this.tabs.forEach((t) => {
      t.addEventListener("click", this.handleClick), t.addEventListener("keydown", this.handleKeydown);
    });
  }
  /**
   * Handles click events on tabs, activating the corresponding panel.
   * @param {MouseEvent} e - The click event.
   * @private
   */
  handleClick(t) {
    const i = this.tabs.indexOf(t.currentTarget);
    this.activate(i);
  }
  /**
   * Handles keyboard navigation (arrows, Home, End) on the tab list.
   * @param {KeyboardEvent} e - The keydown event.
   * @private
   */
  handleKeydown(t) {
    const i = this.tabs.indexOf(t.currentTarget);
    let e = null;
    const n = this.orientation === "vertical", s = this.options.allArrows, r = (this.tablist.dir === "rtl" || document.dir === "rtl") && this.tablist.dir !== "ltr", a = r ? "ArrowLeft" : "ArrowRight", l = r ? "ArrowRight" : "ArrowLeft";
    t.key === "ArrowDown" ? (n || s) && (e = (i + 1) % this.tabs.length) : t.key === "ArrowUp" ? (n || s) && (e = (i - 1 + this.tabs.length) % this.tabs.length) : t.key === a ? (!n || s) && (e = (i + 1) % this.tabs.length) : t.key === l ? (!n || s) && (e = (i - 1 + this.tabs.length) % this.tabs.length) : t.key === "Home" ? e = 0 : t.key === "End" && (e = this.tabs.length - 1), e !== null && (t.preventDefault(), this.activate(e), this.tabs[e].focus());
  }
  /**
   * Activates a tab. Can be called with an index or a tab ID string.
   * @param {Number|String} indexOrId - The index or ID of the tab to activate.
   * @param {Boolean} [triggerActions=true] - If false, will not fire onChange or set URL hash.
   */
  activate(t, i = !0) {
    let e = -1;
    if (typeof t == "string" ? e = this.tabs.findIndex((d) => d.id === t) : e = t, e < 0 || e >= this.tabs.length || this.currentIndex === e) return;
    const n = this.currentIndex, s = n > -1 ? this.tabs[n] : null, r = n > -1 ? this.panels[n] : null;
    s && (s.setAttribute("aria-selected", "false"), s.setAttribute("tabindex", "-1"), r.hidden = !0);
    const a = this.tabs[e], l = this.panels[e];
    a.setAttribute("aria-selected", "true"), a.setAttribute("tabindex", "0"), l.hidden = !1, this.currentIndex = e, i && this.options.setUrlHash && window.history && window.history.replaceState(null, "", `#${a.id}`), i && this.options.onChange && this.options.onChange(
      { index: e, tab: a, panel: l },
      { index: n, tab: s, panel: r }
    );
  }
  /**
   * Public method to activate a tab by its ID.
   * @param {String} id - The ID of the tab element to activate.
   */
  activateById(t) {
    this.activate(t, !0);
  }
  /**
   * Calculates and applies equal heights to all panels.
   * Waits for images within panels to load before calculating.
   */
  updatePanelHeights() {
    if (!this.panels || this.panels.length === 0) return;
    const t = this.panels[0].parentElement;
    if (!t) return;
    const i = [...t.querySelectorAll("img")], e = (s) => new Promise((r) => {
      if (s.complete) return r(s);
      s.onload = () => r(s), s.onerror = () => r(s);
    }), n = i.map(e);
    Promise.all(n).then(() => {
      this.panels.forEach((a) => {
        a.style.minHeight = "";
      });
      const s = this.panels.map((a) => {
        const l = a.hidden;
        a.hidden = !1;
        const d = a.offsetHeight;
        return a.hidden = l, d;
      }), r = Math.max(...s);
      r > 0 && this.panels.forEach((a) => {
        a.style.minHeight = `${r}px`;
      });
    });
  }
  /**
   * Removes event listeners, cleans up ARIA attributes, and resets the DOM to its pre-initialized state.
   */
  destroy() {
    this.tabs.forEach((t) => {
      t.removeEventListener("click", this.handleClick), t.removeEventListener("keydown", this.handleKeydown);
    }), this.options.equalHeights && document.removeEventListener(g("pageResized"), this.updatePanelHeights), this.tablist.removeAttribute("role"), this.tabs.forEach((t) => {
      t.removeAttribute("role"), t.removeAttribute("aria-selected"), t.removeAttribute("tabindex");
    }), this.panels.forEach((t) => {
      t.removeAttribute("role"), t.removeAttribute("aria-labelledby"), t.hidden = !1, t.style.minHeight = "";
    }), this.tablist = null, this.tabs = [], this.panels = [], this.options = {}, this.currentIndex = -1;
  }
};
/**
 * Default options for TabManager.
 * @type {TabManagerOptions}
 */
f(o, "defaults", {
  orientation: null,
  initialIndex: 0,
  allArrows: !1,
  openByUrlHash: !1,
  setUrlHash: !1,
  equalHeights: !1,
  onReady: null,
  onChange: null
});
let m = o;
export {
  m as TabManager
};
