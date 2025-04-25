/**
 * Initialize flipcards using data-ulu-flipcard attribute
 */
export function init(): void;
/**
 * Flipcard Component Initializer
 */
export const initializer: ComponentInitializer;
/**
 * Flipcard class (creates flipcard instance and behaviors)
 */
export class Flipcard {
    static instances: any[];
    /**
     * Default options for Flipcard
     */
    static defaults: {
        namespace: string;
        proxyClick: {
            allowSelection: boolean;
            selectionMin: number;
            exclude: string;
        };
    };
    constructor(container: any, front: any, back: any, config: any);
    options: any;
    elements: {
        container: any;
        front: any;
        back: any;
    };
    isOpen: boolean;
    uid: string;
    stateAttr: string;
    toggle(): void;
    setup(): void;
    /**
     * Click handler on everything on container
     * - Determines if click was something that should be ignored (link, etc)
     */
    onProxyClick({ target }: {
        target: any;
    }): void;
    getClass(child: any): any;
    createControlContent(): string;
    setVisibility(visible: any): void;
    containerCss(): string;
    panelCss(zIndex?: number): string;
}
import { ComponentInitializer } from "../utils/system.js";
//# sourceMappingURL=flipcard.d.ts.map