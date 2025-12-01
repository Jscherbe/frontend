import { ComponentInitializer as M } from "../core/component.js";
import { getCoreEventName as y } from "../core/events.js";
import { resolveClasses as b } from "../utils/dom.js";
import { hasRequiredProps as q } from "@ulu/utils/object.js";
import { getElements as I } from "@ulu/utils/browser/dom.js";
const c = new M({
  type: "theme-toggle",
  baseAttribute: "data-ulu-theme-toggle"
}), Q = c.attributeSelector("label"), $ = c.attributeSelector("icon"), L = c.getAttribute("remote"), v = c.getAttribute("init"), S = c.getAttribute("state"), j = (e) => document.querySelectorAll(
  `[${L}="${e}"]`
), C = (e) => document.querySelectorAll(
  `[${L}="${e}"]:not([${v}])`
), T = ["target"], O = q(T), E = (e, r) => e ? r() : null, P = {
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
let k = { ...P };
function G(e) {
  k = Object.assign({}, k, e);
}
function H() {
  c.init({
    coreEvents: ["pageModified"],
    withData: !0,
    setup({ element: e, data: r, initialize: o }) {
      R(e, r), o();
    }
  });
}
function R(e, r) {
  const o = Object.assign({}, P, r);
  if (!O(o)) {
    console.error(`Missing a required option: ${T.join(", ")}`);
    return;
  }
  const t = o.group, n = { toggle: e, options: o }, u = w(o);
  if (!u) {
    console.error("Unable to resolve initial key");
    return;
  }
  p(u, n), e.addEventListener("click", a), l(), document.addEventListener(y("pageModified"), l);
  function s(g) {
    const d = I(o.target)[0].dataset.uluThemeToggleState, f = D(d, o);
    if (!f) {
      console.error("Issue getting next theme key");
      return;
    }
    p(f, { ...n, event: g });
  }
  function a(g) {
    s(g);
  }
  function l() {
    if (!t) return;
    C(t).forEach((i) => {
      i.addEventListener("click", a), c.initializeElement(i);
    });
  }
  function m() {
    if (!t) return;
    C(t).forEach((i) => {
      i.removeEventListener("click", a), i.removeAttribute(v, "");
    });
  }
  function h() {
    e.removeEventListener("click", a), e.removeAttribute(v, ""), m(), document.removeEventListener(y("pageModified"), l);
  }
  return {
    destroy: h,
    toggle: e,
    options: o,
    toggleState: s,
    setState(g) {
      p(g, n);
    }
  };
}
function p(e, r) {
  if (!e) {
    console.error("Missing key");
    return;
  }
  const { toggle: o, options: t } = r, { themes: n, group: u } = t, s = {
    targets: I(t.target),
    toggles: [o, ...u ? j(u) : []]
  };
  if (!s.targets.length || !s.toggles.length) {
    console.error("Issue setting state, couldn't find needed elements", s);
    return;
  }
  const a = n[e], l = z(e, n), m = {
    ...r,
    key: e,
    elements: s,
    theme: a,
    otherThemes: l
  };
  t.debug && c.log("Set state context", m);
  const h = x(l, "targetClass"), g = x(l, "iconClass");
  s.targets.forEach((i) => {
    i.setAttribute(S, e), i.classList.remove(...h), i.classList.add(...b(a.targetClass));
  }), s.toggles.forEach((i) => {
    const d = i.querySelector(Q), f = i.querySelector($);
    d && (d.textContent = a.label), f && (f.classList.remove(...g), f.classList.add(...b(a.iconClass))), i.setAttribute(S, e);
  }), t.onChange && t.onChange(m), t.savePreference && localStorage.setItem(A(t), e);
}
function w(e) {
  const { savePreference: r, checkMediaQuery: o, themes: t, initialState: n } = e, u = A(e), s = E(r, () => localStorage.getItem(u)), a = E(o, () => K(t)), l = s || a || n;
  return e.debug && (c.log("Preference Saved", s), c.log("Media Query Preference", a), c.log("Initial State:", n)), l || c.logError("Failed to resolve initial theme (pass 'initialState' to options)"), l;
}
function K(e) {
  const r = Object.entries(e).find(([o, t]) => {
    if (t.mediaQuery)
      return window.matchMedia(t.mediaQuery).matches;
  });
  return r ? r[0] : null;
}
function D(e, r) {
  const { themes: o } = r, t = Object.keys(o), n = t.findIndex((s) => s === e), u = n === -1 ? 0 : (n + 1) % t.length;
  return t[u];
}
function z(e, r) {
  return Object.entries(r).filter(([t]) => t !== e).map(([t, n]) => n);
}
function x(e, r) {
  return e.reduce((o, t) => o.concat(b(t[r])), []);
}
function A(e) {
  const { storagePrefix: r, group: o } = e;
  return o ? `${r}${o}` : r;
}
export {
  P as defaults,
  H as init,
  c as initializer,
  G as setDefaults,
  R as setupToggle
};
