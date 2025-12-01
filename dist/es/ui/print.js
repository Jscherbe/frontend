import { ComponentInitializer as o } from "../core/component.js";
import { getElement as r } from "@ulu/utils/browser/dom.js";
import { printElement as l } from "@ulu/utils/browser/print.js";
const s = new o({
  type: "print",
  baseAttribute: "data-ulu-print"
}), m = {
  /**
   * Print element/selector
   */
  element: null
};
function u() {
  s.init({
    withData: !0,
    coreEvents: ["pageModified"],
    setup({ element: t, data: n, initialize: e }) {
      p(t, n), e();
    }
  });
}
function p(t, n) {
  const e = Object.assign({}, m, n);
  t.addEventListener("click", () => {
    if (e.element) {
      const i = r(e.element);
      i ? l(i) : console.error("Unable to find element to print", t, e);
    } else
      window.print();
  });
}
export {
  u as init
};
