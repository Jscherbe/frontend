// Snippet of old version of dialog with the native resize detection script
// - This is the one that doesn't use setPointerCapture (since that could have side effects on user components in the dialog)

// Only including the function it was used in, for reference

/**
 * Setup click handlers for a dialog
 * @param {Node} dialog 
 */
export function setupDialog(dialog, userOptions) {
  const options = Object.assign({}, currentDefaults, userOptions);
  const body = document.body;
  const { preventScrollShift: preventShift } = options;
  let isPointerDown = false;
  let isResizing = false;

  
  // This was added to provide a simple flag for "isPointerDown" so that 
  // we can disable click outside if it was a click that originated inside the dialog, probable from 
  // native resize handle. If this causes issues in the future we can explore tracking the pointer
  // with setPointerCapture but I'm worried about it affecting inner elements with their own pointer events
  // This seems like it will be ok we just don't allow outside closing if there was pointerdown from within the modal
  dialog.addEventListener("pointerdown", handlePointerdown);

  dialog.addEventListener("click", handleClicks);

  // Watching for resizes to avoid closing outside during resizes
  // - There is no resize event for css resize (so this uses pointerdown and resize observer)
  const handleResizeEnd = debounce(() => {
    if (isResizing && !isPointerDown) {
      isResizing = false;
    }
  }, 500);

  const resizeObserver = new ResizeObserver(() => {
    if (isPointerDown) {
      if (!isResizing) {
        isResizing = true;
      }
      handleResizeEnd();
    }
  });
  resizeObserver.observe(dialog);

  if (options.documentEnd) {
    body.appendChild(dialog);
  }
  if (options.pauseVideos) {
    prepVideos(dialog);
  }

  // Allow preventScroll if it is a modal dialog
  // Caching value of overflow before setting so we don't assume what it's initial value is
  if (!options.nonModal && options.preventScroll) {
    // Cache restore function
    let restoreScroll; 

    // Toggle prevent scroll
    dialog.addEventListener("toggle", (event) => {
      const isOpen = event.newState === "open";
      if (isOpen) {
        restoreScroll = setupPreventScroll({ preventShift });
      } else if (restoreScroll) {
        restoreScroll();
      }
    });
  }

  function handlePointerdown() {
    if (isPointerDown) return;
    isPointerDown = true;

    const done = () => {
      // After event queue (click) - so after click handler for outside is called
      setTimeout(() => {
        isPointerDown = false;
        isResizing = false;
      }, 0);
    };
    document.addEventListener("pointerup", done, { once: true });
    document.addEventListener("pointercancel", done, { once: true });
  }

  function handleClicks(event) {
    const { target } = event;
    const targetIsDialog = target === dialog;
    const closeFromButton = target.closest(initializer.attributeSelector("close"));
    const allowCloseOutside = !isResizing && options.clickOutsideCloses;
    const closeFromOutside = allowCloseOutside && targetIsDialog && wasClickOutside(dialog, event);
    if (closeFromOutside || closeFromButton) {
      if (options.pauseVideos) {
        pauseVideos(dialog);
      }
      dialog.close();
    }
  }
} 
