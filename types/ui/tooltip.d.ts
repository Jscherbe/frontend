/**
 * Initialize default popover
 */
export function init(): void;
/**
 * Tooltip Component Initializer
 */
export const initializer: ComponentInitializer;
/**
 * Tooltip
 * - Provides basic tooltip functionality
 * - Uses floating UI for positioning
 */
export class Tooltip {
    /**
     * Defaults options
     */
    static defaults: {
        /**
         * Should the tooltip and content be linked accessibly
         * - Note tooltips can only apply to interactive elements! (ie button, input, role="...", etc)
         * @type {Boolean}
         */
        accessible: boolean;
        /**
         * String/markup to insert into tooltip display
         * @type {String}
         */
        content: string;
        openClass: string;
        contentClass: string;
        isHtml: boolean;
        /**
         * Pull content from pre-existing content on page
         * @type {String|Node}
         */
        fromElement: string | Node;
        /**
         * If used on a link that is an anchor link it will display the content of the anchor like fromElement
         */
        fromAnchor: boolean;
        /**
         * Move the content to the bottom of the document
         * @type {Boolean}
         */
        endOfDocument: boolean;
        /**
         * Events to show tooltip on
         * @type {Array.<String>}
         */
        showEvents: Array<string>;
        /**
         * Events to hide tooltip on
         * @type {Array.<String>}
         */
        hideEvents: Array<string>;
        /**
         * Delay when using the directive
         * @type {Number}
         */
        delay: number;
        /**
         * Template for the content display
         */
        template(_config: any): string;
        /**
         * Callback when tooltip is shown or hidden
         * @type {Function}
         */
        onChange: Function;
    };
    static defaultFloatingOptions: {};
    constructor(elements: any, userOptions: any, floatingOptions: any);
    options: any;
    floatingOptions: any;
    elements: any;
    handlers: {};
    isOpen: boolean;
    setup(): void;
    setupAccessibility(): void;
    destroy(): void;
    getInnerContent(): any;
    getAnchorElement(): HTMLElement;
    createContentElement(): void;
    attachHandlers(): void;
    destroyHandlers(): void;
    setState(isOpen: any, event: any): void;
    createEvent(name: any, detail: any): CustomEvent<any>;
    createFloatingInstance(): void;
    floatingCleanup: Function;
    destroyFloatingInstance(): void;
    show(event: any): void;
    hide(event: any): void;
}
import { ComponentInitializer } from "../utils/system.js";
//# sourceMappingURL=tooltip.d.ts.map