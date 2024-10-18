// import { regex } from "../reference/lib/utils.js";
/**
 * @see https://github.com/SassDoc/sassdoc/blob/b3495a39588f7e5a091f1073ca40a75fd941867d/src/annotation/annotations/group.js
 * @see https://github.com/SassDoc/sassdoc/blob/b3495a39588f7e5a091f1073ca40a75fd941867d/src/annotation/annotations/example.js
 */

export default function demo() {
  return {
    name: 'demo',
    parse(text) {
      const parts = text.split(" - ");
      const link = parts[0];
      const content = parts[1] ? parts[1] : null;
      return { link, content };
    },
    multiple: false,
  }
}
