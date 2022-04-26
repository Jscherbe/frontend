const sassdoc = require("sassdoc");

sassdoc.parse("./scss/sassdoc_test_poster.scss", ).then(data => {
  console.log(data);
  debugger;
});