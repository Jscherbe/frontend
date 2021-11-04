
/**
 * @todo
 * - Make data structucre not connected to output structure
 *   - How?
 *     - Maybe there is some schema/model in between that show's how data maps to literal output/pages
 *     - Maybe it's created via fields in the nodes
 */
const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");
const matter = require("gray-matter");
const { options: defaults, pageParsers, templateCompilers } = require("./defaults.js");
const newLogger = require("@ulu/node-logger");
function noExtension(file) {
  return file.replace(path.extname(file), "");
}
function resolveOption(value, ...args) {
  return typeof value === "function" ? value(...args) : value;
} 
// const hasRequiredProps = require("./has-required-props.js");
// const hasPageProps = hasRequiredProps([ "title" ]);

class SiteGenerator {
  constructor(options) {
    this.options = Object.assign({}, defaults, options);
    const { outputDir, context, logs } = this.options;
    this.templates = {}; // Base template lookup
    this.outputDir = path.resolve(context, outputDir);
    this.logger = newLogger({ 
      title: "Site Generator",
      enabled: !!logs
    });
    this.data = {
      pages: []
    };
  }
  async create() {
    this.logger.time("SiteGenerator (create)");
    this.logger.log("Creating markup from templates/parsers...");
    await this.addPagesFrom(this.options.pagesDir);
    await this.addTemplatesFrom(this.options.templatesDir);
    this.parsePagesContent();
    await this.output();
    this.logVerbose("Site data", this.data);
    this.logger.timeEnd("SiteGenerator (create)");
  }
  logVerbose(...msgs) {
    if (this.options.verbose) {
      this.logger.log(...msgs);
    }
  }
  loadTemplateFile(template) {
    const compiler = templateCompilers.find(({ test }) => template.file.match(test));
    const { context, templatesDir } = this.options;
    const filepath = path.resolve(context, templatesDir, template.file);
    if (compiler) {
      template.render = compiler.compile(filepath);
      return template.render;
    } else {
      this.logger.error("Unable to find template compiler for ", filepath, template);
    }
  }
  getPageTemplate(name = this.options.defaultTemplate) {
    if (typeof name === "function") return name;
    const template = this.templates[name];
    if (template) {
      return template.render ? template.render : this.loadTemplateFile(template);
    } else {
      this.logger.error("Unable to find page template named", name);
    }
  }
  async output() {
    return Promise.all(
      this.data.pages.map(page => this.outputPage(page))
    );
  }
  async outputPage(page) {
    const { data } = this;
    const { extension } = this.options;
    const template = this.getPageTemplate(page.template);
    if (!template) {
      this.logger.error("Page output skipped for:", page);
      return;
    }
    const results = await template({ page, data });
    if (results) {
      let outputPath = path.resolve(this.outputDir, noExtension(page.file) + resolveOption(extension, page));
      return await fs.outputFile(outputPath, results);
    }
  }
  globFrom(dir, pattern, callback) {
    const cwd = path.resolve(this.options.context, dir);
    return new Promise((resolve, reject) => {
      glob(pattern, { cwd }, (err, files) => {
        if (err) {
          this.logger.error(`glob (${ pattern })`, err);
          reject(err);
        } else {
          resolve(callback(files));
        }
      });
    });
  }
  addTemplatesFrom(dir) {
    const { matchTemplates } = this.options;
    return this.globFrom(dir, matchTemplates, files => {
      if (files && files.length) {
        files.forEach(file => {
          this.templates[noExtension(file)] = { file };
        });
      }
    });
  }
  addPages(pages) {
    this.data.pages.push(...pages);
  }
  addPagesFrom(dir) {
    return this.globFrom(dir, this.options.matchPages, files => {
      if (files && files.length) {
        this.addPages(files.map(file => {
          const raw = fs.readFileSync(path.resolve(this.options.context, dir, file));
          const { content, data } = matter(raw.toString());
          const { title, uid, template } = data;
          return { file, data, content, title, uid, template };
        }).filter(page => page));
      }
    });
  }
  parsePagesContent() {
    const { pages } = this.data;
    if (!pages) return;
    pages.forEach(page => {
      if (page.content) {
        const { value, parser } = this.parseContent(page);
        if (value) {
          page.html = value;
          page.parser = parser.name;
        }
      }
    });
  }
  parseContent({ file, content, data }) {
    const parser = pageParsers.find(({ test }) => file.match(test));
    if (parser) {
      return {
        parser,
        value: parser.parse(file, content, data, this.data)
      };
    } else {
      this.logger.warn(`No parser match for file: ${ file }, file will be included`);
    }
  }
}

module.exports = SiteGenerator;