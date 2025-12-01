import { kebabToCamel as f } from "@ulu/utils/string.js";
function c(t) {
  return f(t.replace(/^data-/, ""));
}
function p(t, o = {
  columnFirst: "position-column-first",
  columnLast: "position-column-last",
  rowFirst: "position-row-first",
  rowLast: "position-row-last"
}) {
  const l = [...t.children], n = [];
  let e;
  l.forEach((r) => {
    const s = r.getBoundingClientRect().y;
    e !== s && n.push([]), n[n.length - 1].push(r), e = s, r.classList.remove(...Object.values(o));
  }), n.forEach((r, s) => {
    s === 0 && r.forEach((i) => i.classList.add(o.rowFirst)), s == n.length - 1 && r.forEach((i) => i.classList.add(o.rowLast)), r.forEach((i, a) => {
      a === 0 && i.classList.add(o.columnFirst), a == r.length - 1 && i.classList.add(o.columnLast);
    });
  });
}
function m(t) {
  return typeof t == "string" ? t.split(" ").filter((o) => o !== "") : Array.isArray(t) ? t : t ? (console.warn("resolveClassArray: Invalid class input type.", t), []) : [];
}
export {
  c as dataAttributeToDatasetKey,
  m as resolveClasses,
  p as setPositionClasses
};
