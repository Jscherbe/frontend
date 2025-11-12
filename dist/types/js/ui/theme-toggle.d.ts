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
 * Sets up a single toggle
 * @param {HTMLElement} toggle A toggle to be setup
 */
export function setupToggle(toggle: HTMLElement, userOptions: any): {
    destroy: () => void;
    toggle: HTMLElement;
    options: any;
    toggleState: (event: any) => void;
    setState(themeKey: any): void;
};
/**
 * Theme Toggle Component Initializer
 */
export const initializer: ComponentInitializer;
export namespace defaults {
    namespace themes {
        namespace light {
            let label: string;
            let value: string;
            let iconClass: string;
            let targetClass: string;
            let mediaQuery: string;
        }
        namespace dark {
            let label_1: string;
            export { label_1 as label };
            let iconClass_1: string;
            export { iconClass_1 as iconClass };
            let targetClass_1: string;
            export { targetClass_1 as targetClass };
            let mediaQuery_1: string;
            export { mediaQuery_1 as mediaQuery };
        }
    }
    let target: string;
    let group: any;
    /**
     * Optional callback to do something when the state changes
     */
    function onChange(_ctx: any): void;
    let initialState: string;
    let checkMediaQuery: boolean;
    let savePreference: boolean;
    let storagePrefix: string;
    let debug: boolean;
}
import { ComponentInitializer } from "../core/component.js";
//# sourceMappingURL=theme-toggle.d.ts.map