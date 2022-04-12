// Need to remove extra information in each item's 'usedBy' info
// Looks 

/**
 * Prepares sassdoc data to be used
 * - Filter out things that aren't set to public
 * - Add '_uid' to all items
 * - Go through references (usedBy and require) and make change to uid, delete referenced objects (can't keep references in static data, this will need to be linked dynamically by matching uid)
 * - Remove extra fields that won't be used (comment ranges), try and conserve space
 */
module.exports = data => {
  const items = data.filter(item => item.access === "public");
  items.forEach(item => {
    item._uid = staticReference(item);
    delete item.access;
    delete item.commentRange;
    delete item.toJSON;
  });
  items.forEach(item => {
    if (item.usedBy) {
      item.usedBy = item.usedBy.map(staticReference);
    }
    if (item.require) {
      item.require = item.require.map(required => ({
        ...required,
        item: staticReference(required.item)
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

  const groupsByType = {};
  Object.keys(groups).forEach(name => {
    groupsByType[name] = {
      mixins: itemsByType(groups[name], "mixin"),
      variables: itemsByType(groups[name], "variable"),
      functions: itemsByType(groups[name], "function"),
      placeholders: itemsByType(groups[name], "placeholder")
    };
  });
  return groupsByType;
}
function staticReference(item) {
  const { type, name } = item.context;
  return `${ getGroupName(item) }--${ type }--${ name }`;
}

function getGroupName(item) {
  return item.group[0];
}

function itemsByType(items, type) {
  return items.filter(item => item.context.type === type);
}