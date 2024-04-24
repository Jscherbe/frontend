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
    return isIndex ? "Introduction" : node.entry.data.title;
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
   * Wrap items with children in details and put index page in 
   * inner list with common name (ie. Introduction) at start
   */
  collapsible: false,
};
/**
 * Output tree as HTML menu list
 */
export default function toHtml(tree, opts) {
  const options = Object.assign({}, htmlDefaults, opts);
  const { maxDepth, formatLink, collapsible } = options;
  const formatToggle = options.formatToggle || formatLink;
  const printClass = child => child ? `${ options.class }__${ child }` : options.class;

  const printItem = (node, depth, isIndex) => {
    const showChildren = node.children && depth < maxDepth;
    if (collapsible && showChildren && !isIndex) {
      return `
<li class="${ printClass("item") } ${ node.classes }">
  <details 
    class="${ printClass("collapsible") }" 
    ${ node.activeTrail ? "open" : ""}
  >
    <summary class="${ printClass("toggle") }">
      ${ formatToggle({ node, options }) }
    </summary>
    ${ printList(node.children, depth, node) }
  </details>
</li>
      `;
    } else {
      return `
<li class="${ printClass("item") } ${ node.classes }">
  <a 
    class="${ printClass("link") } ${ isIndex ? printClass("link--index") : "" } ${ node.classes }" 
    href="${ node.url }" 
    ${ node.active ? 'aria-current="page"' : '' }
  >
    ${ formatLink({ node, options, isIndex }) }
  </a>
  ${ showChildren && !isIndex ? printList(node.children, depth) : "" }
</li>
      `;
    }
    /* eslint-enable */
  };
  const printList = (children, lastDepth, indexNode) => {
    if (lastDepth >= maxDepth) return;
    const depth = lastDepth + 1;
    const listClass = printClass(options.wrapper ? "list" : false);
    return `
<ul class="${ listClass }" data-menu-depth="${ depth }">
  ${ collapsible && indexNode ? printItem(indexNode, depth, true) : "" }
  ${ children.map(item => printItem(item, depth)).join("\n") }
</ul>
    `;
  };
  const printLabel = () => {
    return `<${ options.labelElement } class="${ printClass("label") }"></${ options.labelElement }>`;
  };
  const printWithWrapper = () => {
    return `
<${ options.wrapperElement } class="${ printClass() }">
  ${ options.label ? printLabel() : "" }
  ${ printList(tree, 0) }
</${ options.wrapperElement }>`
  };
  return options.wrapper ? printWithWrapper() : printList(tree, 0);
  
}
