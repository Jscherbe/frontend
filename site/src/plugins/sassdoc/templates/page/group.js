import { getDemoSnippets } from "../../../../utils/get-demo-snippets.js";
import { urlize } from "@ulu/utils/string.js";
import { when } from "@ulu/utils/templating.js";

let cachedSnippets = null;
let modalCount = 0;

// Note using standard HTML for headlines to prevent Markdown parsing
const renderDemo = (demo, groupName) => {
  const isFullscreen = demo.previewMode === "fullscreen" || demo.fullscreen;
  const isNoContainer = demo.noContainer || demo.nocontainer;
  const modalId = `demo-modal-${ ++modalCount }`;
  const modalTitle = `${ demo.title || groupName } Demo`;
  const componentHtml = when(demo.wrapperClass, c => `<div class="${ c }">\n${ demo.html }\n</div>`, demo.html);

  const titleAndDesc = `
<h3 class="h3" id="${ urlize(demo.title || "Example") }">${ demo.title || "Example" }</h3>
${ when(demo.description, d => `<p>${ d }</p>`) }
  `;

  if (isNoContainer) {
    return `
<div class="container">
  ${ titleAndDesc }
</div>

<!-- Live Preview (Unconstrained) -->
<div>
  ${ when(isFullscreen, () => `
    <div class="container">
      <button class="button" data-ulu-dialog-trigger="${ modalId }">
        <span class="button__icon fas fa-expand" aria-hidden="true"></span>
        <span>View Fullscreen Demo</span>
      </button>
    </div>
  `, componentHtml) }
</div>

<!-- Code Block (Constrained) -->
<div class="container">
  {% CodePreview "html", { preview: false } %}
  ${ componentHtml }
  {% endCodePreview %}
</div>

${ when(isFullscreen, () => `
<div id="${ modalId }" data-ulu-modal-builder='{ "title": "${ modalTitle }", "size": "fullscreen" }' hidden>
${ componentHtml }
</div>
`) }
    `;
  }

  return `
<div class="container">
  ${ titleAndDesc }

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
  `) }
</div>
  `;
};

export default ({ title, info, groupName }, markup) => {
  if (!cachedSnippets) {
    cachedSnippets = getDemoSnippets();
  }
  
  const groupDescription = info?.groupDescriptions?.[groupName] || "";
  const demos = cachedSnippets[groupName] || [];
  
  if (demos.length > 0) {
    const tabDemosId = `tab-${ groupName }-demos`;
    const tabApiId = `tab-${ groupName }-api`;
    const panelDemosId = `panel-${ groupName }-demos`;
    const panelApiId = `panel-${ groupName }-api`;

    const demosMarkup = demos.map(d => renderDemo(d, groupName)).join("\n\n");

    return `
<div class="api-docs">
  <div class="api-docs__intro container-fit">
    <div class="type-large">
      ${ groupDescription }
    </div>
  </div>

  <div class="api-docs__tabs tabs tabs--full-width">
    <div class="container-fit">
      <div role="tablist" data-ulu-tablist='{ "equalHeights": true }'>
        <button role="tab" id="${ tabDemosId }" aria-selected="true" aria-controls="${ panelDemosId }">Demos</button>
        <button role="tab" id="${ tabApiId }" aria-selected="false" aria-controls="${ panelApiId }">SCSS API</button>
      </div>
    </div>
    
    <div role="tabpanel" id="${ panelDemosId }" class="api-docs__tabpanel api-docs__tabpanel--demos" aria-labelledby="${ tabDemosId }">
{% capture demosHtml %}
{% renderTemplate "njk" %}
${ demosMarkup }
{% endrenderTemplate %}
{% endcapture %}
      
      <div class="api-docs__toc container-fit">
        <div class="page-toc page-toc--inline margin-bottom-large">
          {{ demosHtml | toc }}
        </div>
      </div>
      
      <div class="api-docs__demos">
        {{ demosHtml }}
      </div>
    </div>
    
    <div role="tabpanel" id="${ panelApiId }" class="api-docs__tabpanel api-docs__tabpanel--api" aria-labelledby="${ tabApiId }" hidden>
{% capture apiHtml %}
{% renderTemplate "md" %}
${ markup }
{% endrenderTemplate %}
{% endcapture %}
      
      <div class="api-docs__toc container-fit">
        <div class="page-toc page-toc--inline margin-bottom-large">
          {{ apiHtml | toc }}
        </div>
      </div>
      
      <div class="api-docs__content wysiwyg container-fit">
        {{ apiHtml }}
      </div>
    </div>
  </div>
</div>
    `;
  }

  return `
<div class="api-docs">
  <div class="api-docs__no-tabs container-fit">
    <div class="type-large api-docs__intro">
      ${ groupDescription }
    </div>
    
{% capture apiHtml %}
{% renderTemplate "md" %}
${ markup }
{% endrenderTemplate %}
{% endcapture %}
    
    <div class="api-docs__toc">
      <div class="page-toc page-toc--inline">
        {{ apiHtml | toc }}
      </div>
    </div>
    
    <div class="api-docs__content wysiwyg">
      {{ apiHtml }}
    </div>
  </div>
</div>
  `;
}
