---
title: Basic Hero
layout: fullpage
---

{% capture innerMarkup %}
  <div class="basic-hero__content container">
    <div class="basic-hero__content-main">
      <h1 class="h1">
        This is the Title it is Multiple Lines Long When On Small Screens
      </h1>
    </div>
    <div class="basic-hero__content-media">
      <img src="/assets/placeholder/image-1.jpg">
    </div>
  </div>
{% endcapture %}

{% fullscreenIntertitle "Testing Normal Layout" %}
{% endfullscreenIntertitle %}

<div class="theme-light">
  <div class="basic-hero">
    {{ innerMarkup }}
  </div>
</div>

{% fullscreenIntertitle "Testing Center Layout" %}
{% endfullscreenIntertitle %}

<div class="theme-light">
  <div class="basic-hero basic-hero--center">
    {{ innerMarkup }}
  </div>
</div>