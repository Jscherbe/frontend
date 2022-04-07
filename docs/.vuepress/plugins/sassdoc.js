// const fs = require('fs');
const { dataToFile } = require("../utils/node");
const sassdoc = require('sassdoc');
const defaults = {
  dir: "",
  debug: true,
  debugToFile: null,
  sassdocOptions: {
    verbose: true
  },
  layout: "SassdocGroup",
  pagePath: (group, items) => `/sass/${ group }/`,
  alterPage: (group, items) => ({})
};

module.exports = (opts, ctx) => {
  const options = Object.assign({}, defaults, opts);
  return {
    name: 'sassdoc-generator',
    themeConfig: {
      sidebar: 'auto',
    },
    
    async additionalPages() {
      try {
        const data = await sassdoc.parse(options.dir, options.sassdocOptions);
        if (options.debug && options.debugToFile) {
          dataToFile(data, options.debugToFile);
        }
        const pages = createPages(data, options);
        return pages;
      } catch(error) {
        handleError(error);
      }
    }
  };
};

function createPages(data, options) {
  // Sort data by group and create one page per group
  const groups = data.reduce((acc, item) => {
    item.group?.forEach(name => {
      if (!acc.includes(name)) {
        acc.push(name);
      }
    });
    return acc;
  }, []);
  groups.sort();
  // console.log('groups:\n', groups);
  // For each group (page) pull out doc items that match group name
  return groups.map(name => {
    const items = data.filter(item => item.group.includes(name));
    return {
      title: name,
      path: options.pagePath(name, items),
      frontmatter: {
        layout: options.layout,
      },
      sassdoc: items,
      ...options.alterPage(name, items)
    }
  });
}

function handleError(error) {
  console.error(error);
}