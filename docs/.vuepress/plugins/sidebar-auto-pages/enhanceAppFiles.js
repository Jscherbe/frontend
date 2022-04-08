/**
 * Adds config for sidebar based on page's paths, grouping by section
 * - Options can be passed in user's themeConfig.sidebarAutoPages
 */
export default ({
  siteData, // site metadata
  isServer // is this enhancement applied in server-rendering or client
}) => {
  if (!siteData.themeConfig) {
    siteData.themeConfig = {};
  }
  siteData.themeConfig.sidebar = createSidebar(siteData.pages, themeConfig.sidebarAutoPages || {});
}

/**
 * Creates a sidebar config based on page path structure
 */
function createSidebar(pages, opts) {
  const defaults = {
    sort,
    collapsable: false,
    initialOpenGroupIndex: -1,
    allSections: false, // If true it should show the whole tree else show by section (landing page)
    modify: null, // Callback function to modify an initial group (ie. change title, etc)(incudes extra page variable in group to get info from)
    modifyForChildren: null, // Modify a group that has children (comes after modify)
  };
  const options = Object.assign({}, defaults, opts);
  // Get page path information
  const items = pages.map(page => {
    const segments = page.regularPath.split("/").filter(i => i !== "");
    return { page, segments };
  });
  // Reduce the flat list into a sidebar groups by each page's segments
  const all = items.reduce((groups, item) => {
    let current = groups;
    item.segments.forEach(segment => {
      let group = current?.children?.find(g => g.segment === segment);
      if (!group) {
        if (!current.children) {
          prepForChildren(current, options)
        }
        group = newGroup(item, segment, options)
        current.children.push(group);
      }
      current = group;
    });
    return groups;
  }, []);

  sortChildren(all, options);
  removeLocalProps(all);
  
  // No sidebar because there are no pages? (not sure if this can happen)
  if (!all.children) {
    return false; 
  // Full menu of all sections
  } else if (options.allSections) {
    return all.children;
  // Breakup up into sidebar's section api (object by section path)
  } else {
    return all.children.reduce((sections, group) => {
      sections[group.path] = [group];
      return sections;
    }, {});
  }
} 
/**
 * Default sorting for children
 * - Sort by weight/order and if equal (ie. 0) fallback to alphbetical
 * - Or if order/weight not present = 0 fallback to alphabetical
 */
function sort(a, b) {
  const getWeight = p => p.frontmatter.weight || p.frontmatter.order || 0;
  const getTitle = p => '' + p.title; // Force string
  return  getWeight(a) - getWeight(b) || getTitle(a).localeCompare(getTitle(b));
}
/**
 * Go through all groups and their children and apply sorting 
 */
function sortChildren(group, options) {
  if (group?.children?.length) {
    group.children.sort((a, b) => {
      return options.sort(a.page, b.page);
    });
    group.children.forEach(g => sortChildren(g, options));
  }
}
/**
 * Create a new group (could be single page in menu or future group with children)
 */
function newGroup(item, segment, options) {
  const group = {
    title: item.page.title,
    path: item.page.regularPath,
    segment: segment,
    page: item.page
  };
  if (options.modify) {
    options.modify(group);
  }
  return group;
}
/**
 * Sets properties on pre-existing group to prepare to add children (nested groups)
 */
function prepForChildren(group, options) {
  group.children = [];
  group.collapsable = options.collapsable;
  group.type = "group";
  group.initialOpenGroupIndex = options.initialOpenGroupIndex;
  if (options.modifyForChildren) {
    options.modifyForChildren(group);
  }
}
/**
 * Remove the extra properties in groups used by this module (page, segment)
 */
function removeLocalProps(group) {
  delete group.segment;
  delete group.page;
  if (group.children) {
    group.children.forEach(removeLocalProps);
  }
}