import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sassdocPath = path.resolve(__dirname, "../mcp-data/mcp-sassdoc.json");
const jsdocPath = path.resolve(__dirname, "../mcp-data/mcp-jsdoc.json");
const snippetsPath = path.resolve(__dirname, "../mcp-data/mcp-snippets.json");

const distDir = path.resolve(__dirname, "../../dist/mcp");

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
  snippets: snippetsData,       // Builder Tier
  configuration: configurationData, // Styling Tier
  reference: referenceData      // In-Depth Tier
};

// Write the data JSON
const dataPath = path.join(distDir, "data.json");
fs.writeJsonSync(dataPath, providerData, { spaces: 2 });
console.log(`Provider data written to ${dataPath}`);

// Write the JS entry point
const indexPath = path.join(distDir, "index.js");
const indexContent = `import data from "./data.json" with { type: "json" };

export default {
  name: "@ulu/frontend",
  prefix: "ulu",
  ...data
};
`;
fs.writeFileSync(indexPath, indexContent);
console.log(`Provider index written to ${indexPath}`);
