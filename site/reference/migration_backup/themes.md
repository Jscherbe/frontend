---
title: Themes
layout: default
intro: The themes module orchestrates custom property variations to easily implement light/dark modes and contextual themes.
---

## Basic Theming

<p>Applying the <code>.theme-dark</code> class to any container will override the CSS custom properties within that scope, instantly changing the appearance of its children.</p>

{% CodePreview %}
<div class="demo-theme-box theme-light">
  <h3>Light Theme Container</h3>
  <p>This inherits the default colors.</p>
  <button class="button">A Button</button>
</div>

<div class="demo-theme-box theme-dark">
  <h3>Dark Theme Container</h3>
  <p>This container has the <code>.theme-dark</code> class applied.</p>
  <button class="button">A Button</button>
</div>
{% endCodePreview %}

## Contextual Inversion

<p>Sometimes you want a specific element to always contrast with its parent container. Instead of hardcoding <code>.theme-dark</code> or <code>.theme-light</code>, you can use the <code>.theme-inverse</code> utility. It automatically flips the variables to the opposite of the current context.</p>

{% CodePreview %}
<div class="demo-theme-box theme-light">
  <h3>Light Theme Container</h3>
  <div class="demo-theme-box theme-inverse">
    <h4>Inverse Box</h4>
    <p>This box has <code>.theme-inverse</code> applied, so it becomes dark.</p>
  </div>
</div>

<div class="demo-theme-box theme-dark">
  <h3>Dark Theme Container</h3>
  <div class="demo-theme-box theme-inverse">
    <h4>Inverse Box</h4>
    <p>This box has <code>.theme-inverse</code> applied, so it becomes light.</p>
  </div>
</div>
{% endCodePreview %}

## Fake Inversion Utility

<p>Sometimes you have elements (like iframes or canvas charts) that cannot accept CSS custom properties but still need to be "themed". The <code>.theme-fake-invert</code> utility class achieves this using CSS filters. It works by inverting the element's colors and then adjusting the hue to match the current theme's context.</p>

{% CodePreview %}
<div class="demo-theme-box theme-dark">
  <h3>Dark Theme Context</h3>
  
  <p>Below is a div with hardcoded black text on a white background (simulating a light-only widget).</p>
  
  <div class="demo-theme-fake-widget theme-fake-invert">
    <strong>Inverted Widget:</strong> This widget is now dark to match its container.
  </div>
</div>

<div class="demo-theme-box theme-light">
  <h3>Light Theme Context</h3>
  
  <p>Below is a div with hardcoded white text on a black background (simulating a dark-only widget).</p>
  
  <div class="demo-theme-fake-widget  demo-theme-fake-widget--dark theme-fake-invert">
    <strong>Inverted Widget:</strong> This widget is now light to match its container.
  </div>
</div>
{% endCodePreview %}