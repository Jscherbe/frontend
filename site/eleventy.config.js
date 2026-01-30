/* eslint-env node */
import { EleventyHtmlBasePlugin, EleventyRenderPlugin } from "@11ty/eleventy";
import markdownItAnchor from "markdown-it-anchor";
import tocPlugin from "eleventy-plugin-nesting-toc";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownItAttrs from "markdown-it-attrs";
import navTreePlugin from "@ulu/eleventy-plugin-nav-tree";
import sassdocPlugin from "./src/plugins/sassdoc/index.js";
import optionsTablePlugin from "./src/plugins/options-table/index.js";
import jsdocPlugin from "./src/plugins/jsdoc/index.js";
import { shortcodes, pairedShortcodes } from "./src/templates/shortcodes/index.js";

const { NO_DOC_GEN } = process.env;

export default async function(eleventyConfig) {
  eleventyConfig.setQuietMode(true); // Reduce logs
  eleventyConfig.addPassthroughCopy("site/pages/.nojekyll"); 
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addWatchTarget("site/pages/**/*.twig");

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

  if (!NO_DOC_GEN) {
    eleventyConfig.addPlugin(jsdocPlugin);
    eleventyConfig.addPlugin(sassdocPlugin);
  }
  
  // Adds table markup output from data
  eleventyConfig.addPlugin(optionsTablePlugin);

  // Overwrite asset paths like hugo
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);  

  // Allow importing MD from outside sources (ie. Changelog)
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Builds Navigation
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
      input: "site/pages",
      includes: "../src/templates",
      layouts: "../src/templates/layouts",
      data: "../src/data",
    }
  };
}

function menuLinkFormatter({ node, options, isCollapsibleIndex }) {
  const { data } = node.entry;
  const classname = options.class;
  const icon = () => `
    <span class="${ classname }__icon ${ data.iconClass }" aria-hidden="true"></span>
  `;
  return `
    ${ data.iconClass && !isCollapsibleIndex ? icon() : "" }
    <span class="${ classname }__text">
      ${ isCollapsibleIndex ? "Introduction" : data.title }
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
