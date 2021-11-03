exports.options = {
  logs: true,
  verbose: false,
  extension: ".html",
  matchTemplates: "*.twig",
  matchPages: "**/*.+(md|twig|html)",
  context: process.cwd(),
  pagesDir: "pages/",
  templatesDir: "templates/",
  outputDir: "dist/",
  linkAliasesEnabled: true,
  linkAliases: {
    "homepage" : "/",
    "frontpage" : "/"
  },
  parsers: null,
  defaultTemplate: "default"
};

const fs = require("fs-extra");
const marked = require("marked");
const { twig } = require("twig");

exports.pageParsers = [
  {
    name: "default-markdown",
    test: /.md$/i,
    parse(file, content, data, site) {
      return marked(content);
    }
  },
  {
    name: "default-html",
    test: /.html$/i,
    parse(file, content, data, site) {
      return content;
    }
  },
  {
    name: "default-twig",
    test: /.twig$/i,
    parse(file, content, data, site) {
      const template = twig({ data: content });
      return template.render({ file, page: data, site });
    }
  }
];


exports.templateCompilers = [
  {
    name: "default-twig",
    test: /.twig$/i,
    compile(filepath) {
      const fileContent = fs.readFileSync(filepath);
      const template = twig({ data: fileContent.toString() });
      return d => template.render(d);
    }
  }
];