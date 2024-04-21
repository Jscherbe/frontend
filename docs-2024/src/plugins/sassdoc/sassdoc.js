import fs from "fs-extra";
import { resolve, dirname, join } from "path";
import { outputPages } from "@ulu/vitepress-sassdoc";
import { fileURLToPath } from "url";
import chokidar from "chokidar";

const isWatch = !!process.env.SASSDOC_WATCH;
const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "../../scss/");
const dist = resolve(__dirname, "../");
const commonConfig = {
  previewHead: `
    <title>ULU Example</title> 
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
    <link rel="stylesheet" href="/frontend/ulu-frontend.min.css">
  `,
  previewScripts: `
    <script src="/frontend/ulu-frontend.min.js"></script>
  `,
};
const subConfig = base => ({
  ...commonConfig,
  dir: resolve(__dirname, "../../scss/", base),
  pathBase: `/scss/${ base }`,
  dist,
});
const configs = [
  {
    ...commonConfig,
    dist,
    dir: src,
    pathBase: "/scss/core/",
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

if (isWatch) {
  chokidar.watch(src, { ignoreInitial: true }).on('all', (event, path) => {
    console.log(`Sass watch ${ event }:`, path);
    output();
  });
}

// Run once
(async () => {
  await output();
})();

async function output() {
  if (running) return;
  try {
    running = true;
    configs.forEach(c => cleanOutputDir(c));
    await Promise.all(configs.map(c => outputPages(c)));
    running = false;
  } catch (error) {
    console.log(error);
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