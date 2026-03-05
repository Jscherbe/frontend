/**
 * Module provides a way to copy an elements textContent from a button
 * with "data-copy-content" attribute where value is the element
 * who's textContent you want to copy from
 */
import { Tooltip } from "@Lib/js/index.js";
import { copyText } from "@ulu/utils/browser/clipboard.js";

// Setup copy behavior
export function init() {
  document.querySelectorAll("[data-copy-content]").forEach(button => {
    const { copyContent: selector } = button.dataset;
    if (!selector) return;

    const source = document.querySelector(selector);
    if (!source) {
      console.warn("Unable to find element to copy from:", button);
      return;
    }

    const defaultText = "Copy Code";
    const tooltip = new Tooltip({ trigger: button }, { content: defaultText });
    const tooltipBody = tooltip.elements.content.querySelector("[data-ulu-tooltip-body]");
    const setTooltipText = value => {
      tooltipBody.textContent = value;
    };
    const revertTooltip = () => {
      setTimeout(() => {
        setTooltipText(defaultText);
      }, 1500);
    };

    button.addEventListener("click", () => {
      const { textContent } = source;
      copyText(textContent)
        .then(() => {
          if (tooltipBody) {
            tooltip.show(); // If it used fallback the button loses focus
            setTooltipText("Code Copied!");
            revertTooltip();
          }
        })
        .catch(err => {
          console.error(err);
          setTooltipText("Copy Failed");
          revertTooltip();
        });
    });
  });
}