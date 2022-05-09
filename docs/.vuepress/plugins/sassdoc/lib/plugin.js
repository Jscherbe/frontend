const path = require("path");
const parse = require("./parse.js");
const defaults = require("./defaults.js");
const createPages = require("./create-pages.js");
const { dataToFile } = require("./utils.js");
const { PLUGIN_NAME } = require("./constants.js");
const TIME_LOG = "sassdoc:plugin";

module.exports = userOptions => {
  const options = Object.assign({}, defaults, userOptions);
  return {
    name: PLUGIN_NAME,
    chainMarkdown: config => {
      if (options.addMarkdownAttrSupport) {
        config
          .plugin("attrs")
            .use(require("markdown-it-attrs"))
            .before("anchors");
      }
    },
    enhanceAppFiles: path.resolve(__dirname, "assets/enhance-app-files.js"),
    clientDynamicModules() {
      return {
        name: 'sassdoc-options.js',
        content: `
          export const previewMeta = \`${ options.previewMeta }\`;
          export const previewStyles = \`${ options.previewStyles }\`;
          export const previewBodyScripts = \`${ options.previewBodyScripts }\`;
        `
      }
    },
    async additionalPages() {
      const parseData = await parse(options);
      if (!parseData) return [];

      const { groups, info } = parseData;

      if (options.debug) {
        console.time(TIME_LOG);
      }
      if (options.debugToDir) {
        dataToFile(path.join(options.debugToDir, "sassdoc-plugin-data.json"), groups);
      }

      const pages = createPages({ groups, info, options });

      if (options.onReady) {
        await options.onReady({ pages, groups, options, info });
      }
      if (options.debug) {
        console.timeEnd(TIME_LOG);
      }
      
      return pages;
    },
    extendPageData ($page) {
      const { headers, frontmatter } = $page;
      // Need to fix markdown-it-attrs being included in these headers
      // ie. mixin-name {#mixin-name} 
      // Tried to rearrange the markdown plugins (no luck)
      // Editing manually becuase it's the only workaround I've found
      if (frontmatter.sassdocGroupName && options.addMarkdownAttrSupport && headers) {
        $page.headers.forEach(header => {
          header.title = header.title.replace(/{#[^\n ]*}/g, "");
        });
      }
    }
  };
}
