---
title: Graphic Text Group
layout: unformatted
intro: A component to layout a graphic (icon or image) alongside text with preset sizes, positions, and optional rules.
---

{% CodePreview %}
<div class="graphic-text-group graphic-text-group--rule-bottom graphic-text-group--rule-top type-max-width-small margin-auto">
  <div class="graphic-text-group__graphic width-small">
    <img alt="" src="/assets/placeholder/graphic-icon-word.svg">
  </div>
  <div class="graphic-text-group__text crop-margins">
    <h3 class="h4 no-margin-bottom">Default Layout</h3>
    <p>This is the default layout where the graphic is positioned to the left of the text content. We are using the <code>type-max-width-small</code> utility to constrain the line length.</p>
  </div>
</div>
{{ placeholder.paragraph }}
{% endCodePreview %}

<h2 class="h2">Alignment Options</h2>

<h3 class="h3">Left / Center (default)</h3>

{% CodePreview %}
<div class="graphic-text-group type-max-width-small margin-auto">
  <div class="graphic-text-group__graphic">
    <img alt="" src="/assets/placeholder/graphic-icon-small-bulb.svg">
  </div>
  <div class="graphic-text-group__text crop-margins">
    <h4 class="h4 no-margin-bottom">Default Layout</h4>
    <p>This is the default layout where the graphic is positioned to the left of the text content. We are using the <code>type-max-width-small</code> utility to constrain the line length.</p>
  </div>
</div>
{% endCodePreview %}

<h3 class="h3">Left / Start</h3>

{% CodePreview %}
<div class="graphic-text-group graphic-text-group--align-start type-max-width-small margin-auto">
  <div class="graphic-text-group__graphic">
    <img alt="" src="/assets/placeholder/graphic-icon-small-bulb.svg">
  </div>
  <div class="graphic-text-group__text crop-margins">
    <h4 class="h4 no-margin-bottom">Example Headline</h4>
    <p>The graphic and text are vertically centered to each other using the <code>graphic-text-group--align-center</code> modifier.</p>
  </div>
</div>
{% endCodePreview %}

<h3 class="h3">Left / Baseline</h3>

{% CodePreview %}
<div class="graphic-text-group graphic-text-group--auto graphic-text-group--align-baseline graphic-text-group--compact type-max-width-small margin-auto">
  <div class="graphic-text-group__graphic type-large-xx">
    <span class="fas fa-circle-info" aria-hidden="true"></span>
  </div>
  <div class="graphic-text-group__text crop-margins">
    <h4 class="h4 no-margin-bottom">Example Headline</h4>
    <p>The graphic and text are aligned to the baseline of the typography using the <code>graphic-text-group--align-baseline</code> modifier.</p>
  </div>
</div>
{% endCodePreview %}

<h3 class="h3">Left / End</h3>

{% CodePreview %}
<div class="graphic-text-group graphic-text-group--align-end type-max-width-small margin-auto">
  <div class="graphic-text-group__graphic">
    <img alt="" src="/assets/placeholder/graphic-icon-small-bulb.svg">
  </div>
  <div class="graphic-text-group__text crop-margins">
    <h4 class="h4 no-margin-bottom">Example Headline</h4>
    <p>The graphic is aligned to the bottom (end) of the text content using the <code>graphic-text-group--align-end</code> modifier.</p>
  </div>
</div>
{% endCodePreview %}

<h3 class="h3">Right</h3>

<p>The layout uses CSS <code>order</code> to dictate the visual placement of the graphic, entirely decoupling it from the DOM order. This allows you to place the text content first in the HTML (which is highly recommended for screen reader accessibility) while rendering the graphic on the right visually.</p>

{% CodePreview %}
<div class="graphic-text-group graphic-text-group--right type-max-width-small margin-auto">
  <div class="graphic-text-group__text crop-margins">
    <h4 class="h4 no-margin-bottom">Text First in DOM</h4>
    <p>The graphic is positioned to the right of the text content using the <code>graphic-text-group--right</code> modifier, even though the text appears first in the markup.</p>
  </div>
  <div class="graphic-text-group__graphic">
    <img alt="" src="/assets/placeholder/graphic-icon-small-bulb.svg">
  </div>
</div>
{% endCodePreview %}

<h3 class="h3">Top</h3>

{% CodePreview %}
<div class="graphic-text-group graphic-text-group--top graphic-text-group--center type-max-width-small margin-auto">
  <div class="graphic-text-group__graphic">
    <img alt="" src="/assets/placeholder/graphic-icon-small-bulb.svg">
  </div>
  <div class="graphic-text-group__text crop-margins">
    <h4 class="h4 no-margin-bottom">Example Headline</h4>
    <p>The graphic is positioned above the text content using the <code>graphic-text-group--top</code> modifier.</p>
  </div>
</div>
{% endCodePreview %}

<h3 class="h3">Bottom</h3>

{% CodePreview %}
<div class="graphic-text-group graphic-text-group--bottom graphic-text-group--center type-max-width-small margin-auto">
  <div class="graphic-text-group__text crop-margins">
    <h4 class="h4 no-margin-bottom">Text First in DOM</h4>
    <p>The graphic is positioned below the text content using the <code>graphic-text-group--bottom</code> modifier.</p>
  </div>
  <div class="graphic-text-group__graphic">
    <img alt="" src="/assets/placeholder/graphic-icon-small-bulb.svg">
  </div>
</div>
{% endCodePreview %}

<h2 class="h2">Separator Modifiers</h2>

<p>The <code>--separator</code> modifier adds a vertical (or horizontal) rule cleanly between the text and graphic using a flexible pseudo-element.</p>

<h3 class="h3">Default with Separator</h3>

{% CodePreview %}
<div class="graphic-text-group graphic-text-group--separator type-max-width-small margin-auto">
  <div class="graphic-text-group__graphic">
    <img alt="" src="/assets/placeholder/graphic-icon-small-bulb.svg">
  </div>
  <div class="graphic-text-group__text crop-margins">
    <h4 class="h4 no-margin-bottom">Example Headline</h4>
    <p>The separator automatically spans the height of the container in this row layout.</p>
  </div>
</div>
{% endCodePreview %}

<h3 class="h3">Top with Separator</h3>

{% CodePreview %}
<div class="graphic-text-group graphic-text-group--top graphic-text-group--separator type-max-width-small margin-auto">
  <div class="graphic-text-group__graphic">
    <img alt="" src="/assets/placeholder/graphic-icon-small-bulb.svg">
  </div>
  <div class="graphic-text-group__text crop-margins">
    <h4 class="h4 no-margin-bottom">Example Headline</h4>
    <p>The separator automatically switches to a horizontal border when in a column layout like <code>--top</code> or <code>--bottom</code>.</p>
  </div>
</div>
{% endCodePreview %}

<h2 class="h2">Rules Modifiers</h2>

{% CodePreview %}
<div class="graphic-text-group graphic-text-group--rule-top graphic-text-group--rule-bottom type-max-width-small margin-auto">
  <div class="graphic-text-group__graphic">
    <img alt="" src="/assets/placeholder/graphic-icon-small-bulb.svg">
  </div>
  <div class="graphic-text-group__text crop-margins">
    <h3 class="h4 no-margin-bottom">Example Headline</h3>
    <p>Using the <code>graphic-text-group--rule-top</code> and <code>graphic-text-group--rule-bottom</code> modifiers to add padding and borders. Notice how the margins inside this block are cropped using the <code>crop-margins</code> utility.</p>
  </div>
</div>
{% endCodePreview %}

<h2 class="h2">Spacing Modifiers</h2>

<p>Use the <code>--compact</code> modifier to reduce the gap between the graphic and the text.</p>

{% CodePreview %}
<div class="graphic-text-group graphic-text-group--compact type-max-width-small margin-auto">
  <div class="graphic-text-group__graphic">
    <img alt="" src="/assets/placeholder/graphic-icon-small-bulb.svg">
  </div>
  <div class="graphic-text-group__text crop-margins">
    <h3 class="h4 no-margin-bottom">Compact Gap</h3>
    <p>This layout uses the <code>graphic-text-group--compact</code> modifier for tighter spacing.</p>
  </div>
</div>
{% endCodePreview %}

<h2 class="h2">Graphic Size Modifiers</h2>

<p>Use the <code>--auto</code> modifier when using a graphic that shouldn't be constrained by the preset width, such as an inline icon font or a naturally sized element.</p>

{% CodePreview %}
<div class="callout callout--warning type-max-width-small margin-auto crop-margins">
  <div class="graphic-text-group graphic-text-group--auto graphic-text-group--compact graphic-text-group--align-baseline">
    <div class="graphic-text-group__graphic">
      <span aria-hidden="true" style="font-size: 1.5rem; line-height: 1;"><i class="fa-solid fa-circle-info"></i></span>
    </div>
    <div class="graphic-text-group__text crop-margins">
      <h3 class="h4 no-margin-bottom">Auto Graphic Width</h3>
      <p>The graphic container sizes to its contents using the <code>graphic-text-group--auto</code> modifier. This example also combines it with the <code>graphic-text-group--compact</code> modifier for a tighter, icon-based layout.</p>
    </div>
  </div>
</div>
{% endCodePreview %}

<h2 class="h2">Responsive Wrap Modifier</h2>

<p>Use the <code>graphic-text-group--wrap</code> modifier to force the layout into a stacked column layout on smaller screens. This relies on the <code>wrap-breakpoint</code> configuration variable (defaults to <code>small</code>).</p>

{% CodePreview %}
<div class="graphic-text-group graphic-text-group--wrap graphic-text-group--separator type-max-width-small margin-auto">
  <div class="graphic-text-group__graphic width-small-x">
    <div class="badge badge--large">
      <div class="badge__inner">
        <span>02</span>
      </div>
    </div>
  </div>
  <div class="graphic-text-group__text crop-margins">
    <h4 class="h4 no-margin-bottom">Wraps on Small Screens</h4>
    <p>Shrink the browser window to see the graphic wrap to the top of the text block. Note how the separator properly changes from vertical to horizontal when it wraps!</p>
  </div>
</div>
{% endCodePreview %}

<h2 class="h2">Using Badge</h2>

{% CodePreview %}
<div class="graphic-text-group  type-max-width-small margin-auto">
  <div class="graphic-text-group__graphic width-small-x">
    <div class="badge badge--large">
      <div class="badge__inner">
        <span>02</span>
      </div>
    </div>
  </div>
  <div class="graphic-text-group__text crop-margins">
    <h4 class="h4 no-margin-bottom">Example Headline</h4>
    <p>The graphic is positioned to the right of the text content using the <code>graphic-text-group--right</code> modifier.</p>
  </div>
</div>
{% endCodePreview %}

<h2 class="h2">In a callout</h2>

{% CodePreview %}
<div class="callout type-max-width-small margin-auto crop-margins">
  <div class="graphic-text-group">
    <div class="graphic-text-group__graphic width-small-x">
      <img alt="" src="/assets/placeholder/graphic-icon-word.svg">
    </div>
    <div class="graphic-text-group__text crop-margins">
      <h3 class="h4 no-margin-bottom">Default Layout</h3>
      <p>This is the default layout where the graphic is positioned to the left of the text content. We are using the <code>type-max-width-small</code> utility to constrain the line length.</p>
    </div>
  </div>
</div>
{{ placeholder.paragraph }}
{% endCodePreview %}