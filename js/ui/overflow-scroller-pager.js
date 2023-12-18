/**
 * @module overflow-scroller-pager
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

export default function create() {
  return function pager(instance, dir) {
    const isNext = dir === "next";
    const { track } = instance.elements;
    if (!track.children) return 400;
    const trackStyle = window.getComputedStyle(track);
    // Note we are banking on the scroll padding string to be in "px", not doing any conversions here
    const scrollPaddingRaw = trackStyle.getPropertyValue( 'scroll-padding-left' ).replace( 'auto', '0px' );
    const scrollPadding = parseInt(scrollPaddingRaw, 10);

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
      // Find the first item that didn't make it
      slideFound = slides.find(slide => slide.offsetRight >= right);
    } else {
      let slideBeforeIndex = slides.findLastIndex(slide => slide.offsetLeft <= scrollLeft);
      // Find the slides before this slide that can fit, including the slide before
      if (slideBeforeIndex) {
        let slideBefore = slides[slideBeforeIndex];
        let slidesBefore = slides.slice(0, slideBeforeIndex + 1);
        slideFound = slidesBefore.find(slide => {
          const rightEdge = slide.offsetLeft + scrollPadding + offsetWidth;
          return rightEdge >= slideBefore.offsetRight;
        });
      }
    }
    if (slideFound) {
      return isNext ? slideFound.offsetLeft : slideFound.offsetLeft + scrollPadding;
    } else {
      return 400;
    }
  }
}
