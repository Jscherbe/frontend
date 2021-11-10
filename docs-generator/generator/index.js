const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");
const stringify = require("json-stringify-safe")
const defaults = require("./defaults.js");
const Tree = require("./tree.js");
const logger = require("@ulu/node-logger");
const title = "Site Generator";


 
class SiteGenerator {
  constructor(options) {
    this.options = Object.assign({}, defaults, options);
    this.templates = Object.create(null); // Template lookup table
    this.logger = logger({ title });
    this.content = {}; // Hold site content / data
  }
  async create() {
    const { contentDir, context, matchContent } = this.options;
    if (contentDir) {
      await this.addContent(contentDir, context, matchContent);
    }
    
  }
  async addContent(dir, context, pattern) {
    const from = path.resolve(context, dir);
    return this.globFrom(from, pattern, files => {
      if (files && files.length) {
        const tree = this.globToTree(files, from);
        fs.outputFile(path.resolve(__dirname, '../log/tree.json'), stringify(tree, null, 2));
        // Map files to tree based on directory
        // this.addPages(files.map(file => {
        //   const absolutePath = path.resolve(this.options.context, dir, file);
        //   const raw = fs.readFileSync(absolutePath);
        //   const { content, data } = matter(raw.toString());
        //   const { title, uid, template } = data;
        //   return { file, data, content, title, uid, template };
        // }).filter(page => page));
      }
    });
  }
  globToTree(files, context) {
    const tree = new Tree();
    // Returns (and creates) the deepest branch based on file's directories
    function getTree(file) {
      const directory = path.dirname(file);
      const parts = directory.split("/");
      let current = tree; // Holds last key
      // Root directory is root of tree
      if (directory === ".") {
        return current;
      }
      // Add other directories to tree and set current to the furthest
      for (const part of parts) {
        if (!current.getChild(part)) current.addChild(part);
        current = current.getChild(part);
      }
      return current;
    }

    // go through each file and get it's current subtree in the 
    // root tree then add the node to it
    for (const file of files) {
      const filename = path.basename(file);
      const ext = path.extname(file);
      const key = filename.replace(ext, "");
      getTree(file).addNode(key, {
        path: path.resolve(context, file),
        context,
        file
      });
    }
    return tree;
  }
  globFrom(cwd, pattern, callback) {
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
}
module.exports = SiteGenerator;