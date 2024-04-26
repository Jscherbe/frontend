import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const paths = {
  docs: path.resolve(__dirname, "docs-2024/"),
  src: path.resolve(__dirname, "docs-2024/src/"),
  dist: path.resolve(__dirname, "docs-2024/dist/"),
  sassTheme: path.resolve(__dirname, "./docs-2024/src/stylesheet"),
  sassUlu: path.resolve(__dirname, "./scss"),
};
export default {
  paths,
  viteServerPort: 5173,
  eleventyServerPort: 8080,
  eleventyOrigin: "http://localhost:8080"
};