export class ProgrammaticModalManager {
    static defaults: {
        triggerSelector: string;
        triggerInitAttr: string;
    };
    constructor(passedOptions: any);
    options: any;
    triggers: any;
    cachedTrigger: any;
    onTriggerClick: (event: any) => void;
    onPageModified: () => void;
    setupTriggers(): void;
    destroy(): void;
    createAndOpen(config: any, afterCreate: any): {
        trigger: any;
        modal: any;
        config: any;
    } | undefined;
}
//# sourceMappingURL=programmatic-modal.d.ts.map