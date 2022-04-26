const sassdoc = require("sassdoc");

async function parse(options) {
  const { 
    itemTitle, 
    undefinedGroupName, 
    sassdocOptions, 
    dir 
  } = options;
  let sassdocItems;
  try {
    sassdocItems = await sassdoc.parse(dir, sassdocOptions);
  } catch (error) {
    console.error(error);
  }
  if (!sassdocItems) {
    console.error("No data from sassdocs!");
    return;
  }
  
  // First put items into groups groups = { exampleName: [], ... }
  const groups = sassdocItems.reduce((all, data) => {
    const groupName = data.group[0] || undefinedGroupName;
    if (!all[groupName]) all[groupName] = [];
    const $item = { data, groupName };
    // Add references both ways
    data.$item = $item;
    all[groupName].push($item);
    return all;
  }, {});

  // Now setup each item (add ids, title) 
  Object.entries(groups).forEach(([ groupName, items ]) => {
    const groupIds = []; //  id in group
    items.forEach(item => {
      const { type, name } = item.data.context;
      const variableType = item.type || null;
      // Incase sassdoc changes it's structure passing set data to 
      // options callback, also passing the item's original data incase it's needed
      const info = { type, name, variableType, groupName };
      item.id = uniqueId(info, groupIds);
      item.uid = `${ groupName }-${ item.id }`;
      item.title = itemTitle(info, item.data);
    });
  });

  return groups;
}


function uniqueId(info, all, count = 0) {
  const { type, name } = info;
  const suffix = count ? `-${ count }` : "";
  const id = `${ type }-${ name }${ suffix }`;
  if (all.includes(id)) {
    return uniqueId(info, all, ++count);
  } else {
    all.push(id);
    return id;
  }
}

module.exports = parse;