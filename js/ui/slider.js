/**
 * @module slider
 */
// =============================================================================
// Slider
// =============================================================================

// Version:                   1.0.10

// Changes:   
//                            1.0.10 | Fix bug when two and going in reverse
//                            1.0.9 | Fix bug when there are only 2 slides (not sliding correctly [revesers because of switchSlide])
//                                    this is addressed now and should slide infinitly between two slides
//                            1.0.8 | Change API, to elements object (from individaul arguments),
//                                    Add the ability to specify the element to append controls within
//                            1.0.6 | Add transition class for changes during transition, 
//                                    add will-change to the transition
//                            1.0.5 | Fix transtion event difference on windows, convert all 
//                                    async stuff to promises and simplify
//                            1.0.4 | Remove live region annoucement (only used if auto rotate)

// Reference:                 https://www.w3.org/WAI/tutorials/carousels/working-example/
//                            https://www.w3.org/TR/wai-aria-practices/examples/carousel/carousel-1.html#
//                            https://www.w3.org/TR/wai-aria-practices-1.1/examples/carousel/carousel-1.html
//                            https://www.accessibilityoz.com/
//                            https://www.sitepoint.com/unbearable-accessible-slideshow/
//                            https://dev.opera.com/articles/css-will-change-property/
//                              * Will Change use

import maintain from 'ally.js/maintain/_maintain';
import { hasRequiredProps } from '@ulu/utils/object.js';
import { trimWhitespace } from "@ulu/utils/string.js";
import { debounce } from "@ulu/utils/performance.js";
import { log, logError, logWarning } from "../utils/class-logger.js";

const debugMode = false; // Global dev debug
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const eventOnce = { once: true };
const cssDuration = d => `${ d }ms`;

// Resize handlers for all slider instances, Load event to avoid triggering
addEventListener('load', () => {
  addEventListener('resize', debounce(() => {
    Slider.instances.forEach(i => i.handleResize());
  }, 250));
});

const requiredElements = [
  "container", 
  "trackContainer", 
  "track", 
  "slides"
];
export class Slider {
  static instances = [];
  static defaults = {
    classAccessiblyHidden: "hidden-visually",
    namespace: "Slider",
    events: {},
    transition: true,
    transitionFade: false,
    transitionDuration: 700,
    transitionDurationExit: 400,
    transitionTimingFunction: "ease-in-out",

    // transition: true
  }
  // constructor(container, title, trackContainer, track, slides, config, debug = false) {
  constructor(elements, config, debug = false) {
    const options = Object.assign({}, Slider.defaults, config);
    this.debug = debugMode || debug;
    this.options = options;
    this.slide = null;
    this.index = null;
    this.transitioning = false;

    if (!hasRequiredProps(requiredElements)) {
      logError(this, 'Missing a required Element');
    }
    if (!elements.slides.length) {
      logError(this, "Missing slides");
    }
    this.slides = [ ...elements.slides ].map((element, index) => {
      return {
        element,
        index,
        number: index + 1
      }
    });
    this.elements = {
      ...elements,
      ...this.createControls(elements.controlContext || elements.container),
      ...this.createNav(elements.navContext || elements.container)
    };
    // Choose the appropriate transition method
    this.transition =  options.transition ? options.transitionFade || reduceMotion 
                          ? this.fadeTransition : this.slideTransition :  this.noTransition;
    this.setup();
    this.goto(0, null, "init");
    log(this, "Slider Instance Created", this);
    Slider.instances.push(this);
  }
  /**
   * Sliding mechanism needs translate updated on resize
   */
  handleResize() {
    const { slide, transition, slideTransition} = this;
    if (transition === slideTransition && slide) {
      this.translateTo(slide.element.offsetLeft, 0);
    }
  }
  /**
   * Goto to the previous slide
   */     
  previous(event) {
    const { index: lastIndex, slides } = this;
    const last = slides.length - 1;
    const prev = lastIndex - 1;
    const index = prev < 0 ? last : prev;
    this.emit("previous", [event, index]);
    this.goto(index, event, "previous");
  }
  /**
   * Goto to the next slide
   */   
  next(event) {
    const { index: lastIndex, slides } = this;
    const next = lastIndex + 1;
    const index = next > slides.length - 1 ? 0 : next;
    this.emit("next", [event, index]);
    this.goto(index, event, "next");
  }
  /**
   *  Makes sure that no matter what the callback is called if transition event
   * doesn't start or fails to finish/cancel
   * @param {number} element
   * @param {number} duration Duration to wait for complete 
   * @param {Function} beginTransition Css changes to begin/start transtion 
   */
  ensureTranstionEnds(element, duration, beginTransition) {
    return new Promise(resolve => {
      const tid = {};
      // If the transition has started remove the fallback for start
      // and set one for the end
      const onStart = () => {
        clearTimeout(tid.start);
        tid.end = setTimeout(onComplete, duration + 500);
      };
      // The transition has completed, cleanup and resolve
      const onComplete = () => {
        clearTimeout(tid.start);
        clearTimeout(tid.end);
        element.removeEventListener("transitionrun", onStart, eventOnce);
        element.removeEventListener('transitionend', onComplete, eventOnce);
        element.removeEventListener('transitioncancel', onComplete, eventOnce);
        resolve();
      };
      // Wait for animation to start, also set a timer to ensure that
      // if this event never fires for any reason, the promise will resolve
      element.addEventListener("transitionrun", onStart, eventOnce);
      // If it has started it will be waiting for the end
      // If it never ends for any reason, the promise will resolve
      element.addEventListener('transitionend', onComplete, eventOnce);
      element.addEventListener('transitioncancel', onComplete, eventOnce);
      tid.start = setTimeout(onComplete, duration + 500);
      // Apply users css changes
      element.style.transitionDuration = cssDuration(duration);
      beginTransition();
      // Bypass events if no duration or 0
      if (!duration) {
        onComplete();
      }
    });
  }
  /**
   * Translate the track to X
   */    
  translateTo(x, duration) {
    const { track } = this.elements;
    const set = () => track.style.transform = `translateX(-${ x }px)`;
    // tell brwoser we're about to animate
    track.style.willChange =  "transform";
    return this.ensureTranstionEnds(track, duration, set).then(() => {
      // Remove to avoid any issues with optimization
      track.style.willChange =  "auto";
    });
  }
  /**
   * Show's a specifc slide and hides others, except when passing true to show all
   * then all slides will visible
   */
  setVisibility(activeSlide, showAll) {
    if (!showAll) {
      activeSlide.element.style.visibility = "visible";
    }
    this.slides.forEach(slide => {
      if (slide !== activeSlide) {
        slide.element.style.visibility = showAll ? "visible" : "hidden";
      }
    });
  }
  /**
   * Perform a fade on a single slide
   */
  fadeSlide(slide, visible) {
    const { options } = this;
    const { element } = slide;
    const duration = visible ? options.transitionDuration : options.transitionDurationExit;
    return this.ensureTranstionEnds(element, duration, () => {
      element.style.opacity = visible ? "1" : "0";
    });
  }
  /**
   * Handler for the entire slide transtion
   */
  async slideTransition({ slide, index, old, oldIndex, triggerType }) {
    const count = this.slides.length;
    const reverse = triggerType === "previous";
    const lastIndex = count - 1;
    const lastToFirst = index === 0 && oldIndex === lastIndex;
    const firstToLast = index === lastIndex && oldIndex === 0;
    let switchSlide;
    let duration = this.options.transitionDuration;
    
    // Set duration based on how many slides to traverse
    // First to last or the opposite are single slide animations
    if (oldIndex && !lastToFirst && !firstToLast) {
      duration = duration * Math.abs(oldIndex - index);
    }
    // If first to last or last to first we switch the order of the slides so that
    // They are right next to each other at the front of the list
    // Then perform the animation, Then put them back in their natural place without transitioning
    // so it doesn't move for the user. Note count affects this differently
    
    if (count < 3) { 
      if (lastToFirst && !reverse) {
        switchSlide = old;
      } else if (firstToLast) {
        switchSlide = reverse ? slide : old;
      }
    } else {
      if (lastToFirst) {
        switchSlide = old;
      } else if (firstToLast) {
        switchSlide = slide;
      }
    }

    // Set all slides to visible during the animation 
    this.setVisibility(null, true);

    // Put the last item at the front of the list and reset the
    // tracks (or the opposite for first to last)
    if (switchSlide) {
      switchSlide.element.style.order = "-1";
      await this.translateTo(lastToFirst ? 0 : old.element.offsetLeft, 0);
    }
    // Perform the main sliding animation
    await this.translateTo(slide.element.offsetLeft, duration);
    // Set the order back to normal in the end
    // Don't transtion so the slider seems like it doesn't jump/move
    if (switchSlide) {
      switchSlide.element.style.order = "0";
      await this.translateTo(slide.element.offsetLeft, 0);
    }

    this.setVisibility(slide, false);
  }
  /**
   * Handler for the entire fade transtion
   */  
  async fadeTransition({ slide, old }) {
    this.setVisibility(null, true);
    // Uses order trick to move the current slide
    if (old) {
      await this.fadeSlide(old, false);
      old.element.style.order = "0";
    } 
    slide.element.style.order = "-1";
    await this.fadeSlide(slide, true); 
    this.setVisibility(slide, false);
  }
  /**
   * Handler for the entire NO transtion
   */
  noTransition({ slide, old }) {
    this.setVisibility(slide, false);
    if (old) {
      old.element.style.order = "0";
    }
    slide.element.style.order = "-1";
    return Promise.resolve();
  }
  goto(index, event, triggerType) {
    const { 
      slide: old, 
      index: 
      oldIndex, 
      slides, 
      elements
    } = this;
    const isInit = triggerType === "init";
    const slide = slides[index];
    const activeClass = this.getClass("nav-button--active");
    const transitionClass = this.getClass("transition", true);
    const to = { slide, index, old, oldIndex, triggerType };

    if (index === oldIndex) {
      logWarning(this, "Could not goto slide, still performing transition");
      return;
    }
    if (this.transitioning) {
      logWarning(this, "Cancel goto(), same slide index as current slide");
      return;
    }

    // Make all slide interactive elements inert
    const lockInteractives = maintain.disabled({ context: this.elements.track  });
    this.transitioning = true;
    // Set classes first just feels better
    if (old) old.navButton.classList.remove(activeClass);
    slide.navButton.classList.add(activeClass);
    elements.container.classList.add(transitionClass);
    // Perform transition and then set state
    this.transition(to).then(() => {
      this.index = index;
      this.slide = slide;
      this.transitioning = false;
      elements.container.classList.remove(transitionClass);
      lockInteractives.disengage();
      if (!isInit) {
        slide.element.focus();
        this.emit("goto", [event, index, slide]);
      }
    });
  }
  setup() {
    const { container, track, trackContainer } = this.elements;
    const trackCss = trimWhitespace(this.trackCss());
    const trackContainerStyles = trimWhitespace(this.trackContainerStyles());
    const slideCss = trimWhitespace(this.slideCss());
    track.setAttribute("style", trackCss);
    trackContainer.setAttribute("style", trackContainerStyles);
    this.slides.forEach(slide => {
      slide.element.setAttribute("style", slideCss);
      slide.element.setAttribute('tabindex', '-1');
    });
    container.classList.add(this.getClass());
  }
  trackContainerStyles() {
    // Crop translated track
    return `
      overflow: hidden;
    `;
  }
  transitionCss(property) {
    const { transitionTimingFunction, transitionDuration } = this.options;
    return `
      transition-property: ${ property };
      transition-duration: ${ cssDuration(transitionDuration) };
      transition-timing-function: ${ transitionTimingFunction };
    `;
  }
  trackCss() {
    // Add in sliding transtion properties when not fade
    return `
      display: flex;
      position: relative;
      list-style: none;
      ${ this.transition === this.slideTransition ? this.transitionCss("transform") : "" }
    `;
  }
  slideCss() {
    const fadingTransition = this.transition === this.fadeTransition;
    // Add in fading transtion properties when not slide (which is on the track)
    return `
      width: 100%;
      flex: 0 0 100%;
      ${ fadingTransition ? this.transitionCss("opacity") : "" }
      opacity: ${ fadingTransition ? "0" : "1" }
    `;
  }
  getClass(child, modifier) {
    const { namespace } = this.options;
    if (modifier) {
      return `${ namespace }--${ child }`;
    } else if (child) {
      return `${ namespace }__${ child }`;
    } else {
      return namespace;
    }
  }
  createControlButton(action) {
    const button = document.createElement("button");
    button.classList.add(this.getClass("control-button"));
    button.classList.add(this.getClass(`control-button--${ action }`));
    button.setAttribute("data-slider-control", action);
    button.setAttribute("type", "button");
    button.innerHTML = this.getControlContent(action);
    return button;
  }
  createControls(context) {
    const controls = document.createElement('ul');
    const previousItem = document.createElement("li");
    const nextItem = document.createElement("li");
    const previous = this.createControlButton("previous");
    const next = this.createControlButton("next");

    controls.classList.add(this.getClass("controls"));

    previousItem.appendChild(previous);
    nextItem.appendChild(next);
    controls.appendChild(previousItem);
    controls.appendChild(nextItem);
    previous.addEventListener('click', this.previous.bind(this));
    next.addEventListener('click', this.next.bind(this));
    context.appendChild(controls);

    return {
      controls,
      previousItem,
      nextItem,
      previous,
      next
    };
  }
  createNav(container) {
    const nav = document.createElement("ul");
    const navButtons = this.slides.map(this.createNavButton.bind(this));
    const navItems = navButtons.map(button => {
      const item = document.createElement("li");
      item.appendChild(button);
      // item.setAttribute('tabindex', "-1"); // WHY?
      nav.appendChild(item);
      return item;
    });

    nav.classList.add(this.getClass("nav"));
    container.appendChild(nav);

    return {
      nav,
      navButtons,
      navItems
    };
  }
  createNavButton(slide, index) {
    const button = document.createElement("button");
    button.classList.add(this.getClass("nav-button"));
    button.setAttribute("type", "button");
    button.innerHTML = this.getNavContent(slide.number);
    slide.navButton = button; // Add reference to slide object
    button.addEventListener("click", this.goto.bind(this, index));
    return button;
  }
  // change to css-icon 
  getControlContent(action) {
    return `
      <span class="hidden-visually">${ action }</span>
      <span aria-hidden="true">${ action === 'next' ? '→' : '←' }</span>
    `;
  }
  getNavContent(number) {
    return `<span class="hidden-visually">Item ${ number }</span>`;
  }
  emit(name, args) {
    if (this.options.events[name]) {
      this.options.events[name].apply(this, args);
    }
  }
}