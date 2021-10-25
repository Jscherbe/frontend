/**
 *   Will return an object with the separation details
 *   @param  {[type]} string [description]
 *   @return {object}        keys: value, original, unit
 */
 export function separateCssUnit(original) {
  const pattern = /(px|vw|vh|%|em|rem)/i;
  return {
    original,
    value:  original.replace(pattern, ""),
    unit:   original.match(pattern)[0]
  };
}

/**
 * Removes HTML tags from string
 * - Note you can use document.createElement and grab textContent (but this could execute code in browser)
 * - The method below will just use regex without creating Nodes
 * @param {String} html HTML string to find/replace
 */
 export function stripTags(html) {
  return html.replace(regex.htmlTag, "");
}

/**
 * 
 * @param {String} string String to trim
 * @returns 
 */
 export function trimDoubleSpaces(string) {
  return string.replace(regex.multiSpace, "");
}

/**
 * Remove line breaks
 * @param {String} string String to trim
 * @returns {String}
 */
 export function trimLineBreaks(string) {
  return string.replace(regex.linebreaks, "");
}

/**
 * Designed originally to flatten style definitions
 * @param {String} string String to trim
 * @returns {String}
 */
 export function trimWhitespace(string) {
  return string.replace(regex.linebreaks, "")
               .replace(regex.multiSpace, " ")
               .trim();
}

/**
 *   Truncates string with ellipsis if over the max, note use framework function
 *   if you need to know the effects of the truncate process (returns an object 
 *   with info instead) this function only modifies the string
 *   @param  {string} string    String to possibly truncate
 *   @param  {number} max       How many characters max?
 *   @return {string}     
 */
 export function truncate(string, max, overflowChar = '…') {
  return string.length <= max ? string : string.slice(0, max) + overflowChar;
}

/**
 * Replaces non safe characters with "-"
 * - Does not escape characters
 * - Used for id's and classnames or things that can't  have anything but normal a-z 0-9
 */
 export function urlize(string) {
  var newString;
  string = string.replace(/^[^-_a-zA-Z]+/, '').replace(/^-(?:[-0-9]+)/, '-');
  newString = string && string.replace(/[^-_a-zA-Z0-9]+/g, '-');
  return newString;
}

/**
 * Converts date to abbreviated month date ie "Mar 7, 2018"
 * @param {String|Date} str Date or date string (passed through date constructor)
 * @return {String} Pretty date string
 */
 export function prettyDate(str) {
  const date = new Date(str);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${ months[date.getMonth()] } ${ date.getDate() }, ${ date.getFullYear() }`;
}

/**
 * Generates a random string of defined length based on
 * a string of allowed characters.
 *
 * @param  {number} length  How many random characters will be in the returned string. Defaults to 10
 * @param  {string} allowed Which characters can be used when creating the random string. Defaults to A-Z,a-z,0-9
 * @return {string}         A string of random characters
 */
 export function randomString(
  length = 10,
  allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += allowed.charAt(Math.floor(Math.random() * allowed.length));
  }
  return result;
}