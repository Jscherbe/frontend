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
    Server Migration Task Status
  </caption>
  <thead>
    <tr>
      <th id="${ id('type') }" rowspan="2">Environment</th>
      <th id="${ id('group') }" colspan="2">Server Roles</th>
      <th id="${ id('details') }" colspan="2">Downtime Details</th>
      <th id="${ id('id') }" rowspan="2">Ticket ID</th>
    </tr>
    <tr>
      <th headers="${ headers('group') }" id="${ id('primary') }">Primary</th>
      <th headers="${ headers('group') }" id="${ id('secondary') }">Secondary</th>
      <th headers="${ headers('details') }" id="${ id('before') }">Pre-checks</th>
      <th headers="${ headers('details') }" id="${ id('after') }">Post-checks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" headers="${ headers('type', 'r1') }" id="${ id('r1') }">Production</th>
      <td headers="${ headers('group', 'primary', 'r1') }">Database cluster</td>
      <td headers="${ headers('group', 'secondary', 'r1') }">Cache server</td>
      <td headers="${ headers('details', 'before', 'r1') }">Passed</td>
      <td headers="${ headers('details', 'after', 'r1') }">Pending</td>
      <td headers="${ headers('id') }">IT-992-A</td>
    </tr>
    <tr>
      <td headers="${ headers('group', 'primary', 'r1') }">Web frontend</td>
      <td headers="${ headers('group', 'secondary', 'r1') }">Load balancer</td>
      <td headers="${ headers('details', 'before', 'r1') }">Passed</td>
      <td headers="${ headers('details', 'after', 'r1') }">Passed</td>
      <td headers="${ headers('id') }">IT-993-B</td>
    </tr>
    <tr>
      <td headers="${ headers('group', 'primary', 'r1') }">Message queue</td>
      <td headers="${ headers('group', 'secondary', 'r1') }">Worker nodes</td>
      <td headers="${ headers('details', 'before', 'r1') }">Warning</td>
      <td headers="${ headers('details', 'after', 'r1') }">N/A</td>
      <td headers="${ headers('id') }">IT-994-C</td>
    </tr>
  </tbody>
</table>
  `
}