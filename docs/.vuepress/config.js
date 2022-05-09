const path = require('path');
const { description } = require('../../package');
const sassdocDefaults = {
  debug: true,
  debugToDir: path.resolve(__dirname, "logs/"),
  previewMeta: `
    <title>Sassdoc Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/ulu-frontend.min.css">
  `,
  previewBodyScripts: `
    <script src="/ulu-frontend.min.js"></script>
  `
};

module.exports = {
  title: '@ulu/frontend',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    sidebarAutoPages: {
      createSidebar: true,
      createNav: true,
      sidebarAllSections: false
    }
  },
  extraWatchFiles: [
    '../js/**/*.js',
    '../scss/**/*.scss',
    '.vuepress/plugins/**/*.js'
  ],
  plugins: [
    // Setup the main modules in there own section
    ["@ulu/vuepress-plugin-sassdoc", { 
      ...sassdocDefaults,
      dir: path.resolve(__dirname, "../../scss/"),
      pathBase: "/core/",
      sassdocOptions: {
        exclude: [
          "base/*",
          "components/*",
          "helpers/*",
          "packages/*",
        ]
      }
    }],
    // Then setup a section for each of the other things (components, helpers, ...)
    ["@ulu/vuepress-plugin-sassdoc", { 
      ...sassdocDefaults,
      dir: path.resolve(__dirname, "../../scss/base/"),
      pathBase: "/base/",
    }],
    ["@ulu/vuepress-plugin-sassdoc", { 
      ...sassdocDefaults,
      dir: path.resolve(__dirname, "../../scss/components/"),
      pathBase: "/components/",
    }],
    ["@ulu/vuepress-plugin-sassdoc", { 
      ...sassdocDefaults,
      dir: path.resolve(__dirname, "../../scss/helpers/"),
      pathBase: "/helpers/",
    }],
    "@ulu/vuepress-plugin-auto-nav"
  ]
}