const fs = require('fs');

exports.dataToFile = function(data, to) {
  try {
    fs.writeFileSync(to, JSON.stringify(data, null, 2));
  } catch(error) {
    console.error(error);
  }
}