/**
 * Removes an array element (modifies array)
 * @param {Array} array Array to remove element from
 * @param {Element} element Array element to remove
 */
export function removeArrayElement(array, element) {
  var index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
}

/**
 * Searches array for first item matching test, beginning at a start index but searching the entire array
 * @param {Array} array Array to search
 * @param {Number} start The index in the array to start the search from
 * @param {Function} callback A test function that is passed array item and index
 * - Credit: (James Waddington) https://stackoverflow.com/questions/28430348/how-to-loop-through-arrays-starting-at-different-index-while-still-looping-throu
 */
export function offsetFindIndexOf(array, start = 0, callback) {
  let found, offset;
  for (var i = 0; i < array.length; i++) {
    offset = (i + start) % array.length;
    found = callback(array[offset], offset);
    if (found) return offset;
  }
  return -1;
}