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

  // Add UID to all items
  items.forEach(item => {
    item._uid = getUid(item);
    item._hash = getHash(item);
    item._path = itemPath(item);
    // delete item.access;
    // delete item.commentRange;
    delete item.toJSON;
  });

  // Remove circlular references (use Uid/path instead)
  items.forEach(item => {
    if (item.see) {
      item.see.map(staticReference);
    }
    if (item.usedBy) {
      item.usedBy.forEach(staticReference);
    }
    if (item.require) {
      item.require = item.require.map(r => {
        const requireItem = r.item;
        delete r.item;
        return {
          ...r,
          ...staticReference(requireItem)
        };
      });
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
  function staticReference(item) {
    const { _hash, _path, _uid } = item;
    return { _hash, _path, _uid };
  }
}