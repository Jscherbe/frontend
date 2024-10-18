import { headline, titleCase } from "@ulu/markdown-output-utils";

export default ({ item, headlineLevel }) => {
  const { demo } = item.data;
  if (demo) {
    return `
${ demo }
  `;
  }
  
};