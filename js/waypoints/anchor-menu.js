/**
 * @todo This file is untested since conversion to module
 */

import ElementWaypoint from "../lib/element-waypoint.js";

export default function init(anchors, caret, options) {
  const defaults = {
    offsetTop: "20%",
    activeClass: "active"
  };
  options = Object.assign(defaults, options);

  const targets = anchors.map(a => document.getElementById(a.hash.substr(1)));
  const { activeClass } = options;
  let caretNotEntered = true;
  let caretVisible;

  targets.forEach(element => new ElementWaypoint({ offsetTop: options.offsetTop, handler, element }));

  function handler(entering, direction) {
    const { element } = this.options;
    const anchor = anchors[ targets.indexOf(element) ];
    const index = anchors.indexOf(anchor);
    
    if (entering) {
      removeActiveAll();
      activateAnchor(anchor);
      anchor.classList.add(activeClass);
    // Above the first
    } else if (index === 0 && direction === "up") {
      removeActiveAll(true);
    // Since we are using headlines instaed of containers we need to 
    // activate when user is scrolling up. By finding the index of the anchor 
    // above the recently deactivated headline target
    } else if (direction === "up") {
      removeActiveAll();
      activateAnchor(anchors[index - 1]);
    }
  }
  function removeActiveAll(hideCaret) {
    anchors.forEach(anchor => anchor.classList.remove(activeClass));
    if (hideCaret) {
      setCaretVisibility(false);
    }
  }
  function activateAnchor(anchor) {
    // Block transtions on first reveal
    if (caretNotEntered) {
      caret.style.transition = 'none';
    }
    anchor.classList.add(activeClass);
    setCaretPosition(anchor);
    if (!caretVisible) {
      setCaretVisibility(true);
    }
    // Add the transitions back in for the next change to visiblity or position
    if (caret && caretNotEntered) {
      caretNotEntered = false;
      caret.offsetHeight; // Force repaint (visiblity above)
      caret.style.transition = ''; // Then remove the transition block
    }
  }
  function setCaretPosition(anchor) {
    if (!caret) return;
    const position = anchor.offsetTop;
    const height = anchor.clientHeight;
    caret.style.transform = `translateY(${ position + (height / 2) }px)`;
    // caret.style.height = `${ anchor.clientHeight }px`;
  }
  function setCaretVisibility(visible) {
    if (!caret) return;
    caret.style.opacity = +(visible);
    caretVisible = visible;
  }
}
