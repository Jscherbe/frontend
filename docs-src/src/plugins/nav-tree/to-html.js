const htmlDefaults = {
  /**
   * Base BEM class for menu
   */
  class: "nav",
  /**
   * Depth to stop printing nav tree if children
   */
  maxDepth: Infinity, 
  /**
   * Format link text (or add markup inside <a>)
   * - context has isIndex if using collapsible menu
   */
  formatLink({ node, options, isIndex }) {
    const data = node.entry;
    return isIndex ? 
      data.menuTitle || "Introduction" : 
      data.menuTitle || data.title;
  },
  exclude({ node, isIndexLink }) {
    if (isIndexLink) {
      return !!node.entry.data.hideIndexInMenu;
    } else {
      return node.entry.data.hideInMenu;
    }
  },
  /**
   * Optional other template for toggle
   */
  formatToggle: null,
  /**
   * Label for nav (headline inside wrapper)
   */
  label: false,
  /**
   * Element for label
   */
  labelElement: "h2",
  /**
   * Print container
   * - If false no label and the list is the root element (BEM
   */
  wrapper: true, 
  /**
   * Container element
   */
  wrapperElement: "nav",
  /**
   * Sets collapsible to true
   */
  collapsible: false,
  collapsibleMaxDepth: Infinity,
  /**
   * Determines if link with children is printed as collapsible
   * - Could be frontmatter, could be true for all depths, etc
   * - Wrap items with children in details and put index page in 
   *   inner list with common name (ie. Introduction) at start
   */
  shouldCollapseNode({ node, depth, tree, options }) {
    const { data } = node.entry;
    return options.collapsible && data.collapsible === false ? false : 
      options.collapsible ? depth < options.collapsibleMaxDepth : 
      data.collapsible;
  }
};
/**
 * Output tree as HTML menu list
 */
export default function toHtml(tree, opts) {
  const options = Object.assign({}, htmlDefaults, opts);
  const { maxDepth, formatLink, shouldCollapseNode, exclude } = options;
  const formatToggle = options.formatToggle || formatLink;
  const getClass = child => child ? `${ options.class }__${ child }` : options.class;

  const printItem = (node, depth, isIndex) => {
    const ctx = { node, options, isIndex };
    if (exclude(ctx)) {
      return "";
    }
    const showChildren = node.children && depth < maxDepth;
    if (
      !isIndex && 
      showChildren && 
      shouldCollapseNode({ node, depth, tree, options })
    ) {
      return `
        <li class="${ getClass("item") } ${ node.classes }">
          <details 
            class="${ getClass("collapsible") }" 
            ${ node.activeTrail ? "open" : ""}
          >
            <summary class="${ getClass("toggle") }">
              ${ formatToggle({ node, options }) }
            </summary>
            ${ printList(node.children, depth, node) }
          </details>
        </li>
      `;
    } else {
      let indexLink = exclude({ ...ctx, isIndexLink: true }) ? "" : `
        <a 
          class="${ getClass("link") } ${ isIndex ? getClass("link--index") : "" } ${ node.classes }" 
          href="${ node.url }" 
          ${ node.active ? 'aria-current="page"' : '' }
        >
          ${ formatLink({ node, options, isIndex }) }
        </a>
      `;
      return indexLink ? `
        <li class="${ getClass("item") } ${ node.classes }">
          ${ indexLink }
          ${ showChildren && !isIndex ? printList(node.children, depth) : "" }
        </li>
      ` : "";
    }
    /* eslint-enable */
  };
  /**
   * @param {Array} children Menu items from tree
   * @param {*} lastDepth This is called recursively this is the iteration above
   * @param {*} collapsedNode If within a collapsible this is the node that is collapsed (printed in menu list)
   */
  const printList = (children, lastDepth, collapsedNode) => {
    if (lastDepth >= maxDepth) return;
    const depth = lastDepth + 1;
    const listClass = getClass(options.wrapper ? "list" : false);
    return `
      <ul class="${ listClass }" data-menu-depth="${ depth }">
        ${ collapsedNode ? printItem(collapsedNode, depth, true) : "" }
        ${ children.map(item => printItem(item, depth)).join("\n") }
      </ul>
    `;
  };
  const printLabel = () => {
    return `<${ options.labelElement } class="${ getClass("label") }"></${ options.labelElement }>`;
  };
  const printWithWrapper = () => {
    return `
      <${ options.wrapperElement } class="${ getClass() }">
        ${ options.label ? printLabel() : "" }
        ${ printList(tree, 0) }
      </${ options.wrapperElement }>`
  };
  return options.wrapper ? printWithWrapper() : printList(tree, 0);
}
