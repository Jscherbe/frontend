/**
 * @module ui/overflow-scroller-pager
 */
/**
 * Function to be used in overflow scrollers "amount" option. This function will
 * determine how many items can fit in the viewport, taking into account scroll padding left, 
 * and will set the scroll amount to paginate between items. Items size can be anything 
 * (ie. one per screen vs 3.5 per screen will both work). This seperated from the plugin 
 * for tree shaking incase it's unneeded. Currently this is only setup for horizontal scrolling
 * 
 * Note: This is setup to return the function, incase configuration is needed in the future 
 * it can be passed to the create function
 * 
 * @return {Function} A function to be used in overflow scrollers "amount" configuration property
 */

export function createPager() {
  return function pager(instance, dir) {
    const isNext = dir === "next";
    const { track } = instance.elements;
    if (!track.children) return 400;
    const trackStyle = window.getComputedStyle(track);
    // Note we are banking on the scroll padding string to be in "px", not doing any conversions here
    const scrollPaddingRaw = trackStyle.getPropertyValue( 'scroll-padding-left' ).replace( 'auto', '0px' );
    const scrollPadding = parseInt(scrollPaddingRaw, 10) || 0;

    const { scrollLeft, offsetWidth } = track;
    const right = scrollLeft + offsetWidth;
    // Get all slide positions into an array
    const slides = [ ...track.children ].map(element => {
      const { offsetLeft, offsetWidth } = element;
      return { 
        element, 
        offsetLeft, 
        offsetRight: offsetLeft + offsetWidth 
      };
    });
    // Test edges to see what can fit, slide found will be the slide to scroll to
    let slideFound;
    if (isNext) {
      // Find the first item whose right edge is cut off by the right side of the viewport.
      // -1 handles sub-pixel rounding issues.
      slideFound = slides.find(slide => slide.offsetRight > right - 1);
    } else {
      // Find the index of the slide immediately before the currently visible (padded) area.
      // -1 ensures we grab the slide that is fully outside the view.
      let slideBeforeIndex = slides.findLastIndex(slide => slide.offsetLeft < scrollLeft + scrollPadding - 1);
      
      // Find the slides before this slide that can fit, including the slide before
      if (slideBeforeIndex > -1) {
        let slideBefore = slides[slideBeforeIndex];
        let slidesBefore = slides.slice(0, slideBeforeIndex + 1);
        
        // Iterate backwards from the start to see how far back we can jump while still 
        // keeping our anchor `slideBefore` fully visible in the new viewport.
        slideFound = slidesBefore.find(slide => {
          // Calculate where the right edge of the viewport will be if we snap to this slide.
          // Snapping aligns slide.offsetLeft to the padding.
          const rightEdge = slide.offsetLeft - scrollPadding + offsetWidth;
          // Return true if our anchor slide is still within this new right edge.
          return rightEdge >= slideBefore.offsetRight - 1;
        }) || slideBefore; // Fallback to `slideBefore` if no older slides fit in the same view.
      }
    }
    if (slideFound) {
      // Return the target scroll position that aligns the target slide's left edge
      // exactly with the CSS scroll-padding. Ensure we don't return a negative scroll amount.
      return Math.max(0, slideFound.offsetLeft - scrollPadding);
    } else {
      return 400; // Fallback amount
    }
  }
}
