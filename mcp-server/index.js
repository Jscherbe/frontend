import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { KnowledgeBaseServer } from "./src/server.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sassdocPath = path.resolve(__dirname, "../site/mcp-data/mcp-sassdoc.json");
const jsdocPath = path.resolve(__dirname, "../site/mcp-data/mcp-jsdoc.json");

let sassData = {};
let jsData = [];

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

const definition = {
  meta: {
    name: "@ulu/frontend",
    version: "1.0.0",
    description: "MCP knowledge base for @ulu/frontend."
  },
  resources: [],
  entities: [],
  tokens: []
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
        scss: context.code || context.value || ""
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
