import { ComponentInitializer as o } from "../core/component.js";
import { setPositionClasses as n } from "../utils/dom.js";
const r = new o({
  type: "grid",
  baseAttribute: "data-grid"
});
function p(i) {
  r.init({
    coreEvents: ["pageModified", "pageResized"],
    setup({ element: t, initialize: e }) {
      n(t, i), e();
    }
  });
}
export {
  p as init,
  r as initializer
};
