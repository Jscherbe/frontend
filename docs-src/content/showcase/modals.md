---
title: Modals
intro: Modals, also known as dialogs or modal windows, are user interface elements that appear on top of the main application window. They typically have a dimmed background to draw focus to the modal itself, and often prevent users from interacting with the underlying content until the modal is closed

---

## Examples

### Default

<button class="button" data-ulu-modal-trigger="modal-id-1">Open Modal</button>

<dialog id="modal-id-1" class="modal">
  <div class="modal__container">
    <header class="modal__header">
      <h2 auto>Modal Title</h2>
      <button class="modal__close" autofocus data-ulu-modal-close>
        <span data-feather="close"></span>
      </button>
    </header>
    <div class="modal__body">
      This is the modal body
    </div>
    <div class="modal__footer">
      This is the modal body
    </div>
  </div>
</dialog>
