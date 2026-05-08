import { KnowledgeBaseServer } from "./src/server.js";
import frontendProvider from "../dist/mcp/index.js";

const server = new KnowledgeBaseServer({
  providers: [frontendProvider],
  serverName: "mcp-knowledge-base-sandbox",
});

server.start().catch(console.error);
