/**
 * @class
 * Class that provides method for retrieving and acting on breakpoints passed
 * from CSS (using element psuedo content prop)
 */
export class BreakpointManager {
    static instances: any[];
    static defaults: {
        element: HTMLElement;
        valueFromPsuedo: boolean;
        customProperty: string;
        psuedoSelector: string;
        order: string[];
        debug: boolean;
    };
    /**
     * @param {Object} config Configruation object
     * @param {Array} config.order Array of strings that correspond to the breakpoints setup in the styles, Breakpoints from smallest to largest, defaults to [small, medium, large]
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
    onChangeCallbacks: any[];
    /**
     * Add a callback for everytime a breakpoint changes
     * - Not recommended, possibly use to watch for changes, etc
     * - For more control use intance.at(name) with breakpoint methods
     * @param {Function} callback Function to call, passed one argument current instance which can be used to get information about breakpoints
     */
    onChange(callback: Function): void;
    /**
     * Remove change callback
     * @param {Function} callback Function to remove
     */
    removeOnChange(callback: Function): void;
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
     * @return {Breakpoint} Breakpoint to act on (see Breakpoint class)
     */
    at(name: string): Breakpoint;
}
/**
 * @class
 * Single breakpoint management
 */
declare class Breakpoint {
    constructor(name: any, manager: any);
    directions: {
        max: BreakpointDirection;
        min: BreakpointDirection;
        only: BreakpointDirection;
    };
    _manager: any;
    name: any;
    /**
     * Private method used inrternally for managing direction activation
     * - Each direction manages it's own state and handlers
     * @param {String} direction The directional key
     * @param {Boolean} active State of that direction to set
     */
    _setDirection(direction: string, active: boolean): void;
    /**
     * Attach handler to be executed from the breakpoint and to all breakpoints below.
     * - If the browser resizes from a breakpoint below this breakpoint,
     *   and above the breakpoint name specified, this handler will fire
     * @param {Function} handler Handler to be executed
     */
    max(handler: Function): void;
    /**
     * Attach handler to be executed from the breakpoint and to all breakpoints below.
     * - If the browser resizes from a breakpoint above this breakpoint,
     *   and below the breakpoint name specified, this handler will fire
     * @param {Function} handler Handler to be executed
     */
    min(handler: Function): void;
    /**
     * Attach a handler to fire when the breakpoint is within the key
     * @param {Function} handler Handler to be executed
     */
    only(handler: Function): void;
    /**
     * Remove handler
     * @param {Function} handler Handler to be removed, extended on/off object style can be used
     * @param {String} direction Remove handler only from specified direction, else search all directions
     */
    remove(handler: Function, direction: string): void;
    log(...msg: any[]): void;
}
/**
 * @class
 * Used to handle a breakpoints direction's handler and state
 */
declare class BreakpointDirection {
    constructor(direction: any, breakpoint: any);
    direction: any;
    active: boolean;
    on: any[];
    off: any[];
    breakpoint: any;
    /**
     * Change the state of the direction
     */
    change(to: any): void;
    /**
     * Calls all functions in handlers or
     */
    _call(forActive: any): void;
    /**
     * Returns handlers in normalized object format on/off
     */
    getHandlers(handler: any): any;
    /**
     * Adds a handler for the direction, optionally use object to add off state handler
     * @param {Function|Object} handler Function to be executed when direction is active, read object description for on/off
     * @param {Function|Object} handler.on Function to be executed when direction is active
     * @param {Function|Object} handler.off Function to be executed when direction was active and is now changed to inactive
     */
    add(handler: Function | any): void;
    /**
     * Removes a handler
     */
    remove(handler: any): void;
}
export {};
//# sourceMappingURL=breakpoints.d.ts.map