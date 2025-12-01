import { autoUpdate as d, computePosition as g, inline as y, offset as b, flip as h, shift as j, arrow as w } from "@floating-ui/dom";
const $ = {
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
function O(l, n) {
  const t = Object.assign({}, $, n), { placement: r, strategy: f } = t, { trigger: o, content: s, contentArrow: a } = l;
  return d(o, s, () => {
    g(o, s, {
      placement: r,
      strategy: f,
      middleware: [
        ...i(y, t.inline),
        ...i(b, t.offset),
        ...i(h, t.flip),
        ...i(j, t.shift),
        ...i(w, a && t.arrow, { element: a })
      ]
    }).then((c) => {
      const { x: p, y: u, middlewareData: m, placement: x } = c, e = m.arrow;
      Object.assign(s.style, {
        left: `${p}px`,
        top: `${u}px`
      }), s.setAttribute("data-placement", x), e && Object.assign(a.style, {
        // position: "absolute",
        left: (e == null ? void 0 : e.x) != null ? `${e.x}px` : "",
        top: (e == null ? void 0 : e.y) != null ? `${e.y}px` : ""
      });
    });
  });
}
function i(l, n, t = {}) {
  return n ? typeof n == "object" ? [l({ ...n, ...t })] : [l(t)] : [];
}
export {
  O as createFloatingUi,
  $ as defaults
};
