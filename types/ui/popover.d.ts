/**
 * Initialize default popover
 */
export function init(): void;
/**
 * Find the popover's elements
 */
export function resolve(trigger: any, userOptions: any): false | {
    elements: {
        trigger: any;
        content: any;
        anchor: any;
        contentArrow: any;
    };
    options: any;
    floatingOptions: any;
};
export function getContentByTrigger(trigger: any): any;
/**
 * Popover Component Initializer
 */
export const initializer: ComponentInitializer;
/**
 * Array of current instances
 */
export const instances: any;
/**
 * Class that extends Collapsible adding floating-ui for popover behavior
 */
export class Popover extends Collapsible {
    constructor(elements: any, config: any, floatingOptions: any);
    floatingOptions: any;
    createFloatingInstance(): void;
    floatingCleanup: Function;
    destroyFloatingInstance(): void;
}
import { ComponentInitializer } from "../utils/system.js";
import { Collapsible } from "./collapsible.js";
//# sourceMappingURL=popover.d.ts.map