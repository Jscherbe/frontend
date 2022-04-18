const { titleCase, itemsByType } = require("./utils.js");

module.exports = {
  /**
   * The directory that sassdocs will parse and make pages from
   */
  dir: "",
  /**
   * Plugin development flag (output logs, etc)
   */
  debug: true,
  /**
   * Print out sassdoc data (used for developing plugin)
   */
  debugToFile: null,
  /**
   * Path to prefix to all paths generated for sassdocs
   * - Sassdoc plugin creates pages of items per group
   * - Example, if "/sass/" is set and an item(s) have a group of 'settings' a page is created at /sass/settings/
   */
  pathBase: "/sass/",
  /**
   * Sassdoc library options
   */
  sassdocOptions: { verbose: true },
  /**
   * What access types are printed
   */
  access: ["public"],
  /**
   * Controls order and which annotations are printed
   */
  annotations: [
    "name",
    "description",
    "deprecated",
    "type", 
    "property",
    "example",
    "parameter",
    "return",
    "output",
    "throw",
    "link",
    "since",
    "todo"
  ],
  /**
   * Should return an object where the keys are the section's title and the values are teh items to display in that section
   * @param {Object} group The group's items, to divide into sections
   */
  pageSections(group) {
    return {
      variables: itemsByType(group, "variable"),
      mixins: itemsByType(group, "mixin"),
      functions: itemsByType(group, "function"),
      placeholders: itemsByType(group, "placeholder")
    };
  },
  /**
   * Determines how the file paths (to group or item is displayed)
   * @param {String} itemPath The items relative path from the directory sassdoc parsed
   */
  displayItemPath(itemPath) {
    return itemPath;
  },
  /**
   * Provide custom markdown templates for things like the page, item, etc
   */
  templates: {},
  /**
   * Provide custom markdown templates for the annotations of a documented item
   */
  annotationTemplates: {},
  /**
   * Callback function used to format the page title (from the group name)
   * @param {String} name Group's name
   */
  getPageTitle: titleCase,
  /**
   * Enable iframe previews of item's (ie. mixin) that have examples of the "html" type
   * - Used in order to see the markup in action (ie. applied to stylesheet)
   * - See 'previewMeta'
   */
  previewEnabled: true,
  /**
   * Styles applied to the iframe element
   */
  previewStyles: "height:100%; width:100%; border: none;",
  /**
   * Meta/Head of the iframe that is generated to display the example
   * - Use this to link stylesheet/scripts etc
   */
  previewMeta: `
    <title>Sassdoc Example</title> 
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
    <link rel="stylesheet" href="/sassdoc-preview.css">
  `,
  previewBodyScripts: `
    <script src="/sassdoc-preview.js"></script>
  `,
  /**
   * Callback used to sort (array method) the pages before adding to Vuepress
   * - You can access 'title' and 'sassdocGroupName' from the page.frontmatter property
   * - This is passed (page, anotherPage) to be compared by Array.prototype.sort
   */
  sort(a,b) {
    return '' + a.frontmatter.title.localeCompare('' + b.frontmatter.title)
  },
  /**
   * Callback when page's have been generated/sorted before adding to Vuepress
   * - Could be used to modify page object
   * - Could be used to remove pages
   * - Could be used to do something with page data
   */
  onReady(pages) {
    // Change the page
  },
}