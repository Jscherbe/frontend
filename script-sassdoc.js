// var sassdoc = require('sassdoc');

// sassdoc('./scss', { verbose: true })
//   .then(function () {
//     console.log('Your documentation has been generated!');
//   }, function (err) {
//     console.error(err);
//   });
const prepData = require("./docs/.vuepress/plugins/sassdoc/prep-data.js")
var sassdoc = require('sassdoc');

let hasUsed = 0;
sassdoc.parse('./scss', { verbose: true })
  .then(function (data) {
    prepData(data);
    // console.log(data.length);
    // data.forEach(item => {
    //   if (item.usedBy) {
    //     console.log(++hasUsed);
    //     item.usedBy.forEach(used => {
    //       console.log(used.group);
    //     })
    //   }
    // })
    debugger;
  });