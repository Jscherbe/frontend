const fs = require("fs");
/**
 * Prepares sassdoc data to be used
 * - Filter out things that aren't set to public
 * - Add '_uid' to all items
 * - Go through references (usedBy and require) and make change to uid, delete referenced objects (can't keep references in static data, this will need to be linked dynamically by matching uid)
 * - Remove extra fields that won't be used (comment ranges), try and conserve space
 */
function simplifyData(data, options) {
  const itemPath = item => options.itemPath(item, data, options);
  const items = data.filter(item => options.access.includes(item.access));
  const uids = [];
  const hashes = [];
  const getUid = item => itemId(item, uids, true);
  const getHash = item => itemId(item, hashes, false);
  items.forEach(item => {
    item._uid = getUid(item);
    item._hash = getHash(item);
    item._path = itemPath(item);
    // delete item.access;
    // delete item.commentRange;
    delete item.toJSON;
  });
  items.forEach(item => {
    if (item.usedBy) {
      item.usedBy = item.usedBy.map(getUid);
    }
    if (item.require) {
      item.require = item.require.map(required => ({
        ...required,
        item: getUid(required.item)
      }));
    }
  });
  // Sort data by group and create one page per group
  const groups = items.reduce((acc, item) => {
    const name = getGroupName(item);
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(item);
    return acc;
  }, {});

  return groups;

  function itemId(item, all, withGroup, count = 0) {
    const { type, name } = item.context;
    const prefix = withGroup ? `${ getGroupName(item) }-` : "";
    const suffix = count ? `-${ count }` : ""
    const unique = `${ prefix }${ type }-${ name }${ suffix }`;
    // Not unique
    if (all.includes(unique)) {
      return itemId(item, all, withGroup, ++count);
    } else {
      all.push(unique);
      return unique;
    }
  }
}
function isType(type, unknown) {
  const is = typeof unknown;
  return is === type ? true :  console.warn(
    `Sassdoc Plugin: Incorrect option type, expected ${ type } and got ${ is }`, unknown
  );
}
function itemsByType(items, type) {
  return items.filter(item => item.context.type === type);
}

function getGroupName(item) {
  return item.group[0];
}

function titleCase(string) {
  return string.replace(/\w\S*/g, capitolize)
}
function capitolize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function dataToFile(to, data) {
  fs.writeFileSync(to, typeof data === "string" ? data : JSON.stringify(data, null, 2));
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
  getGroupName,
  joinStyles,
  simplifyData, 
  itemsByType, 
  titleCase, 
  capitolize,
  dataToFile,
  joinMarkup,
  isType
}