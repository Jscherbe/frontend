You are writing code for a frontend CSS library that is agnostic of framework (ie. Vue, React, etc). The library is composed of:

- `scss/` Sass modules, with annotations written in SASS Doc syntax
- `js/` Javascript modules for traditional sites (ie. CMS, Drupal, Static, etc) basically not apps. Although some of these utilities are utilized in the vue implementation of this library (outside this projects scope)
- `docs-src` The eleventy docs site that has the API documentation for scss and javascript (automatically generated) and the `docs-src/content/demos` where tests and examples are built.

## If writing a demo

Demos are markdown or html files within `docs-src/content/demos`. They include frontmatter (YAML) at the beginning of the file to store page meta information. When writing demos do not add inline styles (unless the component requires/uses them) or additional stylesheets. Each demo should just be a basic test of the features the component or script provides.