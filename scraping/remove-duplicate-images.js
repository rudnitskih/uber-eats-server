const fs = require('fs');

const dirname = './public/images/';

fs.readdir(dirname, function (err, filenames) {
  if (err) throw err;
  console.log(filenames.length);

  filenames.forEach(function (filename) {
    if (filename.includes('(1)')) {
      const filePath = dirname + filename;

      console.log('FilePath=', filePath);
      fs.unlinkSync(filePath);
    }
  });
});
