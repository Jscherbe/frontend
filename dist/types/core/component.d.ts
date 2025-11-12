/**
 * Class serves as a utility for UI modules, handling the selection of elements and the initialization of corresponding component instances, ensuring consistent setup within the module
 */
export class ComponentInitializer {
    static defaults: {
        type: any;
        baseAttribute: any;
    };
    static requiredOptions: string[];
    static hasRequiredOptions: any;
    /**
     * Create a new instance of ComponentInitializer
     * @param {Object} options Options for configuring the component initializer.
     * @param {String} options.type Type of component (used for logs).
     * @param {String} options.baseAttribute Prefix and base attribute name (used for base attribute and further element attribute names).
     */
    constructor(options: {
        type: string;
        baseAttribute: string;
    });
    options: {
        type: any;
        baseAttribute: any;
    } & {
        type: string;
        baseAttribute: string;
    };
    logTitle: string;
    /**
     * Initializes the component based on the provided configuration.
     * @param {Object} config The initialization configuration.
     * @param {Function} config.setup The setup function to call for each element.
     * @param {String} config.key [null] The optional key to use with attribute selector.
     * @param {Boolean} config.withData [null] Whether to retrieve element data.
     * @param {Array} config.coreEvents [null] An array of core event names (e.g., 'pageModified') that should trigger a re-initialization.
     * @param {HTMLElement} config.context [document] The context to query within.
     */
    init(config: {
        setup: Function;
        key: string;
        withData: boolean;
        coreEvents: any[];
        context: HTMLElement;
    }): void;
    /**
     * Processes the elements based on the provided configuration.
     * @param {object} config The initialization configuration.
     * @param {function} config.setup The setup function to call for each element.
     * @param {string} config.key The optional key to use with attribute selector.
     * @param {boolean} config.withData [false] Whether to retrieve element data.
     * @param {HTMLElement} config.context [document] The context to query within.
     */
    setupElements(config: {
        setup: Function;
        key: string;
        withData: boolean;
        context: HTMLElement;
    }): void;
    /**
     * Get an attribute name
     * @param {String} key Optional key, if no key will return baseAttribute if key will return key added to base
     * @returns {String} String like data-ulu-dialog or data-ulu-dialog-element
     */
    getAttribute(key: string): string;
    /**
     * Create an attribute selector
     * @param {String} key Optional key (see getAttribute)
     */
    attributeSelector(key: string): string;
    /**
     * Create an attribute selector for initial
     * @return {String}
     */
    attributeSelectorInitial(key: any): string;
    /**
     * Queries all main elements of a component that have not been initialized and extracts their data attributes.
     * @param {HTMLElement} context The context to query within.
     * @param {Boolean} withData Include dataset from element (as optional JSON)
     * @param {Node} context Element to query elements from
     * @returns {Array<{element: HTMLElement, data: object, initialize: Function}>} An array of objects containing the elements, their data, and convenience function initialize() which when called will set the init attribute on the element
     */
    queryAllInitial(key: any, withData: boolean, context?: HTMLElement): Array<{
        element: HTMLElement;
        data: object;
        initialize: Function;
    }>;
    /**
     * Sets the init attribute on an element, marking it as initialized.
     * @param {HTMLElement} element The element to initialize.
     */
    initializeElement(element: HTMLElement): void;
    /**
     * Get an elements dataset value as JSON or other value
     * @return {*} The value of the dataset, if JSON will return object else will return string value or undefined
     */
    getData(element: any, key: any): any;
    /**
     * Will output namespaced console logs for the given initializer
     */
    log(...msgs: any[]): void;
    /**
     * Will output namespaced console warnings for the given initializer
     */
    warn(...msgs: any[]): void;
    /**
     * Will output namespaced console error for the given initializer
     */
    logError(...msgs: any[]): void;
}
//# sourceMappingURL=component.d.ts.map