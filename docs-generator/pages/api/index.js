const { resolve } = require("path");
const { parse } = require("sassdoc");
const { outputFile } = require("fs-extra");
const loggerOptions = { title: "Sassdocs Data" };
const logger = require("@ulu/node-logger")(loggerOptions);
const sassDir = resolve(__dirname, "../../../scss/");
const logWrite = (f, d) => outputFile(
  resolve(__dirname, "log/", f), 
  JSON.stringify(d, null, 2)
);

module.exports = async function apiData() {
  const items = await parse(sassDir);
  const groups = Object.create(null);

  items.forEach(item => {
    const { group } = item;
    if (group) {
      if (!groups[group]) groups[group] = [];
      groups[group].push(item);
    } else {
      logger.warn("No matching group found", item);
    }
  });

  await logWrite("sasdoc-data.json", data);
  await logWrite("sasdoc-clean.json", clean);
  return groups;
}