/**
 * Initialize all sliders based on data attribute selectors
 */
export function init(): void;
/**
 * Setup single slider instance from querying via data attribute selectors
 * @param {Node} container The slide container to query children from
 * @param {Object} options Options for slider class
 */
export function setupSlider(container: Node, options: any): void;
/**
 * Slider Component Initializer
 */
export const initializer: ComponentInitializer;
/**
 * Class that controls slider
 */
export class Slider {
    static instances: any[];
    /**
     * Default options for slider
     */
    static defaults: {
        classAccessiblyHidden: string;
        namespace: string;
        events: {};
        transition: boolean;
        transitionFade: boolean;
        transitionDuration: number;
        transitionDurationExit: number;
        transitionTimingFunction: string;
        buttonClasses: string[];
        iconClassPrevious: any;
        iconClassNext: any;
    };
    constructor(elements: any, config: any);
    options: any;
    slide: {
        element: any;
        index: number;
        number: number;
    };
    index: any;
    transitioning: boolean;
    slides: {
        element: any;
        index: number;
        number: number;
    }[];
    elements: any;
    transition: ({ slide, old }: {
        slide: any;
        old: any;
    }) => any;
    /**
     * Sliding mechanism needs translate updated on resize
     */
    handleResize(): void;
    /**
     * Goto to the previous slide
     */
    previous(event: any): void;
    /**
     * Goto to the next slide
     */
    next(event: any): void;
    /**
     *  Makes sure that no matter what the callback is called if transition event
     * doesn't start or fails to finish/cancel
     * @param {number} element
     * @param {number} duration Duration to wait for complete
     * @param {Function} beginTransition Css changes to begin/start transtion
     */
    ensureTransitionEnds(element: number, duration: number, beginTransition: Function): any;
    /**
     * Translate the track to X
     */
    translateTo(x: any, duration: any): any;
    /**
     * Show's a specifc slide and hides others, except when passing true to show all
     * then all slides will visible
     */
    setVisibility(activeSlide: any, showAll: any): void;
    /**
     * Perform a fade on a single slide
     */
    fadeSlide(slide: any, visible: any): any;
    /**
     * Handler for the entire slide transtion
     */
    slideTransition({ slide, index, old, oldIndex, triggerType }: {
        slide: any;
        index: any;
        old: any;
        oldIndex: any;
        triggerType: any;
    }): Promise<void>;
    /**
     * Handler for the entire fade transtion
     */
    fadeTransition({ slide, old }: {
        slide: any;
        old: any;
    }): Promise<void>;
    /**
     * Handler for the entire NO transtion
     */
    noTransition({ slide, old }: {
        slide: any;
        old: any;
    }): any;
    goto(index: any, event: any, triggerType: any): void;
    setup(): void;
    trackContainerStyles(): string;
    transitionCss(property: any): string;
    trackCss(): string;
    slideCss(): string;
    getClass(child: any, modifier: any): any;
    createControlButton(action: any): HTMLButtonElement;
    createControls(context: any): {
        controls: HTMLUListElement;
        previousItem: HTMLLIElement;
        nextItem: HTMLLIElement;
        previous: HTMLButtonElement;
        next: HTMLButtonElement;
    };
    createNav(container: any): {
        nav: HTMLUListElement;
        navButtons: any[];
        navItems: HTMLLIElement[];
    };
    createNavButton(slide: any, index: any): HTMLButtonElement;
    getControlContent(action: any): string;
    getNavContent(slide: any): string;
    emit(name: any, args: any): void;
}
import { ComponentInitializer } from "../utils/system.js";
//# sourceMappingURL=slider.d.ts.map