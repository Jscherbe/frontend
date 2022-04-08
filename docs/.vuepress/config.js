const path = require('path');
const { dataToFile } = require("./utils/node");
const { description } = require('../../package');
const sassdocPlugin = require("./plugins/sassdoc");
const sidebarAutoPagesPlugin = require("./plugins/sidebar-auto-pages/index.js");
// const menus = require("vuepress-bar")();
// dataToFile(menus, path.resolve(__dirname, "logs/auto-generated-menus.json"));

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: '@ulu/frontend',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    sidebarAutoPages: {
      hello: "world"
    },
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Sass',
        items: [
          { text: 'Introduction', link: '/sass/' },
          { text: 'API', link: '/sass/api/' }
        ]
      },
      {
        text: 'Javascript',
        items: [
          { text: 'Introduction', link: '/sass/' },
          { text: 'API', link: '/sass/api/' }
        ]
      }
    ]
  },
  extraWatchFiles: [
    '../../js/**/*.js',
    '../../scss/**/*.scss',
  ],

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    // '@vuepress/plugin-back-to-top',
    // '@vuepress/plugin-medium-zoom',
    // @todo Look at plugin options I think you don't initialize like this
    // [sassdocPlugin, {
    //   dir: path.resolve(__dirname, "../../scss/"),
    //   debug: true,
    //   debugToFile: path.resolve(__dirname, "logs/sassdoc.json")
    // }],
    sidebarAutoPagesPlugin
  ]
}