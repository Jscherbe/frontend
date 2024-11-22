// Progressive Enhancement turns select elements into accessible autocomplete fields

// import { getName } from "@ulu/frontend/js/events/index.js";
import { getName } from "../events/index.js";

const attrs = {
  trigger: "data-site-theme-toggle",
  icon: "data-site-theme-toggle-icon",
  init: "data-site-theme-toggle-init",
};

const attrSelector = key => `[${ attrs[key] }]`;
const attrSelectorInitial = key => `${ attrSelector(key) }:not([${ attrs.init }])`;

// @dan change to options and remove options
// add a preferred print theme option
export const options = {
  darkTheme: "theme-dark",
  lightTheme: "theme-light",
  defaultTheme: "dark",
  darkIcon: "fa-solid fa-moon",
  lightIcon: "fa-solid fa-sun",
};

const body = document.querySelector("[data-site-theme]");
let currentTheme = body.classList.contains(options.darkTheme) ? options.darkTheme : options.lightTheme;
// used to see if machine preference differs from default theme
const defaultThemeInverse = options.defaultTheme === "dark" ? "light" : "dark";

/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  // switch to light theme for printing
  document.addEventListener(getName("beforePrint"), () => printSetup());
  // switch back to original theme after printing
  document.addEventListener(getName("afterPrint"), () => printTearDown());
  // document.addEventListener(getName("pageModified"), () => setup());
  setup();
}

export function setup(context = document) {
  const body = context.querySelector("[data-site-theme]");
  // Initial theme on load
  setupTheme(body);
  // Add toggle event listener to buttons
  // @daniel add the init attribute
  const elements = context.querySelectorAll(attrSelectorInitial("trigger"));
  elements.forEach(element => {
    element.setAttribute(attrs.init, "");
    element.addEventListener("click", () => {
      changeTheme(body);
    });
  });
  // Initial icon setup
  changeIcons();
}

/**
 * 
 * @param {Element} body Sets up initial theme on load based on user preference.
 */
function setupTheme(body) {
  const sitePreference = localStorage.getItem("data-theme");
  const machinePreference = window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${defaultThemeInverse})`).matches;
  if(sitePreference && sitePreference != currentTheme){
    // Check if local storage has site specific preference. And that preference is not the default.
    changeTheme(body);
  } else if (machinePreference) {
    // Check if user system preference differs from default theme.
    changeTheme(body);
  } 
}

/**
 * 
 * @param {Element} body Changes the theme of the body.
 */
function changeTheme(body) {
  let newTheme;
  let oldTheme;
  if (body.classList.contains(options.darkTheme)) {
    oldTheme = options.darkTheme;
    newTheme = options.lightTheme;
  } else if (body.classList.contains(options.lightTheme)) {
    oldTheme = options.lightTheme;
    newTheme = options.darkTheme;
  }
  body.classList.remove(oldTheme);
  body.classList.add(newTheme);
  localStorage.setItem("data-theme", newTheme);
  currentTheme = newTheme;
  changeIcons();
}

/**
 * 
 * @param {Element} body Used to check for theme.
 * @param {Element} context Used to find the icons.
 */
function changeIcons(context = document) {
  const icons = context.querySelectorAll(attrSelectorInitial("icon"));
  icons.forEach(icon => {
    console.log(currentTheme);
    if (currentTheme == options.lightTheme) {
      icon.classList = options.darkIcon;
    } else {
      icon.classList = options.lightIcon;
    }
  });
}

// run on beforeprint event
function printSetup() {
  const body = document.querySelector("body"); 
  if (body.classList.contains(options.darkTheme)) {
    body.classList.remove(options.darkTheme);
    body.classList.add(options.lightTheme);
  }
}

// run on afterprint event
function printTearDown() {
  const body = document.querySelector("body"); 
  if (!body.classList.contains(currentTheme)) {
    body.classList.remove(options.lightTheme);
    body.classList.add(options.darkTheme);
  }
}