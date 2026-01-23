/* eslint-env node */
import { EleventyHtmlBasePlugin, EleventyRenderPlugin } from "@11ty/eleventy";
import markdownItAnchor from "markdown-it-anchor";
import tocPlugin from "eleventy-plugin-nesting-toc";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownItAttrs from "markdown-it-attrs";

import navTreePlugin from "./src/plugins/nav-tree/index.js";
// import sassPlugin from "./src/plugins/sass/index.js";
import sassdocPlugin from "./src/plugins/sassdoc/index.js";
import optionsTablePlugin from "./src/plugins/options-table/index.js";
import jsdocPlugin from "./src/plugins/jsdoc/index.js";
import { shortcodes, pairedShortcodes } from "./src/templates/shortcodes/index.js";

const { NO_DOC_GEN, IS_PRODUCTION } = process.env;

export default async function(eleventyConfig) {
  eleventyConfig.setQuietMode(true); // Reduce logs
  eleventyConfig.setServerOptions({ 
    port: 8080, // Needed for asset server
    domDiff: false, // Messes up asset server (removes vite embedded styles from head)
  }); 
  // eleventyConfig.addPassthroughCopy("src");
  eleventyConfig.addPassthroughCopy("site/src/pages/.nojekyll"); 
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addWatchTarget("site/src/pages/**/*.twig");

  eleventyConfig.addPlugin(tocPlugin, {
    tags: ["h2", "h3"],
    wrapper: "div",
    headingText: "Jump To:"
  });
  eleventyConfig.addPlugin(syntaxHighlight, {
    async init({ Prism }) {
      await import("prismjs/plugins/custom-class/prism-custom-class.js")
        .then(() => console.log("Prism plugin loaded"))
        .catch((err) => console.error(err));

      Prism.plugins.customClass.prefix("pjs-");
    }
  });
  eleventyConfig.amendLibrary("md", md => {
    md.use(markdownItAttrs);
    md.use(markdownItAnchor);
  });
  // eleventyConfig.addPlugin(sassPlugin, {
  //   addCwd: true,
  //   sass: {
  //     loadPaths: [ common.paths.sassTheme ],
  //   }
  // }); 
  // eleventyConfig.addWatchTarget(common.paths.sassTheme);
  if (!NO_DOC_GEN) {
    eleventyConfig.addPlugin(jsdocPlugin);
    eleventyConfig.addPlugin(sassdocPlugin);
  }
  
  eleventyConfig.addPlugin(optionsTablePlugin);
  // Overwrite asset paths like hugo
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);  
  // Allow importing MD from outside sources (ie. Changelog)
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(navTreePlugin, {
    toHtml: {
      formatLink: menuLinkFormatter,
      formatToggle: menuToggleFormatter,
      shouldCollapseNode({ node, depth }) {
        const demoPage = node.url.startsWith("/demos/");
        return demoPage ? depth < 2 : true;
      }
    }
  }); 
  // Register all site shortcodes
  Object.entries(shortcodes)
    .forEach(([name, fn]) => eleventyConfig.addShortcode(name, fn));
  Object.entries(pairedShortcodes)
    .forEach(([name, fn]) => eleventyConfig.addPairedShortcode(name, fn));
  
  return {
    dir: {
      input: "site/src/pages",
      includes: "../templates",
      layouts: "../templates/layouts",
      data: "../data",
    }
  };
}

function menuLinkFormatter({ node, options, isIndex }) {
  const { data } = node.entry;
  const classname = options.class;
  const icon = () => `
    <span class="${ classname }__icon ${ data.iconClass }" aria-hidden="true"></span>
  `;
  return `
    ${ data.iconClass && !isIndex ? icon() : "" }
    <span class="${ classname }__text">
      ${ isIndex ? "Introduction" : data.title }
    </span>
  `;
}
function menuToggleFormatter({ node, options }) {
  const classname = options.class;
  return `
    <span class="${ classname }__toggle-content">
      ${ menuLinkFormatter({ node, options }) }
    </span>
    <span class="${ classname }__toggle-icon fas fa-chevron-down" aria-hidden="true"></span>
  `;
}
