/**
 * @module ui/modal-builder
 * @description Note this module needs to be initialized before dialogs!
 */

import { ComponentInitializer } from "../utils/system.js";
import { wrapSettingString } from "../settings.js";
import { getName } from "../events/index.js";
import { createElementFromHtml } from "@ulu/utils/browser/dom.js";
import { Resizer } from "./resizer.js";
import { baseAttribute, closeAttribute, defaults as dialogDefaults } from "./dialog.js";

/**
 * Modal Builder Component Initializer
 */
export const initializer = new ComponentInitializer({ 
  type: "modal-builder", 
  baseAttribute: "data-ulu-modal-builder"
});

/**
 * Default builder options (extends dialog defaults, watch name collisions)
 * - Decided to extend defaults so the interface in HTML is singular
 *   - This is sometimes easier to template (merging and serializing options 
 *     in twig for example)
 */
export const defaults = {
  title: null,
  titleIcon: null,
  nonModal: false,
  documentEnd: true,
  allowResize: false,
  position: "center",
  bodyFills: false,
  noBackdrop: false,
  size: "default",
  print: false,
  noMinHeight: false,
  class: "",
  classCloseIcon: wrapSettingString("iconClassClose"),
  classResizerIcon: wrapSettingString("iconClassDragX"),
  debug: false,
  templateCloseIcon(config) {
    return `<span class="modal__close-icon ${ config.classCloseIcon }" aria-hidden="true"></span>`;
  },
  templateResizerIcon(config) {
    return `<span class="modal__resizer-icon ${ config.classResizerIcon }" aria-hidden="true"></span>`;
  },
  /**
   * Default modal template
   * @param {String} id ID for new modal
   * @param {Object} config Resolved options
   * @returns {String} Markup for modal
   */
  template(id, config) {
    const classes = [
      "modal",
      `modal--${ config.position }`,
      `modal--${ config.size }`,
      `modal--${ config.allowResize ? "resize" : "no-resize" }`,
      ...(!config.title ? ["modal--no-header"] : []),
      ...(config.bodyFills ? ["modal--body-fills"] : []), 
      ...(config.noBackdrop ? ["modal--no-backdrop"] : []), 
      ...(config.noMinHeight ? ["modal--no-min-height"] : [] ),
      ...(config.class ? [config.class] : []), 
    ];
    return `
      <dialog id="${ id }" class="${ classes.join(" ") }">
        ${ config.title ? `
          <header class="modal__header">
            <h2 class="modal__title">
              ${ config.titleIcon ? 
                `<span class="modal__title-icon ${ config.titleIcon }" aria-hidden="true"></span>` : "" 
              }
              <span class="modal__title-text">${ config.title }</span>
            </h2>
            <button class="modal__close" aria-label="Close modal" ${ closeAttribute } autofocus>
              ${ config.templateCloseIcon(config) }
            </button>
          </header>
        ` : "" }
        <div class="modal__body" ${ initializer.getAttribute("body") }></div>
        ${ config.hasResizer ? 
          `<div class="modal__resizer" ${ initializer.getAttribute("resizer") }>
            ${ config.templateResizerIcon(config) }
          </div>` : "" 
        }
      </div>
    `;
  }
};

// Current default objects (user can override these)
let currentDefaults = { ...defaults };

/**
 * @param {Object} options Change options used as default for dialogs, can then be overridden by data attribute settings on element
 */
export function setDefaults(options) {
  currentDefaults = Object.assign({}, currentDefaults, options);
}

/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  initializer.init({
    withData: true,
    events: ["pageModified"],
    setup({ element, data }) {
      buildModal(element, data);
    }
  });
}

/**
 * 
 * @param {Node} content Content element of the dialog (what is inserted into the body)
 * @param {Object} options Options for built dialog (see defaults)
 */
export function buildModal(content, options) {

  const config = Object.assign({}, currentDefaults, options);

  if (config.position !== "center" && config.allowResize) {
    config.hasResizer = true;
  }
  if (config.debug) {
    console.log(config, content);
  }
  if (!content.id) {
    throw new Error("Missing ID on modal");
  }
  
  const markup = config.template(content.id, config);
  const modal = createElementFromHtml(markup.trim());
  const selectChild = key => modal.querySelector(initializer.attributeSelector(key));
  const body = selectChild("body");
  const resizer = selectChild("resizer");
  const dialogOptions = separateDialogOptions(config);

  // Replace content with new dialog, and then insert the content into the new dialogs body
  content.removeAttribute("id");
  content.removeAttribute("hidden");
  content.removeAttribute(initializer.getAttribute());
  content.parentNode.replaceChild(modal, content);
  body.appendChild(content);

  // Add dialog options for other scripts
  modal.setAttribute(baseAttribute, JSON.stringify(dialogOptions));

  if (config.hasResizer) {
    new Resizer(modal, resizer, {
      fromLeft: config.position === "right"
    });
  }

  if (config.print) {
    let printClone;
    document.addEventListener(getName("beforePrint"), () => {
      printClone = content.cloneNode(true);
      modal.after(printClone);
    });
    document.addEventListener(getName("afterPrint"), () => {
      printClone.remove();
    });
  }
  return { modal };
}

/**
 * Returns JSON string to embed in data-ulu-dialog for dialog handling
 * @param {Object} config Config object to pull dialog specific settings from
 * @returns {Object}
 */
function separateDialogOptions(config) {
  return Object.keys(dialogDefaults).reduce((acc, key) => {
    if (key in config) {
      acc[key] = config[key];
    }
    return acc;
  }, {});
}
