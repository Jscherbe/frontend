import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { outputPages } from "@ulu/sassdoc-to-markdown";
import templates from "./templates/index.js";
import customAnnotations from "./annotations/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isSubdir = (parent, dir) => {
  const relative = path.relative(parent, dir);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
};

let running = false;

const src = path.resolve(".", "scss/");
const dist = path.resolve(__dirname, "../../../content/");
const commonConfig = {
  previewHead: `
    <title>ULU Example</title> 
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
    <link rel="stylesheet" href="/frontend/ulu-frontend.min.css">
  `,
  previewScripts: `
    <script src="/frontend/ulu-frontend.min.js"></script>
  `,
  annotationTemplates: templates.annotations,
  pageTemplates: templates.page,
  customAnnotations,
  annotations: [
    "name",
    "description",
    "deprecated",
    "_code",
    "_meta",
    "demo",
    "property",
    "example",
    "parameter",
    "return",
    "output",
    "throw",
    "link",
    "since",
    "todo",
    "see",
    "require"
  ],
  byTypeOrder: [
    "body",
    "mixins",
    "functions",
    "variables",
    "placeholders",
    "CSS"
  ],
  hidePrivate: true,
  hidePrivateKeepGroup: true
};

const createConfig = (base, options) => ({
  ...commonConfig,
  dir: base ? path.resolve(src, base) : src,
  pathBase: base ? `/sass/${ base }` : "/sass/core/",
  dist,
  ...options
});

const configs = [
  createConfig(false, {
    sassdocOptions: {
      exclude: [
        "base/*",
        "components/*",
        "helpers/*",
        "packages/*",
        "stylesheets/*",
      ]
    }
  }),
  createConfig("base/"),
  createConfig("components/"),
  createConfig("helpers/"),
];

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

async function output() {
  if (running) return;
  try {
    running = true;
    configs.forEach(c => cleanOutputDir(c));
    await Promise.all(configs.map(c => outputPages(c)));
    running = false;
  } catch (error) {
    console.log(error);
  }
}

function cleanOutputDir(config) {
  const outputPath = path.join(config.dist, config.pathBase);
  if (fs.existsSync(outputPath)) {
    fs.readdirSync(outputPath).forEach(item => {
      const fullpath = path.join(outputPath, item);
      // Delete if directory (was created by sassdoc plugin)
      if (fs.lstatSync(fullpath).isDirectory()) {
        fs.removeSync(fullpath);
      }
    });
  }
}

