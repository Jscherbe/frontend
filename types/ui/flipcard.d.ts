export function init(): void;
export function setup(): void;
export class Flipcard {
    static instances: any[];
    static defaults: {
        namespace: string;
        proxyClick: {
            allowSelection: boolean;
            selectionMin: number;
            exclude: string;
        };
    };
    constructor(container: any, front: any, back: any, config: any, debug?: boolean);
    options: any;
    debug: boolean;
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
    setVisiblity(visible: any): void;
    containerCss(): string;
    panelCss(zIndex?: number): string;
}
export namespace attrs {
    let init: string;
    let flipcard: string;
    let front: string;
    let back: string;
}
//# sourceMappingURL=flipcard.d.ts.map