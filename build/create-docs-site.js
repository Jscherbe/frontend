const path = require("path");
const { SiteGenerator } = require("./generator/index.js");

module.exports = async function createDocsSite() {
  const site = new SiteGenerator({
    context: __dirname
  });
  await site.create();
};

