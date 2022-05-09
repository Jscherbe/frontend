const path = require("path");
const defaultTemplates = require("./templates/index.js");
const { dataToFile, joinMarkup } = require("./utils.js");
const missingAnnTemplates = [];
const { entries, assign } = Object;
const TIME_LOG = "sassdoc:plugin:createPages";
const { PLUGIN_NAME } = require("./constants.js");

function createPages({ groups, info, options }) {
  const templates = {
    page: assign({}, defaultTemplates.page, options.pageTemplates),
    annotations: assign({}, defaultTemplates.annotations, options.annotationTemplates),
  };
  
  if (options.debug) {
    console.time(TIME_LOG);
  }
  // For each group (array of it's items) create a page
  const pages = entries(groups)
    .map(([groupName, group]) => { 
      const groupPath = `${ options.pathBase }${ groupName }/`;
      // Filling in this information here, maybe at somepoint this conversion to pages 
      // could be adjustable So keeping it out of parse data
      group.forEach(item => {
        item.groupPath = groupPath;
        item.path = `${ groupPath }#${ item.id }`;
      });
      try {
        const title = options.pageTitleFormatter(info.groupDisplayNames[groupName] || groupName);
        const pageData = { groupName, title, group, groups, info };
        return {
          path: groupPath,
          content: createContent(pageData, templates, options),
          frontmatter: { title, sassdocGroupName: groupName }
        };
      } catch (error) {
        console.error(PLUGIN_NAME, `Error creating page for ${ groupName })`, error);
      }
    });

  if (options.debug) {
    console.timeEnd(TIME_LOG)
  }
  return pages.filter(page => page).sort(options.sort);
}


function createContent(pageData, templates, options) {
  const {
    item:    itemTemplate,
    section: sectionTemplate,
    script:  scriptTemplate,
    group:   groupTemplate
  } = templates.page;
  const { group, groupName } = pageData;
  const { annotations } = options;
  const sections = createSections(group, options);
  
  // Note: "$" denotes an array of markup
  const $content = entries(sections)
    .filter(([,items]) => items.length)
    .map(([sectionName, items]) => {
      const $items = items.map(item => {
        const data = { item, ...pageData, options };
        const $annotations = annotations.map(a => {
          const template = templates.annotations[a];
          if (template) {
            return template(data);
          } else {
            missingAnnTemplate(a)
          }
        });
        return itemTemplate(data, joinMarkup($annotations));
      });
      return sectionTemplate({ sectionName }, joinMarkup($items));
    });

  const scriptData = clientSideData(group, options);
  const $markup = joinMarkup($content, scriptTemplate(pageData, scriptData));
  const $group = groupTemplate(pageData, $markup);

  if (options.debugToDir) {
    dataToFile(path.join(options.debugToDir, `group-page-${ groupName }.txt`), $group);
    dataToFile(path.join(options.debugToDir, `page-sections.json`), sections);
  }
  
  return $group;
}

function createSections(group, options) {
  const { contentEnabled, contentInline } = options;
  const first = group[0];
  const getType = item => item && item.data.context.type;
  // Use reduce so we can add in content blocks
  const byType = by => group.reduce((acc, item, index) => {
    const next = group[index + 1];
    if (getType(item) === by) {
      acc.push(item);
      if (contentEnabled && contentInline && getType(next) === "content") {
        acc.push(next);
      }
    }
    return acc;
  }, []);

  let body = [];
  if (contentEnabled) {
    if (contentInline) {
      if (getType(first) === "content") {
        body.push(first);
      }
    } else {
      body = byType("content");
    }
  }

  // If content is enabled default is the first content section becomes body
  // when the content is not inline all content sections are grouped together in the body
  return {
    body:           body,
    variables:      byType("variable"),
    mixins:         byType("mixin"),
    functions:      byType("function"),
    placeholders:   byType("placeholder"),
    CSS:            byType("css")
  };
}

function clientSideData(group, options) {
  return group.map((item) => { 
    const data = { ...item };
    // Create map of previews by orginal example index (used by preview component)
    // if (options.previewEnabled) {
      data.previewsByIndex = item.data.example?.reduce((acc, example, index) => {
        if (example.modifier === "preview") {
          acc[index] = example.code;
        }
        return acc;
      }, {});
    // }
    // Remove unneeded data (orginal sassdoc data)
    delete data.data;
    return data;
  });
}

function missingAnnTemplate(n) {
  if (missingAnnTemplates.includes(n)) return;
  missingAnnTemplates.push(n);
  console.error(PLUGIN_NAME, "Missing annotation template for", n);
}

module.exports = createPages;

