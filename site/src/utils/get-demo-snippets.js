import fs from "fs-extra";
import path from "path";

const src = path.resolve("./lib/scss/");

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
    
    const regex = /<!--\s*@ulu-demo\s*(\{[\s\S]*?\})\s*-->/g;
    let match;
    let demos = [];
    
    while ((match = regex.exec(content)) !== null) {
      const jsonStr = match[1];
      let metadata = {};
      try {
        metadata = JSON.parse(jsonStr);
      } catch (e) {
        console.error(`Error parsing JSON in ${filePath}:`, e);
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
