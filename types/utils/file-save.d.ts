/**
 * @module utils/file-save
 */
/**
 * Options
 * @typedef {Object} FileSaveOptions
 * @property {String} filename Filename for blob when creating a link (ie createLink) [default "filesave-file.txt"]
 * @property {String} type Filename for blob when creating a link (ie createLink) [default "text/plain;charset=utf-8"]
 */
/**
 * Simple script that is useful for testing
 * - Make a file
 * - Create a URL to it
 * - Gives utility function to create a link to the file (for front end)
 * - Gives method to destroy the file when no longer needed
 * - User can redefine the program by passing options object matching props.
 * Limited to new browsers that support Blob(), also user preferences or type of browser may limit access to Blob functionality
 */
export class FileSave {
    static defaults: {
        filename: string;
        type: string;
    };
    /**
     * Check for Compatibility (optional, implement on user side)
     */
    static isBrowserSupported(): boolean;
    /**
     * @param {*} data Data to put in blob file
     * @param {FileSaveOptions} options Options for file, see defaults (ie. type, filename)
     */
    constructor(data: any, options: FileSaveOptions);
    options: any;
    data: any;
    blob: Blob;
    url: string;
    /**
     * Remove the blob url
     */
    destroy(): void;
    /**
     * Get the blob url
     */
    getUrl(): string;
    /**
     * Create link element with blob as href
     * @param {String} text The text to put in the link
     */
    createLink(text: string): HTMLAnchorElement;
}
/**
 * Options
 */
export type FileSaveOptions = {
    /**
     * Filename for blob when creating a link (ie createLink) [default "filesave-file.txt"]
     */
    filename: string;
    /**
     * Filename for blob when creating a link (ie createLink) [default "text/plain;charset=utf-8"]
     */
    type: string;
};
//# sourceMappingURL=file-save.d.ts.map