import pluginNavigation from "@11ty/eleventy-navigation";

/**
 * Setup common things needed in all 11ty sites
 * @param {Object} eleventyConfig 
 */
export default function setupEleventyConfig(eleventyConfig) {

  eleventyConfig.addPlugin(pluginNavigation);
  // Add ability to access data from nav entry
  eleventyConfig.addFilter("getNavEntryData", function(entry) {
    return getEntryPage(this.ctx, entry);
  });
  // Filter that runs on 
  eleventyConfig.addFilter("navEntriesWithPage", function(entries) {
    const clone = structuredClone(entries);
    const { ctx } = this;
    const setupEntry = entry => {
      entry.page = getEntryPage(ctx, entry);
      if (entry?.children?.length) {
        entry.children.forEach(setupEntry);
      }
    };
    clone.forEach(setupEntry);
    return clone;
    
  });
}


function getEntryPage(ctx, entry) {
  const all = ctx.collections.all;
  const page = all.find(p => p.url === entry.url);
  if (page) {
    return page;
  } else {
    throw new Error("<< filters [helper]: getEntryPage() >> Unable to find page from menu entry");
  }
}