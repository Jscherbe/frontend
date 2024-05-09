export default {
  /**
   * How to sort tree nodes within each tree's section
   */
  sorter(a, b) {
    const getData = item => item.entry.data;
    const dataA = getData(a);
    const dataB = getData(b);
    const getWeight = item => item.order || item.weight || 0;
    return getWeight(dataA) - getWeight(dataB) || dataA.title.localeCompare(dataB.title);
  },
  /**
   * Include index page as tree root (versus array of first level pages)
   */
  includeIndex: false,
  /**
   * Exclude an item from being put into the tree (passed collection entry object)
   */
  exclude(entry) {
    return !!entry.data.notInMenuTree; 
  },
  /**
   * Can be either a section string, or true (current page's section)
   */
  baseUrl: null,
  /**
   * Only include the current pages's root section ie if page "/guide/intro" its section is "/guide/"
   * - Can't be used with urlBase
   */
  section: false,
  /**
   * Depth for section menu (ie 1 = "/guide/", 2 = "/guide/subdir/", ...)
   */
  sectionStartDepth: 1,
  /**
   * Class to use for active
   */
  classActive: "is-active",
  /**
   * Class to use when page is in active trail (parent/grandparent/etc of active)
   */
  classActiveTrail: "is-active-trail"
};