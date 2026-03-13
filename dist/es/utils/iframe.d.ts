/**
 * Checks if an element's sole content is an iframe, and determines its layout type.
 * Useful for determining if layout fixes should be applied to containers.
 * @param {HTMLElement} container The container to check
 * @returns {{iframe: HTMLIFrameElement, isStaticSize: boolean, width: string|null, height: string|null, aspectRatio: string|null, fillHeight: string|null}|null} Returns an object with iframe details, or null if not a sole iframe
 */
export function getSoleIframeLayout(container: HTMLElement): {
    iframe: HTMLIFrameElement;
    isStaticSize: boolean;
    width: string | null;
    height: string | null;
    aspectRatio: string | null;
    fillHeight: string | null;
} | null;
//# sourceMappingURL=iframe.d.ts.map