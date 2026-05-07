import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { KnowledgeBaseServer } from "./src/server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sassdocPath = path.resolve(__dirname, "../site/mcp-data/mcp-sassdoc.json");
const jsdocPath = path.resolve(__dirname, "../site/mcp-data/mcp-jsdoc.json");
const snippetsPath = path.resolve(__dirname, "../site/mcp-data/mcp-snippets.json");

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

const definition = {
  meta: {
    name: "@ulu/frontend",
    version: "1.0.0",
    description: "MCP knowledge base for @ulu/frontend."
  },
  resources: [],
  entities: [],
  tokens: [],
  snippets: snippetsData // Pass the snippets data through to the definition
};

// Process Sassdoc
for (const [groupName, items] of Object.entries(sassData)) {
  for (const item of items) {
    const context = item.context || {};
    const type = context.type ? `scss-${context.type}` : "scss-item";
    
    definition.entities.push({
      type: type,
      name: context.name || item.title || "Unknown",
      description: item.description || "No description provided.",
      snippets: {
        scss: context.code || context.value || "",
        // If this sassdoc item matches a component snippet name, we could attach it here
        // For example, if it's a mixin/file named "button" and snippetsData["button"] exists.
        html: snippetsData[context.name] || []
      }
    });
  }
}

// Process JSDoc
for (const item of jsData) {
  const type = item.kind ? `js-${item.kind}` : "js-item";
  definition.entities.push({
    type: type,
    name: item.name || item.longname || "Unknown",
    description: item.description || "No description provided.",
    snippets: {
      js: item.meta ? `// file: ${item.meta.filename}:${item.meta.lineno}` : ""
    }
  });
}

const server = new KnowledgeBaseServer({
  definition,
  serverName: "ulu-frontend-mcp",
  serverVersion: "1.0.0"
});

server.start().catch(err => {
  console.error(err);
  process.exit(1);
});
