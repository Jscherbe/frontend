import { ComponentInitializer as C } from "../core/component.js";
import { wrapSettingString as d } from "../core/settings.js";
import { getCoreEventName as m } from "../core/events.js";
import { Resizer as _ } from "./resizer.js";
import { closeAttribute as y, baseAttribute as I, defaults as E } from "./dialog.js";
import { createElementFromHtml as v, getElement as R } from "@ulu/utils/browser/dom.js";
const n = new C({
  type: "modal-builder",
  baseAttribute: "data-ulu-modal-builder"
}), w = {
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
            <button class="${e}__close ${t.classClose}" aria-label="Close modal" ${y} autofocus>
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
let c = { ...w };
function j(s) {
  c = Object.assign({}, c, s);
}
function N() {
  n.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: s, data: t }) {
      A(s, t);
    }
  });
}
function A(s, t) {
  const e = Object.assign({}, c, t), { position: i } = e;
  if (e.debug && n.log(e, s), !s.id)
    throw new Error("Missing ID on modal");
  const r = e.template(s.id, e), o = v(r.trim()), a = (l) => o.querySelector(n.attributeSelector(l)), u = a("body"), p = a("resizer"), $ = g(e);
  if (s.removeAttribute("id"), s.removeAttribute("hidden"), s.removeAttribute(n.getAttribute()), s.parentNode.replaceChild(o, s), u.appendChild(s), o.setAttribute(I, JSON.stringify($)), e.footerElement) {
    const l = R(e.footerElement);
    l && (l.classList.add(`${e.baseClass}__footer`), u.after(l));
  }
  let b;
  const f = ["left", "right", "center"], h = i === "center", z = i === "right";
  if (e.allowResize)
    if (f.includes(i)) {
      const l = h ? { fromX: "right", fromY: "bottom", multiplier: 2 } : { fromX: z ? "left" : "right" };
      b = new _(o, p, l);
    } else
      console.warn(`${i} is not supported for resizing`);
  if (e.print) {
    let l;
    document.addEventListener(m("beforePrint"), () => {
      l = s.cloneNode(!0), o.after(l);
    }), document.addEventListener(m("afterPrint"), () => {
      l.remove();
    });
  }
  return { modal: o, resizer: b };
}
function g(s) {
  return Object.keys(E).reduce((t, e) => (e in s && (t[e] = s[e]), t), {});
}
export {
  A as buildModal,
  w as defaults,
  N as init,
  n as initializer,
  j as setDefaults
};
