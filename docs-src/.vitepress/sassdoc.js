import fs from "fs-extra";
import { resolve, dirname, join } from "path";
import { outputPages } from "@ulu/vitepress-sassdoc";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dist = resolve(__dirname, "../");

const configs = [
  {
    dist,
    dir: resolve(__dirname, "../../scss/"),
    pathBase: "/core/",
    sassdocOptions: {
      exclude: [
        "base/*",
        "components/*",
        "helpers/*",
        "packages/*",
        "stylesheets/*",
      ]
    }
  },
  newSubConfig("/base/"),
  newSubConfig("/components/"),
  newSubConfig("/helpers/"),
  newSubConfig("/stylesheets/"),
];


let running = false;

(async () => {
  try {
    await output();
  } catch (error) {
    console.log(error);
  }
})();

async function output() {
  if (!running) {
    running = true;
    cleanOutputDir();
    let pending = configs.map(c => outputPages(c));
    await Promise.all(pending);
    running = false;
  }
}

function newSubConfig(pathBase) {
  return {
    dir: resolve(__dirname, "../../scss/", pathBase),
    dist,
    pathBase
  };
}

function cleanOutputDir(config) {
  const outputPath = join(config.dist, config.pathBase);
  const dir = fs.readdirSync(outputPath);
  dir.forEach(item => {
    const fullpath = join(outputPath, item);
    // Delete if directory (was created by sassdoc plugin)
    if (fs.lstatSync(fullpath).isDirectory()) {
      fs.removeSync(fullpath);
    }
  });
}