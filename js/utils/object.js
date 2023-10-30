// Version:         1.0.0 

/**
 *   Checks object has required properties
 *   @param  {array.string}  required     Array of properties to check for
 *   @return {function}                   Function for user to use to test for props passed on objects
 *   @example 
 *     const testProps = hasRequiredProps(["name", "date"]);
 *     if (testProps(userConfiguration)) {
 *       // Stuff
 *     }
 */
export function hasRequiredProps(required) {
  /**
   *   Function used for testing on user end
   *   @param  {object}   testObject   Object to test on
   *   @return {Boolean}
   */
  return function(object) {
    return required.every(value => object.hasOwnProperty(value));
  }
}