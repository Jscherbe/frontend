var l = Object.defineProperty;
var a = (s, t, e) => t in s ? l(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var i = (s, t, e) => a(s, typeof t != "symbol" ? t + "" : t, e);
const r = class r {
  /**
   * @param {*} data Data to put in blob file
   * @param {FileSaveOptions} options Options for file, see defaults (ie. type, filename)
   */
  constructor(t, e) {
    this.options = Object.assign({}, r.defaults, e), this.data = t, this.blob = new Blob([t], { type: this.options.type }), this.url = URL.createObjectURL(this.blob);
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
  createLink(t) {
    const e = document.createElement("a"), n = document.createTextNode(t);
    return e.setAttribute("download", this.options.filename), e.setAttribute("href", this.url), e.appendChild(n), e;
  }
  /**
   * Check for Compatibility (optional, implement on user side)
   */
  static isBrowserSupported() {
    return "FileReader" in window;
  }
};
i(r, "defaults", {
  filename: "filesave-file.txt",
  type: "text/plain;charset=utf-8"
});
let o = r;
export {
  o as FileSave
};
