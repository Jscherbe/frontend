# @ulu/eleventy-plugin-nav-tree

An Eleventy plugin to generate a hierarchical navigation tree from a collection. It provides filters for creating the tree structure, converting it to HTML, and filtering it to show only the active trail.

## Installation

```bash
npm install @ulu/eleventy-plugin-nav-tree --save-dev
```

## Usage

In your Eleventy configuration file (e.g., `.eleventy.js`), add the plugin:

```javascript
const navTreePlugin = require("@ulu/eleventy-plugin-nav-tree");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(navTreePlugin);
};
```

## Filters

This plugin provides three filters for use in your templates.

### `navTree`

Creates a nested tree structure from an Eleventy collection.

**Usage:**
```nunjucks
{% set nav = collections.all | navTree %}
```

**Options:**
You can pass an options object to override the defaults from `defaults.js`.
```nunjucks
{% set nav = collections.all | navTree({ section: true }) %}
```

### `navTreeToHtml`

Renders a navigation tree object into an HTML `<ul>` list.

**Usage:**
```nunjucks
{{ nav | navTreeToHtml | safe }}
```

**Options:**
You can pass an options object to override the defaults from `to-html.js`.
```nunjucks
{{ nav | navTreeToHtml({ class: "my-menu", collapsible: true }) | safe }}
```

### `navTreeActiveTrailOnly`

Prunes a navigation tree to only include items that are in the direct path to the currently active page.

**Usage:**
```nunjucks
{% set breadcrumbNav = collections.all | navTree | navTreeActiveTrailOnly %}
{{ breadcrumbNav | navTreeToHtml }}
```
