import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

export class KnowledgeBaseServer {
  constructor(options) {
    this.definition = options.definition;
    this.serverName = options.serverName || "knowledge-base-server";
    this.serverVersion = options.serverVersion || "1.0.0";
    
    this.server = new McpServer({
      name: this.serverName,
      version: this.serverVersion
    });

    this.setupHandlers();
  }

  addTool(tool) {
    // Allows custom tools to be added
    const schema = tool.inputSchema || {};
    this.server.tool(
      tool.name,
      tool.description || "",
      schema,
      async (args) => {
        return await tool.handler(args);
      }
    );
  }

  addResource(resource) {
    this.server.resource(
      resource.name || resource.uri,
      resource.uri,
      async (uri) => {
        if (resource.handler) {
          const res = await resource.handler({ params: { uri: uri.href } });
          return res;
        }
        throw new Error("No handler for custom resource");
      }
    );
  }

  setupHandlers() {
    // Setup default resources
    const resources = this.definition.resources || [];
    for (const r of resources) {
      this.server.resource(
        r.title,
        `kb://resources/${r.id}`,
        async () => {
          return {
            contents: [{
              uri: `kb://resources/${r.id}`,
              mimeType: "text/markdown",
              text: r.content
            }]
          };
        }
      );
    }

    // Setup default tools
    this.server.tool(
      "list_entity_types",
      "Returns available entity types.",
      {},
      async () => {
        const types = [...new Set((this.definition.entities || []).map(e => e.type))];
        return { content: [{ type: "text", text: JSON.stringify(types, null, 2) }] };
      }
    );

    this.server.tool(
      "list_entities",
      "Returns names and descriptions of entities for a specific type.",
      { type: z.string() },
      async ({ type }) => {
        const entities = (this.definition.entities || [])
          .filter(e => e.type === type)
          .map(e => ({ name: e.name, description: e.description }));
        return { content: [{ type: "text", text: JSON.stringify(entities, null, 2) }] };
      }
    );

    this.server.tool(
      "get_entity",
      "Returns the full object for an entity.",
      { name: z.string(), type: z.string() },
      async ({ name, type }) => {
        const entity = (this.definition.entities || []).find(e => e.name === name && e.type === type);
        if (!entity) {
          return { content: [{ type: "text", text: `Error: Entity not found: ${name} of type ${type}` }], isError: true };
        }
        return { content: [{ type: "text", text: JSON.stringify(entity, null, 2) }] };
      }
    );

    this.server.tool(
      "list_token_categories",
      "Returns available token categories.",
      {},
      async () => {
        const categories = (this.definition.tokens || []).map(t => t.category);
        return { content: [{ type: "text", text: JSON.stringify(categories, null, 2) }] };
      }
    );

    this.server.tool(
      "get_tokens",
      "Returns the tokens for a specific category.",
      { category: z.string() },
      async ({ category }) => {
        const tokens = (this.definition.tokens || []).find(t => t.category === category);
        if (!tokens) {
          return { content: [{ type: "text", text: `Error: Token category not found: ${category}` }], isError: true };
        }
        return { content: [{ type: "text", text: JSON.stringify(tokens, null, 2) }] };
      }
    );
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`${this.serverName} running on stdio`);
  }
}
