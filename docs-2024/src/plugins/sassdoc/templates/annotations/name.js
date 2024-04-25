import { headline, titleCase } from "@ulu/markdown-output-utils";

export default ({ item, headlineLevel }) => {
  const { id, title } = item;
  const { context, type: variableType } = item.data;
  const { type } = context;
  // content blocks don't get a name/title
  if (type === "content") return;

  const label = (title, txt) => `<strong>${ title }</strong>${ txt ? ": " + txt : ""}`;
  const tag = (txt, modifier) => {
    return `<span class="tag${ modifier ? " tag--" + modifier : "" }">${ txt }</span>`;
  };
  const labels = [ 
    tag(label(titleCase(type)), "primary"),
  ];
  if (variableType) {
    labels.push(tag(label("Type", variableType)));
  }
  return `
<div class="sassdoc-item-header">

${ headline("", headlineLevel - 1) } ${ title } {#${ id }}

  <div class="sassdoc-item-header__labels">
    ${ labels.join(" ") }
  </div>

</div>

  `;
};