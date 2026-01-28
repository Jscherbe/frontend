var b = Object.defineProperty;
var f = Object.getOwnPropertySymbols;
var h = Object.prototype.hasOwnProperty, j = Object.prototype.propertyIsEnumerable;
var c = (n, e, t) => e in n ? b(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, o = (n, e) => {
  for (var t in e || (e = {}))
    h.call(e, t) && c(n, t, e[t]);
  if (f)
    for (var t of f(e))
      j.call(e, t) && c(n, t, e[t]);
  return n;
};
import { autoUpdate as w, computePosition as $, inline as A, offset as O, flip as U, shift as D, arrow as F } from "@floating-ui/dom";
const k = {
  strategy: "absolute",
  placement: "bottom",
  inline: !1,
  offset: {
    mainAxis: 16
  },
  shift: !0,
  flip: !0,
  arrow: !0
  // Options for arrow (not element)
};
function B(n, e) {
  const t = Object.assign({}, k, e), { placement: p, strategy: u } = t, { trigger: r, content: s, contentArrow: a } = n;
  return w(r, s, () => {
    $(r, s, {
      placement: p,
      strategy: u,
      middleware: [
        ...l(A, t.inline),
        ...l(O, t.offset),
        ...l(U, t.flip),
        ...l(D, t.shift),
        ...l(F, a && t.arrow, { element: a })
      ]
    }).then((m) => {
      const { x, y: d, middlewareData: g, placement: y } = m, i = g.arrow;
      Object.assign(s.style, {
        left: `${x}px`,
        top: `${d}px`
      }), s.setAttribute("data-placement", y), i && Object.assign(a.style, {
        // position: "absolute",
        left: (i == null ? void 0 : i.x) != null ? `${i.x}px` : "",
        top: (i == null ? void 0 : i.y) != null ? `${i.y}px` : ""
      });
    });
  });
}
function l(n, e, t = {}) {
  return e ? typeof e == "object" ? [n(o(o({}, e), t))] : [n(t)] : [];
}
export {
  B as createFloatingUi,
  k as defaults
};
