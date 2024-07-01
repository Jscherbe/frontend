---
title: Rule
intro: Rules of rules
layout: default
---

## Rule

### Basic Rules

```html
<div class="rule"></div>
```
<div class="rule"></div>

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

<h4 class='h6'>Best Practice</h4>

- If using a rule class like "rule--large", you need to precede it with the "rule" class. Use the previous example's \<hr> element for reference

### Configuring Rules

Use config/element.scss to set rule parameters.

```scss
@include ulu.element-set-rule-styles((
  "default" : 1px solid black, 
  "light" : 1px gray,
  "large" : 3px black,
  "large-x" : 4px solid ulu.color-get("rule"),
));
@include ulu.element-set-rule-margins((
  "large-x" : 3em,
  "small" : 0.6em,
));
```


<h4 class='h6'>Best Practice</h4>

- Set colors using ulu's **color-get** mixin. An example of the mixin is shown above in the "large-x" rule config above. Rule colors are set in config/color.scss.
- For the rule styles mixin, the class will be "rule--$key". For example, "rule--light". For the rule margins mixin, the class will be "rule--margin-$key". For example, "rule--margin-large". "Default" refers to the base "rule" class, **not** the "rule-default" class.


### Examples

Base rule
<div class="rule"></div>
Short rule
<div class="rule rule--short"></div>
Large Rule
<div class="rule rule--large"></div>
Small Margin Rule
<div class="rule rule--margin-small"></div>
Large Margin Rule
<div class="rule rule--margin-large"></div>
Light Rule
<div class="rule rule--light"></div>