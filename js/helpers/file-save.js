/**
 * @module @ulu/frontend/helpers/file-save
 */

// Description:     Simple script that is useful for testing. It will:
//                  - Make a file 
//                  - Create a URL to it
//                  - Gives utility function to create a link to the file (for front end)
//                  - Gives method to destroy the file when no longer needed
//                  - User can redefine the program by passing options object matching props.

// Dependencies:    No

// Support:         Limited to knew browsers that support Blob(), also user preferences or 
//                  type of browser may limit access to Blob functionality

// Related Docs:
//                  - https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
//                  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
//                  - https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL


class FileSave {
  constructor(data, options) {
    this.filename = "filesave-file.txt";
    this.type = "text/plain;charset=utf-8";
    // Allow user to override above
    if (options) Object.assign(this, options);
    this.data = data;
    this.blob = new Blob([data], { type: this.type });
    this.url = URL.createObjectURL(this.blob);
  }
  destroy() {
    return URL.revokeObjectURL(this.url);
  }
  getUrl() {
    return this.url;
  }
  createLink(text) {
    var link = d.createElement('a');
    text = d.createTextNode(text);
    link.setAttribute('download', this.filename);
    link.setAttribute('href', this.url);
    link.appendChild(text);
    return link;
  }
  static isBrowserSupported() {
    return "FileReader" in window;
  }
}

export default FileSave;
