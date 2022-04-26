const path = require("path");
const { defaultTemplates, defaultAnnotationTemplates } = require("./templates/index.js");
const { dataToFile, joinMarkup } = require("./utils.js");

const missingAnnTemplates = [];
function missingAnnTemplate(n) {
  if (missingAnnTemplates.includes(n)) return;
  missingAnnTemplates.push(n);
  console.error("Missing annotation template for", n);
};

function createContent({ group, title, groupName, options }) {
  const { annotations, previewTypes, markdownTemplates  } = options;
  const templates = Object.assign({}, defaultTemplates, markdownTemplates);
  const annTemplates = Object.assign({}, defaultAnnotationTemplates, options.annotationTemplates);
  const sections = options.pageSections(group);
  
  // Note: "$" denotes an array of markup
  const $content = Object.entries(sections)
    .filter(([,items]) => items.length)
    .map(([sectionName, items]) => {
      const $items = items.map(item => {
        const data = { item, options };
        const $annotations = annotations.map(a => 
          annTemplates[a] ? annTemplates[a](data) : missingAnnTemplate(a)
        );
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
  const sciptData = group.map((item) => { 
    const scriptItem = { 
      ...item,
      previews: item.data.example?.map(e => previewTypes.includes(e.type) ? e : null) || []
    };
    delete scriptItem.data;
    delete scriptItem.references; 
    return scriptItem;
  });
  const $markup = joinMarkup($content, templates.script({ options, group }, sciptData));
  const $page = templates.page({ title }, $markup);

  if (options.debugToDir) {
    dataToFile(path.join(options.debugToDir, `group-page-${ groupName }.txt`), $page);
    dataToFile(path.join(options.debugToDir, `page-sections.json`), sections);
  }
  
  return $page;
}


module.exports = createContent;

