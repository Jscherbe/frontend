const { vuepressBadge } = require("../../helper-templates.js");

module.exports = ({ item }) => {
  const { id, title } = item;
  const { context, access } = item.data;
  const { type } = context;
  // const prefix = type === "variable" ? "$" : type === "placeholder" ? "%" : "";
  // const suffix = ["mixin", "function"].includes(type) ? "()" : "";
  const badges = [ vuepressBadge(type) ];
  // Add variable type
  if (item.type) {
    badges.push(vuepressBadge(item.type, "warn"))
  }
  if (access === "private") {
    badges.push(vuepressBadge("Private", "error"));
  }
  return `
### ${ title } ${ badges.join("") }  {#${ id }} 

  `;
}