import frontendProvider from "./dist/mcp-data.json" with { type: "json" };

console.log(frontendProvider);

/**
 * Manually set current provider data
 */
export default {
  providers: [
    frontendProvider
  ]
};