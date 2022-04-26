const path = require("path");
const parse = require("./parse.js");
const defaults = require("./defaults.js");
const createContent = require("./create-content.js");
const { dataToFile, groupPagePath } = require("./utils.js");
const PLUGIN_NAME = "@ulu/vuepress-plugin-sassdoc";

module.exports = userOptions => {
  // let groups;
  const options = Object.assign({}, defaults, userOptions);
  return {
    name: PLUGIN_NAME,
    chainMarkdown: config => {
      if (options.addMarkdownAttrSupport) {
        // config
        //   .plugin('anchor')
        //     .tap(([ tappedOptions ]) => {
        //       // Doesnt respect attrs used for id's
        //       delete tappedOptions.slugify;
        //       return [ tappedOptions ];
        //     });
        config
          .plugin("attrs")
            .use(require("markdown-it-attrs"))
            .before("markdown-it-anchor");
      }
    },
    enhanceAppFiles: path.resolve(__dirname, "enhance-app-files.js"),
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
      const groups = await parse(options);

      if (options.debugToDir) {
        dataToFile(path.join(options.debugToDir, "sassdoc-plugin-data.json"), groups);
      }

      const pages = Object.entries(groups).map(([groupName, group]) => { 
        const groupPath = `${ options.pathBase }${ groupName }/`;
        // Filling in this information here, maybe at somepoint this conversion to pages 
        // could be adjustable So keeping it out of parse data
        group.forEach(item => {
          item.groupPath = groupPath;
          item.path = `${ groupPath }#${ item.id }`;
        });
        try {
          const title = options.getPageTitle(groupName);
          return {
            path: groupPath,
            content: createContent({ groupName, title, group, groups, options }),
            frontmatter: { 
              title, 
              sassdocGroupName: groupName 
            }
          };
        } catch (error) {
          console.error(`Error in ${ PLUGIN_NAME }! (creating page for ${ groupName })`, error);
        }
      }).filter(page => page).sort(options.sort);

      if (options.onReady) {
        await options.onReady({ pages, groups, options });
      }

      return pages;
    }
  }
}
