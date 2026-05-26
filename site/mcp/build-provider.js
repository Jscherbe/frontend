import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sassdocPath = path.resolve(__dirname, "../mcp/data/sassdoc.json");
const jsdocPath = path.resolve(__dirname, "../mcp/data/jsdoc.json");
const snippetsPath = path.resolve(__dirname, "../mcp/data/snippets.json");

const distDir = path.resolve(__dirname, "../../dist/");

// Ensure dist directory exists
fs.ensureDirSync(distDir);

let sassData = {};
let jsData = [];
let snippetsData = {};

try {
  if (fs.existsSync(sassdocPath)) {
    sassData = JSON.parse(fs.readFileSync(sassdocPath, "utf-8"));
  }
} catch (e) {
  console.error("Warning: Failed to load sassdoc data", e);
}

try {
  if (fs.existsSync(jsdocPath)) {
    jsData = JSON.parse(fs.readFileSync(jsdocPath, "utf-8"));
  }
} catch (e) {
  console.error("Warning: Failed to load jsdoc data", e);
}

try {
  if (fs.existsSync(snippetsPath)) {
    snippetsData = JSON.parse(fs.readFileSync(snippetsPath, "utf-8"));
  }
} catch (e) {
  console.error("Warning: Failed to load snippets data", e);
}

const configurationData = {};
const referenceData = {};
const guidesData = {};

// Map Guides into conceptual tier
const guideDir = path.resolve(__dirname, "../pages/guide");
if (fs.existsSync(guideDir)) {
  const extractGuides = (dir, prefix = '') => {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const isDir = fs.lstatSync(fullPath).isDirectory();
      if (isDir) {
        extractGuides(fullPath, `${prefix}${entry}/`);
      } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
        let content = fs.readFileSync(fullPath, "utf-8");
        const id = `${prefix}${entry.replace(/\.mdx?$/, '')}`.replace(/\/index$/, '');
        if (id === 'index') continue; // Optional: skip root index or handle differently

        let title = id;
        let description = `Guide for ${id}`;
        
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (frontmatterMatch) {
          const fm = frontmatterMatch[1];
          const titleMatch = fm.match(/title:\s*(.*)/);
          const descMatch = fm.match(/description:\s*(.*)/);
          if (titleMatch) title = titleMatch[1].trim().replace(/^['"]|['"]$/g, '');
          if (descMatch) description = descMatch[1].trim().replace(/^['"]|['"]$/g, '');
          
          // Remove frontmatter from content for cleaner reading
          content = content.replace(frontmatterMatch[0], '').trim();
        }

        guidesData[id] = {
          title,
          description,
          content
        };
      }
    }
  };
  extractGuides(guideDir);
}

// Map SassDoc into agnostic tiers
for (const [groupName, items] of Object.entries(sassData)) {
  // Strip out circular references for the deep reference tier
  referenceData[groupName] = items.map(item => {
    const { $item, ...rest } = item;
    return rest;
  });
  
  // Extract $config variable for the Configuration tier
  const configItems = items.filter(item => item.context && item.context.type === "variable" && item.context.name === "config");
  if (configItems.length > 0) {
    configurationData[groupName] = {
      description: `SCSS Configuration for ${groupName}. To override these defaults, use the set mixin: \`@include ulu.component-${groupName}-set(( "property": "value" ));\``,
      properties: configItems.flatMap(item => item.property || []).map(p => ({
        name: p.name,
        type: p.type,
        description: p.description,
        default: p.default
      }))
    };
  }
}

// Map JSDoc into reference tier
for (const item of jsData) {
  const group = item.memberof || item.name;
  if (group) {
    if (!referenceData[group]) referenceData[group] = [];
    referenceData[group].push(item);
  }
}

const providerData = {
  name: "@ulu/frontend",
  prefix: "ulu",
  snippets: snippetsData,       // Builder Tier
  configuration: configurationData, // Styling Tier
  reference: referenceData,     // In-Depth Tier
  guides: guidesData            // Conceptual Tier
};

// Write the data JSON
const dataPath = path.join(distDir, "mcp-data.json");
fs.writeJsonSync(dataPath, providerData, { spaces: 2 });
console.log(`Provider data written to ${dataPath}`);
