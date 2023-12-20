/**
 * @class
 * Class that provides method for retrieving and acting on breakpoints passed
 * from CSS (using element psuedo content prop)
 */
export class CssBreakpoints {
    static instances: any[];
    static defaults: {
        element: HTMLElement;
        valueFromPsuedo: boolean;
        customProperty: string;
        psuedoSelector: string;
        debug: boolean;
    };
    /**
     * @param {Object} config Configruation object
     * @param {Array} config.order Required, Array of strings that correspond to the breakpoints setup in the styles, Breakpoints from smallest to largest
     * @param {Array} config.customProperty Property to grab breakpoint from (default is --breakpoint)
     * @param {Array} config.valueFromPsuedo Use the legacy method of grabbing breakpoint from psuedo element, default uses custom property
     * @param {Node} config.element The element to retrieve active breakpoint from stylesheet. (default is html) For using the old psuedo method, adjust this to document.body
     * @param {String} config.psuedoSelector Change psuedo selector used to get the breakpoint from the psuedo's content property
     */
    constructor(config: {
        order: any[];
        customProperty: any[];
        valueFromPsuedo: any[];
        element: Node;
        psuedoSelector: string;
    });
    active: any;
    previous: any;
    activeIndex: any;
    resizeDirection: string;
    previousIndex: any;
    breakpoints: {};
    /**
     * Get breakpoint from a psuedo element
     */
    getBreakpointInPsuedo(): string;
    /**
     * Get breakpoint from a custom property
     */
    getBreakpointInProperty(): string;
    /**
     * Get breakpoint from element (design note: user could override prototype)
     */
    getBreakpoint(): string;
    /**
     * Updates the active breakpoint by checking the element and executes handlers on change
     */
    update(): void;
    /**
     * Get a breakpoint by key
     * @param {String} name The name of the breakpoint to get
     */
    at(name: string): any;
}
export default CssBreakpoints;
//# sourceMappingURL=css-breakpoint.d.ts.map