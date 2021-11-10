// const matter = require("gray-matter");
const fs = require("fs-extra");
// const marked = require("marked");
const { twig } = require("twig");

module.exports = [
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