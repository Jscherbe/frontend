export default function(eleventyConfig) {
  eleventyConfig.addFilter("optionsTable", tableTemplate);
}

function tableTemplate(items, caption) {
  return `
    <table class="site-data-table options-table">
      ${ caption ? `<caption> ${ caption }</caption>` : "" }
      <thead>
        <tr>
          <th>Option</th>
          <th>Value</th>
          <th>Description/Example</th>
        </tr>
      </thead>
      <tbody>
        ${ items.map(rowTemplate).join("\n") }
      </tbody>
    </table>  
  `;
}
function rowTemplate(item) {
  return `
    <tr>
      <td><strong>${ item.name }</strong></td>
      <td><strong>${ item.values }</strong></td>
      <td>
        <p v-if="item.description">
          ${ item.description }
        </p>
        ${ item.example ? `
          <div class="options-table__example">
           <code>${ escapeHtml(item.example) }</code>
          </div>` : "" 
        }
      </td>
    </tr>
  `;
}

function escapeHtml(text) {
  console.log(text);
  return text.replace(/[<>&]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      default:
        return char;
    }
  });
}

