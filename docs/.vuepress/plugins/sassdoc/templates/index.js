exports.defaultTemplates = {
  page:        require("./page.js"),
  section:     require("./section.js"),
  item:        require("./item.js"),
  component:   require("./component.js"),
  script:      require("./script.js")
};
exports.defaultAnnotationTemplates = {
  see:         require("./annotations/see.js"),
  require:     require("./annotations/require.js"),
  example:     require("./annotations/example.js"),
  type:        require("./annotations/type.js"),
  deprecated:  require("./annotations/deprecated.js"),
  parameter:   require("./annotations/parameter.js"),
  return:      require("./annotations/return.js"),
  link:        require("./annotations/link.js"),
  description: require("./annotations/description.js"),
  name:        require("./annotations/name.js"),
  output:      require("./annotations/output.js"),
  property:    require("./annotations/property.js"),
  todo:        require("./annotations/todo.js"),
  throw:       require("./annotations/throw.js"),
  since:       require("./annotations/since.js"),
  _meta:       require("./annotations/_meta.js"),
  _preview:    require("./annotations/_preview.js"),
};