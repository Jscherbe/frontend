function y() {
  return function(d, c) {
    const a = c === "next", { track: s } = d.elements;
    if (!s.children) return 400;
    const g = window.getComputedStyle(s).getPropertyValue("scroll-padding-left").replace("auto", "0px"), o = parseInt(g, 10) || 0, { scrollLeft: n, offsetWidth: i } = s, u = n + i, f = [...s.children].map((e) => {
      const { offsetLeft: t, offsetWidth: l } = e;
      return {
        element: e,
        offsetLeft: t,
        offsetRight: t + l
      };
    });
    let r;
    if (a)
      r = f.find((e) => e.offsetRight > u - 1);
    else {
      let e = f.findLastIndex((t) => t.offsetLeft < n + o - 1);
      if (e > -1) {
        let t = f[e];
        r = f.slice(0, e + 1).find((h) => h.offsetLeft - o + i >= t.offsetRight - 1) || t;
      }
    }
    return r ? Math.max(0, r.offsetLeft - o) : 400;
  };
}
export {
  y as createPager
};
