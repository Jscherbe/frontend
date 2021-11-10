class Tree {
  constructor(root = null) {
    this.children = Object.create(null); // Child Trees with their own nodes
    this.nodes = Object.create(null); // Data Points
    this.root = root;
  }
  addNode(name, value) {
    this.nodes[name] = value;
  }
  addChild(name) {
    if (this.children[name]) return;
    this.children[name] = new Tree(this);
  }
  getChild(name) {
    return this.children[name];
  }
}
module.exports = Tree;