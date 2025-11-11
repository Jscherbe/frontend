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
 */
export function pauseVideos(context = document) {
  const videos = getVideos(context);
  videos.forEach(video => {
    try {
      video.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
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
    const { src } = video;
    if (src) {
      video.src = src.split("?")[0] + "?rel=0&enablejsapi=1";
    }
  })
}

function getVideos(context) {
  return context.querySelectorAll(selectors.join(", "));
}