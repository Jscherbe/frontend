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
   */
  formatLink: (node, options) => node.entry.data.title,
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
  wrapperElement: "nav"
};
/**
 * Output tree as HTML menu list
 */
export default function toHtml(tree, opts) {
  const options = Object.assign({}, htmlDefaults, opts);
  const { maxDepth, formatLink } = options;
  const printClass = child => child ? `${ options.class }__${ child }` : options.class;
  
  const printList = (children, lastDepth = 0) => {
    if (lastDepth >= maxDepth) return;
    const depth = lastDepth + 1;
    const printItems = node => {
      const childList = node.children && depth < maxDepth ? printList(node.children, depth) : "";
      /* eslint-disable */
      return `
        <li class="${ printClass("item") } ${ node.classes }">
          <a 
            class="${ printClass("link") } ${ node.classes }" 
            href="${ node.url }" 
            ${ node.active ? 'aria-current="page"' : '' }
          >${ formatLink(node, options) }</a>
          ${ childList }
        </li>`;
      /* eslint-enable */
    };
    const listClass = printClass(options.wrapper ? "list" : false);
    return `
      <ul class="${ listClass }" data-menu-depth="${ depth }">
        ${ children.map(printItems).join("\n") }
      </ul>`;
  };
  const printLabel = () => {
    return `<${ options.labelElement } class="${ printClass("label") }"></${ options.labelElement }>`;
  };
  const printWithWrapper = () => {
    return `
<${ options.wrapperElement } class="${ printClass() }">
  ${ options.label ? printLabel() : "" }
  ${ printList(tree) }
</${ options.wrapperElement }>`
  };
  return options.wrapper ? printWithWrapper() : printList(tree);
  
}
