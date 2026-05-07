import { getDemoSnippets } from "../../../../utils/get-demo-snippets.js";

let cachedSnippets = null;

export default ({ title, info, groupName }, markup) => {
  if (!cachedSnippets) {
    cachedSnippets = getDemoSnippets();
  }
  
  const groupDescription = info?.groupDescriptions?.[groupName];
  const demos = cachedSnippets[groupName] || [];
  
  let demosMarkup = "";
  if (demos.length > 0) {
    demosMarkup = "\n## Demos\n\n";
    demos.forEach(demo => {
      demosMarkup += `### ${demo.title || "Example"}\n\n`;
      if (demo.description) {
        demosMarkup += `${demo.description}\n\n`;
      }
      
      demosMarkup += `{% CodePreview %}\n\n`;
      if (demo.wrapperClass) {
        demosMarkup += `<div class="${demo.wrapperClass}">\n${demo.html}\n</div>\n\n`;
      } else {
        demosMarkup += `${demo.html}\n\n`;
      }
      demosMarkup += `{% endCodePreview %}\n\n`;
    });
  }

  return `
# ${ title }

<div class="type-large">

${ groupDescription ? groupDescription : "" }

</div>
${ demosMarkup }
${ markup }
  `;
}
