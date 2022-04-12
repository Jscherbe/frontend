module.exports = ({ group }) => {
  return `
${ section("Variables",     group.variables,    variablesTemplate) }
${ section("Mixins",        group.mixins,       mixinsTemplate) }
${ section("Functions",     group.functions,    functionsTemplate) }
${ section("Placeholders",  group.placeholders, placeholdersTemplate) }
  `;
}

function section(title, items, template) {  
  if (items.length) {
    return `
## ${ title }

${ template(items) }

    `;
  }
}
function variablesTemplate(items) {
  const itemsMarkup = items.map(item => {
    return `
### ${ item.context.name }

${ printCodeBlock(item.context.value, "scss") }

    `;
    
  });
  return `
${ itemsMarkup }
  `;
}
function mixinsTemplate(items) {
  const itemsMarkup = items.map(item => {
    return `
### ${ item.context.name }

${ printCodeBlock(item.context.code, "scss") }

    `;
    
  });
  return `
${ itemsMarkup }
  `;
}
function functionsTemplate(items) {
  const itemsMarkup = items.map(item => {
    return `
### ${ item.context.name }

${ printCodeBlock(item.context.code, "scss") }

    `;
    
  });
  return `
${ itemsMarkup }
  `;
}
function placeholdersTemplate(items) {
  const itemsMarkup = items.map(item => {
    return `
### ${ item.context.name }

${ printCodeBlock(item.context.code, "scss") }

    `;
    
  });
  return `
${ itemsMarkup }
  `;
}

function printCodeBlock(code, type) {
  return `

\`\`\` ${ type }
${ code }
\`\`\`

  `;
}