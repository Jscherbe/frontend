/**
 * Only include items in the tree that lead to the active page
 * @param {Array} tree Tree from createTree
 */
export default function activeTrailOnly(tree) {
  // let addedInactive = false;
  const prune = (acc, node) => {
    // debugger;
    // const activeSibling = array.some(node => node.active);
    // Print out items but restrice to
    const clone = { ...node };
    delete clone.children;

    if (node.children && node.activeTrail) {
      clone.children = node.children.reduce(prune, [])
    }
    acc.push(clone);
    return acc;
  };
  const result = tree.reduce(prune, []);
  // console.log(tree);
  // console.log(result);
  
  return result;
}