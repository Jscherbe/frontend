// https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/How-to-create-one-output-file-per-class

import jsdoc2md from "jsdoc-to-markdown";
import { urlize } from "@ulu/utils/string.js";
import fs from "fs-extra";
import path from "path";
import { getDemoSnippets } from "../../utils/get-demo-snippets.js";

const isSubdir = (parent, dir) => {
  const relative = path.relative(parent, dir);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
};

const src = path.resolve("./lib/js/"); // cwd
const dist = path.resolve("./site/pages/javascript/");

const formatTitle = (str) => {
  const abbreviations = {
    "ui": "UI",
    "css": "CSS",
    "js": "JS",
    "api": "API",
    "scss": "SCSS",
    "iframe": "Iframe"
  };
  return str.split("-").map(word => {
    const lower = word.toLowerCase();
    if (abbreviations[lower]) {
      return abbreviations[lower];
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
};

let modalCount = 0;
const renderDemo = (demo, title) => {
  const isFullscreen = demo.previewMode === "fullscreen" || demo.fullscreen;
  const isNoContainer = demo.noContainer || demo.nocontainer;
  const modalId = `demo-modal-${ ++modalCount }`;
  const modalTitle = `${ demo.title || title } Demo`;
  const componentHtml = demo.wrapperClass ? `<div class="${ demo.wrapperClass }">\n${ demo.html }\n</div>` : demo.html;

  const titleAndDesc = `
<h3 class="h3" id="${ urlize(demo.title || "Example") }">${ demo.title || "Example" }</h3>
${ demo.description ? `<p>${ demo.description }</p>` : "" }
  `;

  if (isNoContainer) {
    return `
<div class="container">
  ${ titleAndDesc }
</div>

<!-- Live Preview (Unconstrained) -->
<div>
  ${ isFullscreen ? `
    <div class="container">
      <button class="button" data-ulu-dialog-trigger="${ modalId }">
        <span class="button__icon fas fa-expand" aria-hidden="true"></span>
        <span>View Fullscreen Demo</span>
      </button>
    </div>
  ` : componentHtml }
</div>

<!-- Code Block (Constrained) -->
<div class="container">
  <div class="demo-preview" markdown="0">
    <div class="demo-preview__toolbar layout-flex-center">
      <strong class="demo-preview__toolbar-title">
        <span class="fas fa-code" aria-hidden="true"></span> HTML
      </strong>
    </div>
    <div class="demo-preview__code">
      {% highlight "html" %}
      ${ componentHtml }
      {% endhighlight %}
    </div>
  </div>
</div>

${ isFullscreen ? `
<div id="${ modalId }" data-ulu-modal-builder='{ "title": "${ modalTitle }", "size": "fullscreen" }' hidden>
${ componentHtml }
</div>
` : "" }
    `;
  }

  return `
<div class="container">
  ${ titleAndDesc }

  {% CodePreview %}

  ${ isFullscreen ? `
  <div>
    <button class="button" data-ulu-dialog-trigger="${ modalId }">
      <span class="button__icon fas fa-expand" aria-hidden="true"></span>
      <span>View Fullscreen Demo</span>
    </button>
  </div>
  ` : componentHtml }

  {% endCodePreview %}

  ${ isFullscreen ? `
  <div id="${ modalId }" data-ulu-modal-builder='{ "title": "${ modalTitle }", "size": "fullscreen" }' hidden>
  ${ componentHtml }
  </div>
  ` : "" }
</div>
  `;
};

function cleanOutputDir() {
  if (!fs.existsSync(dist)) return;
  fs.readdirSync(dist)
    .forEach(item => {
      // Files we setup manually
      if (item === "index.md") return;
      fs.removeSync(path.join(dist, item));
    });
}

async function output() {
  cleanOutputDir();
  const cachedSnippets = getDemoSnippets();

  // get template data
  const templateData = await jsdoc2md.getTemplateData({ 
    files: "lib/js/**/*.js",
    configure: "jsdoc.json"
  });

  // reduce templateData to an array of class names
  const moduleNames = templateData.reduce((moduleNames, identifier) => {
    // console.log(identifier.name);
    if (identifier.kind === "module") {
      moduleNames.push(identifier.name);
    }
    return moduleNames;
  }, []);

  if (process.env.BUILD_MCP) {
    const outputPath = path.resolve("./site/mcp/data/jsdoc.json");
    fs.outputFileSync(outputPath, JSON.stringify(templateData, null, 2));
    console.log(`MCP JSDoc Data written to ${outputPath}`);
  }

  // create a documentation file for each class
  for (const moduleName of moduleNames) {
    const template = `{{#module name="${ moduleName }"}}{{>docs}}{{/module}}`;
    // console.log(`rendering ${ moduleName}, template: ${ template }`);
    const markdown = await jsdoc2md.render({ 
      data: templateData, 
      template: template,
      "heading-depth" : 1
    });
    
    let dirPart = "";
    const moduleDoc = templateData.find(id => id.kind === "module" && id.name === moduleName);
    if (moduleDoc && moduleDoc.meta) {
      dirPart = path.relative(src, moduleDoc.meta.path);
    }

    const targetDir = path.join(dist, dirPart);
    fs.ensureDirSync(targetDir);

    const demoKey = moduleName;
    const demos = cachedSnippets[demoKey] || [];
    
    const filename = `${ urlize(moduleName) }.md`;
    const filepath = path.resolve(path.join(targetDir, filename));
    
    const formattedPageTitle = formatTitle(urlize(moduleName));
    const content = outputTemplate(moduleName, formattedPageTitle, markdown, demos);
    fs.writeFileSync(filepath, content);
  }
}


function outputTemplate(moduleName, pageTitle, content, demos = []) {
  const key = urlize(moduleName);
  const layout = "sassdoc";
  const toc = false;
  const tocInline = true;

  if (demos.length > 0) {
    const tabDemosId = `tab-${ key }-demos`;
    const tabApiId = `tab-${ key }-api`;
    const panelDemosId = `panel-${ key }-demos`;
    const panelApiId = `panel-${ key }-api`;

    const demosMarkup = demos.map(d => renderDemo(d, pageTitle)).join("\n\n");

    return `\
---
title: ${ pageTitle }
layout: ${ layout }
toc: ${ toc }
tocInline: ${ tocInline }
---

<div class="tabs tabs--full-width">
  <div class="container">
    <div role="tablist" data-ulu-tablist='{ "equalHeights": true }'>
      <button role="tab" id="${ tabDemosId }" aria-selected="true" aria-controls="${ panelDemosId }">Demos</button>
      <button role="tab" id="${ tabApiId }" aria-selected="false" aria-controls="${ panelApiId }">JS API</button>
    </div>
  </div>
  
  <div role="tabpanel" id="${ panelDemosId }" aria-labelledby="${ tabDemosId }">
{% capture demosHtml %}
{% renderTemplate "njk" %}
${ demosMarkup }
{% endrenderTemplate %}
{% endcapture %}
    
    <div class="container">
      <div class="page-toc page-toc--inline margin-bottom-large">
        {{ demosHtml | toc }}
      </div>
    </div>
    
    <div>
      {{ demosHtml }}
    </div>
  </div>
  
  <div role="tabpanel" id="${ panelApiId }" aria-labelledby="${ tabApiId }" hidden>
{% capture apiHtml %}
{% renderTemplate "md" %}
${ content }
{% endrenderTemplate %}
{% endcapture %}
    
    <div class="container">
      <div class="page-toc page-toc--inline margin-bottom-large">
        {{ apiHtml | toc }}
      </div>
      
      <div class="wysiwyg api-docs">
        {{ apiHtml }}
      </div>
    </div>
  </div>
</div>
`;
  }

  return `\
---
title: ${ pageTitle }
layout: ${ layout }
toc: ${ toc }
tocInline: ${ tocInline }
---

<div class="container">
{% capture apiHtml %}
{% renderTemplate "md" %}
${ content }
{% endrenderTemplate %}
{% endcapture %}
  
  <div class="page-toc page-toc--inline">
    {{ apiHtml | toc }}
  </div>
  
  <div class="wysiwyg api-docs">
    {{ apiHtml }}
  </div>
</div>
`;
}


export default async function plugin(eleventyConfig) {
  await output();
  eleventyConfig.addWatchTarget(src);
  eleventyConfig.on("eleventy.beforeWatch", async (changedFiles) => {
    const isWithin = changedFiles.some(filepath => isSubdir(src, filepath));
    if (isWithin) {
      await output();
    }
  });
  return {};
}
