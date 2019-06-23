const fs = require('fs');

const dirname = './data/stores/';

fs.readdir(dirname, function (err, filenames) {
  if (err) throw err;

  filenames.forEach(function (filename) {
    const filePath = dirname + filename;

    fs.readFile(filePath, 'utf-8', function (err, content) {
      if (err) throw err;

      processFile(filePath, JSON.parse(content));
    });
  });
});

function processFile(filePath, data) {
  delete data.regionId;


  const rawdata = JSON.stringify(data, null, 2);
  fs.writeFile(filePath, rawdata, function (err) {
    if (err) throw err;
  });
}


