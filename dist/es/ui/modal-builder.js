var I = Object.defineProperty;
var m = Object.getOwnPropertySymbols;
var R = Object.prototype.hasOwnProperty, E = Object.prototype.propertyIsEnumerable;
var p = (s, t, e) => t in s ? I(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e, $ = (s, t) => {
  for (var e in t || (t = {}))
    R.call(t, e) && p(s, e, t[e]);
  if (m)
    for (var e of m(t))
      E.call(t, e) && p(s, e, t[e]);
  return s;
};
import { ComponentInitializer as v } from "../core/component.js";
import { wrapSettingString as c } from "../core/settings.js";
import { getCoreEventName as f } from "../core/events.js";
import { Resizer as w } from "./resizer.js";
import { baseAttribute as g, closeAttribute as A, defaults as H } from "./dialog.js";
import { createElementFromHtml as M, getElement as S } from "@ulu/utils/browser/dom.js";
import { getSoleIframeLayout as D } from "../utils/iframe.js";
const n = new v({
  type: "modal-builder",
  baseAttribute: "data-ulu-modal-builder"
}), L = {
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
  fullscreenMobile: !1,
  class: "",
  baseClass: "modal",
  footerElement: null,
  footerHtml: null,
  classClose: "button button--icon",
  classCloseIcon: c("iconClassClose", (s) => `${s} button__icon`),
  classResizerIcon: c("iconClassDragX"),
  classResizerIconBoth: c("iconClassDragBoth"),
  debug: !1,
  autoIframe: !1,
  templateCloseIcon(s) {
    const { baseClass: t, classCloseIcon: e } = s;
    return `<span class="${t}__close-icon ${e}" aria-hidden="true"></span>`;
  },
  templateResizerIcon(s) {
    const { baseClass: t, classResizerIcon: e, classResizerIconBoth: a } = s, o = s.position === "center" ? a : e;
    return `<span class="${t}__resizer-icon ${o}" aria-hidden="true"></span>`;
  },
  /**
   * Default modal template
   * @param {String} id ID for new modal
   * @param {Object} config Resolved options
   * @returns {String} Markup for modal
   */
  template(s, t) {
    const { baseClass: e, describedby: a, footerHtml: o } = t, i = [
      e,
      `${e}--${t.position}`,
      `${e}--${t.size}`,
      `${e}--${t.allowResize ? "resize" : "no-resize"}`,
      ...t.title ? [] : [`${e}--no-header`],
      ...t.bodyFills ? [`${e}--body-fills`] : [],
      ...t.noBackdrop ? [`${e}--no-backdrop`] : [],
      ...t.noMinHeight ? [`${e}--no-min-height`] : [],
      ...t.fullscreenMobile ? [`${e}--fullscreen-mobile`] : [],
      ...t.class ? [t.class] : []
    ], r = t.title ? `${s}--title` : t.labelledby;
    return `
      <dialog 
        id="${s}" 
        class="${i.join(" ")}" 
        ${r ? `aria-labelledby="${r}"` : ""}
        ${a ? `aria-describedby="${a}"` : ""}
      >
        ${t.title ? `
          <header class="${e}__header">
            <h2 id="${r}" class="${e}__title ${t.titleClass}">
              ${t.titleIcon ? `<span class="${e}__title-icon ${t.titleIcon}" aria-hidden="true"></span>` : ""}
              <span class="${e}__title-text">${t.title}</span>
            </h2>
            <button class="${e}__close ${t.classClose}" aria-label="Close modal" ${A} autofocus>
              ${t.templateCloseIcon(t)}
            </button>
          </header>
        ` : ""}
        <div class="${e}__body" ${n.getAttribute("body")}></div>
        ${o ? `<div class="${e}__footer">${o}</div>` : ""}
        ${t.allowResize ? `<button class="${e}__resizer" type="button" ${n.getAttribute("resizer")}>
            ${t.templateResizerIcon(t)}
          </button>` : ""}
      </dialog>
    `;
  }
};
let u = $({}, L);
function J(s) {
  u = Object.assign({}, u, s);
}
function Y() {
  n.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: s, data: t }) {
      O(s, t);
    }
  });
}
function O(s, t) {
  const e = Object.assign({}, u, t), { position: a } = e;
  if (e.debug && n.log(e, s), !s.id)
    throw new Error("Missing ID on modal");
  const o = e.template(s.id, e), i = M(o.trim()), r = (l) => i.querySelector(n.attributeSelector(l)), d = r("body"), h = r("resizer"), C = B(e);
  if (s.removeAttribute("id"), s.removeAttribute("hidden"), s.removeAttribute(n.getAttribute()), s.parentNode.replaceChild(i, s), d.appendChild(s), i.setAttribute(g, JSON.stringify(C)), e.footerElement) {
    const l = S(e.footerElement);
    l && (l.classList.add(`${e.baseClass}__footer`), d.after(l));
  }
  if (e.autoIframe) {
    const l = D(s);
    l && (l.iframe.classList.add(`${e.baseClass}__frame-content`), l.isStaticSize ? (i.classList.add(`${e.baseClass}--frame-ratio`), d.style.aspectRatio = l.aspectRatio) : (i.classList.add(`${e.baseClass}--frame-fill`), l.fillHeight && (d.style.minHeight = l.fillHeight)));
  }
  let b;
  const z = ["left", "right", "center"], _ = a === "center", y = a === "right";
  if (e.allowResize)
    if (z.includes(a)) {
      const l = _ ? { fromX: "right", fromY: "bottom", multiplier: 2 } : { fromX: y ? "left" : "right" };
      b = new w(i, h, l);
    } else
      console.warn(`${a} is not supported for resizing`);
  if (e.print) {
    let l;
    document.addEventListener(f("beforePrint"), () => {
      l = s.cloneNode(!0), i.after(l);
    }), document.addEventListener(f("afterPrint"), () => {
      l.remove();
    });
  }
  return { modal: i, resizer: b };
}
function B(s) {
  return Object.keys(H).reduce((t, e) => (e in s && (t[e] = s[e]), t), {});
}
export {
  O as buildModal,
  L as defaults,
  Y as init,
  n as initializer,
  J as setDefaults
};
