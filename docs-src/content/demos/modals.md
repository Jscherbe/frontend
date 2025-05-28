---
title: Modals
intro: Modals, also known as dialogs or modal windows, are user interface elements that appear on top of the main application window. They typically have a dimmed background to draw focus to the modal itself, and often prevent users from interacting with the underlying content until the modal is closed

---

<h2 class="h2">Examples</h2>

<h3 class="h3">Default</h3>

This is the default modal, being created from markup in the body on page load by modal builder. The default modal is centered.

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


<h3 class="h3">Fullscreen Size</h3>

The modal will fill the window

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

    {% for i in (1..20) %}
      <h3 class="h2">Test Paragraph {{ i }}</h3>

      {{ placeholder.paragraph }}
    {% endfor %}
  </div>
</div>

<h3 class="h3">Youtube Videos Automatically Pause</h3>

If option for modal builder pauseYoutubeVideos is true (default true)

<button class="button" data-ulu-dialog-trigger="modal-id-youtube">Open Modal</button>

<div 
  id="modal-id-youtube" 
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "print" : true,
    "bodyFills" : true,
    "documentEnd" : true
  }' 
  hidden
>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/y0sF5xhGreA?si=aRdiK0Xzf3zvHP_E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

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


<h3 class="h3">Positions</h3>

The available positions are top, bottom, left, right and center (default). Left and right are sidebard (full height), while top, bottom and center are all min height (can be configured)

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

<h2 class="h2">Resizing</h2>

The modals setup with the builder allow resizing. Center, top and bottom modals will use the native resize handle (resize in all directions). The left/right sidebar type modals will be given a drag handle and only able to extend their width (since they already span the full screen height). To enable this behavior pass `{ "allowResize" : true }` in builder options (data attribute)


<button class="button" data-ulu-dialog-trigger="modal-id-center-resize">Center Resizable</button>
<button class="button" data-ulu-dialog-trigger="modal-id-right-resize">Right Resizable</button>

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

<h2 class="h2">Click Outside</h2>

By default clicking outside the modal will close it, this can be disabled by passing `{ "clickOutsideCloses" : false }`

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


<h2 class="h2">No Backdrop and Testing Not Preventing Scroll</h2>

Remove the backdrop by passing  `{ "noBackdrop" : true }` to the builder


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

<h2 class="h2">Non Modal Test</h2>


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

<h2 class="h2">Test usage with link (not recommended)</h2>

Testing behavior when the trigger is a link/anchor element. Which is not recommended for accessibility, use button. In situations where this the only option use role button, aria-haspopup dialog and empty hash for href.


<a href="#" role="button" aria-haspopup="dialog" class="link" data-ulu-dialog-trigger="modal-id-trigger-by-link">Test Trigger Link</button>

<div 
  id="modal-id-trigger-by-link" 
  data-ulu-modal-builder='{ 
    "title" : "Triggered by a link"
  }' 
  hidden
>
  Test
</div>