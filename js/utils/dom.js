let idCount = 0;


export function newId() {
  return `ulu-uid-${ ++idCount }`;
}

/**
 * Sets an ID if element doesn't have one vie newUid
 * @param {Node} element Element to make sure has an id
 */
export function ensureId(element) {
  if (!element.id) {
    element.id = newId();
  }
}