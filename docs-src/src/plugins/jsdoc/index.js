// https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/How-to-create-one-output-file-per-class

import jsdoc2md from "jsdoc-to-markdown";
import { urlize } from "@ulu/utils/string.js";
import fs from "fs-extra";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isSubdir = (parent, dir) => {
  const relative = path.relative(parent, dir);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
};

const src = path.resolve(".", "js/");
const dist = path.resolve(__dirname, "../../../content/javascript/");

function cleanOutputDir() {
  fs.readdirSync(dist)
    .filter(file => file !== "index.md" && file.endsWith("md"))
    .forEach(file => {
      fs.removeSync(path.join(dist, file));
    });
}

function output() {
  cleanOutputDir();
  // get template data
  const templateData = jsdoc2md.getTemplateDataSync({ 
    files: "js/**/*.js",
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


  // create a documentation file for each class
  for (const moduleName of moduleNames) {
    const template = `{{#module name="${ moduleName }"}}{{>docs}}{{/module}}`;
    // console.log(`rendering ${ moduleName}, template: ${ template }`);
    const markdown = jsdoc2md.renderSync({ 
      data: templateData, 
      template: template,
      "heading-depth" : 1
    });
    const filename = `${ urlize(moduleName) }.md`;
    const filepath = path.resolve(path.join(dist, filename));
    const content = outputTemplate(moduleName, markdown);
    fs.writeFileSync(filepath, content);
  }
}


function outputTemplate(title, content) {
  return `\
---
title: ${ title }
---

${ content }
  `;
}


export default async function plugin(eleventyConfig) {
  output();
  eleventyConfig.addWatchTarget(src);
  eleventyConfig.on("eleventy.beforeWatch", async (changedFiles) => {
    const isWithin = changedFiles.some(filepath => isSubdir(src, filepath));
    if (isWithin) {
      await output();
    }
  });
  return {};
}
