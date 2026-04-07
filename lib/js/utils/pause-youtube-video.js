/**
 * @module utils/pause-youtube-video
 */

// Version:         1.0.4
// Description:     Pauses youtube using js api (iframe post message)

const selectors = [
  '.youtube-embedded-video',
  'iframe[title*="YouTube video player"]',
  'iframe[src*="youtube.com/embed"]'
];
/**
 * Somewhat hacky way to pause the video
 * - https://www.digitalredpanther.com/blog/play-pause-stop-youtube-embed
 * - Actual JS API documentation (Didn't follow this for now) (https://developers.google.com/youtube/iframe_api_reference)
 * @param {Element|Node} context The DOM element to search for and pause videos within
 * @param {String} command The YouTube API command. Defaults to 'stopVideo' to preserve legacy behavior.
 */
export function pauseVideos(context = document, command = "pauseVideo") {
  const videos = getVideos(context);
  videos.forEach(video => {
    try {
      const arg = `{"event":"command","func":"${ command }","args":""}`;
      video.contentWindow.postMessage(arg, '*');
    } catch (error) {
      console.error(error);
    }
  });
}
/**
 * Prep videos to be paused
 * - Add query parameters for js API
 * - Removes all other query parameters from iframe.src
 */
export function prepVideos(context = document) {
  const videos = getVideos(context);
  videos.forEach(video => {
    if (video.src) {
      try {
        // Updated to preserve users pre-existing queries
        const url = new URL(video.src);
        url.searchParams.set('enablejsapi', '1');
        url.searchParams.set('rel', '0'); 
        video.src = url.toString();
      } catch (e) {
        // Fallback in case video.src isn't a valid, parseable URL
        console.warn('Issue prepping youtube URL:', video.src);
      }
    }
  });
}

function getVideos(context) {
  return context.querySelectorAll(selectors.join(", "));
}