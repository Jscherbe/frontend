// =============================================================================
// Jquery Prototypes
// =============================================================================

// Version:         2.0.0

// Description:     All of our simple jQuery prototypes

// Change log:      2.0.0 | Converted to ES Module with exports (so we can pick and choose)

const $ = jQuery;

// FUnction to do conditions in chaining sequences
export function when(condition, method, argumentsArray) {
  if (!Array.isArray(argumentsArray)) argumentsArray = [argumentsArray];
  if (typeof condition === 'function') condition = condition.apply(this, argumentsArray);
  if (condition) this[method].apply(this, argumentsArray);
  return condition ? this[method].apply(this, argumentsArray) : this;
}
export function mergeObjects() {
  var collect = $([]).add(this);
  for (var i = 0; i < arguments.length; i++) collect = collect.add(arguments[i]);
  return collect;
}
export function updateSelection() {
  var elements = $(this.selector);
  this.splice(0, this.length);
  this.push.apply(this, elements);
  return this;
}
export function findFromRoot(selector) {
    return this.filter(selector).add(this.find(selector));
}
export function dataExplode(attrName, delimiter) {
  var dataFound = this.data(attrName);
  return dataFound !== undefined && typeof dataFound === 'string' ? dataFound.split('|') : false;
}
export function isOverflowingY() {
  var el = this[0];
  return el.offsetHeight < el.scrollHeight;
}    
export function isOverflowingX() {
  var el = this[0];
  return el.offsetWidth < el.scrollWidth;
}    
export function escapeSelector(stringPasssed) {
  return stringPasssed.replace(/(:|\.|\[|\]|,)/g, "\\$1");
}
export function getControlled(attr) {
  if (!attr) attr =  'aria-controls';
  var id = this.attr(attr);
  return $('#'+id);
}
export function getControls(attr) {
  if (!attr) attr =  'aria-controls';
  var id = this.attr('id');
  return $('['+attr+'='+id+']');
}
export function queryVar(variable) {
  var query = curQueryVars,
      vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}
export function eachMatchingIndexes(method, collection) {
  this.each(function(i) {
    $(this)[method](collection[i]);
  });
  return this;
}
export function makeFocusable(forScripts, firstDescendant) {

  var el = this,
      tabindex = forScripts ? -1 : 0;
  // If they said first descendant (that is focusable)
  if (firstDescendant) {
    var newEl = el.find(_g.focus.titleEl+', '+_g.focus.elFocusable).not('[aria-hidden="true"]');
    if (newEl.length) {
      el = newEl;
    }
  }
  el = el.first();
  if (!el.is(_g.focus.elFocusable)) el.attr('tabindex', tabindex);  // Make focusable by scripts 

  return el;
}
export function attrBooleanToggle(attribute, forceState) {
  this.attr(attribute, function(i, iString) {
    if (forceState === true || forceState === false) return forceState;
    if (iString === 'true') return 'false';
    return 'true';
  });
  return this;
}
export function checkIdAndSet(stringForId) {
  if ($(this).attr('id')) {
    return (this).attr('id');
  } else {
    var id = stringForId === undefined ? _g.uniqueId() : stringForId; // If they don't pass string use global method.
    $(this).attr('id', id); // Assign id
    return id; // Return Id for user's use
  }
}
export function scrollParent() {
  var overflowRegex = /(auto|scroll)/,
  position = this.css( "position" ),
  excludeStaticParent = position === "absolute",
  scrollParent = this.parents().filter( function() {
    var parent = $( this );
    if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
      return false;
    }
    var overflowState = parent.css(["overflow", "overflowX", "overflowY"]);
    return (overflowRegex).test( overflowState.overflow + overflowState.overflowX + overflowState.overflowY );
  }).eq( 0 );

  return position === "fixed" || !scrollParent.length ? $( this[ 0 ].ownerDocument || document ) : scrollParent;
}
export function scrollParentY() {
  var overflowRegex = /(auto|scroll)/,
  position = this.css( "position" ),
  excludeStaticParent = position === "absolute",
  scrollParent = this.parents().filter( function() {
    var parent = $( this );
    if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
      return false;
    }
    var overflowState = parent.css(["overflowY"]);
    return (overflowRegex).test(overflowState.overflowY );
  }).eq( 0 );

  return position === "fixed" || !scrollParent.length ? $htmlBody : scrollParent;
}
export function removeClassStartsWith(stringPassed) {
  this.removeClass(function (index, classes) {

    // This function splits into an array
    // Then filters out the passed string
    // Then returns it joined as space seperated
    // Jquery then removes those classes
    
    return classes
      .split(' ')
      .filter(function(value) {
        return value.includes(stringPassed);
      })
      .join(' ');
  });

  // For Chaining
  return this;
}
export function doesExist(callback){
  if (this.length) {
    if (callback) callback.call(this);
    return true;
  } 
}
export function notExist(callback){
  if (this.length <= 0) {
    if (callback) callback.call(this);
    return true;
  } 
}
export function sortByDepth() {
  // Sorts jquery object by deepest to shallowest item
  var ar = this.map(function() {
      return {length: $(this).parents().length, elt: this};
  }).get(),
  result = [],
  i = ar.length;
  ar.sort(function(a, b) {
    return a.length - b.length;
  });
  while (i--) {
    result.push(ar[i].elt);
  }
  return $(result);
};
// throttleScroll
export function throttleScroll(eventName, optionalHandler) {
  var posLastY = 0,
      posLastX = 0,
      lastFrameComplete = true,
      el = this;

  // Internal function for touch move and scroll
  function scrollHandler(event) {

    var posY = el.scrollTop(),
        posX = el.scrollLeft(),
        elHeight = el.innerHeight(); // cOme back

    if (lastFrameComplete && (posLastY !== posY || posLastX !== posX)) {

      var scrollData = {
        positionY: posY,
        positionX: posX,
        height: elHeight,
        positionLastY: posLastY,
        positionLastX: posLastX,
        direction: posLastY > posY ? 'up' :'down'
      };

      posLastY = posY;
      posLastX = posX;
      lastFrameComplete = false;

      requestAnimationFrame(function(){
        el.trigger(eventName, [scrollData, event]);
        lastFrameComplete = true;
      });
    } 
  }

  // Attach our throttling handler
  el.on('scroll touchmove', scrollHandler);
  // If they passed a handler attach it
  if (optionalHandler) el.on(eventName, optionalHandler);
  // Chaining
  return scrollHandler;
};

export function copyAttributes() {
  var attrs = {};

  $.each(this[0].attributes, function(idx, attr) {
      attrs[attr.nodeName] = attr.nodeValue;
  });

  return attrs;
};
export function attributesFrom(elFrom, overwrite) {
  var $this = this;
  $.each(elFrom[0].attributes, function(idx, attr) {
      $this.attr(attr.nodeName, attr.nodeValue);
  });
  return this;
};
export function changeElementType(newType) {

  var attrs = this.copyAttributes(),
      newElement = $("<" + newType + "/>", attrs).append($(this).contents());

  this.replaceWith(newElement);
  return newElement;
};
// This function accepts a string to search for and if found will use the "change" argument passed.
// Since this is using the string replace() function you can use either a function or a string.
// Using :contains  selector vs anything reg-ex or filter related because it is extremely fast 
// in tests and the search could be deep. Contains will give us both the element with the 
// text and the parents (unfortunate). So once we have them we filter by nodeType 3 which
// is text nodes. And then check if that node has the string. If it does we run replace with 
// the string and call the users callback for the replacement.
export function replaceText(find, change, filterSelector) {
  this
    .find(':contains(' + find + ')')
    .filter(filterSelector || null)
    .contents()
    .filter(function() { 
      return this.nodeType === 3 && this.nodeValue.includes(find); 
    })
    .each(function() {
      var newNode = document.createElement('span');
      newNode.innerHTML = this.nodeValue.replace(find, change);
      this.parentNode.insertBefore(newNode, this);
      this.parentNode.removeChild(this);
    });
  return this;
};
// Better jqeury.each(), passes the $(this) that everyone makes into a variable anyways
// This is based on prototype.each which uses jQuery.each(object, callback) so it 
// should perform as well. Test here: https://codepen.io/Jscherbe/pen/pZMZOo
export function forEach(callback) {
  var $t;
  for (var i = 0; i < this.length; i++) {
    $t = $(this[i]);
    if (callback.call($t, i, $t) === false) break;
  }
  return this;
};
export function isOutside(context) {
  return !context.has(this).length || context.is(this);
};
export function apply(fn, args) {
  fn.apply(this, args);
  return this; 
};
export function hasAttr(name) {
  var attr = this.attr(name);
  return !(typeof attr !== undefined && attr !== false);
};
export function debounce(func, wait, immediate, valueThis) {
  var timeout;
    return function() {
    var context = valueThis || this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};