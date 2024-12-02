/**
 * @module ui/programmatic-modal
 */


import { getName, dispatch } from "../events/index.js";
import { newId } from "../utils/id.js";
import { buildModal } from "./modal-builder.js";

export class ProgrammaticModalManager {
  static defaults = {
    triggerSelector: "[data-ulu-programmatic-modal-trigger]",
    triggerInitAttr: "data-ulu-programmatic-modal-init"
  };
  constructor(passedOptions) {
    const options = Object.assign({}, ProgrammaticModalManager.defaults, passedOptions);
    this.options = options;
    this.triggers = null;
    this.cachedTrigger = null;
    this.triggerListener;
    this.onTriggerClick = (event) => {
      const trigger = event.target.closest(options.triggerSelector);
      if (trigger) this.cachedTrigger = trigger;
    };
    this.onPageModified = () => {
      this.setupTriggers();
    };
    document.addEventListener(getName("pageModified"), this.onPageModified);
    this.setupTriggers();
  }
  setupTriggers() {
    const { triggerSelector, triggerInitAttr } = this.options;
    const triggers = document.querySelectorAll(`${ triggerSelector }:not([${ triggerInitAttr }])`);
    triggers.forEach(trigger => {
      trigger.addEventListener("click", this.onTriggerClick);
    });
  }
  destroy() {
    const { triggerSelector } = this.options;
    const triggers = document.querySelectorAll(triggerSelector);
    triggers.forEach(trigger => {
      trigger.removeEventListener("click", this.onTriggerClick);
    });
  }
  createAndOpen(config, afterCreate) {
    const { selector, noClickTrigger, removeOnClose } = config;
    const content = document.querySelector(selector);
    if (!content.id) {
      content.id = newId();
    }

    let trigger;
    if (!noClickTrigger) {
      trigger = this.cachedTrigger;
      // Remove cached trigger (since it no longer applies)
      this.cachedTrigger = null;
    }

    if (!content) {
      console.error("No element found from config.selector. ", config);
      return;
    }
    const { modal } = buildModal(content, config.modal);
    const ctx = { trigger, modal, config };
    if (afterCreate) {
      afterCreate(ctx);
    }
    const onModalClose = () => {
      if (removeOnClose) {
        modal.remove();
      }
      if (trigger) {
        trigger.focus();
      }
    };
    // Add close event (to refocus the element that triggered)
    modal.addEventListener("close", onModalClose, { once: true });

    // Setup trigger to show this modal again and not do it's old behavior (if ajax link)
    if (!removeOnClose && trigger) {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        modal.showModal();
      });
    }
    dispatch("pageModified", modal);
    // Open the new modal for the first time
    modal.showModal();
    return ctx;
  }
}

