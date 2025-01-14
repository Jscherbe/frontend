/**
 * Initialize default popover
 */
export function init(): void;
/**
 * Query all popovers on current page and set them up
 * - Use this manually if needed
 * - Won't setup a popover more than once
 */
export function setup(): void;
/**
 * Find the popover's elements
 */
export function resolve(trigger: any): false | {
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
import { Collapsible } from "./collapsible.js";
//# sourceMappingURL=popover.d.ts.map