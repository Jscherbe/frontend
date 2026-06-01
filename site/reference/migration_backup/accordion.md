---
title: Accordion
layout: default
intro: An accordion disclosure element is a user interface component that allows users to expand and collapse sections of content. 
---

<div class="callout callout--info">
  <strong>Note:</strong> In the following examples, the accordions are wrapped in a container with the <code>data-ulu-details-group='{ "onlyOneOpen": true }'</code> attribute. This uses the library's details group UI module to ensure that only one accordion panel is open at a time. Like other interactive elements in Ulu, it functions entirely off data attributes.
</div>

## Basic Example

<p>Accordions are commonly used for Frequently Asked Questions to keep the page clean and scannable.</p>

{% CodePreview %}

<div data-ulu-details-group='{ "onlyOneOpen": true }'>
  <details class="accordion">
    <summary class="accordion__summary">
      What is your return policy?
      <span class="accordion__icon" aria-hidden="true">
        <span class="css-icon css-icon--plus-to-minus"></span>
      </span>
    </summary>
    <div class="accordion__content">
      <p>You can return any unused item within 30 days of purchase for a full refund. Please ensure the item is in its original packaging and include the receipt.</p>
    </div>
  </details>
  <details class="accordion">
    <summary class="accordion__summary">
      How long does shipping normally take for international orders?
      <span class="accordion__icon" aria-hidden="true">
        <span class="css-icon css-icon--plus-to-minus"></span>
      </span>
    </summary>
    <div class="accordion__content">
      <p>International shipping typically takes 7-14 business days, depending on the destination and customs processing. You will receive a tracking number once your order has shipped.</p>
    </div>
  </details>
  <details class="accordion">
    <summary class="accordion__summary">
      Do you offer customer support on weekends?
      <span class="accordion__icon" aria-hidden="true">
        <span class="css-icon css-icon--plus-to-minus"></span>
      </span>
    </summary>
    <div class="accordion__content">
      <p>Yes, our customer support team is available 24/7, including weekends and holidays. You can reach us via email, live chat, or phone.</p>
    </div>
  </details>
</div>

{% endCodePreview %}

## Transparent Modifier

<p>The <code>accordion--transparent</code> modifier removes the background color, blending the accordion into the surrounding container.</p>

{% CodePreview %}

<div data-ulu-details-group='{ "onlyOneOpen": true }'>
  <details class="accordion accordion--transparent">
    <summary class="accordion__summary">
      Product Features
      <span class="accordion__icon" aria-hidden="true">
        <span class="css-icon css-icon--plus-to-minus"></span>
      </span>
    </summary>
    <div class="accordion__content">
      <ul>
        <li>Water-resistant design</li>
        <li>Up to 24 hours of battery life</li>
        <li>Noise-canceling microphone</li>
      </ul>
    </div>
  </details>
  <details class="accordion accordion--transparent">
    <summary class="accordion__summary">
      Included Accessories
      <span class="accordion__icon" aria-hidden="true">
        <span class="css-icon css-icon--plus-to-minus"></span>
      </span>
    </summary>
    <div class="accordion__content">
      <p>The package includes the device, a USB-C charging cable, a quick start guide, and three sizes of ear tips (small, medium, large).</p>
    </div>
  </details>
  <details class="accordion accordion--transparent">
    <summary class="accordion__summary">
      Warranty Information
      <span class="accordion__icon" aria-hidden="true">
        <span class="css-icon css-icon--plus-to-minus"></span>
      </span>
    </summary>
    <div class="accordion__content">
      <p>This product comes with a one-year limited warranty covering manufacturer defects. Extended warranty options are available at checkout.</p>
    </div>
  </details>
</div>

{% endCodePreview %}

## Examples with Rotating Angle Right/Down

<p>You can use different CSS icons within the <code>accordion__icon</code> element, such as <code>css-icon--angle-right-to-down</code>, to customize the visual indicator of the expanded state.</p>

{% CodePreview %}

<div data-ulu-details-group='{ "onlyOneOpen": true }'>
  <details class="accordion">
    <summary class="accordion__summary">
      Step 1: Application Review
      <span class="accordion__icon" aria-hidden="true">
        <span class="css-icon css-icon--angle-right-to-down"></span>
      </span>
    </summary>
    <div class="accordion__content">
      <p>Our team will review your submitted resume and portfolio to ensure your skills align with the role's requirements.</p>
    </div>
  </details>
  <details class="accordion">
    <summary class="accordion__summary">
      Step 2: Technical Interview
      <span class="accordion__icon" aria-hidden="true">
        <span class="css-icon css-icon--angle-right-to-down"></span>
      </span>
    </summary>
    <div class="accordion__content">
      <p>If selected, you will be invited to a 60-minute technical interview with our engineering team to discuss your past projects and problem-solving approach.</p>
    </div>
  </details>
</div>

{% endCodePreview %}

## Examples with Rotating Angle Down/Up

<p>Alternatively, use the <code>css-icon--angle-down-to-up</code> to have the arrow point down when closed and up when open.</p>

{% CodePreview %}

<div data-ulu-details-group='{ "onlyOneOpen": true }'>
  <details class="accordion">
    <summary class="accordion__summary">
      Privacy Settings
      <span class="accordion__icon" aria-hidden="true">
        <span class="css-icon css-icon--angle-down-to-up"></span>
      </span>
    </summary>
    <div class="accordion__content">
      <p>Manage who can see your profile, your activity status, and control how your data is used for personalized experiences.</p>
    </div>
  </details>
  <details class="accordion">
    <summary class="accordion__summary">
      Notification Preferences
      <span class="accordion__icon" aria-hidden="true">
        <span class="css-icon css-icon--angle-down-to-up"></span>
      </span>
    </summary>
    <div class="accordion__content">
      <p>Choose whether to receive email digests, push notifications for direct messages, or SMS alerts for account security events.</p>
    </div>
  </details>
</div>

{% endCodePreview %}

## Examples with No borders

<p>The <code>accordion--borderless</code> modifier removes the borders around the accordion element for a cleaner, inline look.</p>

{% CodePreview %}

<div data-ulu-details-group='{ "onlyOneOpen": true }'>
  <details class="accordion accordion--borderless">
    <summary class="accordion__summary">
      Terms of Service
      <span class="accordion__icon" aria-hidden="true">
        <span class="css-icon css-icon--angle-down-to-up"></span>
      </span>
    </summary>
    <div class="accordion__content">
      <p>By accessing or using our platform, you agree to be bound by these terms. We reserve the right to modify these terms at any time.</p>
    </div>
  </details>
  <details class="accordion accordion--borderless">
    <summary class="accordion__summary">
      Cookie Policy
      <span class="accordion__icon" aria-hidden="true">
        <span class="css-icon css-icon--angle-down-to-up"></span>
      </span>
    </summary>
    <div class="accordion__content">
      <p>We use cookies to improve your browsing experience. You can disable non-essential cookies in your browser settings without losing access to core functionality.</p>
    </div>
  </details>
</div>

{% endCodePreview %}
