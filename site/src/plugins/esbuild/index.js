import * as esbuild from "esbuild";
import path from "path";
import defaults from "./defaults.js";
/**
 * Plan is to write all files to a user set directory within current path
 * so if file is /assets/scripts.js and it has code splitting into other files
 * they set that directory to "esbuild" the files would output as "/assets/scripts.js" and "/assets/__esbuild-plugin/scripts/bundled-files.js" in output?
 * - You wouldn't be able to have a directory
 */

/**
 * @see https://www.11ty.dev/docs/languages/custom/ Based on this
 */
export default function plugin(eleventyConfig, userOpts) {
  const options = Object.assign({}, defaults, userOpts);
  const debugLog = (...args) => {
    if (options.debug) { 
      console.log("ESBUILD Plugin: ", ...args); 
    }
  };

  eleventyConfig.addTemplateFormats(options.extension);
  eleventyConfig.addExtension(options.extension, {
    outputFileExtension: "js",
    read: false,
    async getData() {
      return {
        eleventyComputed: {
          layout: false,
          eleventyExcludeFromCollections: true
        }
      };
    },
    async compile(_inputContent, inputPath) {
      const filename = path.parse(inputPath).name;
      debugLog("inputPath:", inputPath);
      if (options.exclude(inputPath)) return;
      
      try {
        const result = await compileAsync(inputPath, sassOptions);
        if (result) {
          this.addDependencies(inputPath, result.loadedUrls);
          // Allow user to alter how the file contents (and data) for the file
          return async (data) => await options.transform(result, data);
        }
      } catch (error) {
        console.error("Error compiling sass for: " + filename);
        throw Error(error);
      }
    }
  });
};