---
title: Modals
layout: default
intro: Modals, also known as dialogs or modal windows, are user interface elements that appear on top of the main application window. They typically have a dimmed background to draw focus to the modal itself, and often prevent users from interacting with the underlying content until the modal is closed

---

```html
<div>Test</div>
```

## Examples

### Default

This is the default modal, being created from markup in the body on page load by modal builder. The default modal is centered.

<button class="button" data-ulu-dialog-trigger="modal-id-center">Open Modal</button>

<div 
  id="modal-id-center" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title" 
  }' 
  hidden
>
  This is the modal body <button data-ulu-dialog-close>Close</button>
</div>

### Positions

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

## Resizing

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

## Click Outside

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


## No Backdrop

Remove the backdrop by passing  `{ "noBackdrop" : true }` to the builder


<button class="button" data-ulu-dialog-trigger="modal-id-no-backdrop">No Backdrop</button>

<div 
  id="modal-id-no-backdrop" 
  class="wysiwyg"
  data-ulu-modal-builder='{ 
    "title" : "Test Title",
    "noBackdrop" : true
  }' 
  hidden
>
  Test
</div>