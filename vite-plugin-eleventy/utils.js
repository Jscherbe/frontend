import path from "path";
import fs from "fs";

/**
 * Returns the default cache directory for the plugin.
 */
export function getCacheDir(cwd) {
  return path.resolve(cwd, "node_modules/.@ulu-cache-vite-plugin-eleventy");
}

/**
 * Reads the Vite manifest file.
 * @param {string} outDir - The directory where Vite wrote the manifest
 */
export function readManifest(outDir) {
  const manifestPath = path.resolve(outDir, ".vite/manifest.json"); // Vite 5+ puts it in .vite/ by default, or just manifest.json
  // Check both locations just in case
  let finalPath = manifestPath;
  if (!fs.existsSync(finalPath)) {
    finalPath = path.resolve(outDir, "manifest.json");
  }

  if (fs.existsSync(finalPath)) {
    try {
      return JSON.parse(fs.readFileSync(finalPath, "utf-8"));
    } catch (e) {
      console.error("[@ulu/vite-plugin-eleventy] Error parsing manifest:", e);
    }
  }
  return null;
}
