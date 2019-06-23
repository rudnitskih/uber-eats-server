const fs = require('fs');

const dirname = './data/stores/';

const path = './data/marketplaces.json';

let rawdata = fs.readFileSync(path);
let marketplaces = JSON.parse(rawdata);

fs.readdir(dirname, function (err, filenames) {
  if (err) throw err;

  marketplaces.restaurants.forEach(({uuid}) => {
    !filenames.includes(`${uuid}.json`) && console.log(uuid);
  });

  filenames.forEach(function (filename) {
    const filePath = dirname + filename;

    fs.readFile(filePath, 'utf-8', function (err, content) {
      if (err) throw err;

      processFile(filePath, JSON.parse(content));
    });
  });
});

function processFile(filePath, data) {

  const rawdata = JSON.stringify({...data}, null, 2);
  fs.writeFile(filePath, rawdata, function (err) {
    if (err) throw err;
  });
}


