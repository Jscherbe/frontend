export default FileSave;
/**
 * @module helpers/file-save
 */
declare class FileSave {
    static isBrowserSupported(): boolean;
    constructor(data: any, options: any);
    filename: string;
    type: string;
    data: any;
    blob: Blob;
    url: string;
    destroy(): void;
    getUrl(): string;
    createLink(text: any): any;
}
//# sourceMappingURL=file-save.d.ts.map