// import { regex } from "../reference/lib/utils.js";
/**
 * @see https://github.com/SassDoc/sassdoc/blob/b3495a39588f7e5a091f1073ca40a75fd941867d/src/annotation/annotations/group.js
 * @see https://github.com/SassDoc/sassdoc/blob/b3495a39588f7e5a091f1073ca40a75fd941867d/src/annotation/annotations/example.js
 */

export default function demo() {
  return {
    name: 'demo',
    parse(text) {
      const regex = {
        findLink: /(?<=\[).+?(?=\])/,
      }
      const link = regex.findLink.exec(text);
      const content = text.replace(` [${link}]`,'');
      return `
        ${content}
        <a class="button" href="/demos/${link}/">Our Demo</a>
      `;
    },
    multiple: false,
  }
}
