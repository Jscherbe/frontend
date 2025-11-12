/**
 * Class for accessible hide/show components
 */
export class Collapsible {
    static defaults: {
        clickOutsideCloses: boolean;
        focusoutCloses: boolean;
        escapeCloses: boolean;
        /**
         * The module won't attach the handlers (you need to do it yourself)
         */
        selfManaged: boolean;
        /**
         * This collapsible starts in open state
         */
        startOpen: boolean;
        /**
         * Open/active state class
         */
        openClass: string;
        /**
         * Output debug info
         */
        debug: boolean;
        onChange(_ctx: any): void;
    };
    /**
     * @param {Object} elements Elements object
     * @param {Node} elements.trigger Trigger button/element that opens/closes collapsible
     * @param {Node} elements.content The content element that the trigger reveals
     * @param {Object} config Configuration options (see defaults)
     * @returns {Object} Collapsible instance
     */
    constructor(elements: {
        trigger: Node;
        content: Node;
    }, config: any);
    elements: {
        trigger: Node;
        content: Node;
    };
    options: any;
    isOpen: boolean;
    handlers: {};
    attachHandlers(): void;
    clickHandler: (event: any) => void;
    focusoutHandler: (event: any) => void;
    removeHandlers(): void;
    onClick(event: any): void;
    destroy(): void;
    debugLog(...msgs: any[]): void;
    setup(): void;
    createEvent(name: any, detail: any): CustomEvent<any>;
    setState(isOpen: any, event: any): void;
    /**
     * Setup handlers needed for closing once open
     */
    setupTemporaryHandlers(): void;
    /**
     * Destroy handlers attached for closing once open
     */
    destroyTemporaryHandlers(): void;
    open(event: any): void;
    close(event: any): void;
    toggle(event: any): void;
}
//# sourceMappingURL=collapsible.d.ts.map