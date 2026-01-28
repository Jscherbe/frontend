/**
 * Creates a function that resolves shortcode arguments into an options object.
 * It supports passing a single object as the options or positional arguments
 * based on the provided lookup.
 *
 * @param {object} lookup - An object whose keys define the expected names
 * for positional arguments, and the order of these
 * keys determines how positional arguments are mapped.
 * The values in this object are treated as the default
 * values for the options.
 * @param {object} [alters] - An optional object whose keys correspond to keys
 * in the `lookup`. The values are functions that will be applied to the
 * resolved option value before it is merged with the defaults. This can be
 * useful for transforming values, for example, to allow a string or an array
 * as input for a field. Each function in `alters` takes the resolved value
 * as its argument and returns the modified value.
 *
 * @example
 * ```javascript
 * const resolveMyOptions = optionsFromArgs({
 *   key: null,
 *   element: 'span',
 *   class: ''
 * }, {
 *   class: (value) => Array.isArray(value) ? value.join(' ') : value,
 *   key: (value) => String(value).toUpperCase()
 * });
 *
 * // Usage in shortcode with positional arguments:
 * const options1 = resolveMyOptions('home', 'div', ['bold', 'text']);
 * // options1 will be: { key: 'HOME', element: 'div', class: 'bold text' }
 *
 * // Usage with an options object:
 * const options2 = resolveMyOptions({ class: 'secondary', key: 'user' });
 * // options2 will be: { key: 'USER', element: 'span', class: 'secondary' }
 *
 * // Usage with an options object and array for class:
 * const options3 = resolveMyOptions({ key: 'item', class: ['active', 'large'] });
 * // options3 will be: { key: 'ITEM', element: 'span', class: 'active large' }
 * ```
 *
 * @returns {function} A function that takes a variable number of arguments
 * and returns an options object merged with defaults.
 */
export function optionsFromArgs(lookup, alters) {
  const keys = Object.keys(lookup);
  const altersEntries = alters ? Object.entries(alters) : null;
  /**
   * Resolves the provided arguments into an options object. It checks if the
   * first argument is an options object. If not, it treats the arguments as
   * positional and maps them to option names based on the order defined in
   * the `lookup` provided to the factory.
   *
   * @param {...any} args - The arguments passed to the shortcode. Either a
   * single options object or a series of positional arguments.
   * @returns {object} An object containing the resolved options, merged with
   * the defaults defined in the `lookup`.
   */
  return function resolveArgOptions(...args) {
    let options = {};
    const defaults = lookup; // Using lookup as the source of defaults

    if (args.length === 1 && typeof args[0] === "object") {
      // First argument is an options object
      options = args[0];
    } else {
      // Positional arguments, map them to the keys in 'lookup'
      args.forEach((arg, index) => {
        if (keys[index] !== undefined) {
          options[keys[index]] = arg;
        }
      });
    }

    if (altersEntries) {
      altersEntries.forEach(([key, alter]) => {
        if (options.hasOwnProperty(key)) {
          options[key] = alter(options[key]);
        }
      })
    }

    return Object.assign({}, defaults, options);
  };
}


export function resolveToArray(value) {
  return Array.isArray(value) ? value : [value];
}