---
title: Modals
intro: Modals, also known as dialogs or modal windows, are user interface elements that appear on top of the main application window. They typically have a dimmed background to draw focus to the modal itself, and often prevent users from interacting with the underlying content until the modal is closed

---

<h2 class="h2">Examples</h2>

<h3 class="h3">Default</h3>

This is the default modal, being created from markup in the body on page load by modal builder. The default modal is centered.

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-center">Open Modal</button>

<div 
  id="modal-id-center" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "print" : true,
    "documentEnd" : false
  }' 
  hidden
>
  This is the modal body <button data-ulu-dialog-close>Close</button>
</div>

{% endCodePreview %}

<h3 class="h3">Positions</h3>

The available positions are top, bottom, left, right and center (default). Left and right are sidebar (full height), while top, bottom and center are all min height (can be configured)

{% CodePreview  %}

<button class="button" data-ulu-dialog-trigger="modal-id-left">Left</button>
<button class="button" data-ulu-dialog-trigger="modal-id-right">Right</button>
<button class="button" data-ulu-dialog-trigger="modal-id-top">Top</button>
<button class="button" data-ulu-dialog-trigger="modal-id-bottom">Bottom</button>
<div 
  id="modal-id-left" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title", 
    "position" : "left"
  }' 
  hidden
>
  {{ placeholder.paragraph }}
</div>
<div 
  id="modal-id-right" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title", 
    "position" : "right"
  }' 
  hidden
>
  {{ placeholder.paragraph }}
</div>
<div 
  id="modal-id-top" 
  class="wysiwyg crop-margins"
  data-ulu-modal-builder='{ 
    "position" : "top"
  }' 
  hidden
>
  <p>
    This is a modal without a title 
  </p>
  <p>
    <button class="button" data-ulu-dialog-close>Close</button>
  </p>
</div>
<div 
  id="modal-id-bottom" 
  class="wysiwyg crop-margins"
  data-ulu-modal-builder='{ 
    "position" : "bottom"
  }' 
  hidden
>
  <p>
    This is a modal without a title 
  </p>
  <p>
    <button class="button" data-ulu-dialog-close>Close</button>
  </p>
</div>

{% endCodePreview %}

<h3 class="h3">With Footer Element</h3>

Footer can be added with "footerElement" option which can be selector or an element. It will be moved into the dialog on creation. This is for dom data-attribute API usage. For inserting text or html see 'footerHtml' example below.

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-footer">With Footer Element</button>

<div 
  id="modal-id-footer" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "print" : true,
    "documentEnd" : true,
    "footerElement" : "#modal-id-footer-content"
  }' 
  hidden
>
  This is the modal body <button data-ulu-dialog-close>Close</button>
</div>
<div id="modal-id-footer-content">
  <button class="button button--outline" data-ulu-dialog-close>Cancel</button>
  <button class="button" data-ulu-dialog-close>Submit</button>
</div>

{% endCodePreview %}

<h3 class="h3">With Footer HTML</h3>

Footer can be added with "footerHTML" option which will populate the innerHTML of the footer element on creation.

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-footer-html">With Footer HTML</button>

<div 
  id="modal-id-footer-html" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "documentEnd" : true,
    "footerHtml" : "This works!"
  }' 
  hidden
>
  This is the modal body <button data-ulu-dialog-close>Close</button>
</div>

{% endCodePreview %}


<h3 class="h3">Fullscreen Size</h3>

The modal will fill the window

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-fullscreen">Open Modal</button>

<div 
  id="modal-id-fullscreen" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Fullscreen",
    "size" : "fullscreen"
  }' 
  hidden
>
  <div class="container">
    This is the modal body should be fullscreen content added to test overflow.

    {% for i in (1..5) %}
      <h3 class="h2">Test Paragraph {{ i }}</h3>

      {{ placeholder.paragraph }}
    {% endfor %}
  </div>
</div>

{% endCodePreview %}

<h3 class="h3">Fullscreen Size (Overflow)</h3>

The modal will fill the window and contains content that forces both vertical and horizontal overflow to test layout stability in browsers like Safari.

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-fullscreen-overflow">Open Overflow Modal</button>

<div 
  id="modal-id-fullscreen-overflow" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Fullscreen Overflow",
    "size" : "fullscreen"
  }' 
  hidden
>
  <div class="container">
    <div style="width: 2000px; padding: 1rem; background: #f0f0f0; margin-bottom: 2rem;">
      <strong>Wide Content Block:</strong> This block is explicitly 2000px wide. It forces horizontal scrolling to ensure the fullscreen modal boundaries and internal flex layout do not break or bleed out of the viewport on tricky browsers.
    </div>

    {% for i in (1..20) %}
      <h3 class="h2">Test Paragraph {{ i }}</h3>

      {{ placeholder.paragraph }}
    {% endfor %}
  </div>
</div>

{% endCodePreview %}

<h3 class="h3">Fullscreen Mobile</h3>

Adding `modal--fullscreen-mobile` class to the modal (via the `class` builder option) will force the modal to become fullscreen only when the viewport is below the mobile breakpoint (small). This works regardless of the original position or size. Resize the browser to see it in action.

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-fullscreen-mobile-center">Center (Default)</button>
<button class="button" data-ulu-dialog-trigger="modal-id-fullscreen-mobile-right">Right Sidebar</button>
<button class="button" data-ulu-dialog-trigger="modal-id-fullscreen-mobile-top">Top</button>

<div 
  id="modal-id-fullscreen-mobile-center" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Fullscreen Mobile (Center)",
    "fullscreenMobile" : true
  }' 
  hidden
>
  This modal is centered on desktop but goes fullscreen on mobile.
</div>

<div 
  id="modal-id-fullscreen-mobile-right" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Fullscreen Mobile (Right)",
    "position": "right",
    "fullscreenMobile" : true
  }' 
  hidden
>
  This modal is a right sidebar on desktop but goes fullscreen on mobile.
</div>

<div 
  id="modal-id-fullscreen-mobile-top" 
  class="wysiwyg crop-margins"
  data-ulu-modal-builder='{ 
    "title" : "Fullscreen Mobile (Top)",
    "position": "top",
    "fullscreenMobile" : true
  }' 
  hidden
>
  <p>This modal attaches to the top on desktop but goes fullscreen on mobile.</p>
</div>

{% endCodePreview %}

<h2 class="h2">Iframes (Auto Layout)</h2>

Modal Builder has an `autoIframe` feature (must be enabled explicitly with `"autoIframe": true`) that intelligently styles iframes if they are the sole item within the dialog body. It removes padding to create a seamless embed experience.
*   **Media Iframes (Aspect Ratio):** If the iframe has static `width` and `height` attributes (like a standard YouTube embed), the modal automatically retains that aspect ratio responsively.
*   **Document Iframes (Fill):** If the iframe has percentage dimensions or no dimensions (like embedding a map or full webpage), the modal forces the iframe to completely fill the available space.

<h3 class="h3">Media Iframe (YouTube Aspect Ratio)</h3>

Because this YouTube iframe includes standard width/height attributes, `autoIframe` will apply `.modal--frame-ratio` and a dynamic inline `aspect-ratio`, ensuring the video scales perfectly without stretching or requiring wrapper divs.

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-youtube-auto">Open YouTube Modal</button>

<div 
  id="modal-id-youtube-auto" 
  data-ulu-modal-builder='{ 
    "title" : "YouTube (Auto Aspect Ratio)",
    "print" : true,
    "documentEnd" : true,
    "autoIframe": true
  }' 
  hidden
>
  <iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/y0sF5xhGreA?si=aRdiK0Xzf3zvHP_E" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen
  ></iframe>
</div>

{% endCodePreview %}

<h3 class="h3">Media Iframe (CMS Wrapped)</h3>

Even if the CMS wraps the iframe in a paragraph or div tag, the `autoIframe` feature will successfully detect it and apply the correct aspect ratio and edge-to-edge layout, completely ignoring the wrapper.

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-youtube-wrapped">Open YouTube Modal (Wrapped)</button>

<div 
  id="modal-id-youtube-wrapped" 
  data-ulu-modal-builder='{ 
    "title" : "YouTube (Wrapped by CMS)",
    "print" : true,
    "documentEnd" : true,
    "autoIframe": true
  }' 
  hidden
>
  <div class="cms-wrapper-class" style="padding: 2rem;">
    <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/y0sF5xhGreA?si=aRdiK0Xzf3zvHP_E" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen
    ></iframe>
  </div>
</div>

{% endCodePreview %}

<h3 class="h3">Media Iframe (No Header)</h3>

Testing layout when no title/header is provided, meaning the iframe frame is perfectly flush to the top edge of the dialog.

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-youtube-no-header">Open YouTube Modal (No Header)</button>

<div 
  id="modal-id-youtube-no-header" 
  data-ulu-modal-builder='{ 
    "print" : true,
    "documentEnd" : true,
    "autoIframe": true
  }' 
  hidden
>
  <iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/y0sF5xhGreA?si=aRdiK0Xzf3zvHP_E" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen
  ></iframe>
</div>

{% endCodePreview %}

<h3 class="h3">Document Iframe (Wikipedia Fill)</h3>

Because this iframe lacks static pixel dimensions, `autoIframe` will apply `.modal--frame-fill`, forcing it to edge-to-edge inside the large modal.

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-external-iframe">Open Wikipedia Modal</button>

<div 
  id="modal-id-external-iframe" 
  data-ulu-modal-builder='{ 
    "title" : "External Webpage",
    "size" : "large",
    "documentEnd" : true,
    "fullscreenMobile": true,
    "autoIframe": true
  }' 
  hidden
>
  <iframe 
    src="https://en.wikipedia.org/wiki/IFrame" 
    title="Wikipedia article on IFrames"
  ></iframe>
</div>

{% endCodePreview %}

<h3 class="h3">Document Iframe (Wikipedia Fullscreen)</h3>

The same automatic filling behavior, but inside a modal set to `size: "fullscreen"`.

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-external-iframe-fullscreen">Open Wikipedia Fullscreen</button>

<div 
  id="modal-id-external-iframe-fullscreen" 
  data-ulu-modal-builder='{ 
    "title" : "External Webpage (Fullscreen)",
    "size" : "fullscreen",
    "documentEnd" : true,
    "autoIframe": true
  }' 
  hidden
>
  <iframe 
    src="https://en.wikipedia.org/wiki/IFrame" 
    title="Wikipedia article on IFrames"
  ></iframe>
</div>

{% endCodePreview %}

<h2 class="h2">Resizing</h2>

The modals setup with the builder allow resizing. Center, top and bottom modals will use the native resize handle (resize in all directions). The left/right sidebar type modals will be given a drag handle and only able to extend their width (since they already span the full screen height). To enable this behavior pass `{ "allowResize" : true }` in builder options (data attribute)

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-center-resize">Center Resizable</button>
<button class="button" data-ulu-dialog-trigger="modal-id-right-resize">Right Resizable</button>
<button class="button" data-ulu-dialog-trigger="modal-id-left-resize">Left Resizable</button>

<div 
  id="modal-id-center-resize" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "allowResize" : true
  }' 
  hidden
>
  Test
</div>
<div 
  id="modal-id-right-resize" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "position" : "right",
    "allowResize" : true
  }' 
  hidden
>
  Test
</div>
<div 
  id="modal-id-left-resize" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "position" : "left",
    "allowResize" : true
  }' 
  hidden
>
  Test
</div>

{% endCodePreview %}

<h2 class="h2">Click Outside</h2>

By default clicking outside the modal will close it, this can be disabled by passing `{ "clickOutsideCloses" : false }`

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-no-outside">No Click Outside</button>

<div 
  id="modal-id-no-outside" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "clickOutsideCloses" : false
  }' 
  hidden
>
  Test
</div>

{% endCodePreview %}

<h2 class="h2">No Backdrop and Testing Not Preventing Scroll</h2>

Remove the backdrop by passing  `{ "noBackdrop" : true }` to the builder

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-no-backdrop">No Backdrop</button>

<div 
  id="modal-id-no-backdrop" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "noBackdrop" : true,
    "preventScroll" : false
  }' 
  hidden
>
  Test
</div>

{% endCodePreview %}

<h2 class="h2">Non Modal Test</h2>

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-no-nonmodal">Test non-modal</button>

<div 
  id="modal-id-no-nonmodal" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "position" : "bottom",
    "noBackdrop" : true,
    "nonModal" : true
  }' 
  hidden
>
  Test
</div>

{% endCodePreview %}

<h2 class="h2">Test usage with link (not recommended)</h2>

Testing behavior when the trigger is a link/anchor element. Which is not recommended for accessibility, use button. In situations where this the only option use role button, aria-haspopup dialog and empty hash for href.

{% CodePreview %}

<a href="#" role="button" aria-haspopup="dialog" class="link" data-ulu-dialog-trigger="modal-id-trigger-by-link">Test Trigger Link</a>

<div 
  id="modal-id-trigger-by-link" 
  data-ulu-modal-builder='{ 
    "title" : "Triggered by a link"
  }' 
  hidden
>
  Test
</div>

{% endCodePreview %}

<h2 class="h2">Test Setting Specific labelledby, describedby</h2>

You can set these properties for custom title implementations and to add optional description information for screen readers, etc.

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-aria-attrs">View Modal</button>

<div 
  id="modal-id-aria-attrs" 
  class="crop-margins"
  data-ulu-modal-builder='{ 
    "labelledby": "my-custom-title",
    "describedby": "my-custom-description"
  }' 
  hidden
>
  <h2 class="h5" id="my-custom-title">This is a custom title</h2>
  <p id="my-custom-description">
    This modal test whether passing labelledby/describedby works
  </p>
  <button class="button" data-ulu-dialog-close>Close</button>
</div>

{% endCodePreview %}


<h3 class="h3">Native Video</h3>

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-native-video">Open Modal (native video)</button>

<div 
  id="modal-id-native-video" 
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "print" : true,
    "bodyFills" : true,
    "documentEnd" : true
  }' 
  hidden
>
  <video controls class="full-width">
    <source src="/assets/placeholder/4065947-uhd_4096_2160_25fps.mp4" type="video/mp4" />
  </video>
</div>

{% endCodePreview %}

<h2 class="h2">Legacy Examples</h2>

<h3 class="h3">Youtube Embed (Manual Aspect Ratio)</h3>

This is the legacy method for handling video aspect ratios using the `.ratio-box` wrapper. Note we no longer need to pass `autoIframe: false` because it is false by default. `bodyFills` removes the padding.

{% CodePreview %}

<button class="button" data-ulu-dialog-trigger="modal-id-youtube-legacy">Open Modal</button>

<div 
  id="modal-id-youtube-legacy" 
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "print" : true,
    "bodyFills" : true,
    "documentEnd" : true
  }' 
  class="ratio-box ratio-box--16x9"
  hidden
>
  <iframe 
    class="ratio-box__content" 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/y0sF5xhGreA?si=aRdiK0Xzf3zvHP_E" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen
  ></iframe>
</div>

{% endCodePreview %}