/**
 * @param {Object} options Change options used as default for dialogs, can then be overridden by data attribute settings on element
 */
export function setDefaults(options: any): void;
/**
 * Initialize everything in document
 * - This will only initialize elements once, it is safe to call on page changes
 */
export function init(): void;
/**
 *
 * @param {Node} content Content element of the dialog (what is inserted into the body)
 * @param {Object} options Options for built dialog (see defaults)
 */
export function buildModal(content: Node, options: any): {
    modal: Element;
};
/**
 * Modal Builder Component Initializer
 */
export const initializer: ComponentInitializer;
export namespace defaults {
    export let title: any;
    export let titleIcon: any;
    export let nonModal: boolean;
    export let documentEnd: boolean;
    export let allowResize: boolean;
    export let position: string;
    export let bodyFills: boolean;
    export let noBackdrop: boolean;
    export let size: string;
    export let print: boolean;
    export let noMinHeight: boolean;
    let _class: string;
    export { _class as class };
    export let classCloseIcon: any;
    export let classResizerIcon: any;
    export let debug: boolean;
    export function templateCloseIcon(config: any): string;
    export function templateResizerIcon(config: any): string;
    /**
     * Default modal template
     * @param {String} id ID for new modal
     * @param {Object} config Resolved options
     * @returns {String} Markup for modal
     */
    export function template(id: string, config: any): string;
}
import { ComponentInitializer } from "../utils/system.js";
//# sourceMappingURL=modal-builder.d.ts.map