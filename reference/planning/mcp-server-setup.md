# MCP Server Setup Plan

This document serves as our comprehensive context and progress tracker for building the `@ulu/frontend` MCP server.

## 1. Project Structure (Temporary Local Setup)
Since we are building and testing this within the current repository before moving it to its own package, we need a place for it to live.
*   **Location:** Create a `mcp-server/` (or `tools/mcp-server/`) directory in the project root.
*   **Dependencies:** We'll need the official `@modelcontextprotocol/sdk`. We can either add it to the root `devDependencies` or create a separate `package.json` inside the `mcp-server/` directory. (A separate `package.json` might make it easier to extract later).

## 2. Data Extraction (The Knowledge Base)
The server needs artifacts (e.g., `mcp-api.json`) to serve. We will integrate the extraction into the existing documentation build process so it remains an artifact of the site.
*   **Environment Flag:** We will use an environment variable (e.g., `BUILD_MCP=true`) to trigger the generation of MCP data during the documentation build or as a separate build step.
*   **JS/SCSS API Data:** We will tap into the `buildEnd` hook of `@ulu/sassdoc-to-markdown` in `site/src/plugins/sassdoc/index.js` to format and output the parsed SCSS API data as a JSON file. A similar approach will be taken for JSDoc.
*   **HTML Snippets:** (Deferred) We may unify how components are documented or output stripped-down HTML pages for the MCP server that only contain the demos.
*   **Build Script:** A new command like `npm run build:mcp-data` to orchestrate this extraction.

## 3. Server Implementation & API Design (`mcp-server/index.js`)
To ensure this MCP server can be reused for other projects or isolated component libraries, the API should be structured around generic frontend concepts (Components, Design Tokens, Conventions) rather than hardcoded `@ulu` specifics.

The server will act as a standard `stdio` based MCP server reading from the structured JSON artifact.

**Extensibility & Architecture:**
*   **The Core Concept:** The library should provide a class or factory (e.g., `new KnowledgeBaseMCP({ ... })`) that automatically wires up standard tools and resources based on a provided configuration/schema.
*   **Standardized Schema:** Instead of tying to Eleventy or SassDoc, the server expects a standard JavaScript object or JSON file adhering to a specific interface (e.g., `KnowledgeDefinition`). The user is responsible for writing the "glue" code that transforms their docs into this schema.
*   **Custom Tools/Resources:** Users should be able to extend the server by passing in their own custom tools or resources alongside the generated ones. `server.addTool({ name: 'my_custom_tool', handler: ... })`.
*   **Multiple Contexts:** A single server could potentially serve multiple contexts (e.g., `@ulu/frontend` framework rules + project-specific API rules).

**Proposed Generic Resources (Static Context):**
*   `library://architecture/conventions` (Replaces `ulu://conventions/bem` - project agnostic rules)
*   `library://documentation/overview` (General philosophy)

**Proposed Generic Tools (Dynamic Queries):**
*   `list_entities(type)`
    *   **Returns:** Array of available entities (components, modules, APIs) and brief descriptions.
*   `get_entity(name, type)`
    *   **Returns:** A comprehensive object containing the entity's documentation, code snippets (HTML/JS), and configuration.
*   `get_design_tokens(category)`
    *   **Returns:** Generic utility classes or SCSS variables for a category (e.g., "typography", "spacing", "colors").
*   `search_utilities(query)`
    *   **Returns:** Matching utility classes based on a search term to prevent hallucinating utility classes.

## 4. Package Naming & Ecosystem Strategy
Since this fits into a larger ecosystem of building and workflow tools, we will keep it neatly organized under the `@ulu` namespace. 

We want to avoid restricting it to "frontend", "components", or "design systems". The goal is to build a foundational piece for exposing any structured project documentation/knowledge to AI assistants.

**Name Selection:** `@ulu/mcp-knowledge-base`

**Core Philosophy:** 
This package provides a foundational API to expose project structures, conventions, and snippets to AI, effectively serving as a tool to set up an MCP-compliant knowledge base for any project. While heavily useful for frontend components (HTML/SCSS), the underlying mechanism is language-agnostic.
It will export:
1.  **The API Logic (The Brain):** Handlers for querying structured JSON entities.
2.  **Server Mixins/Routers:** Functions to easily attach these capabilities to an *existing* MCP server.
3.  **A Standalone Server:** A ready-to-use, built-in server instance.

## 5. Testing Workflow
*   Add a script to the root `package.json` (e.g., `"mcp": "node mcp-server/index.js"`) to easily launch the server.
*   We can test it locally by configuring an AI client (like Claude Desktop or Cursor) to point to this local script and verifying that the tools return the expected, extracted data.

---
**Current Status & Next Steps:**

### Completed
* **Project Structure:** Created `mcp-server/` with `@modelcontextprotocol/sdk` (and `zod`) and added a `.gitignore`. Added an `npm run mcp` script to launch the server locally.
* **Data Extraction (JS/SCSS):** Integrated into the Eleventy build using the `buildEnd` hook for `@ulu/sassdoc-to-markdown` and a modified `jsdoc2md` script. Configured to output cleanly to `site/mcp-data/` when the `BUILD_MCP=true` flag is present. Added `npm run build:mcp-data`.
* **Server Implementation:** Created the base `KnowledgeBaseServer` using the new `McpServer` and `zod` APIs. Configured `mcp-server/index.js` to read from the generated `site/mcp-data/` artifacts and serve them dynamically. Tested successful initialization.

### Upcoming Planning
1. **HTML Snippets:** We need to discuss and design a unified approach for extracting or generating clean HTML component snippets, keeping in mind how they are currently documented in `site/pages/demos/`.
2. **Final Integration Strategy:** Determine how the server will be packaged and consumed by end-users.
3. **Vue Integration:** Plan the strategy for setting up a similar knowledge base/MCP server for the companion `@ulu/frontend-vue` library, which consumes this library's SCSS and specific JS utilities.
