const fs = require('fs');
const {uniq} = require('lodash');

const dirname = './data/stores/';

const allImages = [];

fs.readdir(dirname, function (err, filenames) {
  if (err) throw err;

  filenames.forEach(function (filename) {
    const filePath = dirname + filename;

    const content = fs.readFileSync(filePath, 'utf-8');
    processFile(filePath, JSON.parse(content));
  });

  const rawdata = JSON.stringify(uniq(allImages).sort(), null, 2);
  fs.writeFileSync('./scraping/all-images.json', rawdata)
});

function processFile(filePath, data) {
  allImages.push(data.largeImageUrl);
  allImages.push(data.imageUrl);

  Object.values(data.items).forEach((item) => {
    if (item.imageUrl) {
      allImages.push(item.imageUrl);
    }
  });
}


