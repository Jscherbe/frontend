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
  static defaults = {
    filename: "filesave-file.txt",
    type: "text/plain;charset=utf-8"
  }
  /**
   * @param {*} data Data to put in blob file
   * @param {FileSaveOptions} options Options for file, see defaults (ie. type, filename)
   */
  constructor(data, options) {
    this.options = Object.assign({}, FileSave.defaults, options);
    this.data = data;
    this.blob = new Blob([data], { type: this.options.type });
    this.url = URL.createObjectURL(this.blob);
  }
  /**
   * Remove the blob url 
   */
  destroy() {
    return URL.revokeObjectURL(this.url);
  }
  /**
   * Get the blob url
   */
  getUrl() {
    return this.url;
  }
  /**
   * Create link element with blob as href
   * @param {String} text The text to put in the link
   */
  createLink(text) {
    const link = document.createElement('a');
    const textNode = document.createTextNode(text);
    link.setAttribute('download', this.options.filename);
    link.setAttribute('href', this.url);
    link.appendChild(textNode);
    return link;
  }
  /**
   * Check for Compatibility (optional, implement on user side)
   */
  static isBrowserSupported() {
    return "FileReader" in window;
  }
}
