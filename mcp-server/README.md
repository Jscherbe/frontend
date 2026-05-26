# @ulu/mcp-context-server

A lightweight engine (powered by the Model Context Protocol) designed to bridge the gap between AI agents and complex frontend library ecosystems.

## The Problem

Exposing a large UI library to an AI agent is challenging. Throwing raw source code or unstructured Markdown at an LLM quickly overwhelms its context window, leading to hallucinations and degraded performance. For humans, we build regular documentation (HTML websites). For AI, we need **Task-Driven Context**.

Furthermore, building a monolithic AI server for multiple libraries creates versioning nightmares (e.g., the server expects Vue 3 syntax, but the user installed a Vue 2 version of your library).

## The Solution

`@ulu/mcp-context-server` solves these issues through two core architectural principles:

### 1. Task-Driven Context (TDC)
The core innovation of this engine is forcing libraries to categorize their documentation into distinct tiers based on **AI Intent (Tasks)**. This prevents the AI from reading a massive AST when it simply wants to copy-paste a button component.

Providers map their data into these task tiers, and the Server automatically registers them as dynamically prefixed tools (e.g., `ulu_get_snippets`):

*   **Builder Tier (`get_snippets`):** Used when the AI's task is *writing UI code*. High signal, low noise. Returns copy-pasteable HTML or Vue variations.
*   **Configuration Tier (`get_configuration`):** Used when the AI's task is *altering themes or component state*. Returns a concise list of SCSS `$config` maps, CSS variables, or component props.
*   **Conceptual Tier (`get_guides`):** Used when the AI's task is *understanding architecture*. Returns overarching library knowledge and installation instructions.
*   **In-Depth Reference Tier (`get_reference`):** Used only as a last resort when the AI's task is *deep debugging*. Returns the full, raw AST.

### 2. Distributed Provider Model
This package is incredibly lightweight. It knows *nothing* about parsing SCSS, JavaScript, or Vue. 

Instead, the UI libraries themselves (`@ulu/frontend`, `@ulu/frontend-vue`) parse their own code during their build step. They map their data into our standardized Task-Driven schema and ship it inside their NPM package. Because the AI documentation ships *with* the NPM package, the AI is guaranteed to read documentation that exactly matches the code the developer has installed.

---

## Usage

This package supports two ways of spinning up the knowledge base for an AI agent.

### 1. Auto-loaded CLI (Recommended for End Users)

For developers using ULU UI libraries, simply install the server as a dev dependency and create a config file.

```bash
npm install -D @ulu/mcp-context-server
```

Create `ulu-mcp.config.js` at the project root:

```javascript
export default {
  providers: [
    "@ulu/frontend",
    "@ulu/frontend-vue"
  ]
};
```

Then point your AI's MCP configuration (e.g., Gemini CLI or Claude Desktop) to the CLI binary:
```json
{
  "mcp": {
    "servers": {
      "ulu-context": {
        "command": "npx",
        "args": ["ulu-mcp"]
      }
    }
  }
}
```

### 2. Programmatic (Manual Registration)

For advanced users, custom tools, or internal testing, you can instantiate the server manually and pass in the provider objects.

```javascript
import { KnowledgeBaseServer } from "@ulu/mcp-context-server";
import vanillaProvider from "@ulu/frontend/mcp/index.js";

const server = new KnowledgeBaseServer({
  serverName: "my-custom-context-server",
  providers: [
    vanillaProvider
  ]
});

server.start();
```

---

## Building a Provider (For Library Authors)

If you are creating a new package within the ULU ecosystem, you must generate a `data.json` file that conforms to the Task-Driven schema.

To prevent bloating this runtime engine, the build-time parsing utilities (SassDoc/JSDoc) are maintained in separate dual-purpose documentation generators. Use those tools during your library's build step to output the required `snippets`, `configuration`, `reference`, and `guides` objects.
