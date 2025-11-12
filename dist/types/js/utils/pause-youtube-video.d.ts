/**
 * Somewhat hacky way to pause the video
 * - https://www.digitalredpanther.com/blog/play-pause-stop-youtube-embed
 * - Actual JS API documentation (Didn't follow this for now) (https://developers.google.com/youtube/iframe_api_reference)
 * @param {Element|Node} context The DOM element to search for and pause videos within
 */
export function pauseVideos(context?: Element | Node): void;
/**
 * Prep videos to be paused
 * - Add query parameters for js API
 * - Removes all other query parameters from iframe.src
 */
export function prepVideos(context?: Document): void;
//# sourceMappingURL=pause-youtube-video.d.ts.map