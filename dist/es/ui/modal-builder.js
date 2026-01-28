var I = Object.defineProperty;
var m = Object.getOwnPropertySymbols;
var E = Object.prototype.hasOwnProperty, v = Object.prototype.propertyIsEnumerable;
var p = (s, t, e) => t in s ? I(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e, $ = (s, t) => {
  for (var e in t || (t = {}))
    E.call(t, e) && p(s, e, t[e]);
  if (m)
    for (var e of m(t))
      v.call(t, e) && p(s, e, t[e]);
  return s;
};
import { ComponentInitializer as R } from "../core/component.js";
import { wrapSettingString as d } from "../core/settings.js";
import { getCoreEventName as f } from "../core/events.js";
import { Resizer as w } from "./resizer.js";
import { baseAttribute as A, closeAttribute as g, defaults as D } from "./dialog.js";
import { createElementFromHtml as O, getElement as M } from "@ulu/utils/browser/dom.js";
const n = new R({
  type: "modal-builder",
  baseAttribute: "data-ulu-modal-builder"
}), B = {
  title: null,
  titleIcon: null,
  titleClass: "",
  labelledby: null,
  describedby: null,
  nonModal: !1,
  documentEnd: !0,
  allowResize: !1,
  position: "center",
  bodyFills: !1,
  noBackdrop: !1,
  size: "default",
  print: !1,
  noMinHeight: !1,
  class: "",
  baseClass: "modal",
  footerElement: null,
  footerHtml: null,
  classClose: "button button--icon",
  classCloseIcon: d("iconClassClose", (s) => `${s} button__icon`),
  classResizerIcon: d("iconClassDragX"),
  classResizerIconBoth: d("iconClassDragBoth"),
  debug: !1,
  templateCloseIcon(s) {
    const { baseClass: t, classCloseIcon: e } = s;
    return `<span class="${t}__close-icon ${e}" aria-hidden="true"></span>`;
  },
  templateResizerIcon(s) {
    const { baseClass: t, classResizerIcon: e, classResizerIconBoth: i } = s, r = s.position === "center" ? i : e;
    return `<span class="${t}__resizer-icon ${r}" aria-hidden="true"></span>`;
  },
  /**
   * Default modal template
   * @param {String} id ID for new modal
   * @param {Object} config Resolved options
   * @returns {String} Markup for modal
   */
  template(s, t) {
    const { baseClass: e, describedby: i, footerHtml: r } = t, o = [
      e,
      `${e}--${t.position}`,
      `${e}--${t.size}`,
      `${e}--${t.allowResize ? "resize" : "no-resize"}`,
      ...t.title ? [] : [`${e}--no-header`],
      ...t.bodyFills ? [`${e}--body-fills`] : [],
      ...t.noBackdrop ? [`${e}--no-backdrop`] : [],
      ...t.noMinHeight ? [`${e}--no-min-height`] : [],
      ...t.class ? [t.class] : []
    ], a = t.title ? `${s}--title` : t.labelledby;
    return `
      <dialog 
        id="${s}" 
        class="${o.join(" ")}" 
        ${a ? `aria-labelledby="${a}"` : ""}
        ${i ? `aria-describedby="${i}"` : ""}
      >
        ${t.title ? `
          <header class="${e}__header">
            <h2 id="${a}" class="${e}__title ${t.titleClass}">
              ${t.titleIcon ? `<span class="${e}__title-icon ${t.titleIcon}" aria-hidden="true"></span>` : ""}
              <span class="${e}__title-text">${t.title}</span>
            </h2>
            <button class="${e}__close ${t.classClose}" aria-label="Close modal" ${g} autofocus>
              ${t.templateCloseIcon(t)}
            </button>
          </header>
        ` : ""}
        <div class="${e}__body" ${n.getAttribute("body")}></div>
        ${r ? `<div class="${e}__footer">${r}</div>` : ""}
        ${t.allowResize ? `<button class="${e}__resizer" type="button" ${n.getAttribute("resizer")}>
            ${t.templateResizerIcon(t)}
          </button>` : ""}
      </dialog>
    `;
  }
};
let c = $({}, B);
function x(s) {
  c = Object.assign({}, c, s);
}
function q() {
  n.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: s, data: t }) {
      H(s, t);
    }
  });
}
function H(s, t) {
  const e = Object.assign({}, c, t), { position: i } = e;
  if (e.debug && n.log(e, s), !s.id)
    throw new Error("Missing ID on modal");
  const r = e.template(s.id, e), o = O(r.trim()), a = (l) => o.querySelector(n.attributeSelector(l)), u = a("body"), h = a("resizer"), z = S(e);
  if (s.removeAttribute("id"), s.removeAttribute("hidden"), s.removeAttribute(n.getAttribute()), s.parentNode.replaceChild(o, s), u.appendChild(s), o.setAttribute(A, JSON.stringify(z)), e.footerElement) {
    const l = M(e.footerElement);
    l && (l.classList.add(`${e.baseClass}__footer`), u.after(l));
  }
  let b;
  const C = ["left", "right", "center"], _ = i === "center", y = i === "right";
  if (e.allowResize)
    if (C.includes(i)) {
      const l = _ ? { fromX: "right", fromY: "bottom", multiplier: 2 } : { fromX: y ? "left" : "right" };
      b = new w(o, h, l);
    } else
      console.warn(`${i} is not supported for resizing`);
  if (e.print) {
    let l;
    document.addEventListener(f("beforePrint"), () => {
      l = s.cloneNode(!0), o.after(l);
    }), document.addEventListener(f("afterPrint"), () => {
      l.remove();
    });
  }
  return { modal: o, resizer: b };
}
function S(s) {
  return Object.keys(D).reduce((t, e) => (e in s && (t[e] = s[e]), t), {});
}
export {
  H as buildModal,
  B as defaults,
  q as init,
  n as initializer,
  x as setDefaults
};
