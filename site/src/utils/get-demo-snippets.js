import fs from "fs-extra";
import path from "path";
import yaml from "yaml";

const src = path.resolve("./lib/scss/");

/**
 * Strips the minimum common indentation from a string
 */
function stripIndent(str) {
  const match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) return str;
  const indent = Math.min(...match.map(x => x.length));
  const re = new RegExp(`^[ \\t]{${indent}}`, "gm");
  return indent > 0 ? str.replace(re, "") : str;
}

export function getDemoSnippets() {
  const snippetsData = {};

  // Function to recursively find .demo.html files
  const findDemoFiles = (dir) => {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(findDemoFiles(filePath));
      } else if (file.endsWith(".demo.html")) {
        results.push(filePath);
      }
    });
    return results;
  };

  const demoFiles = findDemoFiles(src);

  demoFiles.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    // Component name is derived from filename (e.g. _button.demo.html -> button)
    const componentName = path.basename(filePath, ".demo.html").replace(/^_/, "");

    // Regex matches the comment content
    const regex = /<!--\s*@ulu-demo([\s\S]*?)-->/g;
    let match;
    let demos = [];

    while ((match = regex.exec(content)) !== null) {
      const rawYaml = match[1];
      let metadata = {};
      try {
        // Use stripIndent to make sure YAML is valid even if indented in the comment
        metadata = yaml.parse(stripIndent(rawYaml)) || {};
      } catch (e) {
        console.error(`Error parsing YAML in ${filePath}:`, e);
        // Log the string that failed to parse to help debugging
        console.error("YAML String attempted:", `\n---${rawYaml}---`);
      }

      const startOfHtml = match.index + match[0].length;

      // Find the end of this HTML snippet (the start of the next comment, or EOF)
      const nextMatchIndex = content.indexOf('<!-- @ulu-demo', startOfHtml);
      const htmlSnippet = nextMatchIndex !== -1 
        ? content.substring(startOfHtml, nextMatchIndex).trim() 
        : content.substring(startOfHtml).trim();

      demos.push({
        ...metadata,
        html: htmlSnippet
      });
    }

    if (demos.length > 0) {
      snippetsData[componentName] = demos;
    }
  });

  return snippetsData;
}
