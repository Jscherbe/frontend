const path = require('path');
const { description } = require('../../package');
const sassdocPlugin = require("./plugins/sassdoc");
const sidebarAutoPagesPlugin = require("./plugins/sidebar-auto-pages");
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

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    [sassdocPlugin, {
      dir: path.resolve(__dirname, "../../scss/"),
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
    }],
    sidebarAutoPagesPlugin
  ]
}