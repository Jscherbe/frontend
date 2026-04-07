const n = [
  ".youtube-embedded-video",
  'iframe[title*="YouTube video player"]',
  'iframe[src*="youtube.com/embed"]'
];
function a(o = document, t = "pauseVideo") {
  c(o).forEach((e) => {
    try {
      const s = `{"event":"command","func":"${t}","args":""}`;
      e.contentWindow.postMessage(s, "*");
    } catch (s) {
      console.error(s);
    }
  });
}
function u(o = document) {
  c(o).forEach((r) => {
    if (r.src)
      try {
        const e = new URL(r.src);
        e.searchParams.set("enablejsapi", "1"), e.searchParams.set("rel", "0"), r.src = e.toString();
      } catch (e) {
        console.warn("Issue prepping youtube URL:", r.src);
      }
  });
}
function c(o) {
  return o.querySelectorAll(n.join(", "));
}
export {
  a as pauseVideos,
  u as prepVideos
};
