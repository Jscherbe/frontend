import { hasRequiredProps } from "@ulu/utils/object.js";
import { createElementFromHtml } from "@ulu/utils/browser/dom.js";
import { Resizer } from "../resizer/resizer.js";
import { attrs, defaults as dialogDefaults } from "./init.js";

const requiredOptions = ["title"];
const hasRequiredOptions = hasRequiredProps(requiredOptions);

/**
 * Default builder options (extends dialog defaults!)
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
  classBody: "modal__body",
  classResizer: "modal__resizer",
};

/**
 * 
 * @param {Node} content Content element of the dialog (what is inserted into the body)
 * @param {Object} options Options for built dialog (see defaults)
 */
export function buildModal(content, options, template = modalTemplate) {

  const config = Object.assign({}, defaults, options);

  if (config.position !== "center" && config.allowResize) {
    config.hasResizer = true;
  }

  if (!content.id) {
    throw new Error("Missing ID on dialog");
  }
  if (!hasRequiredOptions(config)) {
    throw new Error("Missing required options: " + requiredOptions.toString());
  }
  
  const markup = template(content.id, config);
  const dialog = createElementFromHtml(markup.trim());
  const body = dialog.querySelector("." + config.classBody);
  const resizer = dialog.querySelector("." + config.classResizer)
  const dialogOptions = separateDialogOptions(config);

  // Replace content with new dialog, and then insert the content into the new dialogs body
  content.removeAttribute("id");
  content.removeAttribute("hidden");
  content.parentNode.replaceChild(dialog, content);
  body.appendChild(content);

  // Add dialog options for other scripts
  dialog.setAttribute(attrs.dialog, JSON.stringify(dialogOptions));

  if (config.hasResizer) {
    new Resizer(dialog, resizer, {
      fromLeft: config.position === "right"
    });
  }
  return { dialog };
}

/**
 * Default modal template
 * @param {String} id ID for new modal
 * @param {Object} config Resolved options
 * @returns {String} Markup for modal
 */
export function modalTemplate(id, config) {
  const classes = [
    "modal",
    `modal--${ config.position }`,
    `modal--${ config.size }`,
    `modal--${ config.allowResize ? "resize" : "no-resize" }`,
     ...(config.video ? ['modal--video'] : []), 
     ...(config.class ? [config.class] : []), 
  ];
  return `
    <dialog id="${ id }"  class="${ classes.join(" ") }">
      <div class="modal__container">
        <header class="modal__header">
          <h2 class="modal__title">
            ${ config.titleIcon ? 
              `<span class="modal__title-icon ${ config.titleIcon }" aria-hidden="true"></span>` : "" 
            }
            <span class="modal__title-text">${ config.title }</span>
          </h2>
          <button class="modal__close" aria-label="Close modal" data-ulu-dialog-close>
            <span class="modal__close-icon" aria-hidden="true" ${ attrs.close }></span>
          </button>
        </header>
        <div class="${ config.classBody }"></div>
        ${ config.hasResizer ? `<div class="${ config.classResizer }"></div>` : '' }
      </div>
    </div>
    `;
}

/**
 * Returns JSON string to embed in data-ulu-dialog for dialog handling
 * @param {Object} config Config object to pull dialog specific settings from
 * @returns {Object}
 */
export function separateDialogOptions(config) {
  return Object.keys(dialogDefaults).reduce((acc, key) => {
    if (key in config) {
      acc[key] = config[key];
    }
    return acc;
  }, {});
}