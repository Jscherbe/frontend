# Instructions for Initializing `@ulu/mcp-context-server`

Hello! You are tasked with setting up the new `@ulu/mcp-context-server` repository. This package is an agnostic engine that consumes "Providers" from other `@ulu` UI libraries and exposes them as task-driven tools for AI agents over the Model Context Protocol.

## 1. Directory Structure

Please create the following structure:

```text
/
├── package.json
├── README.md
├── src/
│   ├── server.js (The core logic)
│   └── cli.js    (The CLI wrapper)
└── bin/
    └── ulu-mcp.js (The executable)
```

## 2. Dependencies

Initialize the package and install the following dependencies:
*   `@modelcontextprotocol/sdk`
*   `zod`

## 3. The Source Files

The core logic for `src/server.js` and the `README.md` will be provided by the user.

You need to create the CLI wrapper files to fulfill the "Auto-loaded CLI" feature.

### `bin/ulu-mcp.js`
This is the executable entry point. Ensure `package.json` maps `"bin": { "ulu-mcp": "./bin/ulu-mcp.js" }`.

```javascript
#!/usr/bin/env node
import { runCLI } from "../src/cli.js";

runCLI().catch(err => {
  console.error("Failed to start MCP Context Server:", err);
  process.exit(1);
});
```

### `src/cli.js`
This file searches for `ulu-mcp.config.js` in the current working directory, dynamically imports the requested providers, and starts the server.

```javascript
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { KnowledgeBaseServer } from "./server.js";

export async function runCLI() {
  const cwd = process.cwd();
  const configPath = path.join(cwd, "ulu-mcp.config.js");

  if (!fs.existsSync(configPath)) {
    throw new Error(\`Configuration file not found: \${configPath}. Please create a ulu-mcp.config.js file.\`);
  }

  // Import the user's config
  const configUrl = pathToFileURL(configPath).href;
  const configModule = await import(configUrl);
  const config = configModule.default || configModule;

  if (!config.providers || !Array.isArray(config.providers)) {
    throw new Error("Invalid configuration: 'providers' must be an array of package names.");
  }

  const loadedProviders = [];

  // Dynamically import the providers from node_modules
  for (const packageName of config.providers) {
    try {
      // We expect providers to expose their data at '[package-name]/mcp'
      const providerModule = await import(\`\${packageName}/mcp\`);
      const provider = providerModule.default || providerModule;
      loadedProviders.push(provider);
    } catch (e) {
      console.error(\`Warning: Failed to load provider '\${packageName}'. Ensure it is installed.\`, e.message);
    }
  }

  const server = new KnowledgeBaseServer({
    serverName: "ulu-mcp-context",
    providers: loadedProviders
  });

  await server.start();
}
```

## 4. Final Steps
*   Ensure `type: "module"` is in `package.json`.
*   Ensure `src/server.js` exports the `KnowledgeBaseServer` class.