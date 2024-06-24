/**
 * @module dialog-builder
 */

// Note this needs to be run before dialogs are initialized!

import { getName } from "../events/index.js";
import { createElementFromHtml } from "@ulu/utils/browser/dom.js";
import { Resizer } from "./resizer.js";
import { getDatasetJson } from "../utils/dom.js";
import { defaults as dialogDefaults, attrs as dialogAttrs } from "./dialog.js";

const attrs = {
  builder: "data-ulu-dialog-builder",
  body: "data-ulu-dialog-builder-body",
  resizer: "data-ulu-dialog-builder-resizer"
};

const attrSelector = key => `[${ attrs[key] }]`;

/**
 * Default builder options (extends dialog defaults, watch name collisions)
 * - Decided to extend defaults so the interface in HTML is singular
 *   - This is sometimes easier to template (merging and serializing options 
 *     in twig for example)
 */
export const defaults = {
  title: null,
  titleIcon: null,
  documentEnd: true,
  allowResize: false,
  position: "center",
  video: false,
  size: "default",
  class: "",
  classCloseIcon: "css-icon css-icon--close",
  classResizerIcon: "css-icon css-icon--drag",
  debug: false,
  templateCloseIcon(config) {
    return `<span class="modal__close-icon ${ config.classCloseIcon }" aria-hidden="true"></span>`;
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
      ...(!config.title ? ['modal--no-header'] : []),
      ...(config.video ? ['modal--video'] : []), 
      ...(config.class ? [config.class] : []), 
    ];
    const closeIconMarkup = config.templateCloseIcon(config);
    return `
      <dialog id="${ id }"  class="${ classes.join(" ") }">
        ${ config.title ? `
          <header class="modal__header">
            <h2 class="modal__title">
              ${ config.titleIcon ? 
                `<span class="modal__title-icon ${ config.titleIcon }" aria-hidden="true"></span>` : "" 
              }
              <span class="modal__title-text">${ config.title }</span>
            </h2>
            <button class="modal__close" aria-label="Close modal" ${ dialogAttrs.close } autofocus>
              ${ closeIconMarkup }
            </button>
          </header>
        ` : "" }
        <div class="modal__body" ${ attrs.body }></div>
        ${ config.hasResizer ? 
          `<div class="modal__resizer" ${ attrs.resizer }>
            <span class="modal__resizer-icon ${ config.classResizerIcon }" aria-hidden="true"></span>
          </div>` : '' 
        }
      </div>
    `;
  }
};

// Current default objects (user can override these)
let currentDefaults = { ...defaults };

/**
 * @param {Object} options Change options used as default for dialogs, can then be overriden by data attribute settings on element
 */
export function setDefaults(options) {
  currentDefaults = Object.assign({}, currentDefaults, options);
}

/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init() {
  document.addEventListener(getName("pageModified"), setup);
  setup();
}

/**
 * Query and setup all builder
 */
export function setup() {
  // First setup builders so they can be setup as normal dialogs after
  const builders = document.querySelectorAll(attrSelector("builder"));
  builders.forEach(setupBuilder);
}

/**
 * Build a dialog for the given content
 * @param {Node} element 
 */
export function setupBuilder(element) {
  const options = getDatasetJson(element, "uluDialogBuilder");
  element.removeAttribute(attrs.builder);
  buildModal(element, options);
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
    throw new Error("Missing ID on dialog");
  }
  
  const selectDialogChild = key => dialog.querySelector(attrSelector(key));
  const markup = config.template(content.id, config);
  const dialog = createElementFromHtml(markup.trim());
  const body = selectDialogChild("body");
  const resizer = selectDialogChild("resizer");
  const dialogOptions = separateDialogOptions(config);

  // Replace content with new dialog, and then insert the content into the new dialogs body
  content.removeAttribute("id");
  content.removeAttribute("hidden");
  content.removeAttribute(attrs.builder);
  content.parentNode.replaceChild(dialog, content);
  body.appendChild(content);

  // Add dialog options for other scripts
  dialog.setAttribute(dialogAttrs.dialog, JSON.stringify(dialogOptions));

  if (config.hasResizer) {
    new Resizer(dialog, resizer, {
      fromLeft: config.position === "right"
    });
  }
  return { dialog };
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