const path = require("path");
const { defaultTemplates, defaultAnnotationTemplates } = require("./templates/index.js");
const { dataToFile, joinMarkup } = require("./utils.js");

module.exports = function({ group, title, groupName, options }) {
  const templates = Object.assign({}, defaultTemplates, options.markdownTemplates);
  const annotationTemplates = Object.assign({}, defaultAnnotationTemplates, options.annotationTemplates);
  const { annotations, previewTypes } = options;
  const sections = options.pageSections(group);
  
  // Note: "$" denotes an array of markup
  const $content = Object.entries(sections)
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
   * "preview/html"
   */
  // Create a new object to be injected into the page as it's script '$options.sassDoc' prop
  const sciptData = group.map((item) => ({ 
    _uid: item._uid,
    _hash: item._hash,
    _path: item._path,
    _previews: item.example?.map(e => previewTypes.includes(e.type) ? e : null) || []
  }));

  const $page = templates.page({ title }, joinMarkup($content, templates.script({ options, group }, sciptData)));

  if (options.debugToDir) {
    dataToFile(path.join(options.debugToDir, `group-page-${ groupName }.txt`), $page);
    dataToFile(path.join(options.debugToDir, `page-sections.json`), sections);
  }
  
  return $page;
}

