import { ComponentInitializer } from '../core/component.js';
/**
 * Initialize all sliders based on data attribute selectors
 */
export function init(): void;
/**
 * Setup single slider instance from querying via data attribute selectors
 * @param {Node} container The slide container to query children from
 * @param {Object} options Options for slider class
 */
export function setupSlider(container: Node, options: Object): void;
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
        iconClassPrevious: Object;
        iconClassNext: Object;
        swipeEnabled: boolean;
        swipeOptions: {
            preventScroll: boolean;
        };
    };
    constructor(elements: any, config: any);
    options: any;
    slide: {
        element: any;
        index: number;
        number: number;
    } | null;
    index: any;
    swipeInstance: any;
    swipeListener: ((event: any) => void) | null;
    swipeImageListener: ((event: any) => void) | null;
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
    }) => Promise<void>;
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
    ensureTransitionEnds(element: number, duration: number, beginTransition: Function): Promise<any>;
    /**
     * Translate the track to X
     */
    translateTo(x: any, duration: any): Promise<void>;
    /**
     * Show's a specifc slide and hides others, except when passing true to show all
     * then all slides will visible
     */
    setVisibility(activeSlide: any, showAll: any): void;
    /**
     * Perform a fade on a single slide
     */
    fadeSlide(slide: any, visible: any): Promise<any>;
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
    }): Promise<void>;
    goto(index: any, event: any, triggerType: any): void;
    setup(): void;
    setupSwipe(): void;
    onSwipe(event: any): void;
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
        navButtons: HTMLButtonElement[];
        navItems: HTMLLIElement[];
    };
    createNavButton(slide: any, index: any): HTMLButtonElement;
    getControlContent(action: any): string;
    getNavContent(slide: any): string;
    emit(name: any, args: any): void;
}
//# sourceMappingURL=slider.d.ts.map