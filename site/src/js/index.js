import * as ulu from "@Lib/js/index.js";
// import "./search.js";
import { init as initListGrid, setConfig as setConfigListGrid } from "./list-grid-switcher.js";
import { init as initLiveDemo } from "./live-demo.js";
import { init as initDataCopyContent } from "./data-copy-content.js";

// Add global (so we use it in demos)
window.Ulu = ulu;

// Set options
ulu.classLoggerSet({ debug: true });
ulu.updateSetting("cssvarPrefix", "site");
ulu.fontAwesomeConfigureIcons();

// Init components
ulu.pageInit();
ulu.gridInit();
ulu.popoverInit();
ulu.tooltipInit();
ulu.tabsInit();
ulu.modalBuilderInit();
ulu.dialogInit();
ulu.proxyClickInit();
ulu.scrollpointInit();
ulu.printInit();
ulu.printDetailsInit();
ulu.scrollSliderInit();
ulu.sliderInit();
ulu.flipcardInit();
ulu.themeToggleInit();
ulu.detailsGroupInit();

setConfigListGrid({
  onChange(container, value) {
    const isList = value === "list";
    const cards = container.querySelectorAll(".card");
    const cardGrid = container.querySelector(".card-grid");
    if (cards) {
      cards.forEach(card => {
        card.classList[isList ? "add" : "remove"]("card--horizontal");
      });
    }
    if (cardGrid) {
      cardGrid.classList[isList ? "add" : "remove"]("card-grid--one-column");
    }
  }
});

initListGrid();
initLiveDemo();
initDataCopyContent();

const handleHashJump = (hash) => {
  if (!hash) {
    return;
  }
  const id = hash.replace("#", "");
  const target = document.getElementById(id);
  if (!target) {
    return;
  }
  const panel = target.closest("[role=\"tabpanel\"]");
  if (panel) {
    const tabButton = document.querySelector(`[aria-controls="${ panel.id }"]`);
    if (tabButton && tabButton.getAttribute("aria-selected") !== "true") {
      tabButton.click();
    }
  }
};

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (link && link.hash) {
    setTimeout(() => {
      handleHashJump(link.hash);
    }, 0);
  }
});

if (window.location.hash) {
  setTimeout(() => {
    handleHashJump(window.location.hash);
  }, 100);
}