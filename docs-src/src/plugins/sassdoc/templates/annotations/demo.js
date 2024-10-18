import { headline, titleCase } from "@ulu/markdown-output-utils";

export default ({ item, headlineLevel }) => {
  const { demo } = item.data;
  console.log(demo)
  if (demo) {
    return `
${ demo }
  `;
  }
  
};