if (import.meta.env.MODE !== "development") {
  import("vite/modulepreload-polyfill");
}
console.log('test');
import "./scss/styles-test.scss";
import "./js/index.js";