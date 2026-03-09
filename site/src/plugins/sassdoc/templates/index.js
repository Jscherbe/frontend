import _meta from "./annotations/_meta.js";
import name from "./annotations/name.js";
import demo from "./annotations/demo.js";
import group from "./page/group.js";
import item from "./page/item.js";

export default {
  annotations: {
    _meta,
    name,
    demo
  },
  page: {
    group,
    item
  }
};