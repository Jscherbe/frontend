export default ({ title, info, groupName }, markup) => {
  const groupDescription = info?.groupDescriptions?.[groupName];
  return `
# ${ title }

<div class="type-large">

${ groupDescription ? groupDescription : "" }

</div>

${ markup }
  `;
}
