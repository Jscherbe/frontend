import { ComponentInitializer } from '../core/component.js';
/**
 * @param {Object} options Change options used as default for dialogs, can then be overridden by data attribute settings on element
 */
export function setDefaults(options: Object): void;
/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init(): void;
/**
 * Setup a single proxy click
 * @param {Node} proxy The container who's click should proxy the click of inner element with options.selector (defaults to [data-ulu-proxy-click-source])
 * @param {Object} userOptions Options to override defaults
 */
export function setupProxy(proxy: Node, userOptions: Object): void;
/**
 * Main function for attaching behaviors that enable proxy click
 * @param {Node} proxy The container who's click should proxy the click of inner element with options.selector (defaults to [data-ulu-proxy-click-source])
 * @param {Node} child The element who is being proxied and will get clicked if the proxy is clicked (as long as not an interactive element within proxy)
 * @param {Object} config Merged/final options object
 */
export function attachHandlers(proxy: Node, child: Node, config: Object): void;
/**
 * Proxy Click Component Initializer
 */
export const initializer: ComponentInitializer;
export namespace defaults {
    let selector: string;
    let selectorPreventBase: string;
    let selectorPrevent: string;
    let mousedownDurationPrevent: number;
}
//# sourceMappingURL=proxy-click.d.ts.map