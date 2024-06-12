import { createFloatingUi } from "../utils/floating-ui.js";
import { Collapsible } from "../collapsible/collapsible.js";

/**
 * Class that extends Collapsible adding floating-ui for popover behavior
 */
export class Popover extends Collapsible {
  constructor(elements, config, floatingOptions) {
    super(elements, config);
    this.floatingOptions = floatingOptions;
  }
  setState(isOpen, event) {
    super.setState(isOpen, event);
    this.destroyFloatingUi();
    if (isOpen) {
      this.createFloatingUi();
    }
  }
  destroy() {
    super.destroy();
    this.destroyFloatingUi();
  }
  createFloatingUi() {
    this.floatingCleanup = createFloatingUi(this.elements, this.floatingOptions);
  }
  destroyFloatingUi() {
    if (this.floatingCleanup) {
      this.floatingCleanup(); 
      this.floatingCleanup = null;
    }
  }
}