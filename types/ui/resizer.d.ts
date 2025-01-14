export class Resizer {
    static defaults: {
        debug: boolean;
        overrideMaxWidth: boolean;
        fromLeft: boolean;
    };
    /**
     *
     * @param {Node} container Container to be resize
     * @param {Node} control Resize handle element
     * @param {Object} options Defualt can be changed on class
     * @param {Boolean} options.debug Enable non-essential debugging logs
     * @param {Boolean} options.overrideMaxWidth When script is activated by handle remove the elements max-width and allow the width of the resize to exceed the max (default false)
     * @param {Boolean} options.fromLeft The script should assume the handle is on the left side of the element
     */
    constructor(container: Node, control: Node, options: {
        debug: boolean;
        overrideMaxWidth: boolean;
        fromLeft: boolean;
    });
    options: any;
    container: Node;
    control: Node;
    handlerMousedown: any;
    destroy(): void;
    onMousedown(e: any): void;
}
//# sourceMappingURL=resizer.d.ts.map