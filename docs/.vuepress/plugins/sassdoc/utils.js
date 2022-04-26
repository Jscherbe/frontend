const fs = require("fs");

function isType(type, unknown) {
  const is = typeof unknown;
  return is === type ? true :  console.warn(
    `Sassdoc Plugin: Incorrect option type, expected ${ type } and got ${ is }`, unknown
  );
}
function itemsByType(items, type) {
  return items.filter(item => item.data.context.type === type);
}
function titleCase(string) {
  return string.replace(/\w\S*/g, capitolize)
}
function capitolize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function circularReplacer() {
  const seen = new WeakSet()
  return (_, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}
function dataToFile(to, data) {
  const content = typeof data === "string" ? data : JSON.stringify(data, circularReplacer(), 2);
  fs.writeFileSync(to, content);
}
/**
 * Takes any number of markup arrays and filters out empty markup and joins with newline
 */
function joinMarkup(...arrays) {
  return "\n" + [].concat(...arrays).filter(i => i).join("\n");
}

function joinStyles(styles) {
  return Object.entries(styles).map(([prop, value]) => `${ prop }: ${ value };`).join("")
}

module.exports = { 
  joinStyles,
  itemsByType, 
  titleCase, 
  capitolize,
  dataToFile,
  joinMarkup,
  isType
};