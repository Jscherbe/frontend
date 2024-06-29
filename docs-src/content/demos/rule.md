---
title: Rule
intro: Rules of rules
layout: default
---

## Examples

### Default

```html
<div class="rule"></div>
```

As a class styling, rules can be added with or without the \<hr> element. The chosen element should reflect whether or not a structural separation of content is needed. For example:
```html
<h4>Some Content</h4>
<div class="rule"></div>
<div>Related to content above</div>
<hr class="rule rule--large"/>
<h4>New Content</h4>
<div class="rule"></div>
<div>Related to new content above</div>
```

### Config

Use config/element.scss to set rule parameters.

```scss
@include ulu.element-set-rule-styles((
  "default" : 1px solid ulu.color-get("rule"),
  "light" : 1px solid ulu.color-get("rule-light"),
  "large" : 3px solid ulu.color-get("rule"),
  "large-x" : 4px solid ulu.color-get("rule"),
));
@include ulu.element-set-rule-margins((
  "large-x" : 3em,
  "small" : 0.6em,
));
```