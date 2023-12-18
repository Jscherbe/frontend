/**
 * @module flipcard
 */

// =============================================================================
// Flipcard
// =============================================================================

// Version:                    1.0.1

// Changes                    1.0.1 | Added allow selection

import { trimWhitespace } from "@ulu/utils/string.js";
import { log, logError } from "../utils/logger.js";
const debugMode = false; // Global dev debug

export class Flipcard {
  static instances = [];
  static defaults = {
    namespace: "Flipcard",
    proxyClick: {
      allowSelection: true, // Don't proxy click if the user has more than the minmimum selected
      selectionMin:  10, // Minimum length that qualifies as a selection
      exclude:  "a, input, textarea, button"  // Selectors to avoid closing a flipcard onProxyclick 
    },
  }
  constructor(container, front, back, config, debug = false) {
    if (!container, !front, !back) {
      logError(this, 'Missing an element (container, front, back)');
    }
    this.options = Object.assign({}, Flipcard.defaults, config);
    const { namespace } = this.options;
    Flipcard.instances.push(this);

    this.debug = debugMode || debug;
    this.elements = { container, front, back };
    this.isOpen = false;
    this.uid = `${ namespace }-id-${ Flipcard.instances.length }`;
    this.stateAttr = `data-${ namespace }-state`.toLowerCase();
    this.setup();
    this.setVisiblity(false);
    log(this, this);
  }
  toggle() {
    this.setVisiblity(!this.isOpen);
  }
  setup() {
    const { uid } = this;
    const { namespace, proxyClick } = this.options;
    const { container, front, back } = this.elements;
    const control = this.elements.control = document.createElement("button");

    // Styling and markup
    control.classList.add(this.getClass("control-button"));
    control.setAttribute("type", "button");
    control.innerHTML = this.createControlContent();
    control.style.gridArea = namespace;
    control.style.zIndex = "-1"; // Behind everything only used for focus
    control.addEventListener('focusin', () => {
      control.style.zIndex = "20"; // above the back
    });
    control.addEventListener('focusout', () => {
      control.style.zIndex = "-1"
    });
    control.addEventListener("click", this.toggle.bind(this));
    back.parentNode.insertBefore(control, back);
  
    container.classList.add(this.options.namespace);
    container.setAttribute("style", trimWhitespace(this.containerCss()));
    if (proxyClick) {
      container.addEventListener("click", this.onProxyClick.bind(this));
    }

    front.style.gridArea = namespace;
    back.style.gridArea = namespace;

    // Accessibility
    control.id = `${ uid }-control`;
    control.setAttribute("aria-controls", back.id);
    control.setAttribute("aria-expanded", "false");
    back.id = `${ uid }-back`;
    back.setAttribute('aria-labelledby', control.id)
    back.setAttribute('aria-hidden', "true");
  }
  /**
   * Click handler on everything on container
   * - Determines if click was something that should be ignored (link, etc)
   */
  onProxyClick({ target }) {
    const { exclude, allowSelection, selectionMin } = this.options.proxyClick; 
    const selection = window.getSelection();
    if (exclude && !target.matches(exclude)) {
      if (!allowSelection || selection.toString().length < selectionMin) {
        this.toggle();
      }
    }
  }
  getClass(child) {
    const { namespace } = this.options;
    return child ? `${ namespace }__${ child }` : namespace;
  }
  createControlContent() {
    return `
      <span class="hidden-visually">Show More Information</span>
    `;
  }
  setVisiblity(visible) {
    const { back, container, control } = this.elements;
    const state = visible ? "open" : "closed";
    back.style.zIndex = visible ? "10" : "1";
    back.style.visibility = visible ? "visible" : "hidden";
    container.setAttribute(this.stateAttr, state);
    back.setAttribute('aria-hidden', visible ? "false" : "true");
    control.setAttribute('aria-expanded', visible ? "true" : "false");
    this.isOpen = visible;
  }
  containerCss() {
    return `
      display: -ms-grid;
      display: grid;
      position: relative; 
      -ms-grid-columns: 1fr; 
      grid-template-columns: 1fr;
      justify-items: stretch;
      grid-template-areas: "${ this.options.namespace }";
      cursor: pointer;
    `;
  }
  panelCss(zIndex = 1) {
    return `
      grid-area: ${ this.options.namespace };
      z-index: ${ zIndex }
    `;
  }
}
export default Flipcard;

/**
 * Preliminary Notes:
 *   Considerations for Accessiblity:
 *   - https://webaim.org/standards/wcag/checklist
 *   - https://www.w3.org/TR/WCAG21/#on-focus
 *   - https://a11y-style-guide.com/style-guide/section-cards.html
 *   - Reduced Motion
 *   - Percievable (interactive)
 *   - Final Descision
 *     - Use a buttons
 *     - Why?
 *       - Can't use whole card surface as click 
 *         * Selections
 *         * Other interactions
 *         * How to make that make sense to SR
 *         * Keyboard focuses and then clicks
 *         * Accidental flipping on zoom
 *       - Can't use hover
 *   
 *   - BRAINSTORM START:
 *     - Don't use hover or focus (motor control issues)
 *       - Needs to use click
 *     - Run through screenreader expierence
 *       - Hits button (reads title, click to reveal)
 *       - Focuses the content button (reads content, backside, click to unreveal)
 *       - NO BUTTONS CAN"T HAVE CONTENT, BUTTONS NEED TO STATE THEIR INTENT
 *     - Try Again, Run through screenreader expierence
 *       - Screen reader encounters flipcard
 *       - Headline is read
 *       - Button is read (reveal description)
 *       - Button is clicked
 *       - Content is shown and focused
 *       - Button to flip back
 *     - For Keybaord users
 *       - The accessible buttons can be used or a click handler can be attached to the 
 *         flipcard and given
 *     - Why not always show the content to screenreaders?
 *       - How to hide controls from them? (controls can't be hidden)
 *       - How to not have events interfere click
 *       - Maybe use a single control and make it say "jumpto definition"
 *         - Kind of lame
 *       - What about going back to focus and then attaching a click handler?
 *         - Visual users will see the content on keyboard or mouse or touch
 *         - We can reduce the motion with query
 *         - Note: WCAG AAA - 1.4.13 Content on Hover or Focus
 *           - Need to bind escape
 *         - Mouse users and touch will need to click
 *         - How does it focus and work on a screenreader?
 *       - Cannot use FOCUS!
 *         - https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html
 *         - What if the user was zoomed? They may never see the title/front
 *     - I think it MUST use buttons or a button to flip
 *       - Because users need to be able to scroll, interact and select text in a back
 *     @example html
 *        <div class="flipcard">
 *          <h3 class="flipcard__front">
 *            Term Name
 *            <button class="flipcard__toggle">
 *              <span class="hidden-visually">Show Definition</span>
 *            </button>
 *          </h3>
 *          <div class="flipcard__back">
 *            Some definiton example lorem ipsum et depsi anu olor.
 *            <button class="flipcard__toggle">
 *              <span class="hidden-visually">Hide Definition</span>
 *            </button>
 *          </div>
 *        </div>
 */    