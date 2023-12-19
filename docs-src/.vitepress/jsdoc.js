// https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/How-to-create-one-output-file-per-class

import jsdoc2md from "jsdoc-to-markdown";
import fs from "fs";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const dest = path.resolve(__dirname, "../javascript");

/* get template data */
const templateData = jsdoc2md.getTemplateDataSync({ 
  files: "../../js/**/*.js",
  configure: "../../jsdoc.json"
});

/* reduce templateData to an array of class names */
const moduleNames = templateData.reduce((moduleNames, identifier) => {
  if (identifier.kind === 'module') {
    moduleNames.push(identifier.name);
  }
  return moduleNames;
}, []);

/* create a documentation file for each class */
for (const moduleName of moduleNames) {
  const template = `{{#module name="${ moduleName }"}}{{>docs}}{{/module}}`
  console.log(`rendering ${ moduleName}, template: ${ template }`)
  const output = jsdoc2md.renderSync({ data: templateData, template: template })
  fs.writeFileSync(path.resolve(dest, `${ moduleName }.md`), output)
}
