import path from "path";
import { readManifest } from "./utils.js";

/**
 * Eleventy Plugin to add Vite helpers
 * @param {Object} eleventyConfig 
 * @param {Object} options
 * @param {String} options.viteOutDir - Path to the vite output directory (required for prod to find manifest)
 * @param {String} options.publicPath - URL prefix for assets (e.g. "/" or "/assets/"). Used to constructs absolute URLs for `viteEntry` outputs.
 */
export default function(eleventyConfig, options = {}) {
  // Determine if we are in build mode (vs serve/watch)
  // We rely on the Vite plugin setting this environment variable.
  const mode = process.env.ULU_VITE_MODE || "build"; // Default to build if undefined for safety in prod
  const isBuild = mode === "build";
  
  // Add global data so templates can access the mode if needed
  eleventyConfig.addGlobalData("vite", {
    mode: mode
  });
  
  let manifest = null;
  const publicPath = options.publicPath || "/";

  // Attempt to load manifest in build mode
  if (isBuild && options.viteOutDir) {
    manifest = readManifest(options.viteOutDir);
    if (!manifest) {
      console.warn("[@ulu/vite-plugin-eleventy] Build mode but no manifest.json found at", options.viteOutDir);
    }
  }

  function getChunk(entry) {
    if (!manifest) return null;
    return manifest[entry];
  }

  // Helper to join public path
  function getUrl(file) {
    // Ensure we use forward slashes for URLs, even on Windows
    return path.posix.join(publicPath, file);
  }

  // Shared logic to resolve the URL for a given entry
  function resolveEntryUrl(entry) {
    if (!isBuild) {
      // Dev/Serve mode: point to Vite server
      return `/${ entry }`;
    }

    const chunk = getChunk(entry);
    if (chunk && chunk.file) {
       return getUrl(chunk.file);
    }
    
    // Fallback if no manifest found
    console.warn(`[@ulu/vite-plugin-eleventy] Manifest entry not found for: ${ entry }`);
    return getUrl(entry);
  }

  // Filter: {{ "src/main.js" | viteEntryUrl }}
  // Returns the resolved JS entry URL string.
  eleventyConfig.addFilter("viteEntryUrl", (entry) => {
    return resolveEntryUrl(entry);
  });

  // Shortcode: {% viteEntry "src/main.js" %}
  // Outputs the <script type="module"> tag for the entry.
  eleventyConfig.addShortcode("viteEntry", (entry) => {
    const url = resolveEntryUrl(entry);
    return `<script type="module" src="${ url }"></script>`;
  });

  // Shortcode: {% viteEntryStyles "src/main.js" %}
  // Outputs <link rel="stylesheet"> tags for any CSS associated with the entry (Build only)
  // In Dev, Vite injects CSS via the JS module, so this returns empty.
  eleventyConfig.addShortcode("viteEntryStyles", (entry) => {
    if (!isBuild) {
      return ""; 
    }

    const chunk = getChunk(entry);
    if (chunk && chunk.css && chunk.css.length) {
      return chunk.css.map(cssFile => {
        return `<link rel="stylesheet" href="${ getUrl(cssFile) }">`;
      }).join("\n");
    }
    
    return "";
  });
};
