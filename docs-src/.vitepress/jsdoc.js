// https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/How-to-create-one-output-file-per-class

import jsdoc2md from "jsdoc-to-markdown";
import { urlize } from "@ulu/utils/string.js";
import fs from "fs-extra";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dest = path.resolve(__dirname, "../javascript/");

// Empty destination
fs.readdirSync(dest)
    .filter(file => file !== "index.md")
    .forEach(file => {
      fs.removeSync(path.join(dest, file))
    });

// console.log(path.resolve(__dirname, "../../js/*.js"));
/* get template data */
const templateData = jsdoc2md.getTemplateDataSync({ 
  files: "js/**/*.js",
  configure: "jsdoc.json"
});

/* reduce templateData to an array of class names */
const moduleNames = templateData.reduce((moduleNames, identifier) => {
  // console.log(identifier.name);
  if (identifier.kind === 'module') {
    moduleNames.push(identifier.name);
  }
  return moduleNames;
}, []);


/* create a documentation file for each class */
for (const moduleName of moduleNames) {
  const template = `{{#module name="${ moduleName }"}}{{>docs}}{{/module}}`;
  // console.log(`rendering ${ moduleName}, template: ${ template }`);
  const markdown = jsdoc2md.renderSync({ data: templateData, template: template });
  const filename = `${ urlize(moduleName) }.md`;
  const filepath = path.resolve(path.join(dest, filename));
  const content = outputTemplate(moduleName, markdown);
  fs.writeFileSync(filepath, content);
}

function outputTemplate(title, content) {
  return `\
---
title: ${ title }
---

${ content }
  `;
}