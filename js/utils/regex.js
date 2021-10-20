// Version:         1.0.0 

/**
 * Common Regular Expression Patterns
 */
export const patterns = {
  linebreaks: /(\r\n|\n|\r)/gm,
  multiSpace: /\s+/g,
  htmlTag: /<\/?[^>]+(>|$)/g
};