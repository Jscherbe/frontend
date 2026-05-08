import { getDemoSnippets } from "../../../../utils/get-demo-snippets.js";
import { when } from "@ulu/utils/templating.js";

let cachedSnippets = null;
let modalCount = 0;

// Note using markdown for headlines (TOC)
const renderDemo = (demo, groupName) => {
  const isFullscreen = demo.previewMode === "fullscreen" || demo.fullscreen;
  const modalId = `demo-modal-${ ++modalCount }`;
  const modalTitle = `${ demo.title || groupName } Demo`;
  const componentHtml = when(demo.wrapperClass, c => `<div class="${ c }">\n${ demo.html }\n</div>`, demo.html);

  return `

### ${ demo.title || "Example" }{.h3}

${ when(demo.description, d => `<p>${ d }</p>`) }

{% CodePreview %}

${ when(isFullscreen, () => `
<div>
  <button class="button" data-ulu-dialog-trigger="${ modalId }">
    <span class="button__icon fas fa-expand" aria-hidden="true"></span>
    <span>View Fullscreen Demo</span>
  </button>
</div>
`, componentHtml) }

{% endCodePreview %}

${ when(isFullscreen, () => `
<div id="${ modalId }" data-ulu-modal-builder='{ "title": "${ modalTitle }", "size": "fullscreen" }' hidden>
${ componentHtml }
</div>
`) }`;

};

export default ({ title, info, groupName }, markup) => {
  if (!cachedSnippets) {
    cachedSnippets = getDemoSnippets();
  }
  
  const groupDescription = info?.groupDescriptions?.[groupName] || "";
  const demos = cachedSnippets[groupName] || [];
  
  const demosMarkup = when(demos.length, () => `

## Demos{.h2}

${ demos.map(d => renderDemo(d, groupName)).join("\n\n") }

`);

  return `

<div class="type-large">

${ groupDescription }

</div>

${ demosMarkup }

<div class="wysiwyg">

${ markup }

</div>
  `;
}
