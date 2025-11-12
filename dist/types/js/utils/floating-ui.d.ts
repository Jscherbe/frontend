/**
 *
 * @param {Object} elements Elements (trigger, content, and optionally contentArrow)
 * @param {*} options Configuration options for floatingUi
 * @returns {Function} floating cleanup function call when no longer needed
 */
export function createFloatingUi(elements: any, config: any): Function;
export namespace defaults {
    let strategy: string;
    let placement: string;
    let inline: boolean;
    namespace offset {
        let mainAxis: number;
    }
    let shift: boolean;
    let flip: boolean;
    let arrow: boolean;
}
//# sourceMappingURL=floating-ui.d.ts.map