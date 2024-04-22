const htmlDefaults = {
  maxDepth: Infinity, 
  formatLink: (node, ) => node.entry.data.title,
};
/**
 * Output tree as HTML menu list
 */
export default function toHtml(tree, opts) {
  const options = Object.assign({}, htmlDefaults, opts);
  const { maxDepth, formatLink } = options;
  
  const printList = (children, lastDepth = 0) => {
    if (lastDepth >= maxDepth) return;
    const depth = lastDepth + 1;
    const printItems = node => {
      const childList = node.children && depth < maxDepth ? printList(node.children, depth) : "";
      return `
        <li class="tree-menu__item ${ node.classes }">
          <a 
            class="tree-menu__link ${ node.classes }" 
            href="${ node.url }" 
            ${ node.active ? 'aria-current="page"' : '' }
          >${ formatLink(node) }</a>
          ${ childList }
        </li>`;
    }
    return `
      <ul class="tree-menu" data-menu-depth="${ depth }">
        ${ children.map(printItems).join("\n") }
      </ul>`;
  }
  return printList(tree);
}
