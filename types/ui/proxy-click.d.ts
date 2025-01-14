/**
 * @param {Object} options Change options used as default for dialogs, can then be overriden by data attribute settings on element
 */
export function setDefaults(options: any): void;
/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init(): void;
export function setup(context?: Document): void;
export function attachHandlers(proxy: any, child: any, options: any): void;
export namespace defaults {
    let selector: string;
    let selectorPreventBase: string;
    let selectorPrevent: string;
    let mousedownDurationPrevent: number;
}
//# sourceMappingURL=proxy-click.d.ts.map