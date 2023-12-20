export default class Tooltip {
    static defaults: {
        namespace: string;
        describedBy: boolean;
        arrowSize: number;
        classes: any[];
    };
    constructor(context: any, markup: any, config: any);
    options: any;
    context: any;
    element: HTMLDivElement;
    create(markup: any): HTMLDivElement;
    inPage: boolean;
    destroy(): void;
}
//# sourceMappingURL=tooltip.d.ts.map