import { kebabToCamel as l } from "@ulu/utils/string.js";
function u(t) {
  return l(t.replace(/^data-/, ""));
}
function c(t) {
  const s = [...t.children].map((e) => ({ child: e, rect: e.getBoundingClientRect() })).filter((e) => e.rect.width !== 0 || e.rect.height !== 0);
  if (s.length === 0)
    return [];
  s.sort((e, i) => Math.abs(e.rect.top - i.rect.top) > 1 ? e.rect.top - i.rect.top : e.rect.left - i.rect.left);
  const o = [];
  let r = null;
  return s.forEach(({ child: e, rect: i }) => {
    (r === null || Math.abs(i.top - r) > 1) && (o.push([]), r = i.top), o[o.length - 1].push(e);
  }), o;
}
function f(t, n = {
  columnFirst: "position-column-first",
  columnLast: "position-column-last",
  rowFirst: "position-row-first",
  rowLast: "position-row-last"
}) {
  [...t.children].forEach((r) => r.classList.remove(...Object.values(n)));
  const o = c(t);
  o.length !== 0 && (o[0].forEach((r) => r.classList.add(n.rowFirst)), o[o.length - 1].forEach((r) => r.classList.add(n.rowLast)), o.forEach((r) => {
    r[0].classList.add(n.columnFirst), r[r.length - 1].classList.add(n.columnLast);
  }));
}
function h(t) {
  return typeof t == "string" ? t.split(" ").filter((n) => n !== "") : Array.isArray(t) ? t : t ? (console.warn("resolveClassArray: Invalid class input type.", t), []) : [];
}
export {
  u as dataAttributeToDatasetKey,
  c as getVisualRows,
  h as resolveClasses,
  f as setPositionClasses
};
