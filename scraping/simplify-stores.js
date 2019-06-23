const fs = require('fs');

const dirname = './data/stores/';

const path = './data/marketplaces.json';

let rawdata = fs.readFileSync(path);
let marketplaces = JSON.parse(rawdata);


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
  const restaraunt = marketplaces.restaurants.find((marketplace) => marketplace.uuid === data.uuid);

  const rawdata = JSON.stringify({...data, ...restaraunt}, null, 2);
  fs.writeFile(filePath, rawdata, function (err) {
    if (err) throw err;
  });
}


