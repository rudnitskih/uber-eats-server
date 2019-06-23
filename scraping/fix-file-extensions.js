const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const dirname = './public/images/';

fs.readdir(dirname, function (err, filenames) {
  if (err) throw err;

  filenames.forEach(async function (filename) {
    if (!path.extname(filename)) {
      fs.rename(dirname + filename, dirname + filename + '.jpg', function (err) {
        if (err) console.log('ERROR: ' + err);
      });

      // try {
      //   const {stdout, stderr} = await exec(`file -I ${dirname + filename}`);
      //   console.log('=', stdout);
      //   if (stderr) console.log(stderr)
      // } catch (e) {
      //   // console.log(e);
      // }

    }
  });
});

