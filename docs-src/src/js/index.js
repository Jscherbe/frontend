import * as ulu from "../../../js/index.js";
import "./search.js";
import { init as initListGrid, setConfig as setConfigListGrid } from "./list-grid-switcher.js";
import { init as initLiveDemo } from "./live-demo.js";

// Use global API (so we test it, since we mostly import manually)
window.Ulu = ulu;

// Set options
ulu.utils.classLogger.set({ debug: true });
ulu.settings.updateSetting("cssvarPrefix", "site");
ulu.utils.fontAwesome.configureIcons();

ulu.ui.page.init();
ulu.ui.grid.init();
ulu.ui.popover.init();
ulu.ui.tooltip.init();
ulu.ui.tabs.init();
ulu.ui.modalBuilder.init();
ulu.ui.dialog.init();
ulu.ui.proxyClick.init();
ulu.ui.scrollpoint.init();
ulu.ui.print.init();
ulu.ui.printDetails.init();
ulu.ui.scrollSlider.init();
ulu.ui.slider.init();
ulu.ui.flipcard.init();
ulu.ui.themeToggle.init();
ulu.ui.detailsGroup.init();

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