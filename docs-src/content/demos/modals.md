---
title: Modals
layout: default
intro: Modals, also known as dialogs or modal windows, are user interface elements that appear on top of the main application window. They typically have a dimmed background to draw focus to the modal itself, and often prevent users from interacting with the underlying content until the modal is closed

---

## Examples

### Default

<button class="button" data-ulu-dialog-trigger="modal-id-1">Open Modal</button>

<div 
  id="modal-id-1" 
  class="wysiwyg"
  data-ulu-dialog-builder='{ "title" : "Test Title", "position" : "right"  }' 
  hidden
>
  This is the modal body <button data-ulu-dialog-close>Close</button>
</div>
