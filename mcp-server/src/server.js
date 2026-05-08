import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

export class KnowledgeBaseServer {
  constructor(options) {
    this.providers = options.providers || [];
    this.serverName = options.serverName || "mcp-knowledge-base-server";
    this.serverVersion = options.serverVersion || "1.0.0";
    
    this.server = new McpServer({
      name: this.serverName,
      version: this.serverVersion
    });

    this.setupProviderHandlers();
  }

  setupProviderHandlers() {
    for (const provider of this.providers) {
      const prefix = provider.prefix || "kb";
      
      // 1. Discovery Tool
      this.server.tool(
        `${prefix}_list_components`,
        `[${provider.name}] Returns a list of all available component names that have snippets, configuration, or reference documentation.`,
        {},
        async () => {
          const keys = new Set([
            ...Object.keys(provider.snippets || {}),
            ...Object.keys(provider.configuration || {}),
            ...Object.keys(provider.reference || {})
          ]);
          return { content: [{ type: "text", text: JSON.stringify(Array.from(keys), null, 2) }] };
        }
      );

      // 2. Builder API (Snippets)
      this.server.tool(
        `${prefix}_get_snippets`,
        `[${provider.name}] (BUILDER TIER) Use this tool FIRST when you need to build UI or write templates. Returns copy-pasteable code variations for a component.`,
        { component_name: z.string() },
        async ({ component_name }) => {
          const snippets = (provider.snippets || {})[component_name];
          if (!snippets) {
            return { content: [{ type: "text", text: `Error: No snippets found for '${component_name}'.` }], isError: true };
          }
          
          let markdown = `# Snippets for ${component_name}\n\n`;
          snippets.forEach(s => {
            markdown += `## ${s.title || 'Variant'}\n`;
            if (s.description) markdown += `${s.description}\n\n`;
            // Purposely omitted wrapperClass as it's an internal docs presentation detail
            markdown += `\`\`\`html\n${s.html || s.code}\n\`\`\`\n\n`;
          });

          return { content: [{ type: "text", text: markdown }] };
        }
      );

      // 3. Configuration API (Styling/Props)
      this.server.tool(
        `${prefix}_get_configuration`,
        `[${provider.name}] (CONFIG TIER) Returns the configuration variables, props, or settings for a specific component.`,
        { component_name: z.string() },
        async ({ component_name }) => {
          const config = (provider.configuration || {})[component_name];
          if (!config) {
            return { content: [{ type: "text", text: `Error: No configuration found for '${component_name}'.` }], isError: true };
          }
          
          let markdown = `# Configuration: ${component_name}\n\n`;
          if (config.description) markdown += `${config.description}\n\n`;
          
          if (config.properties && config.properties.length > 0) {
            config.properties.forEach(prop => {
              markdown += `- **${prop.name}** (\`${prop.type}\`): ${prop.description || ''} (Default: \`${prop.default}\`)\n`;
            });
          } else {
             markdown += JSON.stringify(config, null, 2);
          }

          return { content: [{ type: "text", text: markdown }] };
        }
      );

      // 4. In-Depth API (Raw AST/Reference)
      this.server.tool(
        `${prefix}_get_reference`,
        `[${provider.name}] (IN-DEPTH TIER) Returns the full, raw API documentation (AST, internal functions) for a component. Use only for deep debugging.`,
        { component_name: z.string() },
        async ({ component_name }) => {
          const ref = (provider.reference || {})[component_name];
          if (!ref) {
            return { content: [{ type: "text", text: `Error: No reference found for '${component_name}'.` }], isError: true };
          }
          return { content: [{ type: "text", text: JSON.stringify(ref, null, 2) }] };
        }
      );
    }
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`${this.serverName} running on stdio`);
  }
}
