/* eslint-env node */
import path from "path";
// import { fileURLToPath } from "url";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import markdownItAnchor from "markdown-it-anchor";
import tocPlugin from "eleventy-plugin-nesting-toc";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import navTreePlugin from "./docs-src/src/plugins/nav-tree/index.js";
// import sassPlugin from "./docs-src/src/plugins/sass/index.js";
import sassdocPlugin from "./docs-src/src/plugins/sassdoc/index.js";
import optionsTablePlugin from "./docs-src/src/plugins/options-table/index.js";
import jsdocPlugin from "./docs-src/src/plugins/jsdoc/index.js";
import markdownItAttrs from "markdown-it-attrs";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { NO_DOC_GEN } = process.env;

export default async function(eleventyConfig) {
  eleventyConfig.setServerOptions({ 
    port: 8080, // Needed for asset server
    domDiff: false, // Messes up asset server (removes vite embeddedstyles from head)
  }); 
  eleventyConfig.addPassthroughCopy("src");
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addPlugin(tocPlugin, {
    tags: ["h2", "h3", "h4"],
    wrapper: "div",
    headingText: "On this page"
  });
  eleventyConfig.addPlugin(syntaxHighlight);
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
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);  // Overwrite asset paths like hugo
  eleventyConfig.addPlugin(navTreePlugin, {
    toHtml: {
      formatLink: menuLinkFormatter,
      formatToggle: menuToggleFormatter
    }
  }); 
  
  return {
    dir: {
      input: "docs-src/content",
      output: "docs-dist-temp",
      includes: "../src/templates",
      layouts: "../src/templates/layouts",
      data: "../src/data",
    }
  };
}

function menuLinkFormatter({ node, options, isIndex }) {
  const { data } = node.entry;
  const classname = options.class;
  const icon = () => `
    <span class="${ classname }__icon" data-feather="${ data.icon }" aria-hidden="true"></span>
  `;
  return `
    ${ data.icon && !isIndex ? icon() : "" }
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
    <span class="${ classname }__toggle-icon" data-feather="chevron-up" aria-hidden="true"></span>
  `;
}
