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
  const sections = data.sections;
  const mainSection = sections.find(({title}) => title.toLowerCase().includes('eng') || title.includes('Menu') );

  sections.forEach((section) => {
    if (section !== mainSection) {
      delete data.sectionEntitiesMap[section.uuid];
    }
  });

  data.sections = [mainSection];

  const rawdata = JSON.stringify({...data}, null, 2);
  fs.writeFile(filePath, rawdata, function (err) {
    if (err) throw err;
  });
}


