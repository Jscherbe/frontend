export class OverflowScroller {
    static instances: any[];
    static defaults: {
        namespace: string;
        events: {};
        horizontal: boolean;
        offsetStart: number;
        offsetEnd: number;
        amount: string;
        buttonClasses: string[];
        iconClassesPrevious: string[];
        iconClassesNext: string[];
    };
    constructor(elements: any, config: any);
    options: any;
    elements: any;
    nextEnabled: boolean;
    previousEnabled: boolean;
    scrollHandler: (e: any) => void;
    checkOverflow(): void;
    hasOverflow: boolean;
    createControls(context: any): {
        controls: HTMLUListElement;
        previousItem: HTMLLIElement;
        nextItem: HTMLLIElement;
        previous: HTMLButtonElement;
        next: HTMLButtonElement;
    };
    createControlButton(action: any): HTMLButtonElement;
    getControlContent(action: any): string;
    onScroll(event: any): void;
    onScrollHorizontal(): void;
    setControlState(dir: any, enabled: any): void;
    resolveAmount(dir: any): any;
    next(): void;
    previous(): void;
    getClass(child: any): string;
}
//# sourceMappingURL=overflow-scroller.d.ts.map