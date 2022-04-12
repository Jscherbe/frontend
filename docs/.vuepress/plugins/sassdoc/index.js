const fs = require('fs');
const path = require("path");
const sassdoc = require('sassdoc');
const prepData = require('./prep-data.js');
const defaults = require("./defaults.js");

module.exports = opts => {
  let groups;
  const options = Object.assign({}, defaults, opts);
  return {
    name: '@ulu/vuepress-plugin-sassdoc',
    enhanceAppFiles: path.resolve(__dirname, "enhanceAppFiles.js"),
    async additionalPages() {
      try {
        const data = await sassdoc.parse(options.dir, options.sassdocOptions);
        if (!data) {
          throw "Unable to get sasdoc data!";
        }
        groups = prepData(data);
        if (options.debugToFile) {
          fs.writeFileSync(options.debugToFile, JSON.stringify(data, null, 2));
        }
        // For each group create a page, add items as page field  
        // to be accessed in group template for display
        return Object.keys(groups).map(name => ({
          path: `${ options.pathBase }${ name }/`,
          content: options.pageTemplate({
            name, 
            group: groups[name], 
            groups,
            options
          }),
          frontmatter: {
            sassdocGroupName: name,
            title: options.getPageTitle(name)
          },
        })).sort(options.sort);
      } catch(error) {
        console.error('Error in vuepress sassdoc plugin! (options used)', options, error);
      }
    }
  }
};