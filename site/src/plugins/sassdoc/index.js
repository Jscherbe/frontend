import fs from "fs-extra";
import path from "path";
import { outputPages } from "@ulu/sassdoc-to-markdown";
import templates from "./templates/index.js";
import customAnnotations from "./annotations/index.js";

const isSubdir = (parent, dir) => {
  const relative = path.relative(parent, dir);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
};

let running = false;
let mcpDataAccumulator = {};

const cwd = path.resolve(".");
const src = path.resolve("./lib/scss/");
const dist = path.resolve("./site/pages/");

function getCleanMcpData(groups) {
  const clean = {};
  for (const [groupName, items] of Object.entries(groups)) {
    clean[groupName] = items.map(item => {
      const { $item, ...cleanData } = item.data;
      return {
        id: item.id,
        title: item.title,
        groupName: item.groupName,
        path: item.path,
        ...cleanData
      };
    });
  }
  return clean;
}

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
    "variables", // So configs are near top
    "mixins",
    "functions",
    "CSS",
    "placeholders",
  ],
  hidePrivate: true,
  hidePrivateKeepGroup: true,
  compilerOptions: {
    // Add import for library pervasive
    additionalData: '@use "lib/scss/index" as ulu; @use "sass:map"; @use "sass:math"; @use "sass:meta";',
    // Add cwd and scss folder for resolving paths
    // - Need cwd for the @use above to work and not match any nested scss/**/_index files
    sassOptions: {
      loadPaths: [
        cwd,
        src
      ]
    }
  },
  buildEnd: (data) => {
    if (process.env.BUILD_MCP) {
      Object.assign(mcpDataAccumulator, getCleanMcpData(data.groups));
    } else {
      // Add eleventy layout 
      data?.pages?.forEach(page => {
        page.frontmatter.layout = "sassdoc";
        page.frontmatter.toc = false;
        page.frontmatter.tocInline = true;
        
        const groupName = page.frontmatter.sassdocGroupName || page.groupName;
        const groupItems = data.groups?.[groupName];
        const firstItem = groupItems?.[0];
        const firstItemFile = firstItem?.data?.file;
        
        if (firstItemFile) {
          if (page.path.startsWith("/sass/components/")) {
            const filePath = firstItemFile.path; // e.g. "collapsible/_accordion.scss"
            const parts = filePath.split("/");
            if (parts.length > 1) {
              const subCategory = parts[0];
              const originalPath = page.path; // e.g. "/sass/components/accordion/"
              const basename = path.basename(originalPath);
              const isIndex = basename === "index" || basename === subCategory;
              const newGroupPath = isIndex
                ? `/sass/components/${ subCategory }/`
                : `/sass/components/${ subCategory }/${ basename }/`;
              
              page.path = newGroupPath;
              page.frontmatter.sassdocCategory = subCategory;
              
              // Update item groupPath and path to preserve cross-reference links
              groupItems.forEach(item => {
                item.groupPath = newGroupPath;
                item.path = `${ newGroupPath }#${ item.id }`;
              });
            }
          }
        }
      });
    }
  }
};

const createConfig = (subdir, options) => ({
  ...commonConfig,
  dir: subdir ? path.resolve(src, subdir) : src,
  pathBase: subdir ? `/sass/${ subdir }` : "/sass/core/",
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
    mcpDataAccumulator = {};
    configs.forEach(c => cleanOutputDir(c));
    await Promise.all(configs.map(c => outputPages(c)));
    
    writeCategoryIndexPages();
    
    if (process.env.BUILD_MCP) {
      const outputPath = path.resolve("./site/mcp/data/sassdoc.json");
      fs.outputFileSync(outputPath, JSON.stringify(mcpDataAccumulator, null, 2));
      console.log(`MCP SassDoc Data written to ${outputPath}`);
    }

    running = false;
  } catch (error) {
    console.log(error);
  }
}

const fallbackIntros = {
  collapsible: "Interactive components for collapse, toggle, dropdown, modal, and tab behaviors.",
  elements: "Primitive styled blocks and inline components (buttons, badges, icons, cards, lists, tags).",
  forms: "Theme systems and wrapper layouts for inputs and form structures.",
  layout: "Structural layout systems, alignments, grids, and rail alignments.",
  navigation: "Structured navigation components (breadcrumbs, menu stacks, pager).",
  systems: "Rich visual systems (WYSIWYG layout formatting, skeleton loading blocks).",
  visualizations: "Visual status display and progression widgets (progress bar/circle)."
};

function getCategoryIntro(cat) {
  const filepath = path.join(src, "components", cat, "_index.scss");
  if (fs.existsSync(filepath)) {
    const content = fs.readFileSync(filepath, "utf8");
    const match = content.match(/\/\/\/\/\r?\n([\s\S]+?)\r?\n\/\/\/\//);
    if (match) {
      const commentLines = match[1].split(/\r?\n/);
      const descriptionLines = [];
      for (const line of commentLines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("///")) {
          const cleaned = trimmed.replace(/^\/\/\/\s*/, "");
          if (!cleaned.startsWith("@")) {
            descriptionLines.push(cleaned);
          }
        }
      }
      const parsed = descriptionLines.join("\n").trim();
      if (parsed) return parsed;
    }
  }
  return fallbackIntros[cat] || "";
}

function writeCategoryIndexPages() {
  const categories = Object.keys(fallbackIntros);
  categories.forEach(cat => {
    const dir = path.join(dist, "sass/components", cat);
    fs.ensureDirSync(dir);
    const title = cat.charAt(0).toUpperCase() + cat.slice(1);
    const intro = getCategoryIntro(cat);
    const content = `---
title: ${title}
layout: sassdoc
toc: false
tocInline: true
---

<div class="api-docs">
  <div class="api-docs__no-tabs container-fit">
    <div class="type-large api-docs__intro">
      ${intro}
    </div>
  </div>
</div>
`;
    fs.writeFileSync(path.join(dir, "index.md"), content);
  });
}

function cleanOutputDir(config) {
  const outputPath = path.join(config.dist, config.pathBase);
  if (fs.existsSync(outputPath)) {
    fs.readdirSync(outputPath).forEach(item => {
      const fullPath = path.join(outputPath, item);
      // Delete if directory (was created by sassdoc plugin)
      if (fs.lstatSync(fullPath).isDirectory()) {
        fs.removeSync(fullPath);
      }
    });
  }
}


