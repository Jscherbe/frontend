const path = require("path");
const sassdoc = require("sassdoc");
const { simplifyData } = require("./utils.js");
const defaults = require("./defaults.js");
const { dataToFile } = require("./utils.js");
const template = require("./template.js");
const PLUGIN_NAME = "@ulu/vuepress-plugin-sassdoc";

module.exports = opts => {
  let groups;
  const options = Object.assign({}, defaults, opts);
  return {
    name: PLUGIN_NAME,
    chainMarkdown: config => {
      if (options.addMarkdownAttrSupport) {
        config
          .plugin('anchor')
            .tap(([options]) => {
              // Doesnt respect attrs used for id's
              delete options.slugify;
              return [ options ]
            });
        config
          .plugin("attrs")
            .use(require("markdown-it-attrs"))
            .before("markdown-it-anchor");
      }
    },
    enhanceAppFiles: path.resolve(__dirname, "enhanceAppFiles.js"),
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
      try {
        const data = await sassdoc.parse(options.dir, options.sassdocOptions);

        if (!data) {
          throw "Unable to parse sasdoc data!";
        }
        if (options.debugToDir) {
          dataToFile(path.join(options.debugToDir, "sassdoc-data-raw.json"), data);
        }

        groups = simplifyData(data, options);

        if (options.debugToDir) {
          dataToFile(path.join(options.debugToDir, "sassdoc-data.json"), data);
        }

        const pages = Object.entries(groups).map(([groupName, group]) => { 
          try {
            const title = options.getPageTitle(groupName);
            return {
              path: `${ options.pathBase }${ groupName }/`,
              content: template({ groupName, title, group, groups, options }),
              frontmatter: { title, sassdocGroupName: groupName }
            };
          } catch (error) {
            console.error(`Error in ${ PLUGIN_NAME }! (creating page for ${ groupName })`, error);
          }
        }).filter(p => p);

        pages.sort(options.sort);

        if (options.onReady) {
          await options.onReady({ pages, groups, options });
        }

        return pages;

      } catch(error) {
        console.error(`Error in ${ PLUGIN_NAME }! (options used)`, error);
      }
    }
  }
};