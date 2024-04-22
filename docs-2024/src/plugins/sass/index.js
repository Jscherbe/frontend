import path from "path";
import url from "url";
import { compileAsync } from "sass";
import defaults from "./defaults.js";

/**
 * @see https://www.11ty.dev/docs/languages/custom/ Based on this
 */
export default function plugin(eleventyConfig, userOpts) {
  const options = Object.assign({}, defaults, userOpts);
  const debugLog = (...args) => {
    if (options.debug) { 
      console.log("SASS PLugin: ", ...args); 
    }
  };

  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
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
      const sassOptions = { ...options.sass };
      const loadPaths = [];
      debugLog("Sass input:", inputPath);
      if (options.skipPartials && filename.startsWith("_")) return;

      // Create a new sass options object based on users
      // and then conditionally add the users includes directory to loadPaths
      if (options.addCwd) {
        loadPaths.push(path.resolve("."));
      }
      if (options.addIncludes) {
        loadPaths.push(path.resolve(this.config.dir.input,  this.config.dir.includes));
      }
      if (options.sass.loadPaths) {
        loadPaths.push(...options.sass.loadPaths);
      }

      sassOptions.loadPaths = loadPaths;
      debugLog("Sass loadPaths:", loadPaths);
      
      try {
        const result = await compileAsync(inputPath, sassOptions);
        if (result) {
          this.addDependencies(inputPath, result.loadedUrls);
          // Allow user to alter how the file contents (and data) for the file
          return async (data) =>await options.transform(result, data);
        }
      } catch (error) {
        console.error("Error compiling sass for: " + filename);
        throw Error(error);
      }
    }
  });
};