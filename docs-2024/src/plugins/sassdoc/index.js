const fs = require("fs-extra");
const path = require("path");

let running = false;
const src = path.resolve(__dirname, "../../../../scss");
const dist = path.resolve(__dirname, "../../../public/api/sass/");
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
  dir: path.resolve(__dirname, "../../scss/", base),
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



async function plugin(eleventyConfig) {
  const sassdocToMd = await import("@ulu/sassdoc-to-markdown");
  
  
  eleventyConfig.on("eleventy.before", async function output() {
    console.log("RUNNING");
    // if (running) return;
    // try {
    //   running = true;
    //   configs.forEach(c => cleanOutputDir(c));
    //   console.log("about to output", configs);
    //   await Promise.all(configs.map(c => outputPages(c)));
    //   running = false;
    // } catch (error) {
    //   console.log(error);
    // }
  });
  return {};
};




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



module.exports = plugin;