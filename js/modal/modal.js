import { log, logError } from "../utils/class-logger.js";


export function manageModal(elements, options) {

}

export class Modal {
  /**
   * 
   * @param {Object} elements 
   * @param {Node} elements.dialog 
   * @param {Array<Node>} elements.triggers 
   * @param {Array<Node>} elements.closers 
   * @param {*} options 
   * @returns 
   */
  constructor(elements, options) {
    const { dialog } = elements;
    if (!dialog) {
      logError(this, "missing required element (dialog)");
      return;
    }
    const options = Object.assign({}, Collapsible.defaults, config);
    this.elements = elements;
    this.options = options;
    this.isOpen = false;
    this.attachHandlers();
  }
  attachHandlers() {
    const { trigger, dialog } 
  }
}