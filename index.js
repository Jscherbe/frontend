// For build (dist)
import "./scss/stylesheets/full-stylesheet.scss";
import * as ulu from "./js/index.js";

if (typeof window !== "undefined") {
  window.ULU = ulu;
}