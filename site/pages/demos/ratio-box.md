---
title: Ratio Box
intro: The Ratio Box component is used to maintain a specific aspect ratio for content, commonly used for responsive iframes or images.
---

<h2 class="h2">Examples</h2>

<h3 class="h3">Default (4/3)</h3>

By default, the ratio box uses a 4/3 aspect ratio.

{% CodePreview %}

<div class="ratio-box">
  <iframe 
    class="ratio-box__content" 
    src="https://www.youtube.com/embed/y0sF5xhGreA?si=aRdiK0Xzf3zvHP_E" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen>
  </iframe>
</div>

{% endCodePreview %}

<h3 class="h3">16x9 Modifier</h3>

You can use modifier classes like `.ratio-box--16x9` to apply different aspect ratios.

{% CodePreview %}

<div class="ratio-box ratio-box--16x9">
  <iframe 
    class="ratio-box__content" 
    src="https://www.youtube.com/embed/y0sF5xhGreA?si=aRdiK0Xzf3zvHP_E" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen>
  </iframe>
</div>

{% endCodePreview %}