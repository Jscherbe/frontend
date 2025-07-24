/**
 * @module ui/modal-builder
 * @description Note this module needs to be initialized before dialogs!
 */

import { ComponentInitializer } from "../utils/system.js";
import { wrapSettingString } from "../settings.js";
import { getName } from "../events/index.js";
import { Resizer } from "./resizer.js";
import { baseAttribute, closeAttribute, defaults as dialogDefaults } from "./dialog.js";
import { getElement } from "@ulu/utils/browser/dom.js";
import { createElementFromHtml } from "@ulu/utils/browser/dom.js";

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
 * - This is sometimes easier to template (merging and serializing options
 * in twig for example)
 * @typedef {object} DefaultModalOptions
 * @property {string|null} title - The title of the modal. Defaults to `null`.
 * @property {string|null} titleIcon - The class name for an icon to display in the title. Defaults to `null`.
 * @property {string} titleClass - Extra class/classes to add to title
 * @property {string} titleId - Set the title id (to tie to a custom title implementation, if using built in title this will be set automatically)
 * @property {boolean} nonModal - If `true`, the modal will not prevent interaction with elements behind it. Defaults to `false`.
 * @property {boolean} documentEnd - If `true`, the modal will be appended to the end of the `document.body`. Defaults to `true`.
 * @property {boolean} allowResize - If `true`, the modal will be resizable. Defaults to `false`.
 * @property {"center"|"top-left"|"top-center"|"top-right"|"bottom-left"|"bottom-center"|"bottom-right"} position - The initial position of the modal. Defaults to `"center"`.
 * @property {boolean} bodyFills - If `true`, the modal body will fill the available space. Defaults to `false`.
 * @property {boolean} noBackdrop - If `true`, no backdrop will be displayed behind the modal. Defaults to `false`.
 * @property {"default"|"small"|"large"|"fullscreen"} size - The size of the modal. Defaults to `"default"`.
 * @property {boolean} print - If `true`, the modal content will be optimized for printing. Defaults to `false`.
 * @property {boolean} noMinHeight - If `true`, the modal will not have a minimum height. Defaults to `false`.
 * @property {string} class - Additional CSS class(es) to add to the modal. Defaults to `""`.
 * @property {string} baseClass - The base CSS class for the modal elements. Defaults to `"modal"`.
 * @property {string} classCloseIcon - The class name for the close icon. Uses the wrapped setting string.
 * @property {string} classResizerIcon - The class name for the resizer icon. Uses the wrapped setting string.
 * @property {string|Node} footerElement - Element or selector to use as the footer (will be moved to dialog on creation, used for DOM API)
 * @property {string|Node} footerHtml - Markup to use in the footer
 * @property {boolean} debug - Enables debug logging. Defaults to `false`.
 * @property {function(object): string} templateCloseIcon - A function that returns the HTML for the close icon.
 * @property {function(object): string} templateCloseIcon.config - The resolved modal configuration object.
 * @returns {string} The HTML string for the close icon.
 * @property {function(object): string} templateResizerIcon - A function that returns the HTML for the resizer icon.
 * @property {function(object): string} templateResizerIcon.config - The resolved modal configuration object.
 * @returns {string} The HTML string for the resizer icon.
 * @property {function(string, DefaultModalOptions): string} template - The default modal template function.
 * @param {string} template.id - The ID for the new modal.
 * @param {DefaultModalOptions} template.config - The resolved modal options.
 * @returns {string} Markup for the modal.
 */
export const defaults = {
  title: null,
  titleIcon: null,
  titleClass: "",
  labelledby: null,
  describedby: null,
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
  baseClass: "modal",
  footerElement: null,
  footerHtml: null,
  classCloseIcon: wrapSettingString("iconClassClose"),
  classResizerIcon: wrapSettingString("iconClassDragX"),
  debug: false,
  templateCloseIcon(config) {
    const { baseClass, classCloseIcon } = config;
    return `<span class="${ baseClass }__close-icon ${ classCloseIcon }" aria-hidden="true"></span>`;
  },
  templateResizerIcon(config) {
    const { baseClass, classResizerIcon } = config;
    return `<span class="${ baseClass }__resizer-icon ${ classResizerIcon }" aria-hidden="true"></span>`;
  },
  /**
   * Default modal template
   * @param {String} id ID for new modal
   * @param {Object} config Resolved options
   * @returns {String} Markup for modal
   */
  template(id, config) {
    const { baseClass, describedby, footerElement, footerHtml } = config;
    const classes = [
      baseClass,
      `${ baseClass }--${ config.position }`,
      `${ baseClass }--${ config.size }`,
      `${ baseClass }--${ config.allowResize ? "resize" : "no-resize" }`,
      ...(!config.title ? [`${ baseClass }--no-header`] : []),
      ...(config.bodyFills ? [`${ baseClass }--body-fills`] : []), 
      ...(config.noBackdrop ? [`${ baseClass }--no-backdrop`] : []), 
      ...(config.noMinHeight ? [`${ baseClass }--no-min-height`] : [] ),
      ...(config.class ? [config.class] : []), 
    ];
    const labelledby = config.title ? `${ id }--title` : config.labelledby;
    return `
      <dialog 
        id="${ id }" 
        class="${ classes.join(" ") }" 
        ${ labelledby ? `aria-labelledby="${ labelledby }"` : "" }
        ${ describedby ? `aria-describedby="${ describedby }"` : "" }
      >
        ${ config.title ? `
          <header class="${ baseClass }__header">
            <h2 id="${ labelledby }" class="${ baseClass }__title ${ config.titleClass }">
              ${ config.titleIcon ? 
                `<span class="${ baseClass }__title-icon ${ config.titleIcon }" aria-hidden="true"></span>` : "" 
              }
              <span class="${ baseClass }__title-text">${ config.title }</span>
            </h2>
            <button class="${ baseClass }__close" aria-label="Close modal" ${ closeAttribute } autofocus>
              ${ config.templateCloseIcon(config) }
            </button>
          </header>
        ` : "" }
        <div class="${ baseClass }__body" ${ initializer.getAttribute("body") }></div>
        ${ footerHtml ? `<div class="${ baseClass }__footer">${ footerHtml }</div>`: "" }
        ${ config.hasResizer ? 
          `<div class="${ baseClass }__resizer" ${ initializer.getAttribute("resizer") }>
            ${ config.templateResizerIcon(config) }
          </div>` : "" 
        }
      </dialog>
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
    initializer.log(config, content);
  }
  if (!content.id) {
    throw new Error("Missing ID on modal");
  }

  const { footerHtml, footerElement } = config;
  
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

  // If they passed a footer element we need to move it in and
  // make sure it has the class
  if (config.footerElement) {
    const footerElement = getElement(config.footerElement);
    if (footerElement) {
      footerElement.classList.add(`${ config.baseClass }__footer`);
      body.after(footerElement);
    }
  }

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
