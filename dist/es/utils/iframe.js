import { separateCssUnit as u } from "@ulu/utils/string.js";
const o = /^\d+$/;
function h(a) {
  const c = a.querySelectorAll("iframe");
  if (c.length === 1 && a.textContent.trim() === "") {
    const n = c[0], l = n.getAttribute("width"), t = n.getAttribute("height"), e = !!(l && t && o.test(l) && o.test(t));
    let s = null;
    if (!e) {
      const i = n.style.height || t;
      if (i)
        if (o.test(i))
          s = `${i}px`;
        else
          try {
            const r = u(i);
            r && r.unit && r.unit !== "%" && (s = i);
          } catch (r) {
          }
    }
    return {
      iframe: n,
      isStaticSize: e,
      width: e ? l : null,
      height: e ? t : null,
      aspectRatio: e ? `${l} / ${t}` : null,
      fillHeight: s
    };
  }
  return null;
}
export {
  h as getSoleIframeLayout
};
