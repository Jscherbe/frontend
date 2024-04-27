import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  paths: {
    projectDir: path.resolve(__dirname),
    sassThemeDir: path.resolve(__dirname, "./docs-2024/src/scss/"),
  },
  viteServerPort: 5173,
  eleventyServerPort: 8080,
  eleventyOrigin: "http://localhost:8080"
};