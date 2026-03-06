/**
 * @module plugins/code-preview
 * Plugin for code previews
 * - Adds a shortcode "CodePreview"
 * - Passes code through eleventy prism plugin
 */

import beautify from 'js-beautify';

let count = 0;
const newId = name => `code-preview-${ ++count }-${ name }`;

/**
 * Eleventy plugin that reuses the eleventy core syntax highlighting plugin 
 * for preview/code displays in the docs site
 * @param {Object} eleventyConfig 
 */
export default function(eleventyConfig) {

  eleventyConfig.addPairedShortcode("CodePreview", createPreview);
  // eleventyConfig.addPairedShortcode("CodePreviewRaw", createPreviewRaw);

  function createPreview(content, language = "html", options = {}) {
    const { highlight } = eleventyConfig?.javascript?.functions;
    const defaults = {
      beautify: true,
      debug: false,
      beautifyOptions: {
        indent_size: 2,
        wrap_attributes: "preserve"
      }
    };
    const config = { ...defaults, ...options };
    if (config.debug) {
      debugger;
    }
    if (highlight) {
      const markup = config.beautify ? beautify.html(content, config.beautifyOptions) : content;
      const highlighted = highlight(language, markup);
      if (highlighted) {
        return template(markup, highlighted).trim();
      }
    }

    console.warn("Code preview plugin: unable to highlight:", content);
    return content;
  }

  // // Shortcut / Alias
  // function createPreviewRaw(content, language, options) {
  //   return createPreview(content, language, { ...options, beautify: false });
  // }

}

/**
 * Markup template for shortcode
 */
function template(markup, highlighted) {
  const scriptId = newId("json");

  return `
<div class="demo-preview" markdown="0">
  <div class="demo-preview__rendered crop-margins">
    ${ markup }
  </div>
  <div class="demo-preview__toolbar layout-flex-center">
    <strong class="demo-preview__toolbar-title">
      <span class="fas fa-code" aria-hidden="true"></span> HTML
    </strong>
    <div class="demo-preview__toolbar-actions margin-left-auto">
      <button 
        class="button button--icon button--transparent button--small" 
        type="button" 
        aria-label="Copy HTML"
        data-copy-content="#${ scriptId }"
      >
        <span class="fas fa-copy" aria-hidden="true"></span>
      </button>
    </div>
  </div>
  <div class="demo-preview__code">${ highlighted }</div>
  <script id="${ scriptId }" type="text/plain">
${ markup }
  </script>
</div>
  `;
}

// function templateTabs(markup, code) {
//   const prefix = newId();
//   const idPreview = `${ prefix }-preview`;
//   const idCode = `${ prefix }-code`;
//   return `
// <div class="tabs tabs--demo">
//   <div class="tabs__tablist" data-ulu-tablist>
//     <button type="button" aria-controls="${ idPreview }">
//       <span class="fas fa-eye" aria-hidden="true"></span>
//       Preview
//     </button>
//     <button type="button" aria-controls="${ idCode }">
//       <span class="fas fa-code" aria-hidden="true"></span>
//       Code
//     </button>
//   </div>
//   <div class="tabs__tabpanel" id="${ idPreview }">
//     ${ markup }
//   </div>
//   <div class="tabs__tabpanel" id="${ idCode }">
//     ${ code }
//   </div>
// </div>
//   `;
// }