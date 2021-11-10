// const matter = require("gray-matter");
// const fs = require("fs-extra");
// const marked = require("marked");
// const { twig } = require("twig");

module.exports = [
  // {
  //   name: "default-js",
  //   test: /.js$/i,
  //   parse(file, content, data, site) {
  //     return marked(content);
  //   }
  // },
  {
    name: "default-markdown",
    test: /.md$/i,
    parse(file, content, data, site) {
      // const data = {};
      // const { content, data } = matter(raw.toString());
      // const content = marked(content);
      // return { data, content };
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
