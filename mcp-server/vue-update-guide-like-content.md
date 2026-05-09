# Vue Integration: Guide Content Extraction

In addition to API reference documentation (Vue, JS, SCSS), the MCP AI needs access to the high-level conceptual knowledge of the library. This includes installation instructions, architectural philosophy, and broad theming guides.

## The "Guides" Tier (Conceptual Tier)

This high-level information will be exposed via the **Guides Tier** in the MCP JSON data schema.

When the AI calls `[prefix]_get_guides`, it will either get a table of contents or the raw markdown of a specific guide.

### The Workflow in Vue (Storybook)

The `@ulu/frontend-vue` project likely contains standard Markdown (`.md` or `.mdx`) files that describe the project. These might live in a `docs/` folder or directly within Storybook's `src/stories/` folder as docs-only pages.

1. **Locate the Guides:** Identify where the high-level `.md`/`.mdx` files are stored (e.g., `docs/guide/*.md`).
2. **Parse Frontmatter:** Use a package like `gray-matter` or basic regex to parse the frontmatter of these files to extract the `title` and `description`.
3. **Map to MCP Tier:**
   During the `mcp-data.json` generation step, iterate through these markdown files and assemble them into a `guides` object.

### The JSON Structure

The `guides` tier should look like this in your final output:

```json
{
  "snippets": { ... },
  "configuration": { ... },
  "reference": { ... },
  "guides": {
    "installation": {
      "title": "Installation and Setup",
      "description": "How to install the library and configure the initial Vue plugin.",
      "content": "# Installation\\n\\nRun \`npm install @ulu/frontend-vue\`..."
    },
    "theming-light-dark": {
      "title": "Light/Dark Theming Strategy",
      "description": "Understanding the semantic tokens used for color modes.",
      "content": "# Theming\\n\\nWe use CSS variables..."
    }
  }
}
```

### Implementing in the Extraction Script

You will need to add a simple node script to your build process that reads the files and appends them to your provider data. 

```javascript
import fs from "fs-extra";
import path from "path";

// A basic example using regex to pull title/description from frontmatter
function extractGuides(docsDir, prefix = '') {
  const guides = {};
  if (!fs.existsSync(docsDir)) return guides;

  const entries = fs.readdirSync(docsDir);
  for (const entry of entries) {
    const fullPath = path.join(docsDir, entry);
    const isDir = fs.lstatSync(fullPath).isDirectory();
    
    if (isDir) {
      Object.assign(guides, extractGuides(fullPath, \`\${prefix}\${entry}/\`));
    } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
      let content = fs.readFileSync(fullPath, "utf-8");
      const id = `${prefix}${entry.replace(/\.mdx?$/, '')}`.replace(/\/index$/, '');
      if (id === 'index') continue;

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

      guides[id] = { title, description, content };
    }
  }
  return guides;
}
```

Once extracted, merge this `guides` object into the final data payload alongside `snippets`, `configuration`, and `reference`.
