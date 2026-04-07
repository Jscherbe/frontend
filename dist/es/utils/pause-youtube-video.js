const n = [
  ".youtube-embedded-video",
  'iframe[title*="YouTube video player"]',
  'iframe[src*="youtube.com/embed"]'
];
function a(r = document, t = "pauseVideo") {
  c(r).forEach((e) => {
    try {
      const o = `{"event":"command","func":"${t}","args":""}`;
      e.contentWindow.postMessage(o, "*");
    } catch (o) {
      console.error(o);
    }
  });
}
function i(r = document) {
  c(r).forEach((s) => {
    if (s.src)
      try {
        const e = new URL(s.src), o = "enablejsapi";
        e.searchParams.get(o) !== "1" && (e.searchParams.set(o, "1"), e.searchParams.set("rel", "0"), s.src = e.toString());
      } catch (e) {
        console.warn("Issue prepping youtube URL:", s.src);
      }
  });
}
function c(r) {
  return r.querySelectorAll(n.join(", "));
}
export {
  a as pauseVideos,
  i as prepVideos
};
