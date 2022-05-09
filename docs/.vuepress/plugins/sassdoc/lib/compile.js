const { PLUGIN_NAME } = require("./constants.js");
/**
 * Used to compile a documented item's scss if it is marked to compile
 * - Dart Sass implementation
 */
module.exports = function compileExample(code, options, additionalData = "") {
  let sass;
  try {
    sass = require("sass");
  } catch (error) {
    console.error(PLUGIN_NAME, "Error loading dependency sass (dart)");
  }
  const { compilerOptions, dir } = options;
  const opts = Object.assign({ 
    style: "expanded",
    loadPaths: [ dir ]
  }, compilerOptions.sassOptions);
  const src = `
${ compilerOptions.additionalData || "" }
${ additionalData }
${ code }
  `;
  try {
    const result = sass.compileString(src, opts);
    return result.css;
  } catch (error) {
    console.error(PLUGIN_NAME, "Error while compiling scss example:", code, error);
  }
}