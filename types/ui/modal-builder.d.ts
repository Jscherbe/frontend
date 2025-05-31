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
    export let titleClass: string;
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
    export let baseClass: string;
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
/**
 * Default builder options (extends dialog defaults, watch name collisions)
 * - Decided to extend defaults so the interface in HTML is singular
 * - This is sometimes easier to template (merging and serializing options
 * in twig for example)
 */
export type DefaultModalOptions = {
    /**
     * - The title of the modal. Defaults to `null`.
     */
    title: string | null;
    /**
     * - The class name for an icon to display in the title. Defaults to `null`.
     */
    titleIcon: string | null;
    /**
     * - Extra class/classes to add to title
     */
    titleClass: string;
    /**
     * - If `true`, the modal will not prevent interaction with elements behind it. Defaults to `false`.
     */
    nonModal: boolean;
    /**
     * - If `true`, the modal will be appended to the end of the `document.body`. Defaults to `true`.
     */
    documentEnd: boolean;
    /**
     * - If `true`, the modal will be resizable. Defaults to `false`.
     */
    allowResize: boolean;
    /**
     * - The initial position of the modal. Defaults to `"center"`.
     */
    position: "center" | "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    /**
     * - If `true`, the modal body will fill the available space. Defaults to `false`.
     */
    bodyFills: boolean;
    /**
     * - If `true`, no backdrop will be displayed behind the modal. Defaults to `false`.
     */
    noBackdrop: boolean;
    /**
     * - The size of the modal. Defaults to `"default"`.
     */
    size: "default" | "small" | "large" | "fullscreen";
    /**
     * - If `true`, the modal content will be optimized for printing. Defaults to `false`.
     */
    print: boolean;
    /**
     * - If `true`, the modal will not have a minimum height. Defaults to `false`.
     */
    noMinHeight: boolean;
    /**
     * - Additional CSS class(es) to add to the modal. Defaults to `""`.
     */
    class: string;
    /**
     * - The base CSS class for the modal elements. Defaults to `"modal"`.
     */
    baseClass: string;
    /**
     * - The class name for the close icon. Uses the wrapped setting string.
     */
    classCloseIcon: string;
    /**
     * - The class name for the resizer icon. Uses the wrapped setting string.
     */
    classResizerIcon: string;
    /**
     * - Enables debug logging. Defaults to `false`.
     */
    debug: boolean;
    /**
     * - A function that returns the HTML for the close icon.
     */
    templateCloseIcon: (arg0: object) => string;
    /**
     * - The resolved modal configuration object.
     */
    config: (arg0: object) => string;
};
import { ComponentInitializer } from "../utils/system.js";
//# sourceMappingURL=modal-builder.d.ts.map