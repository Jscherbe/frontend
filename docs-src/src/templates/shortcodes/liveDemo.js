let count = 0;
const newUid = () => `live-demo-id-${ ++count }`;
const when = (cond, whenTrue, whenFalse = "") => cond ? whenTrue : whenFalse;

export default function(config) {
  const { fields } = config;
  const options = { ...config };
  delete options.fields;

  return `
<div class="live-demo" data-live-demo>
  <div class="live-demo__display" data-live-demo-display>
  </div>
  <form class="live-demo__form form-theme" data-live-demo-form>
    ${ form(fields) }
  </form>
  <script type="application/json" data-live-demo-options>
    ${ JSON.stringify(options) }
  </script>
</div>
  `;
}

// Lookup for templates
const formFieldTypes = {
  fieldset: fieldFieldset,
  checkbox: fieldCheckbox,
  select: fieldSelect
};

// Could be a shortcode in future if needed
function form(fields) {
  return formFields(fields);
}

function formFields(fields) {
  if (!Array.isArray(fields)) {
    throw new Error("Fields setup incorrectly");
  }
  return fields.map(formField).join("\n");
}

function formField(field) {
  const type = formFieldTypes[field.type];
  if (!type) {
    console.error("Unable to find matching form field type");
    return "";
  }
  return type(field);
}

function fieldFieldset(field) {
  return `
<fieldset>
  <legend>${ field.legend }</legend>
  <div>
    ${ when(field.children, formFields(field.children)) }
    ${ formDescription(field) }
  </div>
</fieldset>
  `;
}

function fieldCheckbox(field) {
  const uid = newUid();
  return `
<div class="form-theme__item form-theme__item--checkbox">
  <input type="checkbox" id="${ uid }" name="${ field.name }" ${ when(field.checked, "checked") }>
  ${ formLabel(uid, field) }
</div>
  `;
}

function fieldSelect(field) {
  const uid = newUid();
  const { options } = field;
  if (!options || !options.length) {
    console.error("Missing options for select field", field);
    return "";
  }
  return `
<div class="form-theme__item form-theme__item--select">
  ${ formLabel(uid, field) }
  <select id="${ uid }" name="${ field.name }">
    ${ options.map(o => `<option value="${ o.value }">${ o.text }</option>`) }
  </select>
  ${ formDescription(field) }
</div>
  `;
}

function formLabel(uid, field) {
  return `
<label for="${ uid }">
  ${ field.label }
  ${ formTooltip(field) }
</label>  
  `;
}

function formDescription(field) {
  return when(
    field.description, 
    `<p class="form-theme__description">${ field.description }</p>`
  );
}

function formTooltip(field) {
  return when(
    field.tooltip, 
    `<span class="fas fa-info-circle" data-ulu-tooltip="${ field.tooltip }"></span>`
  );
}


