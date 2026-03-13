function i(e, r) {
  const t = new MutationObserver((o) => {
    o.forEach((n) => {
      if (n.attributeName === "open") {
        const s = e.hasAttribute("open");
        r(s);
      }
    });
  });
  return t.observe(e, { attributes: !0, attributeFilter: ["open"] }), {
    destroy: () => t.disconnect()
  };
}
export {
  i as observeDialogToggle
};
