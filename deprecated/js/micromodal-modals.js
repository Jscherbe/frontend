/**
 * @module ui/modals
 */
// Version:         1.0.5
//
// Changes:
//                  1.0.5 | Added title icon and remove calling of init
//                          Moved setup modals stuff to inside init (contextual) [may affect programmatic modals]
//                  1.0.4 | The modal library has a bug with multiple modals and using a custom close handler
//                          In the future we want to abandon this library but for now it works by setting up our own open and close buttons
//                          This is not setup to work with programmatic modals!!
//                  1.0.3 | Added youtube video closing stuff
//                  1.0.3 | Added youtube video closing stuff
//                  1.0.2 | Added custom close handler and checked to make sure resizer doesn't trigger click
//                  1.0.1 | Added optional resizable (allowResize)
// Todo:            - Make the container the content is getting the original classes, or don't remove them. And allow user to pass classes via config

// Javascript builds structure, modal's live in content in simple container. 
// Modal theme and structure is added in scripting That way if we change the 
// interface in the future we don't need to change/update markup.
import MicroModal from "micromodal";
import { Resizer } from "../resizer.js";
import { pauseVideos, prepVideos } from "../utils/pause-youtube-video.js";
import { createElementFromHtml } from "@ulu/utils/browser/dom.js";
const classes = {
  open: "site-modal--open",
  container: "site-modal__container",
  body: "site-modal__body",
  resizer: "site-modal__resizer"
};
const triggerAttr = "data-site-modal-trigger";
export { triggerAttr };
const triggerSelector = `[${ triggerAttr }]`;
const defaults = {
  allowResize: true,
  position: "center",
  containerClass: "",
  closeSelector: "[data-site-modal-close]",
  titleIcon: false
};
const configMicroModal = { 
  openClass: classes.open,
  disableScroll: true,
  openTrigger: "data-site-modal-trigger",
  closeTrigger: "data-NOT-USED", // Proxied to avoid this click handler (on keydown, allow click on things underneath)
  onClose: function(modal) {
    pauseVideos(modal);
  } 
};
const wrappers = [];


// Create a grouping container to grab all modals from content of the 
// page and move to the bottom of the page
// const container = createContainer();



// Initialize modal library script

export function init(context = document) {
  const flag = "data-site-modal-trigger-attached";
  context.querySelectorAll(triggerSelector).forEach(trigger => {
    if (!trigger.hasAttribute(flag)) {
      const mid = trigger.getAttribute(triggerAttr);
      if (!mid) {
        console.warn("Unable to get modal trigger id");
      } else {
        trigger.setAttribute(flag, "");
        trigger.addEventListener("click", () => {
          show(mid);
        });
      }
    }
  });
  // The [data-site-modal] is used to separate the libraries' interface 
  // and the modal's styling classes, so it can be adjusted or extended 
  // in the future
  context.querySelectorAll("[data-site-modal]").forEach((element) => setupModal(element));
}

/**
 * Function to setup each modal
 * - Creates structure
 * - Gets settings from elements data attribute
 * - Moves it to the end of the document
 * - Adds resizer if position (left || right)
 * @param {Node} modal Modal element ie. `[data-site-modal]`
 * @param {Object} settings Custom settings object to merge, same interface as `[data-site-modal]` settings
 */
export function setupModal(modal, settings) {
  // Grab things from original element before modifying
  const id = modal.id;
  const originalClasses = modal.getAttribute("class") || "";
  // Grab settings from element and optionally from settings passed
  let data = {};
  if (modal.dataset.siteModal) {
    data = JSON.parse(modal.dataset.siteModal);
  }
  data = Object.assign({}, defaults, data, settings);
  const { allowResize, position } = data;
  const notCenter = position !== "center";
  const hasResizer = notCenter && allowResize;
  const resizerMarkup = hasResizer ? `<div class="${ classes.resizer }"></div>` : "";
  const resizerModifierClass = allowResize ? "resize" : "no-resize";
  const closeAttr = "data-site-modal-close";
  // Remove attributes
  modal.removeAttribute("data-site-modal");
  modal.removeAttribute("id");
  modal.removeAttribute("class");
  // Template for new modal container (modal's body, the original element is 
  // appended after as not to lose any listener's/etc
  const markup = `
    <div 
      class="
        site-modal 
        site-modal--${ position } 
        site-modal--${ resizerModifierClass } 
        ${ data.containerClass }
      " 
      id="${ id }" aria-hidden="true"
    >
      <div class="site-modal__overlay" tabindex="-1" ${ closeAttr }>
        <div class="site-modal__container" role="dialog" aria-modal="true" aria-labelledby="${ id }-title">
          <div class="site-modal__header">
            <h2 class="site-modal__title" id="${ id }-title" tabindex="0">
              ${ data.titleIcon ? `<span class="site-modal__title-icon ${ data.titleIcon }" aria-hidden="true"></span>` : "" }
              <span class="site-modal__title-text">${ data.title }</span>
            </h2>
            <button class="site-modal__close" aria-label="Close modal" ${ closeAttr }>
              <span class="site-modal__close-icon" aria-hidden="true" ${ closeAttr }></span>
            </button>
          </div>
          <div class="${ classes.body } ${ originalClasses }"></div>
          ${ resizerMarkup }
        </div>
      </div>
    </div>`;

  // Create wrapped modal (with repeatable structure), and insert 
  // the original modal content into it
  const select = (container, classKey) => container.querySelector("." + classes[classKey]);
  const wrapper = createElementFromHtml(markup.trim());
  const elements = {
    body: select(wrapper, "body"),
    resizer: select(wrapper, "resizer"),
    container: select(wrapper, "container")
  };

  // Move the orginal content into the modal's body
  elements.body.appendChild(modal);
  // Add resizer if not a center positioned modal
  if (hasResizer) {
    new Resizer(elements.container, elements.resizer, {
      fromLeft: position === "right"
    });
  }

  // Prep Youtube Videos to be able to close
  prepVideos(wrapper);

  // Add modal to the end of docuemnt
  wrappers.push(wrapper);
  document.body.appendChild(wrapper);
  // Add our own close handlers to avoide the native
  const closeButtons = wrapper.querySelectorAll(data.closeSelector);
  closeButtons.forEach(b => b.addEventListener("click", ({ target }) => {
    const outsideContainer = !elements.container.contains(target) && target !== elements.container;
    // Last condition is the overlay/backdrop (click outside)
    if (target.matches(`[${ closeAttr }]`) || outsideContainer) {
      close(id);
    }
  }));
}
/**
 * Intialize all modals on the page
 * - can be used after AJAX adds content
 */
// export function init() {
  // MicroModal.init(configMicroModal);
// }
/**
 * Open a modal
 * @param {String} id The id of the modal to open
 */
export function show(id, config) {
  const merged = Object.assign({}, configMicroModal, config);
  MicroModal.show(id, merged);
}
/**
 * Close a modal
 * @param {String} id The id of the modal to open
 */
export function close(id) {
  MicroModal.close(id);
}
