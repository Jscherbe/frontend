const { vuepressBadge } = require("../../helper-templates.js");

module.exports = ({ item }) => {
  const { context, access, _hash } = item;
  const { type, name } = context;
  const prefix = type === "variable" ? "$" : type === "placeholder" ? "%" : "";
  const suffix = ["mixin", "function"].includes(type) ? "()" : "";
  const badges = [ vuepressBadge(type) ];
  // Add variable type
  if (item.type) {
    badges.push(vuepressBadge(item.type, "warn"))
  }
  if (access === "private") {
    badges.push(vuepressBadge("Private", "error"));
  }
  return `
### ${ prefix }${ name }${ suffix } ${ badges.join("") }  {#${ _hash }} 


  `;
}