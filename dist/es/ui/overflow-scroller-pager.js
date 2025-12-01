function y() {
  return function(c, a) {
    const r = a === "next", { track: s } = c.elements;
    if (!s.children) return 400;
    const g = window.getComputedStyle(s).getPropertyValue("scroll-padding-left").replace("auto", "0px"), n = parseInt(g, 10), { scrollLeft: i, offsetWidth: l } = s, u = i + l, o = [...s.children].map((e) => {
      const { offsetLeft: t, offsetWidth: d } = e;
      return {
        element: e,
        offsetLeft: t,
        offsetRight: t + d
      };
    });
    let f;
    if (r)
      f = o.find((e) => e.offsetRight >= u);
    else {
      let e = o.findLastIndex((t) => t.offsetLeft <= i);
      if (e) {
        let t = o[e];
        f = o.slice(0, e + 1).find((h) => h.offsetLeft + n + l >= t.offsetRight);
      }
    }
    return f ? r ? f.offsetLeft : f.offsetLeft + n : 400;
  };
}
export {
  y as createPager
};
