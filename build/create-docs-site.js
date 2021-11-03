const path = require("path");
const SiteGenerator = require("./site-generator.js");

module.exports = async function createDocsSite() {
  const site = new SiteGenerator({
    context: __dirname
  });
  await site.create();
};

