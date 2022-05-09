const stripIndent = require("strip-indent");

/**
 * Provides compiler code (sass source code to include when compiling examples)
 * - Use to import modules, etc
 * - Use as a file level comment to incude in all
 * - Can use multiple (ie. file level, item/example level)
 */
module.exports = (options, info) => {
  return function group () {
    return {
      name: 'compiler',
      parse(text) {
        const code = text.split('\n');
        // console.log(code);
        // Code to include in compiled is below main annotation
        // in future the first line could hold arguments, etc
        code.shift(); 
        return stripIndent(code.join("\n"));
      },
      multiple: true,
    }
  }
}
