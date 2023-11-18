import fs from "fs-extra";
import { resolve, dirname, join } from "path";
import { outputPages } from "@ulu/vitepress-sassdoc";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dist = resolve(__dirname, "../");

const subConfig = base => ({
  dir: resolve(__dirname, "../../scss/", base),
  pathBase: `/${ base }`,
  dist,
});

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
  subConfig("base/"),
  subConfig("components/"),
  subConfig("helpers/"),
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
    configs.forEach(c => cleanOutputDir(c));
    await Promise.all(configs.map(c => outputPages(c)));
    running = false;
  }
}



function cleanOutputDir(config) {
  const outputPath = join(config.dist, config.pathBase);
  if (fs.existsSync(outputPath)) {
    fs.readdirSync(outputPath).forEach(item => {
      const fullpath = join(outputPath, item);
      // Delete if directory (was created by sassdoc plugin)
      if (fs.lstatSync(fullpath).isDirectory()) {
        fs.removeSync(fullpath);
      }
    });
  }
}