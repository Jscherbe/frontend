import { headline, titleCase } from "@ulu/markdown-output-utils";

export default ({ item, headlineLevel }) => {
  const { demo } = item.data;
  if (demo) {
    return `

<div class="callout callout--demo crop-margins">

${ headline("Demo", headlineLevel) }

${ demo.content ? demo.content : "" }

<a class="button" href="/demos/${ demo.link }">Our Demo</a>

</div>

`;
  }
};