const { vuepressBadge } = require("../../template-helpers.js");

module.exports = ({ item }) => {
  const { id, title } = item;
  const { context, access, type: variableType } = item.data;
  const { type } = context;
  // content blocks don't get a name/title
  if (type === "content") {
    return;
  }
  // const prefix = type === "variable" ? "$" : type === "placeholder" ? "%" : "";
  // const suffix = ["mixin", "function"].includes(type) ? "()" : "";
  const badges = [ vuepressBadge(type) ];
  // Add variable type
  if (variableType) {
    badges.push(vuepressBadge(variableType, "warn"))
  }
  if (access === "private") {
    badges.push(vuepressBadge("Private", "error"));
  }
  return `
### ${ title } ${ badges.join("") }  {#${ id }} 

  `;
}