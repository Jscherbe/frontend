# MCP Server Architecture & Integration Plan

## 1. Core Philosophy: Inversion of Control
To prevent version mismatches and avoid a monolithic, brittle server, we are using a **Distributed Provider Model**.
*   **The Engine (`@ulu/mcp-knowledge-base`):** A lightweight, agnostic MCP server shell. It defines strict tool schemas (Builder, Styling, In-Depth) and handles the standard `stdio` transport. It knows *nothing* about parsing SCSS or Vue.
*   **The Providers (The Libraries):** Individual libraries (`@ulu/frontend`, `@ulu/frontend-vue`, `@ulu/utils`) run their own extraction scripts during their build step. They bundle this JSON data into their NPM package and export a standardized "Provider" object conforming to Agnostic Tiers.
*   **The Consumer (End User):** A developer installs the libraries and the Engine. They create a tiny initialization script that registers the locally installed Providers with the Engine. This guarantees the AI reads documentation that perfectly matches the installed version of the code.

## 2. The Tiered API Structure (Agnostic Schema)
The Engine expects Providers to supply data mapped into three distinct tiers based on *Intent* to protect the LLM's context window.

### Builder Tier (`snippets` -> `[prefix]_get_snippets`)
Used when the AI is writing markup or templates. High signal, low noise.
*   *Frontend:* Colocated `.demo.html` variations.
*   *Vue:* Extracted `*.stories.js` templates.

### Configuration Tier (`configuration` -> `[prefix]_get_configuration`)
Used when the AI needs to alter global themes or component configurations.
*   *Frontend:* The SCSS `$config` maps and available variables.
*   *Vue:* Extracted Vue props, emits, and slots (from vue-docgen-api).

### In-Depth Reference Tier (`reference` -> `[prefix]_get_reference`)
Used for bug fixing, extending the framework, or understanding internal systems.
*   *Frontend:* Full SassDoc/JSDoc AST.
*   *Vue:* Full vue-docgen-api AST.

## 3. Package Consumption Strategy (The Final Product)
When `@ulu/mcp-knowledge-base` is published, it should support a **Hybrid Approach**:
1. **Programmatic (Manual Registration):** The user imports the `KnowledgeBaseServer` class into a Node script and manually registers providers. This is best for advanced users who want to intercept data or add project-specific, custom MCP tools.
2. **Auto-loaded (CLI + Config):** The package exposes an `npx ulu-mcp` CLI command. It looks for an `ulu-mcp.config.js` file at the project root. The user simply defines an array of library names (e.g., `providers: ['@ulu/frontend', '@ulu/frontend-vue']`). The CLI handles dynamic resolution and starts the server. 

## 4. Prototyping & Testing Roadmap
To validate this architecture before publishing the core package, we will follow these phases:

1. **Phase 1: Local Sandbox (Current Repo)**
   * Format the extracted `@ulu/frontend` data into the strict "Tiered" schema (Builder, Styling, In-Depth).
   * Update the local `mcp-server/src/server.js` to implement prefixed tools (e.g., `ulu_get_snippets`).
   * Test locally using `gemini-cli` against this sandbox server.

2. **Phase 2: Vue Integration Prototype**
   * Write an instruction manual (`vue-mcp-setup-instructions.md`) detailing how to replicate this extraction workflow in the `@ulu/frontend-vue` repository (parsing Vue components/composables into the Tiered schema).
   * Generate the Vue dataset.

3. **Phase 3: Unified Real-World Test**
   * Move the server core and the generated JSON data from both libraries into a temporary, separate "real-world" project.
   * Verify that the AI can seamlessly build UI using tools from both libraries simultaneously.

4. **Phase 4: Package Extraction**
   * Extract the core logic to the `@ulu/mcp-knowledge-base` NPM package.
   * Add the CLI wrapper and config loader.
   * Setup standard `/mcp` exports in the respective library `package.json` files.
