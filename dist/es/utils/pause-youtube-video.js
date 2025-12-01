const c = [
  ".youtube-embedded-video",
  'iframe[title*="YouTube video player"]',
  'iframe[src*="youtube.com/embed"]'
];
function n(e = document) {
  s(e).forEach((o) => {
    try {
      o.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
    } catch (t) {
      console.error(t);
    }
  });
}
function i(e = document) {
  s(e).forEach((o) => {
    const { src: t } = o;
    t && (o.src = t.split("?")[0] + "?rel=0&enablejsapi=1");
  });
}
function s(e) {
  return e.querySelectorAll(c.join(", "));
}
export {
  n as pauseVideos,
  i as prepVideos
};
