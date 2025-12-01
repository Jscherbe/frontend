import { getCoreEventName as n } from "../core/events.js";
const o = {
  opened: "data-ulu-print-details-opened"
}, c = (t) => `[${o[t]}]`, d = {
  selector: "details:not([open])"
};
function i(t) {
  const r = Object.assign({}, d, t);
  document.addEventListener(n("beforePrint"), () => {
    document.querySelectorAll(r.selector).forEach((e) => {
      e.open || (e.setAttribute(o.opened, !0), e.open = !0);
    });
  }), document.addEventListener(n("afterPrint"), () => {
    document.querySelectorAll(c("opened")).forEach((e) => {
      e.removeAttribute(o.opened), e.open = !1;
    });
  });
}
export {
  o as attrs,
  i as init
};
