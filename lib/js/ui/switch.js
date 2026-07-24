/**
 * @module ui/switch
 * @description Manages toggle switches and segmented control groups
 */

import { ComponentInitializer } from "../core/component.js";

/**
 * Switch Component Initializer
 */
export const initializer = new ComponentInitializer({ 
  type: "switch", 
  baseAttribute: "data-ulu-switch" 
});

export const defaults = {};

export class Switch {
  constructor(element, options = {}) {
    this.element = element;
    this.options = Object.assign({}, defaults, options);
    
    // Check if it is a group switch or single switch
    this.isGroup = this.element.classList.contains("switch--group") || 
                   this.element.querySelector(".switch__item") !== null;

    if (this.isGroup) {
      this.initGroup();
    } else {
      this.initSingle();
    }
  }

  initSingle() {
    this.input = this.element.querySelector(".switch__input");
    
    // Single toggle switch could be a button or checkbox
    if (this.element.tagName === "BUTTON") {
      this.element.addEventListener("click", () => {
        const pressed = this.element.getAttribute("aria-pressed") === "true";
        this.element.setAttribute("aria-pressed", !pressed ? "true" : "false");
        this.element.classList.toggle("is-active", !pressed);
      });
    } else if (this.input) {
      this.input.addEventListener("change", () => {
        this.element.classList.toggle("is-active", this.input.checked);
      });
      // Set initial state
      this.element.classList.toggle("is-active", this.input.checked);
    }
  }

  initGroup() {
    this.items = Array.from(this.element.querySelectorAll(".switch__item"));
    this.indicator = this.element.querySelector(".switch__indicator");
    
    // Bind listeners
    this.items.forEach(item => {
      const input = item.querySelector(".switch__input");
      if (input) {
        input.addEventListener("change", () => this.updateGroupState());
      } else {
        item.addEventListener("click", (e) => {
          if (item.tagName === "A" && item.getAttribute("href")?.startsWith("#")) {
            e.preventDefault();
          }
          this.setActiveItem(item);
        });
      }
    });

    // Handle resize to update indicator position
    if (this.indicator && typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.updateIndicatorPosition());
      this.resizeObserver.observe(this.element);
    }

    // Initial state
    this.updateGroupState();

    // Set transition opacity after first render to prevent animation jump on page load
    if (this.indicator) {
      requestAnimationFrame(() => {
        this.indicator.style.setProperty("--ulu-switch-indicator-opacity", "1");
      });
    }
  }

  setActiveItem(activeItem) {
    this.items.forEach(item => {
      const isActive = item === activeItem;
      item.classList.toggle("is-active", isActive);
      if (item.tagName === "BUTTON") {
        item.setAttribute("aria-pressed", isActive ? "true" : "false");
      } else if (item.getAttribute("role") === "tab") {
        item.setAttribute("aria-selected", isActive ? "true" : "false");
      }
    });
    this.updateIndicatorPosition();
    
    this.element.dispatchEvent(new CustomEvent("switch:change", {
      detail: { activeItem }
    }));
  }

  updateGroupState() {
    this.items.forEach(item => {
      const input = item.querySelector(".switch__input");
      if (input) {
        const isActive = input.checked;
        item.classList.toggle("is-active", isActive);
        if (item.tagName === "BUTTON") {
          item.setAttribute("aria-pressed", isActive ? "true" : "false");
        } else if (item.getAttribute("role") === "tab") {
          item.setAttribute("aria-selected", isActive ? "true" : "false");
        }
      }
    });
    this.updateIndicatorPosition();
  }

  updateIndicatorPosition() {
    if (!this.indicator) return;

    const activeItem = this.items.find(item => {
      const input = item.querySelector(".switch__input");
      if (input) {
        return input.checked;
      }
      return item.classList.contains("is-active") || 
             item.getAttribute("aria-pressed") === "true" ||
             item.getAttribute("aria-selected") === "true";
    });

    if (activeItem) {
      const containerRect = this.element.getBoundingClientRect();
      const activeRect = activeItem.getBoundingClientRect();

      const left = activeRect.left - containerRect.left;
      const top = activeRect.top - containerRect.top;
      const width = activeRect.width;
      const height = activeRect.height;

      this.element.style.setProperty("--ulu-switch-indicator-width", `${ width }px`);
      this.element.style.setProperty("--ulu-switch-indicator-height", `${ height }px`);
      this.element.style.setProperty("--ulu-switch-indicator-left", `${ left }px`);
      this.element.style.setProperty("--ulu-switch-indicator-top", `${ top }px`);
      this.element.style.setProperty("--ulu-switch-indicator-opacity", "1");
    } else {
      this.element.style.setProperty("--ulu-switch-indicator-opacity", "0");
    }
  }

  destroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}

/**
 * Initialize all switch components in the document
 */
export function init() {
  initializer.init({
    withData: true,
    coreEvents: ["pageModified"],
    setup({ element, data, initialize }) {
      const instance = new Switch(element, data);
      element.__ulu_switch = instance;
      initialize();
    }
  });
}
