import defaults from "./defaults.js";

/**
 * Provides automatic hierarchal tree for nav creation based on a eleventy collection
 * - Will sort pages by "weight" or "order" (data/frontmatter)
 * @param {Array} collection Eleventy collection
 * @param {Object} options Options for make Tree (see defaults)
 * @param {Object} ctx Optional context object for active state data
 * @returns {Array} Array of entries in format [ { entry<CollectionEntry>, children: [...], url<String>, active<Boolean>, activeTrail<Boolean> }, ...], hierarchy structure
 */
export default function createTree(collection, options, ctx = {}) {
  if (!collection?.length) {
    console.error("Create tree, no collection or items in collection", );
    return;
  }
  const opts = Object.assign({}, defaults, options);
  const { section } = opts;
  const isIndexPage = ctx.page.url === "/";
  const sectionBaseUrl = getSectionBaseUrl(ctx.page.url, opts.sectionStartDepth);

  // Can't make section menu for this page
  if ((section && !sectionBaseUrl) || (section && isIndexPage)) {
    return null;
  }

  let root = { children: [] };

  const entries = collection
    .filter(entry => {
      if (!entry.url || entry.url === "/" || opts.exclude(entry)) {
        return false;
      }
      // Filter by static root or by pages base section
      if (opts.baseUrl) {
        return entry.url.startsWith(opts.baseUrl);
      }
      if (opts.section) {
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

  const cleanup = children => {
    children
      .sort(opts.sorter)
      .forEach(item => {
        const { url } = item.entry;
        cleanup(item.children);
        if (!item.children.length) {
          delete item.children;
        }
        delete item.segment;
        item.url = url;
        item.active = url === ctx?.page.url;
        item.activeTrail = ctx?.page.url.includes(url);
        // Classes for convenience in templating or in toHtml
        const classes = [];
        if (item.active) classes.push(opts.classActive);
        if (item.activeTrail) classes.push(opts.classActiveTrail);
        item.classes = classes.join(" ");
      });
  };
  
  cleanup(tree.children);
  return opts.includeIndex ? [tree] : tree.children;
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