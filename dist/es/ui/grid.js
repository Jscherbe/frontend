import { ComponentInitializer as n } from "../core/component.js";
import { setPositionClasses as e } from "../utils/dom.js";
const r = new n({
  type: "grid",
  baseAttribute: "data-grid"
});
function d(t) {
  r.init({
    coreEvents: ["pageModified", "pageResized"],
    setup({ element: i, initialize: o }) {
      e(i, t), o();
    },
    update({ element: i }) {
      e(i, t);
    }
  });
}
export {
  d as init,
  r as initializer
};
