// Idea to cache menu tree and then just filter it in templates
// - May come back to this
// import createTree from "../plugins/nav-tree/create-tree.js";

// export const siteMenu = (data) => {
//   const { collections } = data;
//   // See https://github.com/11ty/eleventy/issues/1278#issuecomment-894374284
//   // Empty at first
//   if (collections?.all?.length) {
//     return createTree(data.collections.all, {}, data);
//   }
// }