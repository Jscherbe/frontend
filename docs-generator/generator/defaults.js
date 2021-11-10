
module.exports = {
  logs: true,
  verbose: false,
  extension: ".html",
  matchTemplates: "*.twig",
  matchContent: "**/*.+(md|twig|html|js)",
  context: process.cwd(),
  contentDir: "pages/",
  templatesDir: "templates/",
  outputDir: "dist/",
  // linkAliasesEnabled: true,
  // linkAliases: {
  //   "homepage" : "/",
  //   "frontpage" : "/"
  // },
  parsers: null,
  defaultTemplate: "default"
};