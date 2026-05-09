# @ulu/mcp-server

A lightweight, agnostic Model Context Protocol (MCP) server engine designed to bridge the gap between AI agents and complex frontend library ecosystems.

## Why this exists (The Architecture)

When exposing large UI libraries to AI, throwing raw source code or unstructured Markdown at the LLM quickly overwhelms its context window. Furthermore, building a monolithic, centralized AI server for multiple libraries creates versioning nightmares (e.g., the server expects Vue 3 syntax, but the user installed a Vue 2 legacy version of your library).

To solve this, `@ulu/mcp-server` uses an **Inversion of Control** and **Distributed Provider Model**:

1. **Agnostic Engine:** This package is incredibly lightweight. It knows *nothing* about parsing SCSS, JavaScript, or Vue. It simply defines the strict MCP Tool Schema and handles the standard `stdio` JSON-RPC transport.
2. **Distributed Providers:** The UI libraries themselves (`@ulu/frontend`, `@ulu/frontend-vue`) are responsible for parsing their own ASTs during their build step. They map their data into our standardized JSON schema and ship it inside their NPM package.
3. **Perfect Versioning:** Because the AI documentation ships *with* the NPM package, the AI is guaranteed to read documentation that exactly matches the code the developer has installed.

## The Agnostic Tiered Schema

The core innovation of this server is forcing libraries to categorize their documentation into four distinct tiers based on **AI Intent**. This prevents the AI from reading a massive AST when it just wants to copy-paste a button.

Providers map their data into these tiers, and the Server automatically registers them as prefixed tools (e.g., `ulu_get_snippets`).

### 1. Conceptual Tier (`[prefix]_get_guides`)
**Intent:** High-level understanding.
Used when the AI needs overarching library knowledge: installation instructions, architectural philosophy, or theming strategies. Returns raw Markdown.

### 2. Builder Tier (`[prefix]_get_snippets`)
**Intent:** Writing UI code.
Used when the AI is actively writing markup or templates. High signal, low noise. Returns copy-pasteable HTML or Vue variations.

### 3. Configuration Tier (`[prefix]_get_configuration`)
**Intent:** Altering themes or component state.
Used when the AI needs to modify SCSS `$config` maps, CSS variables, or Vue component props/emits. Returns a concise list of properties and defaults.

### 4. In-Depth Reference Tier (`[prefix]_get_reference`)
**Intent:** Deep debugging or extending the framework.
Used only as a last resort. Returns the full, raw AST (SassDoc, JSDoc, vue-docgen-api) for internal functions and mixins.

---

## Usage

This package supports two ways of spinning up the knowledge base for an AI agent.

### 1. Auto-loaded CLI (Recommended for End Users)

For developers using your UI libraries, they simply install the server as a dev dependency and create a config file.

```bash
npm install -D @ulu/mcp-server
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

Then point the AI's MCP configuration (e.g., Gemini CLI or Claude Desktop) to the CLI binary:
```json
{
  "mcp": {
    "servers": {
      "ulu-docs": {
        "command": "npx",
        "args": ["ulu-mcp"]
      }
    }
  }
}
```

### 2. Programmatic (Manual Registration)

For advanced users or internal testing, you can instantiate the server manually and pass in the provider objects.

```javascript
import { KnowledgeBaseServer } from "@ulu/mcp-server";
import vanillaProvider from "@ulu/frontend/mcp";
import vueProvider from "@ulu/frontend-vue/mcp";

const server = new KnowledgeBaseServer({
  serverName: "my-custom-knowledge-base",
  providers: [
    vanillaProvider,
    vueProvider
  ]
});

server.start();
```

---

## Building a Provider (For Library Authors)

If you are creating a new package within the ULU ecosystem, you must generate a `data.json` file that conforms to the schema.

To prevent bloating this runtime engine, the build-time parsing utilities (SassDoc/JSDoc) are maintained in separate dual-purpose documentation generators (e.g., `@ulu/docs-sass`, `@ulu/docs-js`). Use those tools during your library's build step to output the required `snippets`, `configuration`, `reference`, and `guides` objects.
