import { getDemoSnippets } from "../../../../utils/get-demo-snippets.js";
import { when } from "@ulu/utils/templating.js";

let cachedSnippets = null;

// Note using markdown for headlines (TOC)
const renderDemo = (demo) => {
  return `

### ${ demo.title || "Example" }{.h3}

${ when(demo.description, d => `<p>${ d }</p>`) }

{% CodePreview %}

${ when(demo.wrapperClass, c => `<div class="${ c }">\n${ demo.html }\n</div>`, demo.html) }

{% endCodePreview %}`;

};

export default ({ title, info, groupName }, markup) => {
  if (!cachedSnippets) {
    cachedSnippets = getDemoSnippets();
  }
  
  const groupDescription = info?.groupDescriptions?.[groupName] || "";
  const demos = cachedSnippets[groupName] || [];
  
  const demosMarkup = demos.length ? `

## Demos{.h2}

${ demos.map(renderDemo).join("\n\n") }

` : "";

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
