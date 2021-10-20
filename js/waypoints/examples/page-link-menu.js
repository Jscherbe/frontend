/**
 * @todo This needs to be converted for reuse!
 */

// Creates anchor menu and attaches waypoints
import ElementWaypoint from "../lib/element-waypoint.js";
import Tooltip from "../lib/tooltip.js";


window.addEventListener("load", init);

function init() {
  const anchors = [];
  let idCount = 0;
  const activeClass = 'header__page-link--active';
  const ignoreSelector = '[data-page-link-search-ignore]';
  const searchSelector = `h1:not(${ ignoreSelector }), h2:not(${ ignoreSelector })`;
  const container = document.querySelector('.header__page-links');
  const context = document.querySelector('[data-page-link-search]');
  if (!container || !context) return;
  const headlineNodes = [ ...context.querySelectorAll(searchSelector) ];
  // Filter out parents too
  const headlines = headlineNodes.filter(n => n.closest(ignoreSelector) === null);
  
  headlines.forEach(element => {
    const id = getId(element);
    const anchor = document.createElement('a');
    const span = document.createElement('span');
    anchor.classList.add('header__page-link');
    anchor.href = "#" + id;
    span.classList.add('hidden-visually');
    span.textContent = element.textContent;
    anchor.appendChild(span);
    container.append(anchor);
    anchors.push(anchor);
    anchor.addEventListener("focusin", onHover);
    anchor.addEventListener("mouseenter", onHover);
    anchor.addEventListener("focusout", onHoverOut);
    anchor.addEventListener("mouseleave", onHoverOut);
    // Attach watcher
    (new ElementWaypoint({ 
      offsetTop: '20%', 
      handler: waypointHandler, 
      element 
    }));
  });

  function waypointHandler(entering, direction) {
    const { element } = this.options;
    const anchor = anchors[ headlines.indexOf(element) ];
    const index = anchors.indexOf(anchor);
    
    if (entering) {
      removeActiveAll();
      activateAnchor(anchor);
    // Above the first
    } else if (index === 0 && direction === "up") {
      removeActiveAll();
    // Since we are using headlines instaed of containers we need to 
    // activate when user is scrolling up. By finding the index of the anchor 
    // above the recently deactivated headline target
    } else if (direction === "up") {
      removeActiveAll();
      activateAnchor(anchors[index - 1]);
    }
  }
  function removeActiveAll() {
    anchors.forEach(anchor => anchor.classList.remove(activeClass));
  }
  function activateAnchor(anchor) {
    anchor.classList.add(activeClass);
  }
  function getId(element) {
    if (!element.id)  element.id = `page-link--${ ++idCount }`;
    return element.id;
  }
}

// Tooltip Related
// =============================================================================

let tooltip;

function onHover(event) {
  const { target } = event;
  destroy();
  tooltip = new Tooltip(target, target.textContent, { 
    classes: [
      "site-tooltip",
      "page-link-tooltip"
    ]
  });
}
function onHoverOut() {
  destroy();
}
function destroy() {
  if (tooltip) {
    tooltip.destroy();
    tooltip = null;
  }
}




