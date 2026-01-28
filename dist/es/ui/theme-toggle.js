var j = Object.defineProperty, O = Object.defineProperties;
var R = Object.getOwnPropertyDescriptors;
var C = Object.getOwnPropertySymbols;
var w = Object.prototype.hasOwnProperty, K = Object.prototype.propertyIsEnumerable;
var E = (e, t, r) => t in e ? j(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, h = (e, t) => {
  for (var r in t || (t = {}))
    w.call(t, r) && E(e, r, t[r]);
  if (C)
    for (var r of C(t))
      K.call(t, r) && E(e, r, t[r]);
  return e;
}, b = (e, t) => O(e, R(t));
import { ComponentInitializer as D } from "../core/component.js";
import { getCoreEventName as k } from "../core/events.js";
import { resolveClasses as y } from "../utils/dom.js";
import { hasRequiredProps as z } from "@ulu/utils/object.js";
import { getElements as A } from "@ulu/utils/browser/dom.js";
const c = new D({
  type: "theme-toggle",
  baseAttribute: "data-ulu-theme-toggle"
}), _ = c.attributeSelector("label"), N = c.attributeSelector("icon"), M = c.getAttribute("remote"), S = c.getAttribute("init"), x = c.getAttribute("state"), F = (e) => document.querySelectorAll(
  `[${M}="${e}"]`
), I = (e) => document.querySelectorAll(
  `[${M}="${e}"]:not([${S}])`
), q = ["target"], U = z(q), L = (e, t) => e ? t() : null, Q = {
  /**
   * Object of each theme that should be toggle/cycled through
   */
  themes: {
    light: {
      label: "Light",
      value: "light",
      iconClass: "fas fa-moon",
      targetClass: "theme-light",
      mediaQuery: "(prefers-color-scheme: light)"
    },
    dark: {
      label: "Dark",
      iconClass: "fas fa-sun",
      targetClass: "theme-dark",
      mediaQuery: "(prefers-color-scheme: dark)"
    }
  },
  /**
   * Required this is the element(s) that should be changed by a specific toggle
   * - The element should have data-ulu-theme-toggle-target="SOME_IDENTIFIER"
   */
  target: "body",
  /**
   * Optional group to link remote toggles (toggles that follow the main one and can toggle too)
   */
  group: null,
  /**
   * Optional callback to do something when the state changes
   */
  onChange(e) {
  },
  /**
   * The initial state for this component
   * - May be overridden by saved preference or media query if options are enabled
   */
  initialState: "light",
  /**
   * Check the OS systems user preference via 'preferenceQuery' option
   */
  checkMediaQuery: !1,
  /**
   * Will store the preference in local storage so it persists between page loads
   */
  savePreference: !1,
  /**
   * The key that will be used to store the preference in local storage
   * - This will be used as prefix in combination with group if defined
   */
  storagePrefix: "ulu-theme-",
  /**
   * Output information to console for debugging
   */
  debug: !1
};
let T = h({}, Q);
function re(e) {
  T = Object.assign({}, T, e);
}
function oe() {
  c.init({
    coreEvents: ["pageModified"],
    withData: !0,
    setup({ element: e, data: t, initialize: r }) {
      B(e, t), r();
    }
  });
}
function B(e, t) {
  const r = Object.assign({}, Q, t);
  if (!U(r)) {
    console.error(`Missing a required option: ${q.join(", ")}`);
    return;
  }
  const o = r.group, n = { toggle: e, options: r }, u = G(r);
  if (!u) {
    console.error("Unable to resolve initial key");
    return;
  }
  v(u, n), e.addEventListener("click", a), l(), document.addEventListener(k("pageModified"), l);
  function s(g) {
    const d = A(r.target)[0].dataset.uluThemeToggleState, f = J(d, r);
    if (!f) {
      console.error("Issue getting next theme key");
      return;
    }
    v(f, b(h({}, n), { event: g }));
  }
  function a(g) {
    s(g);
  }
  function l() {
    if (!o) return;
    I(o).forEach((i) => {
      i.addEventListener("click", a), c.initializeElement(i);
    });
  }
  function m() {
    if (!o) return;
    I(o).forEach((i) => {
      i.removeEventListener("click", a), i.removeAttribute(S, "");
    });
  }
  function p() {
    e.removeEventListener("click", a), e.removeAttribute(S, ""), m(), document.removeEventListener(k("pageModified"), l);
  }
  return {
    destroy: p,
    toggle: e,
    options: r,
    toggleState: s,
    setState(g) {
      v(g, n);
    }
  };
}
function v(e, t) {
  if (!e) {
    console.error("Missing key");
    return;
  }
  const { toggle: r, options: o } = t, { themes: n, group: u } = o, s = {
    targets: A(o.target),
    toggles: [r, ...u ? F(u) : []]
  };
  if (!s.targets.length || !s.toggles.length) {
    console.error("Issue setting state, couldn't find needed elements", s);
    return;
  }
  const a = n[e], l = V(e, n), m = b(h({}, t), {
    key: e,
    elements: s,
    theme: a,
    otherThemes: l
  });
  o.debug && c.log("Set state context", m);
  const p = P(l, "targetClass"), g = P(l, "iconClass");
  s.targets.forEach((i) => {
    i.setAttribute(x, e), i.classList.remove(...p), i.classList.add(...y(a.targetClass));
  }), s.toggles.forEach((i) => {
    const d = i.querySelector(_), f = i.querySelector(N);
    d && (d.textContent = a.label), f && (f.classList.remove(...g), f.classList.add(...y(a.iconClass))), i.setAttribute(x, e);
  }), o.onChange && o.onChange(m), o.savePreference && localStorage.setItem($(o), e);
}
function G(e) {
  const { savePreference: t, checkMediaQuery: r, themes: o, initialState: n } = e, u = $(e), s = L(t, () => localStorage.getItem(u)), a = L(r, () => H(o)), l = s || a || n;
  return e.debug && (c.log("Preference Saved", s), c.log("Media Query Preference", a), c.log("Initial State:", n)), l || c.logError("Failed to resolve initial theme (pass 'initialState' to options)"), l;
}
function H(e) {
  const t = Object.entries(e).find(([r, o]) => {
    if (o.mediaQuery)
      return window.matchMedia(o.mediaQuery).matches;
  });
  return t ? t[0] : null;
}
function J(e, t) {
  const { themes: r } = t, o = Object.keys(r), n = o.findIndex((s) => s === e), u = n === -1 ? 0 : (n + 1) % o.length;
  return o[u];
}
function V(e, t) {
  return Object.entries(t).filter(([o]) => o !== e).map(([o, n]) => n);
}
function P(e, t) {
  return e.reduce((r, o) => r.concat(y(o[t])), []);
}
function $(e) {
  const { storagePrefix: t, group: r } = e;
  return r ? `${t}${r}` : t;
}
export {
  Q as defaults,
  oe as init,
  c as initializer,
  re as setDefaults,
  B as setupToggle
};
