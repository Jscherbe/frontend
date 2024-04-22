export const defaults = {
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
    return false;
  },
  /**
   * Can be either a section string, or true (current page's section)
   */
  baseUrl: null,
  /**
   * Only include the current pages's root section ie if page "/guide/intro" its section is "/guide/"
   * - Can't be used with urlBase
   */
  sectionMenu: false,
  /**
   * Depth for section menu (ie 1 = "/guide/", 2 = "/guide/subdir/", ...)
   */
  sectionDepth: 1,
  /**
   * Class to use for active
   */
  classActive: "is-active",
  /**
   * Class to use when page is in active trail (parent/grandparent/etc of active)
   */
  classActiveTrail: "is-active-trail"
};

/**
 * Provides automatice hierachal tree for nav creation based on a eleventy collection
 * - Will sort pages by "weight" or "order" (data/frontmatter)
 * @param {Array} collection Eleventy collection
 * @param {Object} options Options for make Tree (see defaults)
 * @param {Object} ctx Optional context object for active state data
 * @returns {Array} Array of entries in format [ { entry<CollectionEntry>, children: [...], url<String>, active<Boolean>, activeTrail<Boolean> }, ...], hierachy structure
 */
export function createTree(collection, options, ctx = {}) {
  const opts = Object.assign({}, defaults, options);
  const { sectionMenu } = opts;
  const isIndexPage = ctx.page.url === "/";
  const sectionBaseUrl = getSectionBaseUrl(ctx.page.url, opts.sectionDepth);

  // Can't make section menu for this page
  if ((sectionMenu && !sectionBaseUrl) || (sectionMenu && isIndexPage)) {
    return null;
  }

  if (sectionMenu) {
    console.log("sectionDepth:\n", opts.sectionDepth);
    console.log("sectionBaseUrl:\n", sectionBaseUrl);
  }

  let root = { children: [] };
  
  const entries = collection
    .filter(entry => !opts.exclude(entry))
    .filter(entry => entry.url && entry.url !== "/")
    .filter(entry => {
      // Filter by static root or by pages base section
      if (opts.baseUrl) {
        return entry.url.startsWith(opts.baseUrl);
      }
      if (opts.sectionMenu) {
        return entry.url.startsWith(sectionBaseUrl);
      } else {
        return true;
      }
    })
    .sort((a, b) => {
      const urlA = a.url.slice(1);
      const urlB = b.url.slice(1);
      // Compare paths case-insensitively for natural sorting
      return urlA.localeCompare(urlB, undefined, { ignorePunctuation: true });
    });

  if (opts.includeIndex) {
    const indexPage = collection.find(entry => entry.url === "/");
    if (indexPage) {
      root = { 
        entry: indexPage, 
        children: [],
      };
    }
  }

  const tree = entries.reduce((acc, entry) => {
      let current = acc;
      const segments = entry.url.match(/\/[^\/]+/g);
      if (segments) {
        segments.forEach((_, index) => {
          // Get the current part of the path ie "/guide/test" "/test" to test locally
          const segment = segments.slice(0, index + 1).join("");
          // See if any children match this segement (if so belongs in there)
          const existing = current.children.find(entry => entry.segment === segment);
          if (existing) {
            current = existing;
          } else {
            current.children.push({ entry, segment, children: [] });
            current = current.children[current.children.length - 1];
          }
        });
      }
      return acc;
    }, root);

    
  const cleanup = item => {
    const { url } = item.entry;
    item.children.sort(opts.sorter);
    item.children.forEach(cleanup);
    if (!item.children.length) delete item.children;
    delete item.segment;
    item.url = url;
    item.active = url === ctx?.page.url;
    item.activeTrail = ctx?.page.url.includes(url);
    // Classes for convienence in templating or in toHtml
    const classes = [];
    if (item.active) classes.push(opts.classActive);
    if (item.activeTrail) classes.push(opts.classActiveTrail);
    item.classes = classes.join(" ");
  };

  tree.children.forEach(cleanup);
  return opts.includeIndex ? [tree] : tree.children;
}


/**
 * Output tree as HTML menu list
 */
export function toHtml(tree, maxDepth = Infinity, linkText = node => node.entry.data.title) {
  return printList(tree);
  
  function printList(children, lastDepth = 0) {
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
          >${ linkText(node) }</a>
          ${ childList }
        </li>`;
    }
    return `
      <ul class="tree-menu" data-menu-depth="${ depth }">
        ${ children.map(printItems).join("\n") }
      </ul>`;
  }
}


function getSectionBaseUrl(url, depth = 1) {
  if (depth < 1) {
    throw new Error("Depth parameter must be a positive integer.");
  }

  let currentSlashIndex = url.indexOf("/");
  let segmentCount = 0;

  while (currentSlashIndex !== -1 && segmentCount < depth) {
    segmentCount++;
    currentSlashIndex = url.indexOf("/", currentSlashIndex + 1);
  }

  // Handle URLs without enough slashes or invalid depth
  if (segmentCount < depth || currentSlashIndex === -1) {
    return false;
  }
  return url.slice(0, currentSlashIndex);
}