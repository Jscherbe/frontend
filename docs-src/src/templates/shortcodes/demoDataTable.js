let counter = 0;


export default function demoDataTable(
  modifier= null,
) {
  const idPrefix = `dt-${ ++counter }`;
  const id = name => `${ idPrefix }-${ name }`;
  const headers = (...names) => names.map(id).join(" ");
  let tableClass = "data-table"
  if (modifier) {
    tableClass += ` data-table--${ modifier }`
  }
  return `
<table class="${ tableClass }" id="${ idPrefix }">
  <caption>
    This Is The Table's Caption
  </caption>
  <thead>
    <tr>
      <th id="${ id('type') }" rowspan="2">Type</th>
      <th id="${ id('group') }" colspan="2">Group</th>
      <th id="${ id('details') }" colspan="2">Details</th>
      <th id="${ id('id') }" rowspan="2">Id</th>
    </tr>
    <tr>
      <th headers="${ headers('group') }" id="${ id('primary') }">Primary</th>
      <th headers="${ headers('group') }" id="${ id('secondary') }">Secondary</th>
      <th headers="${ headers('details') }" id="${ id('before') }">Before Task</th>
      <th headers="${ headers('details') }" id="${ id('after') }">After Task</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" headers="${ headers('type', 'r1') }" id="${ id('r1') }">Default</th>
      <td headers="${ headers('group', 'primary', 'r1') }">Lorem Ipsum</td>
      <td headers="${ headers('group', 'secondary', 'r1') }">Lorem Ipsum</td>
      <td headers="${ headers('details', 'before', 'r1') }">Lorem Ipsum</td>
      <td headers="${ headers('details', 'after', 'r1') }">Lorem Ipsum</td>
      <td headers="${ headers('id') }">OL-53-GHSLE</td>
    </tr>
    <tr>
      <td headers="${ headers('group', 'primary', 'r1') }">Lorem Ipsum</td>
      <td headers="${ headers('group', 'secondary', 'r1') }">Lorem Ipsum</td>
      <td headers="${ headers('details', 'before', 'r1') }">Lorem Ipsum</td>
      <td headers="${ headers('details', 'after', 'r1') }">Lorem Ipsum</td>
      <td headers="${ headers('id') }">OL-53-GHSLE</td>
    </tr>
    <tr>
      <td headers="${ headers('group', 'primary', 'r1') }">Lorem Ipsum</td>
      <td headers="${ headers('group', 'secondary', 'r1') }">Lorem Ipsum</td>
      <td headers="${ headers('details', 'before', 'r1') }">Lorem Ipsum</td>
      <td headers="${ headers('details', 'after', 'r1') }">Lorem Ipsum</td>
      <td headers="${ headers('id') }">OL-53-GHSLE</td>
    </tr>
  </tbody>
</table>
  `
}