module.exports = {
  dir: "",
  debug: true,
  debugToFile: null,
  pathBase: "/sass/",
  addPageData: false,
  addPageDataKey: "sassdocGroup",
  sassdocOptions: {
    verbose: true
  },
  pageTemplate: require("./page-template.js"),
  getPageTitle(groupName) {
    const capitolize = word => word.charAt(0).toUpperCase() +
    word.slice(1).toLowerCase();
    return groupName.replace(/\w\S*/g, capitolize)
  },
  sort(a,b) {
    return '' + a.frontmatter.title.localeCompare('' + b.frontmatter.title)
  },
  alterPage(page) {
    // Change the page
  }
}