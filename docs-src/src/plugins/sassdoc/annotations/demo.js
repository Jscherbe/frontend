// import { regex } from "../reference/lib/utils.js";
import { extractMatchDetails } from "@ulu/utils/string.js";

/**
 * @see https://github.com/SassDoc/sassdoc/blob/b3495a39588f7e5a091f1073ca40a75fd941867d/src/annotation/annotations/group.js
 * @see https://github.com/SassDoc/sassdoc/blob/b3495a39588f7e5a091f1073ca40a75fd941867d/src/annotation/annotations/example.js
 */

export default function demo() {
  return {
    name: 'demo',
    parse(text) {
      // Split by first whitespace
      const match = extractMatchDetails(text, /^\S+/);
      if (match) {
        const { matched: link, after } = match;
        // Remove whitespace at front and " - " if using dashes
        const content = after ? after.replace(/^\s+-\s+|^\s+/, "") : null;
        return {
          link,
          content
        }
      } else {
        throw new Error(`Unable to process @demo annotation for '${ text }`);
      }
    },
    multiple: false,
  }
}
