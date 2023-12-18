/**
 * @module logger
 */
// Goal: minimzing console conditions for nessasary production log statements

/**
 * Configuration Object
 */
const config = {
  debug: false,
  warningsAlways: true,
  errorsAlways: true,
  outputContext: false
};

const hasConsole = "console" in window;

// If no context output only if config (global) debug is enabled
function allow(context) {
  return hasConsole && config.debug && (context?.debug || context == null);
};
function getName(context) {
  return typeof context === "object" && context?.constructor?.name;
};
function output(method, context, messages) {
  const label = getName(context) || "Logger";
  console[method](label, ...messages);
  if (config.outputContext) {
    console.log('Context:\n', context);
  }
};

/**
 * Changes to make to configuration
 * @param {Object} changes 
 */
export function set(changes) {
  Object.assign(config, changes);
}

/**
 * Proxy Console.log
 * @param {Object} context Class instance (optional), will rely on classes (debug) property for output
 * @param  {...any} messages 
 */
export function log(context, ...messages) {
  if (allow(context)) {
    output("log", context, messages);
  }
}

/**
 * Proxy Console.warn
 * @param {Object} context Class instance (optional), will rely on classes (debug) property for output
 * @param  {...any} messages 
 */
export function logWarning(context, ...messages) {
  if (config.warningsAlways || allow(context)) {
    output("warn", context, messages);
  }
}

/**
 * Proxy Console.error
 * @param {Object} context Class instance (optional), will rely on classes (debug) property for output
 * @param  {...any} messages 
 */
export function logError(context, ...messages) {
  if (config.errorsAlways || allow(context)) {
    output("error", context, messages);
  }
}
