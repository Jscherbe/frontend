const path = require("path");
const defaultTemplates = require("./templates/index.js");
const defaultAnnotationTemplates = require("./annotation-templates/index.js");
const { getGroupTypes, dataToFile, joinMarkup, isType } = require("./utils.js");
const { entries } = Object;


module.exports = function({ group, title, groupName, options }) {
  const templates = Object.assign({}, defaultTemplates, options.markdownTemplates);
  const annotationTemplates = Object.assign({}, defaultAnnotationTemplates, options.annotationTemplates);
  const annotations = options.annotations;
  const sections = options.pageSections(group);
  
  // Note: "$" denotes an array of markup
  const $content = entries(sections)
    .filter(([,items]) => items.length)
    .map(([sectionName, items]) => {
      const $items = items.map(item => {
        const data = { item, options };
        const $annotations = annotations.map(a => {
          const template = annotationTemplates[a];
          if (!template) {
            console.error("Missing annotation template for", a);
          } else {
            return template(data)
          }
        });
        const $component = [ templates.component(item) ];
        return templates.item(data, joinMarkup($annotations, $component));
      });
      return templates.section({ sectionName }, joinMarkup($items));
    });

  /**
   * What is needed by components goes here
   */
  function scriptDataItem(item) {
    const { _uid } = item;
    // Empty out but keep empty values for examples to use for previews
    const example = item?.example?.map(e => e.type === "html" ? e : null);
    return { example, _uid }
  }
  // Create a new object to be injected into the page as it's script '$options.sassDoc' prop
  const sciptData = group.map(scriptDataItem);

  const $page = templates.page({ title }, joinMarkup($content, templates.script(sciptData, group)));

  if (options.debugToDir) {
    dataToFile(path.join(options.debugToDir, `group-page-${ groupName }.txt`), $page);
    dataToFile(path.join(options.debugToDir, `page-sections.json`), sections);
  }
  
  return $page;
}

