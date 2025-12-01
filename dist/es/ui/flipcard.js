var p = Object.defineProperty;
var h = (r, t, e) => t in r ? p(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var l = (r, t, e) => h(r, typeof t != "symbol" ? t + "" : t, e);
import { ComponentInitializer as f } from "../core/component.js";
import { trimWhitespace as m } from "@ulu/utils/string.js";
import { logError as b, log as g } from "../utils/class-logger.js";
const d = new f({
  type: "flipcard",
  baseAttribute: "data-ulu-flipcard"
});
function k() {
  d.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: r, data: t, initialize: e }) {
      const n = Object.assign({}, t), i = r.querySelector(d.attributeSelector("front")), o = r.querySelector(d.attributeSelector("back"));
      new u(r, i, o, n), e();
    }
  });
}
const c = class c {
  constructor(t, e, n, i) {
    n || b(this, "Missing an element (container, front, back)"), this.options = Object.assign({}, c.defaults, i);
    const { namespace: o } = this.options;
    c.instances.push(this), this.elements = { container: t, front: e, back: n }, this.isOpen = !1, this.uid = `${o}-id-${c.instances.length}`, this.stateAttr = `data-${o}-state`.toLowerCase(), this.setup(), this.setVisibility(!1), g(this, this);
  }
  toggle() {
    this.setVisibility(!this.isOpen);
  }
  setup() {
    const { uid: t } = this, { namespace: e, proxyClick: n } = this.options, { container: i, front: o, back: a } = this.elements, s = this.elements.control = document.createElement("button");
    s.classList.add(this.getClass("control-button")), s.setAttribute("type", "button"), s.innerHTML = this.createControlContent(), s.style.gridArea = e, s.style.zIndex = "-1", s.addEventListener("focusin", () => {
      s.style.zIndex = "20";
    }), s.addEventListener("focusout", () => {
      s.style.zIndex = "-1";
    }), s.addEventListener("click", this.toggle.bind(this)), a.parentNode.insertBefore(s, a), i.classList.add(this.options.namespace), i.setAttribute("style", m(this.containerCss())), n && i.addEventListener("click", this.onProxyClick.bind(this)), o.style.gridArea = e, a.style.gridArea = e, s.id = `${t}-control`, s.setAttribute("aria-controls", a.id), s.setAttribute("aria-expanded", "false"), a.id = `${t}-back`, a.setAttribute("aria-labelledby", s.id), a.setAttribute("aria-hidden", "true");
  }
  /**
   * Click handler on everything on container
   * - Determines if click was something that should be ignored (link, etc)
   */
  onProxyClick({ target: t }) {
    const { exclude: e, allowSelection: n, selectionMin: i } = this.options.proxyClick, o = window.getSelection();
    e && !t.matches(e) && (!n || o.toString().length < i) && this.toggle();
  }
  getClass(t) {
    const { namespace: e } = this.options;
    return t ? `${e}__${t}` : e;
  }
  createControlContent() {
    return `
      <span class="hidden-visually">Show More Information</span>
    `;
  }
  setVisibility(t) {
    const { back: e, container: n, control: i } = this.elements, o = t ? "open" : "closed";
    e.style.zIndex = t ? "10" : "1", e.style.visibility = t ? "visible" : "hidden", n.setAttribute(this.stateAttr, o), e.setAttribute("aria-hidden", t ? "false" : "true"), i.setAttribute("aria-expanded", t ? "true" : "false"), this.isOpen = t;
  }
  containerCss() {
    return `
      display: -ms-grid;
      display: grid;
      position: relative; 
      -ms-grid-columns: 1fr; 
      grid-template-columns: 1fr;
      justify-items: stretch;
      grid-template-areas: "${this.options.namespace}";
      cursor: pointer;
    `;
  }
  panelCss(t = 1) {
    return `
      grid-area: ${this.options.namespace};
      z-index: ${t}
    `;
  }
};
l(c, "instances", []), /**
 * Default options for Flipcard
 */
l(c, "defaults", {
  namespace: "Flipcard",
  proxyClick: {
    allowSelection: !0,
    // Don't proxy click if the user has more than the minmimum selected
    selectionMin: 10,
    // Minimum length that qualifies as a selection
    exclude: "a, input, textarea, button"
    // Selectors to avoid closing a flipcard onProxyclick 
  }
});
let u = c;
export {
  u as Flipcard,
  k as init,
  d as initializer
};
