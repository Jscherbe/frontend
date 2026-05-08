# Setting up MCP Knowledge Base for `@ulu/frontend-vue`

This guide explains how to integrate `@ulu/frontend-vue` into the distributed MCP Provider architecture. 

## The Goal
Build an **extraction script** within the Vue repository that outputs a standardized JSON artifact mapping your components to the Engine's Agnostic Tiers.

## The Provider Schema (Agnostic Tiers)
Your script should output a JSON file that matches the following "Provider" interface:

```json
{
  "name": "@ulu/frontend-vue",
  "prefix": "vue",
  "snippets": {
    "UluButton": [
      {
        "title": "Primary Button",
        "description": "Default appearance.",
        "code": "<UluButton variant=\"primary\">Primary</UluButton>"
      }
    ]
  },
  "configuration": {
    "UluButton": {
      "description": "Vue Component Props and Emits",
      "properties": [
        { "name": "variant", "type": "string", "default": "primary", "description": "The visual style." }
      ]
    }
  },
  "reference": {
    "UluButton": {
      "raw_ast_dump": "..."
    }
  }
}
```

## Step-by-Step Implementation

### 1. Extracting Snippets (`snippets` - Builder Tier)
**DO NOT maintain separate demo files.** Extract the snippets directly from your existing Storybook `*.stories.js` (or `.ts`) files.
*   Parse the story files to extract the `args` and `render`/`template` blocks.
*   Map each story variation to a snippet object with a `title`, `description`, and `code`.

### 2. Extracting Configuration (`configuration` - Styling Tier)
Use a tool like `vue-docgen-api` to extract component props, emits, and slots. Map these into the `properties` array within the `configuration` object so the AI can quickly see how to configure the component.

### 3. Extracting Deep Reference (`reference` - In-Depth Tier)
Dump the raw, full AST from `vue-docgen-api` into the `reference` object for complex debugging queries.

### 4. The Build Step
Add a script to `package.json`: `"build:mcp-data": "node scripts/extract-mcp-data.js"`
Configure your CI/CD or npm publish hooks to bundle this `mcp-data.json` inside a `dist/mcp/` directory.
