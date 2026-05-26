import fs from "fs-extra";
import path from "path";
import { getDemoSnippets } from "../../utils/get-demo-snippets.js";

export default async function plugin(eleventyConfig) {
  eleventyConfig.on("eleventy.before", async () => {
    if (!process.env.BUILD_MCP) return;
    
    const snippetsData = getDemoSnippets();

    const outputPath = path.resolve("./site/mcp/data/snippets.json");
    fs.outputFileSync(outputPath, JSON.stringify(snippetsData, null, 2));
    console.log(`MCP Snippets Data written to ${outputPath}`);
  });
}
