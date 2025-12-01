import { ComponentInitializer } from '../core/component.js';
/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init(): void;
/**
 * Scrollpoint Component Initializer
 */
export const initializer: ComponentInitializer;
/**
 * Single scrollpoint
 * - Note "forward" and "reverse" refer to scroll directions
 *   - forward = vertical below / horizontal right
 *   - reverse = vertical above / horizontal left
 * @todo Convert margin to offset
 * @todo This only goes one direction
 */
export class Scrollpoint {
    static defaults: {
        /**
         * Default observer root element
         */
        root: null;
        /**
         * Use a selector to select the observer root element
         */
        rootSelector: null;
        /**
         * Log debug info to console
         */
        debug: boolean;
        /**
         * Change scroll orientation to horizontal
         */
        horizontal: boolean;
        /**
         * Margin for observer top or left (depending on orientation)
         */
        marginStart: string;
        /**
         * Margin for observer bottom or right (depending on orientation)
         */
        marginEnd: string;
        /**
         * Threshold for observer
         */
        threshold: number[];
        /**
         * The point can exited (else persists)
         */
        exit: boolean;
        /**
         * The point can exit from the end
         */
        exitForward: boolean;
        /**
         * The point can exit from the start
         */
        exitReverse: boolean;
        /**
         * Set state classes
         */
        setClasses: boolean;
        /**
         * Prefix for classes
         */
        classPrefix: string;
        /**
         * Set attribute for state (less verbose same info as classes)
         */
        setAttribute: boolean;
        /**
         * Attribute name to set state info in
         */
        attributeName: string;
        /**
         * Group multiple points, one active at a time (scroll menus)
         */
        /**
         * Elements that should also get active state info (classes or attributes)
         */
        syncElements: never[];
        /**
         * Callback called when state changes
         */
        onChange(_ctx: any): void;
    };
    /**
     * Setup a new scrollpoint
     * @param {Node} element The element to create the scrollpoint for
     * @param {Object} config Options to configure the scrollpoint see Scrollpoint.defaults for more information on settings
     */
    constructor(element: Node, config: Object);
    options: ({
        /**
         * Default observer root element
         */
        root: null;
        /**
         * Use a selector to select the observer root element
         */
        rootSelector: null;
        /**
         * Log debug info to console
         */
        debug: boolean;
        /**
         * Change scroll orientation to horizontal
         */
        horizontal: boolean;
        /**
         * Margin for observer top or left (depending on orientation)
         */
        marginStart: string;
        /**
         * Margin for observer bottom or right (depending on orientation)
         */
        marginEnd: string;
        /**
         * Threshold for observer
         */
        threshold: number[];
        /**
         * The point can exited (else persists)
         */
        exit: boolean;
        /**
         * The point can exit from the end
         */
        exitForward: boolean;
        /**
         * The point can exit from the start
         */
        exitReverse: boolean;
        /**
         * Set state classes
         */
        setClasses: boolean;
        /**
         * Prefix for classes
         */
        classPrefix: string;
        /**
         * Set attribute for state (less verbose same info as classes)
         */
        setAttribute: boolean;
        /**
         * Attribute name to set state info in
         */
        attributeName: string;
        /**
         * Group multiple points, one active at a time (scroll menus)
         */
        /**
         * Elements that should also get active state info (classes or attributes)
         */
        syncElements: never[];
        /**
         * Callback called when state changes
         */
        onChange(_ctx: any): void;
    } & Object) | undefined;
    observer: IntersectionObserver | null;
    lastPosition: any;
    isActive: boolean | undefined;
    element: Node | undefined;
    syncedElements: any[] | undefined;
    classes: {
        enter: string;
        enterForward: string;
        enterReverse: string;
        exit: string;
        exitForward: string;
        exitReverse: string;
    } | undefined;
    getClassname(suffix: any): string;
    getObserverOptions(): {
        root: any;
        rootMargin: string;
        threshold: any;
    };
    /**
     * IntersectionObserver Callback
     * - Should set the state
     */
    onObserve(entries: any): void;
    setupObserver(): void;
    getScrollY(): any;
    setState(isActive: any, isForward: any): void;
    getAllClasses(): string[];
    updateClasses(isActive: any, isForward: any): void;
    updateStateAttribute(isActive: any, isForward: any): void;
    destroy(): void;
}
//# sourceMappingURL=scrollpoint.d.ts.map